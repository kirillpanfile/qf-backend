const mongoose = require("mongoose");

const ingredientCategorySchema = new mongoose.Schema({
  lang: {
    en: {
      name: {
        type: String,
        required: true,
      },
    },
    ru: {
      name: {
        type: String,
        required: true,
      },
    },
    ro: {
      name: {
        type: String,
        required: true,
      },
    },
  },
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
    },
  ],
});

module.exports = mongoose.model("IngredientCategory", ingredientCategorySchema);
