const router = require("express").Router();

const {
  signIn,
  signUp,
  getMe,
  signInRemember,
} = require("../controllers/auth.controller");
const { isAdmin, verifyToken } = require("../middleware/jwt.middleware");

// Sign up
router.post("/signup", signUp);

// Sign in
router.post("/signin", signIn);

// Sign in with remember me
router.post("/remember", [verifyToken, isAdmin], signInRemember);

// Get current user
router.get("/me", [verifyToken], getMe);

module.exports = router;
