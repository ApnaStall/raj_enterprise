const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require("multer");
const { log, error } = require("../utils/logger");

router.get("/test", (req, res) => {
  res.send("Product Route Working");
});


// GET all products
router.get("/", async (req, res) => {
  try {
    const product = await Product.find();

    log("DB name:", Product.db.name);
    log("Collection name:", Product.collection.name);
    log("Products:", product);

    res.json(product);
  } catch (err) {
    log(err);
    res.status(500).json({ message: "Error fetching products" });
  }
});



// MULTER CONFIG
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ADD PRODUCT
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const imageURL = `http://localhost:5000/uploads/${req.file.filename}`;
    const product = new Product({
      product_name: req.body.name,
      product_price: req.body.price,
      product_image: imageURL,
    });
    await product.save();
    res.json({
      message: "Product added successfully!",
      product,
    });
  } catch (error) {
    log(error);
    res.status(500).json({ message: "Error adding product" });
  }
});

module.exports = router;
