const router = require("express").Router()

const { isAdmin } = require("../middlewares/auth.middleware.js")
const {
    createRecipe,
    getRecipes,
    getRecipe,
    updateRecipe,
    createMore,
    getTags,
    getCategories,
} = require("../controllers/RecipeController.js")

router.post("/more/create/:flag", createMore)
router.post("/create", createRecipe)
router.get("/all/:lang", getRecipes)
router.get("/tags/:lang", getTags)
router.get("/categories/:lang", getCategories)
// router.get("/tags/:lang", getTags)

router.get("/:id", getRecipe)
router.put("/:id", updateRecipe)

module.exports = router
