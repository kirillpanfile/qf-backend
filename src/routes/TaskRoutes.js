const router = require("express").Router()

const { isAdmin } = require("../middlewares/auth.middleware.js")
const { verifySession } = require("../middlewares/session.middleware.js")

const { createTask, getTask, deleteTask, getTasks, updateTask } = require("../controllers/TaskController.js")

router.post("/create", [verifySession, isAdmin], createTask)
router.get("/all", [verifySession, isAdmin], getTasks)
router.get("/:id", [verifySession, isAdmin], getTask)
router.put("/:id", [verifySession, isAdmin], updateTask)
router.delete("/:id", [verifySession, isAdmin], deleteTask)

module.exports = router
