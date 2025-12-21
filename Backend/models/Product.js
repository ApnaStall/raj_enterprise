const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_image: { type: String, required: true },
  product_name: { type: String, required: true },
  product_price: { type: Number, required: true },
  product_category: { type: String, required: true,
    enum: [
      "O.T. Linen",
      "Staff Uniform",
      "Doctor Scrub",
      "Patient Dress",
    ]
  },
});

module.exports = mongoose.model("Product", productSchema, "product");
