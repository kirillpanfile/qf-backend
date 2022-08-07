const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const config = require("../config/auth.config");
const jwtSecret = config.jwtSecret;
const bcrypt = require("bcrypt");

const verifyToken = async (req, res, next) => {
  const token = req.header("x-access-token");
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
  const token = req.header("x-access-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const decoded = await jwt.verify(token, jwtSecret);
  const user = await User.findById(decoded.user._id).populate("roles");

  if (!user) {
    return res.status(401).json({ msg: "User not found" });
  }

  if (
    Object.values(user.roles)
      .map((role) => role.name)
      .includes("ROLE_SUPER_ADMIN")
  )
    next();
  else return res.status(401).json({ msg: "You are not authorized" });
};

//TODO - Rewrite

// const isModerator = async (req, res, next) => {
//   let user = null;
//   if (req?.user?._id) {
//     user = await User.findById(req.user._id);
//   }
//   if (user) {
//     if (!user.roles.includes("ROLE_MODERATOR")) {
//       return res.status(401).json({ msg: "Moderator privileges required" });
//     }
//     next();
//   } else {
//     const token = req.header("x-access-token");
//     if (!token) {
//       return res.status(401).json({ msg: "No token, authorization denied" });
//     }
//     try {
//       const decoded = await jwt.verify(token, jwtSecret);
//       if (decoded.user.roles.includes("ROLE_MODERATOR")) {
//         next();
//       } else {
//         return res.status(401).json({ msg: "You are not authorized" });
//       }
//     } catch (error) {
//       return res.status(401).json({ msg: "Token is not valid" });
//     }
//   }
// };

const signInAdmin = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: "Username and password are required" });
  }
  const user = await User.findOne({ username }).populate("roles");
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }
  if (
    Object.values(user.roles)
      .map((role) => role.name)
      .includes("ROLE_SUPER_ADMIN")
  )
    next();
  else return res.status(401).json({ msg: "You are not authorized" });
};

module.exports = {
  verifyToken,
  isAdmin,
  signInAdmin,
};
