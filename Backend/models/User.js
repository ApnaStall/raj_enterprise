const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    profilePhoto: { type: String, default: "" },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    contact: { type: String, required: true, unique: true },
    password: { type: String, 
      required: function () {
        return this.provider === "local";
      }
    },
    provider: { type: String, default: "local" },
    role: { type: String, default: "user" },
    profileComplete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema, "user");
