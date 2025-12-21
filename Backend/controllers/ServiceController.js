const Service = require("../models/Service");
const { log, error } = require("../utils/logger");
// GET all services (clients)
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    error("Error fetching services:", error);
    res.status(500).json({ message: "Failed to fetch services" });
  }
};

module.exports = {
  getAllServices,
};
