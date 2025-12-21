const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { log, error } = require("../utils/logger");

// Register Route
const UserRegistration = async (req, res) => {
  try {
    const { name, email, password, contact } = req.body;

    // Check if email exists
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      contact,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// EXPORT PROPERLY
module.exports = {
  UserRegistration,
};
