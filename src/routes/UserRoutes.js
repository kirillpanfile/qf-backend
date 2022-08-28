const router = require("express").Router()
const { isAdmin } = require("../middlewares/auth.middleware.js")
const { getAllUsers, getPages, getUser, deleteUser, getRoles } = require("../controllers/UsersController.js")
const { verifySession } = require("../middlewares/session.middleware.js")

router.get("/all/:type", [verifySession, isAdmin], getAllUsers)
router.get("/roles/all", [verifySession, isAdmin], getRoles)
router.get("/pages", [verifySession, isAdmin], getPages)
router.get("/:id", verifySession, getUser)
router.delete("/:id", [verifySession, isAdmin], deleteUser)

module.exports = router
