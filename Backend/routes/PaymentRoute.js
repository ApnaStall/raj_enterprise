const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");
const { log, error } = require("../utils/logger");

const router = express.Router();

// 🔐 Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

/**
 * CREATE RAZORPAY ORDER
 * POST /api/payment/create-order
 */
router.post("/create-order", authMiddleware, async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    if (!orderId || !amount) {
      return res.status(400).json({
        message: "Order ID and amount required"
      });
    }

    // Ensure order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    const options = {
      amount: amount * 100, // ₹ → paise
      currency: "INR",
      receipt: orderId
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount
    });

  } catch (error) {
    error("❌ CREATE ORDER ERROR:", error);
    res.status(500).json({
      message: "Failed to create Razorpay order"
    });
  }
});

/**
 * VERIFY PAYMENT
 * POST /api/payment/verify
 */
router.post("/verify", authMiddleware, async (req, res) => {
  try {
    const {
      orderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    if (
      !orderId ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        message: "Invalid payment data"
      });
    }

    // 🔑 Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        message: "Payment verification failed"
      });
    }

    // ✅ Mark order as paid
    await Order.findByIdAndUpdate(orderId, {
      payment_status: "paid",
      order_status: "confirmed"
    });

    res.json({
      message: "Payment verified successfully"
    });

  } catch (error) {
    error("❌ PAYMENT VERIFY ERROR:", error);
    res.status(500).json({
      message: "Payment verification failed"
    });
  }
});

module.exports = router;
