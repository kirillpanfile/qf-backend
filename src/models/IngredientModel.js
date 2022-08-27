const mongoose = require("mongoose")
const validation = require("../utils/langs.util")

const ingredient = new mongoose.Schema(
    {
        lang: { type: String, required: true },
        value: { type: String, required: true },
    },
    { _id: false }
)

const IngredientSchema = new mongoose.Schema({
    ingredient: [ingredient],
})

module.exports = mongoose.model("Ingredient", IngredientSchema)

validation.lang(["ingredient"], IngredientSchema)
validation.empty(["ingredient"], IngredientSchema)
