const router = require("express").Router()
const { isAdmin } = require("../middlewares/auth.middleware.js")
const {
    getAllUsers,
    getPages,
    getUser,
    deleteUser,
    getRoles,
    updateUser,
    deleteMultipleUsers,
    getByName,
} = require("../controllers/UsersController.js")
const { verifySession } = require("../middlewares/session.middleware.js")

router.get("/all/:type", [verifySession, isAdmin], getAllUsers)
router.get("/roles/all", [verifySession, isAdmin], getRoles)
router.get("/pages", [verifySession, isAdmin], getPages)
router.get("/search/:name", [verifySession, isAdmin], getByName)
router.get("/:id", verifySession, getUser)

router.delete("/delete/multiple", [verifySession, isAdmin], deleteMultipleUsers)
router.delete("/delete/:id", [verifySession, isAdmin], deleteUser)
router.put("/update/:id", [verifySession, isAdmin], updateUser)

module.exports = router
