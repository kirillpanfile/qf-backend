const { Router } = require("express")
const router = new Router()
const { signUp, signIn, logOut, remember } = require("../controllers/AuthController.js")

const { verifySession } = require("../middlewares/session.middleware.js")
const { signInPermission, rememberPermission } = require("../middlewares/auth.middleware.js")

router.post("/signup", signUp)
router.get("/remember/:flag", [verifySession, rememberPermission], remember)
router.post("/signin/:flag", signInPermission, signIn)
router.delete("/logout", [verifySession], logOut)

module.exports = router
