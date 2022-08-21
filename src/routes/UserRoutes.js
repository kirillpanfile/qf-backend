const jwtMiddleware = require("../middlewares/jwt.middleware.js");
const UsersController = require("../controllers/UsersController.js");
const { Router } = require("express");

const router = new Router();

const { verifyAdmin, verifyToken } = jwtMiddleware;
const { getAllUsers, getPages, getUser, deleteUser } = UsersController;

router.get("/all", verifyAdmin, getAllUsers);
router.get("/pages", verifyAdmin, getPages);
router.get("/:id", verifyToken, getUser);
router.delete("/:id", verifyAdmin, deleteUser);

module.exports = router;
