const mongoose = require("mongoose")

const RecipeSchema = new mongoose.Schema({
    lang: { type: String, required: true },
    value: { type: [String], required: true },
})

module.exports = mongoose.model("Recipe", RecipeSchema)
