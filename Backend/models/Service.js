const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  service_logo: { type: String, required: true },
  service_name: { type: String, required: true },
  service_location: { type: String, required: true }
});

module.exports = mongoose.model("Service", serviceSchema, "service");
