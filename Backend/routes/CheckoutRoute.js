const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");
const { log, error } = require("../utils/logger");

/**
 * PLACE ORDER
 * POST /api/checkout
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      customer_address,
      items,
      total_amount,
      payment_method
    } = req.body;

    // ✅ Validate checkout-owned fields only
    if (
      !customer_address ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !total_amount
    ) {
      return res.status(400).json({
        message: "All checkout fields are required"
      });
    }

    // ✅ Fetch full user from DB
    const user = await User.findById(req.user.id);

    // 🚫 Block checkout for incomplete profiles
    if (!user.profileComplete) {
      return res.status(403).json({
        message: "Please complete your profile before checkout",
        code: "PROFILE_INCOMPLETE"
      });
    }

    log("CHECKOUT USER:", {
      id: user._id,
      provider: user.provider,
      profileComplete: user.profileComplete
    });


    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    // ✅ Create order using USER data
    const order = await Order.create({
      user_id: user._id,
      customer_name: user.name,
      customer_email: user.email,
      customer_phone: user.contact,
      customer_address,
      items,
      total_amount,
      payment_method: payment_method || "COD",
      payment_status: "pending",
      order_status: "placed"
    });

    res.status(201).json({
      message: "Order placed successfully",
      orderId: order._id
    });

  } catch (error) {
    error("❌ CHECKOUT ERROR:", error);
    res.status(500).json({
      message: "Checkout failed"
    });
  }
});

module.exports = router;
