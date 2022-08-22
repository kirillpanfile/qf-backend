const { Router } = require("express");
const router = new Router();
const AuthController = require("../controllers/AuthController.js");
const SessionMiddleware = require("../middlewares/session.middleware.js");
const { signInPermission } = require("../middlewares/auth.middleware.js");

const { verifySession } = SessionMiddleware;

const { signUp, signIn, logOut, remember } = AuthController;

router.post("/signup", signUp);
router.get("/remember/:flag", [verifySession, signInPermission], remember);
router.post("/signin/:flag", signInPermission, signIn);
router.post("/logout", logOut);

module.exports = router;
