const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");
const { log, error } = require("../utils/logger");

/**
 * GET USER ORDERS
 * GET /api/orders/my
 */
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user.id })
      .sort({ createdAt: -1 });

    res.json({ orders });

  } catch (error) {
    error("❌ FETCH ORDERS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

module.exports = router;
