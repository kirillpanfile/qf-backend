const jwtMiddleware = require("../middlewares/jwt.middleware.js");
const UsersController = require("../controllers/UsersController.js");
const SessionMiddleware = require("../middlewares/session.middleware.js");
const { Router } = require("express");

const { verifySession } = SessionMiddleware;
const router = new Router();

const { verifyAdmin, verifyToken } = jwtMiddleware;
const { getAllUsers, getPages, getUser, deleteUser } = UsersController;

router.get("/all", [verifySession], getAllUsers);
router.get("/pages", verifyAdmin, getPages);
router.get("/:id", verifyToken, getUser);
router.delete("/:id", verifyAdmin, deleteUser);

module.exports = router;
