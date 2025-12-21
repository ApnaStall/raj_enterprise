const User = require("../models/User");

const profileCompleteMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.profileComplete) {
      return res.status(403).json({
        message: "Please complete your profile before checkout",
        profileComplete: false
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = profileCompleteMiddleware;
