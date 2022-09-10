const router = require("express").Router()

const { isAdmin } = require("../middlewares/auth.middleware.js")
const { createRecipe, getRecipes, getRecipe, updateRecipe, createMore } = require("../controllers/RecipeController.js")

router.post("/more/create/:flag", createMore)
router.post("/create", createRecipe)
router.get("/all/:lang", getRecipes)
router.get("/:id", getRecipe)
router.put("/:id", updateRecipe)

module.exports = router
