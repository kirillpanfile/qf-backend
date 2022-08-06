const User = require("../models/user.model");

const getAllUsers = async (req, res) => {
  const limit = 25;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;
  try {
    const users = await User.find({}).skip(skip).limit(limit);
    //send users without passworsd
    const usersWithoutPasswords = users.map((user) => {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      return userWithoutPassword;
    });
    res.status(200).json(usersWithoutPasswords);
  } catch (error) {
    res.status(500).json({ msg: "Error getting users" });
  }
};

const getPages = async (req, res) => {
  const total = await User.countDocuments();
  const pages = Math.ceil(total / 25);
  res.status(200).json(pages);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: "Error deleting user" });
  }
};

const deleteMultipleUsers = async (req, res) => {
  const ids = req.body.ids;
  try {
    const users = await User.deleteMany({ _id: { $in: ids } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: "Error deleting users" });
  }
};

const searchUsers = async (req, res) => {
  const { name } = req.params;
  try {
    const users = await User.find({
      username: { $regex: name, $options: "i" },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: "Error searching users" });
  }
};

module.exports = {
  getAllUsers,
  getPages,
  deleteUser,
  deleteMultipleUsers,
  searchUsers,
};
