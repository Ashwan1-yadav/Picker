const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const BlockedTokenModel = require("../models/blockedToken");
const isLoggedIn = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const isBlockedToken = await BlockedTokenModel.findOne({ token });
  if (isBlockedToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded._id);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {
  isLoggedIn,
};
