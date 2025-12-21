const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true }       // email or mobile
});

module.exports = mongoose.model("Subscription", subscriptionSchema, "subscription");
