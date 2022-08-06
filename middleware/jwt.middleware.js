const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const config = require("../config/auth.config");
const jwtSecret = config.jwtSecret;

const verifyToken = async (req, res, next) => {
  const token = req.header("x-access-token");
  console.log(req.headers);
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = await jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

const isAdmin = async (req, res, next) => {
  let user = null;
  if (req?.user?._id) {
    user = await User.findById(req.user._id);
  }
  if (user) {
    if (!user.roles.includes("ROLE_ADMIN")) {
      return res.status(401).json({ msg: "Admin privileges required" });
    }
    next();
  } else {
    const token = req.header("x-access-token");
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
    try {
      const decoded = await jwt.verify(token, jwtSecret);
      if (decoded.user.roles.includes("ROLE_ADMIN")) {
        next();
      } else {
        return res.status(401).json({ msg: "You are not authorized" });
      }
    } catch (error) {
      return res.status(401).json({ msg: "Token is not valid" });
    }
  }
};

module.exports = {
  verifyToken,
  isAdmin,
};
