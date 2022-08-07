const router = require("express").Router();
const signUp = require("../controllers/auth.controller").signUp;
const signIn = require("../controllers/auth.controller").signIn;
const getMe = require("../controllers/auth.controller").getMe;
const signInRemember = require("../controllers/auth.controller").signInRemember;
const verifyJwt = require("../middleware/jwt.middleware").verifyToken;
const isAdmin = require("../middleware/jwt.middleware").isAdmin;

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/remember", [verifyJwt, isAdmin], signInRemember);
router.get("/me", [verifyJwt], getMe);

module.exports = router;
