const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");
const { log, error } = require("../utils/logger");

const mongoose = require("mongoose");

const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Contact = require("../models/Contact");
const Service = require("../models/Service");
const Subscription = require("../models/Subscription");

const router = express.Router();

/* 🔹 Admin Dashboard */
/* 🔹 Admin Dashboard */
router.get("/dashboard", authMiddleware, adminOnly, async (req, res) => {
  try {
    const [
      totalUsers,
      totalOrders,
      totalProducts,
      totalContacts,
      totalSubscriptions
    ] = await Promise.all([
      User.countDocuments(),
      Order.countDocuments(),
      Product.countDocuments(),
      Contact.countDocuments(),
      Subscription.countDocuments()
    ]);

    /* Total Revenue */
    const revenueAgg = await Order.aggregate([
      { $match: { payment_status: "paid" } },
      { $group: { _id: null, total: { $sum: "$total_amount" } } }
    ]);

    const totalRevenue = revenueAgg[0]?.total || 0;

    /* Recent Orders */
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("customer_name total_amount order_status payment_status createdAt");

    /* Monthly Revenue (Last 6 Months) */
    const monthlyRevenue = await Order.aggregate([
      {
        $match: {
          payment_status: "paid",
          createdAt: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 6))
          }
        }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$total_amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    /* Order Status Breakdown */
    const orderStatus = await Order.aggregate([
      {
        $group: {
          _id: "$order_status",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalOrders,
        totalProducts,
        totalContacts,
        totalSubscriptions,
        totalRevenue
      },
      charts: {
        monthlyRevenue,
        orderStatus
      },
      recentOrders
    });

  } catch (error) {
    error("ADMIN DASHBOARD ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Dashboard data fetch failed",
      error: error.message
    });
  }
});


/* 🔹 Get all users */
router.get("/users", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { role, provider } = req.query;

    const filter = {};
    if (role) filter.role = role;
    if (provider) filter.provider = provider;

    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users"
    });
  }
});

/* 🔹 Get single user */
router.get("/users/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    error("ADMIN USER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message
    });
  }
});

/* 🔹 Update user role */
router.patch("/users/:id/role", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      message: "User role updated",
      user
    });
  } catch (error) {
    error("ADMIN USER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message
    });
  }
});

/* 🔹 Delete user */
router.delete("/users/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.user.id === req.params.id) {
      return res.status(400).json({
        success: false,
        message: "Admin cannot delete own account"
      });
    }


    res.json({
      success: true,
      message: "User deleted"
    });
  } catch (error) {
    error("ADMIN USER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message
    });
  }
});

/* 🔹 Get all orders */
router.get("/orders", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { order_status, payment_status } = req.query;

    const filter = {};
    if (order_status) filter.order_status = order_status;
    if (payment_status) filter.payment_status = payment_status;

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    error("GET ORDERS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders"
    });
  }
});

/* 🔹 Get single order */
router.get("/orders/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID"
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    error("GET ORDER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order"
    });
  }
});

/* 🔹 Update order status */
router.patch("/orders/:id/status", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { order_status } = req.body;

    const allowedStatus = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
    if (!allowedStatus.includes(order_status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status"
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { order_status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.json({
      success: true,
      message: "Order status updated",
      order
    });
  } catch (error) {
    error("UPDATE ORDER STATUS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update order status"
    });
  }
});

/* 🔹 Update payment status */
router.patch("/orders/:id/payment", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { payment_status } = req.body;

    const allowedPayments = ["pending", "paid", "failed", "refunded"];
    if (!allowedPayments.includes(payment_status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status"
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { payment_status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.json({
      success: true,
      message: "Payment status updated",
      order
    });
  } catch (error) {
    error("UPDATE PAYMENT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update payment status"
    });
  }
});

/* 🔹 Get all products */
router.get("/products", authMiddleware, adminOnly, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    error("GET PRODUCTS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products"
    });
  }
});

/* 🔹 Add product */
router.post("/products", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { product_name, product_price, product_image } = req.body;

    if (!product_name || !product_price) {
      return res.status(400).json({
        success: false,
        message: "Product name and price required"
      });
    }

    const product = await Product.create({
      product_name,
      product_price,
      product_image
    });

    res.status(201).json({
      success: true,
      message: "Product added",
      product
    });
  } catch (err) {
    error("ADD PRODUCT ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to add product"
    });
  }
});

/* 🔹 Update product */
router.put("/products/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      message: "Product updated",
      product
    });
  } catch (error) {
    error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update product"
    });
  }
});

/* 🔹 Delete product */
router.delete("/products/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      message: "Product deleted"
    });
  } catch (error) {
    error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete product"
    });
  }
});

/* 🔹 Get all services */
router.get("/services", authMiddleware, adminOnly, async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: services.length,
      services
    });
  } catch (error) {
    error("GET SERVICES ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch services"
    });
  }
});

/* 🔹 Add service */
router.post("/services", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { service_name, service_logo, service_location } = req.body;

    if (!service_name) {
      return res.status(400).json({
        success: false,
        message: "Service name required"
      });
    }

    const service = await Service.create({
      service_name,
      service_logo,
      service_location
    });

    res.status(201).json({
      success: true,
      message: "Service added",
      service
    });
  } catch (error) {
    error("ADD SERVICE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add service"
    });
  }
});

/* 🔹 Update service */
router.put("/services/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID"
      });
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    res.json({
      success: true,
      message: "Service updated",
      service
    });
  } catch (error) {
    error("UPDATE SERVICE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update service"
    });
  }
});

/* 🔹 Delete service */
router.delete("/services/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID"
      });
    }

    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    res.json({
      success: true,
      message: "Service deleted"
    });
  } catch (error) {
    error("DELETE SERVICE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete service"
    });
  }
});

/* 🔹 Get all contact messages */
router.get("/contacts", authMiddleware, adminOnly, async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ created_at: -1 });

    res.json({
      success: true,
      count: contacts.length,
      contacts
    });
  } catch (error) {
    error("GET CONTACTS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts"
    });
  }
});

/* 🔹 Get single contact */
router.get("/contacts/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact ID"
      });
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }

    res.json({
      success: true,
      contact
    });
  } catch (error) {
    error("GET CONTACT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contact"
    });
  }
});

/* 🔹 Delete contact */
router.delete("/contacts/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact ID"
      });
    }

    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }

    res.json({
      success: true,
      message: "Contact deleted"
    });
  } catch (error) {
    error("DELETE CONTACT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete contact"
    });
  }
});

/* 🔹 Get all subscriptions */
router.get("/subscriptions", authMiddleware, adminOnly, async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: subscriptions.length,
      subscriptions
    });
  } catch (error) {
    error("GET SUBSCRIPTIONS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch subscriptions"
    });
  }
});

/* 🔹 Delete subscription */
router.delete("/subscriptions/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid subscription ID"
      });
    }

    const subscription = await Subscription.findByIdAndDelete(req.params.id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found"
      });
    }

    res.json({
      success: true,
      message: "Subscription deleted"
    });
  } catch (error) {
    error("DELETE SUBSCRIPTION ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete subscription"
    });
  }
});

module.exports = router;
