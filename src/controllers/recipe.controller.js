const Recipe = require("../models/recipe.model");
const User = require("../models/user.model");
const jwtSecret = require("../config/auth.config").jwtSecret;
const jwt = require("jsonwebtoken");

const langValidation = (lang) =>
  lang === "en" || lang === "ru" || lang === "ro";

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({}).populate("user");
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ msg: "Recipe not found" });
    }

    const { user, ...others } = recipe._doc;
    const newUser = await User.findById(user);
    const { password, ...userData } = newUser._doc;
    const newRecipe = {
      ...others,
      user: userData,
    };

    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(500).json(err);
  }
};
const createRecipe = async (req, res) => {
  try {
    const { title, description, steps, ingredients, image, lang, time, hot } =
      req.body;
    if (!langValidation(lang)) {
      return res.status(400).json({ msg: "Invalid language" });
    }
    const decoded = jwt.verify(req.headers["x-access-token"], jwtSecret);
    if (!decoded) {
      return res.status(401).json({ msg: "Token validation error" });
    }
    const user = await User.findById(decoded.user._id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const newRecipe = new Recipe({
      user: user._id,
      image,
      approved: "pending",
      langs: {
        [lang]: {
          title,
          description,
          steps,
          ingredients,
        },
      },
      time,
      hot,
    });

    newRecipe.save((err, recipe) => {
      if (err) return res.status(500).json(err);
      res.status(201).json(recipe);
    });

    //save recipe to user
    user.recipes.push(newRecipe._id);
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};
const updateRecipe = async (req, res) => {
  const { recipe } = req.body;
  if (!oldRecipe) {
    return res.status(400).json({ msg: "Recipe Not found" });
  }
  try {
    await Recipe.findByIdAndUpdate(recipe._id, recipe);
  } catch (err) {
    res.status(500).json(err);
  }
};
const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ msg: "Recipe not found" });
    }
    await recipe.remove();
    res.status(200).json({ msg: "Recipe deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
