const express = require("express");
const router = express.Router();
const { getAllServices } = require("../controllers/ServiceController");

// GET /api/service
router.get("/", getAllServices);

module.exports = router;
