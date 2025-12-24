const express = require("express");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/upload", upload.single("image"), (req, res) => {
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

module.exports = router;
