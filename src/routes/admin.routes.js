/**
 * This file is used to create routes allowed only for admin users
 */

const router = require("express").Router();

const {
  verifyToken,
  isAdmin,
  signInAdmin,
} = require("../middleware/jwt.middleware");

const {
  getAllUsers,
  getPages,
  deleteMultipleUsers,
  deleteUser,
  searchUsers,
} = require("../controllers/admin.controller");

const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  deleteRecipe,
} = require("../controllers/recipe.controller");

const { signIn } = require("../controllers/auth.controller");

// Sign in admin
router.post("/signin", [signInAdmin], signIn);

// get all users
router.get("/users", [verifyToken, isAdmin], getAllUsers);

// get total pages
router.get("/pages", [verifyToken, isAdmin], getPages);

// delete multiple users
router.post("/deleteMultiple", [verifyToken, isAdmin], deleteMultipleUsers);

// delete user
router.delete("/delete/:id", [verifyToken, isAdmin], deleteUser);

// search users
router.get("/search/:name", [verifyToken, isAdmin], searchUsers);

//get all recipes
router.get("/recipes", [verifyToken, isAdmin], getAllRecipes);

//get recipe by id
router.get("/recipe/:id", [verifyToken, isAdmin], getRecipeById);

//create recipe
router.post("/recipe/create", [verifyToken], createRecipe);

//delete recipe by id
router.delete("/recipe/:id", [verifyToken, isAdmin], deleteRecipe);

// export module
module.exports = router;
