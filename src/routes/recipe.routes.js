const router = require("express").Router();
const { verifyToken, isAdmin } = require("../middleware/jwt.middleware");
const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  deleteRecipe,
} = require("../controllers/recipe.controller");

// Get all recipes
router.get("/all", [verifyToken, isAdmin], getAllRecipes);

// Get recipe by id
router.get("/:id", [verifyToken, isAdmin], getRecipeById);

// delete recipe by id
router.delete("/:id", [verifyToken, isAdmin], deleteRecipe);

// Create recipe
router.post("/admin/create", [verifyToken, isAdmin], createRecipe);

module.exports = router;
