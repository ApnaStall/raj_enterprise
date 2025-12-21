const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const { log, error } = require("../utils/logger");

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const newMsg = new Contact({ name, email, phone, message });
    await newMsg.save();

    res.status(201).json({ success: true, message: "Message received successfully!" });

  } catch (err) {
    error("Error in contact route:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
