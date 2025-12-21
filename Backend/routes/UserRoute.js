const express = require("express");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const User = require("../models/User");
const cloudinary = require("../config/cloudinary");
const authMiddleware = require("../middleware/authMiddleware");
const { log, error } = require("../utils/logger");

const router = express.Router();

/* ---------------- HELPERS ---------------- */

const isDuplicateKeyError = (error) =>
  error.code === 11000 && error.keyPattern?.email;

/* ---------------- TEST ---------------- */

router.get("/test", (req, res) => {
  res.json({ message: "User route working" });
});

/* ---------------- REGISTER ---------------- */

router.post("/register", async (req, res) => {
  try {
    const { name, email, contact, password } = req.body;

    if (!name || !email || !contact || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { contact }]
    });

    if (existingUser) {
      if (existingUser.provider?.includes("google")) {
        return res.status(400).json({
          message: "This email is registered with Google. Please login using Google."
        });
      }
      return res.status(400).json({ message: "Email already exists. Please login." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      contact,
      password: hashedPassword,
      provider: "local",
      profileComplete: true
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        role: user.role
      }
    });

  } catch (error) {
    error("❌ REGISTER ERROR:", error);
    if (isDuplicateKeyError(error)) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------------- LOGIN ---------------- */

router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        message: "Email/Phone and password are required"
      });
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { contact: identifier }]
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        role: user.role
      }
    });

  } catch (error) {
    error("❌ LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------------- CLOUDINARY SETUP ---------------- */

const upload = multer({
  storage: multer.memoryStorage(), // ✅ REQUIRED
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});


/* ---------------- PROFILE ---------------- */

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile fetched", user });

  } catch (error) {
    error("❌ PROFILE FETCH ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------------- PROFILE PHOTO UPLOAD ---------------- */

router.post(
  "/profile-photo",
  authMiddleware,
  upload.single("photo"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file received" });
      }

      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // ✅ Convert buffer → base64
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

      // ✅ Upload to Cloudinary (STABLE)
      const result = await cloudinary.uploader.upload(base64Image, {
        folder: "profile_photos",
      });

      user.profilePhoto = result.secure_url;
      await user.save();

      res.json({
        message: "Profile photo updated",
        profilePhoto: result.secure_url,
      });

    } catch (error) {
      error("❌ PROFILE PHOTO UPLOAD ERROR:", error);
      res.status(500).json({ message: "Upload failed" });
    }
  }
);

/* ---------------- REMOVE PROFILE PHOTO ---------------- */

router.delete("/profile-photo", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profilePhoto = "";
    await user.save();

    res.json({ message: "Profile photo removed" });

  } catch (error) {
    error("❌ REMOVE PROFILE PHOTO ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------------- GOOGLE LOGIN ---------------- */

router.post("/google-login", async (req, res) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).json({
        message: "Google access token is required"
      });
    }

    const googleRes = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    const { email, name } = googleRes.data;

    if (!email) {
      return res.status(400).json({
        message: "Google authentication failed"
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: name || "Google User",
        email,
        contact: `google_${Date.now()}`,
        provider: "google",
        profileComplete: false
      });
    } else if (user.provider === "local") {
      user.provider = "local+google";
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Google login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        role: user.role
      }
    });

  } catch (error) {
    error("❌ GOOGLE LOGIN ERROR:", error.response?.data || error.message);
    res.status(500).json({ message: "Google login failed" });
  }
});

module.exports = router;
