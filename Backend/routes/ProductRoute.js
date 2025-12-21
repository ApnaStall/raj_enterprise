const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const multer = require("multer");
const { log, error } = require("../utils/logger");

// TEST ROUTE
router.get("/test", (req, res) => {
  res.send("Product Route Working");
});

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    // Guard: ensure MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: "Database not connected yet",
      });
    }

    const products = await Product.find();

    log("DB:", mongoose.connection.name);
    log("Collection:", Product.collection.name);
    log("Products count:", products.length);

    res.status(200).json(products);
  } catch (err) {
    error("Error fetching products:", err);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// MULTER CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// ADD PRODUCT
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const baseUrl = process.env.BASE_URL || "http://localhost:5000";
    const imageURL = `${baseUrl}/uploads/${req.file.filename}`;

    const product = new Product({
      product_name: req.body.name,
      product_price: req.body.price,
      product_image: imageURL,
    });

    await product.save();

    res.status(201).json({
      message: "Product added successfully!",
      product,
    });
  } catch (err) {
    error("Error adding product:", err);
    res.status(500).json({ message: "Error adding product" });
  }
});

module.exports = router;
