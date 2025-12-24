const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "%20");
    cb(null, Date.now() + "-" + safeName);
  }
});

const upload = multer({ storage });

module.exports = upload; // ✅ IMPORTANT
