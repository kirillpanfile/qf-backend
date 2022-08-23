const mongoose = require("mongoose")
const langs = require("../configs/langs")
// multi language support
const IngredientSchema = new mongoose.Schema({
    name: [{ lang: { type: String, required: true }, value: { type: String, required: true } }],
})

module.exports = mongoose.model("Ingredient", IngredientSchema)

//validation for the language field
// IngredientSchema.path("name").validate(function (lang) {
//     return langs.includes(lang)
// }, "Invalid language")
