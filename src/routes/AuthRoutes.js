const { Router } = require("express");
const router = new Router();
const AuthController = require("../controllers/AuthController.js");

const { signUp, signIn } = AuthController;

router.post("/signup", signUp);
router.post("/signin/admin", signIn);

module.exports = router;
