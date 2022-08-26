const router = require("express").Router()

const { isAdmin } = require("../middlewares/auth.middleware.js")
const {
    createRecipe,
    getRecipes,
    getRecipe,
    updateRecipe,
    createIngredient,
} = require("../controllers/RecipeController.js")

router.post("/more/create/:flag", createIngredient)
router.post("/create", createRecipe)
router.get("/all/:lang", getRecipes)
router.get("/:id", getRecipe)
router.put("/:id", updateRecipe)

module.exports = router
