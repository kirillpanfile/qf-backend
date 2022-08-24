const mongoose = require("mongoose")

const ingredientSchema = new mongoose.Schema(
    {
        lang: { type: String, required: true },
        value: { type: String, required: true },
    },
    { _id: false }
)

const IngredientSchema = new mongoose.Schema({
    ingredient: [ingredientSchema],
})

module.exports = mongoose.model("Ingredient", IngredientSchema)
