const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ABSOLUTE uploads path (CRITICAL)
const uploadDir = path.join(process.cwd(), "uploads");

// ensure uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    // TEMP: log to verify multer runs
    console.log("📁 Saving uploaded file, ext:", ext);

    const filename = `Product_${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files allowed"));
    }
    cb(null, true);
  },
});

module.exports = upload;
