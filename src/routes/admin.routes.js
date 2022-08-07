/**
 * This file is used to create routes allowed only for admin users
 */

const router = require("express").Router();

const { verifyToken, isAdmin } = require("../middleware/jwt.middleware");
const {
  getAllUsers,
  getPages,
  deleteMultipleUsers,
  deleteUser,
  searchUsers,
} = require("../controllers/admin.controller");

const { signIn } = require("../controllers/auth.controller");

// Sign in admin
router.post("/signin", [verifyToken, isAdmin], signIn);

// get all users
router.get("/users", [verifyToken, isAdmin], getAllUsers);

// get total pages
router.get("/pages", [verifyToken, isAdmin], getPages);

// delete multiple users
router.post("/deleteMultiple", [verifyToken, isAdmin], deleteMultipleUsers);

// delete user
router.delete("/delete/:id", [verifyToken, isAdmin], deleteUser);

// search users
router.get("/search/:name", [verifyToken, isAdmin], searchUsers);

// export module

module.exports = router;
