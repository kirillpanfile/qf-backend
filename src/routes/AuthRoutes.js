const { Router } = require("express");
const router = new Router();
const AuthController = require("../controllers/AuthController.js");
const { signInPermission } = require("../middlewares/auth.middleware.js");

const { signUp, signIn, logOut } = AuthController;

router.post("/signup", signUp);
router.post("/signin/:flag", signInPermission, signIn);
router.post("/logout", logOut);

module.exports = router;
