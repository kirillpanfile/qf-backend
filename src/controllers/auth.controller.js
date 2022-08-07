const { jwtSecret } = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const Role = require("../models/role.model");

const saltRounds = 10;

/**
 * @description - This function is used to sign up a new user
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns {Object} - response object
 */

//? Creates a new user
const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  const userExists = await User.findOne({ username });
  const emailExist = await User.findOne({ email });
  if (userExists || emailExist) {
    return res.status(400).json({ msg: "User already exists" });
  }
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  const role = await Role.findOne({ name: "ROLE_USER" });

  if (!role) {
    return res.status(500).json({ msg: "Role not found" });
  }

  const newUser = new User({
    username,
    email,
    password: hash,
    roles: role,
  });

  await newUser.save();
  res.status(201).json("User created");
};

/**
 * @description - This function is used to sign in a user with remember me
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns {Object} - response object
 */

// Verify a user s X - Access - Token and a JWT.
const signInRemember = async (req, res) => {
  const token = req.headers["x-access-token"];
  const decoded = jwt.verify(token, jwtSecret);
  const user = await User.findById(decoded.user._id);
  const { password, ...others } = user._doc;
  return res.status(200).json(others);
};

/**
 * @description - This function is used to sign in a user
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns {Object} - response object
 */

const signIn = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid password" });
  }
  const token = jwt.sign({ user }, jwtSecret, { expiresIn: 86400 * 7 });

  res.status(200).json({
    id: user._id,
    username: user.username,
    email: user.email,
    roles: user.roles,
    accessToken: token,
  });
};

/**
 * @description - This function is used to sign up a new user
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns {Object} - response object
 */

const getMe = async (req, res) => {
  const token = req.headers["x-access-token"];
  const decoded = jwt.verify(token, jwtSecret);
  const user = await User.findById(decoded.user._id);
  res.status(200).json({
    id: user._id,
    username: user.username,
    email: user.email,
    roles: user.roles,
  });
};

module.exports = { signUp, signIn, getMe, signInRemember };
