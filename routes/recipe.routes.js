const router = require("express").Router();
const { verifyToken, isAdmin } = require("../middleware/jwt.middleware");
const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipe.controller");

router.get("/all", [verifyToken, isAdmin], getAllRecipes);
router.get("/:id", [verifyToken, isAdmin], getRecipeById);
router.delete("/:id", [verifyToken, isAdmin], deleteRecipe);

router.post("/admin/create", [verifyToken, isAdmin], createRecipe);

module.exports = router;
