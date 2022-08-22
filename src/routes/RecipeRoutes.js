const router = require("express").Router()

const { isAdmin } = require("../middlewares/auth.middleware.js")
const { createRecipe, getAllRecipes, getRecipe, updateRecipe } = require("../controllers/RecipeController.js")

module.exports = router
