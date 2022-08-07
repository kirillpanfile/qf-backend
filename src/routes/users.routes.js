const router = require("express").Router();

const {
  deleteMultipleUsers,
  getAllUsers,
  getPages,
  searchUsers,
  deleteUser,
} = require("../controllers/users.controller");

const { verifyToken, isAdmin } = require("../middleware/jwt.middleware");

router.get("/", [verifyToken, isAdmin], getAllUsers); // get all users
router.get("/pages", [verifyToken], getPages); // get total pages
router.post("/deleteMultiple", [verifyToken, isAdmin], deleteMultipleUsers); // delete multiple users
router.delete("/delete/:id", [verifyToken, isAdmin], deleteUser); //   delete user
router.get("/search/:name", [verifyToken, isAdmin], searchUsers); // search users
module.exports = router;
