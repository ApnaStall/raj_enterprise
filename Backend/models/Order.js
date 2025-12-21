const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  customer_name: { type: String, required: true },
  customer_email: { type: String, required: true },
  customer_phone: { type: String, required: true },
  customer_address: { type: String, required: true },
  items: [
    { product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  total_amount: { type: Number, required: true },
  payment_method: { type: String, enum: ["COD", "ONLINE"], default: "COD" },
  payment_status: { type: String, default: "pending" },
  order_status: { type: String, default: "placed" }
},
{ timestamps: true });

module.exports = mongoose.model("Order", orderSchema, "orders");
