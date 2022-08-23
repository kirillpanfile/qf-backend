const router = require("express").Router()

const { isAdmin } = require("../middlewares/auth.middleware.js")
const {
    createRecipe,
    getRecipes,
    getRecipe,
    updateRecipe,
    createIngredient,
} = require("../controllers/RecipeController.js")

router.post("/create", createRecipe)
router.get("/", getRecipes)
router.get("/:id", getRecipe)
router.put("/:id", updateRecipe)

router.post("/ingredient/create", createIngredient)

module.exports = router
