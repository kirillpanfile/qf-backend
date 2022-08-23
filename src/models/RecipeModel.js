const mongoose = require("mongoose")
const langs = require("../configs/langs")

const RecipeSchema = new mongoose.Schema(
    {
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        title: [{ lang: { type: String, required: true }, value: { type: String, required: true } }],
        description: [{ lang: { type: String, required: true }, value: { type: String, required: true } }],
        ingredients: { type: [String], required: true, ref: "Ingredient" },
        steps: [{ lang: { type: String, required: true }, value: [{ type: String, required: true }] }],
        image: { type: String, required: true },
        tags: { type: [String], ref: "Tag" },
        ingredients: { type: [mongoose.Schema.Types.ObjectId], required: true, ref: "Ingredient" },
        categories: { type: [String], ref: "Category", required: true },
        time: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Recipe", RecipeSchema)

//validate the language field

const paths = ["title", "description", "steps"]

const langValidation = (item) => {
    if (item.length == 0) return false
    return item.every((e) => langs.includes(e.lang))
}

paths.forEach((path) => {
    RecipeSchema.path(path).validate(function (lang) {
        return langValidation(lang)
    }, `${path} must be one of ${langs}`)
})
