const express = require("express");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/upload", upload.single("image"), (req, res) => {
  console.log("📥 Upload endpoint hit");

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  console.log("✅ File saved as:", req.file.filename);

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${encodeURIComponent(req.file.filename)}`;

  res.json({ url: imageUrl });
});

module.exports = router;
