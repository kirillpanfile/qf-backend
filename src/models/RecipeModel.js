const mongoose = require("mongoose")
const validation = require("../utils/langs.util")

const titleSchema = new mongoose.Schema(
    { lang: { type: String, required: true }, value: { type: String, required: true } },
    { _id: false }
)

const descriptionSchema = new mongoose.Schema(
    { lang: { type: String, required: true }, value: { type: String, required: true } },
    { _id: false }
)

const stepSchema = new mongoose.Schema(
    { lang: { type: String, required: true }, value: { type: [String], required: true } },
    { _id: false }
)

const ingredientSchema = new mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Ingredient", required: true },
        quantity: { type: Number, required: true },
        unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
    },
    { _id: false }
)

const RecipeSchema = new mongoose.Schema(
    {
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        title: [titleSchema],
        description: [descriptionSchema],
        steps: [stepSchema],
        image: { type: String, required: true },
        tags: { type: [String], ref: "Tag" },
        ingredients: [ingredientSchema],
        categories: { type: [String], ref: "Category", required: true },
        approved: { type: String, required: true, default: "pending", enum: ["pending", "approved", "rejected"] },
        time: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
)

//validate the language field
validation.lang(["title", "description", "steps"], RecipeSchema)

//validate the empty fields
validation.empty(["title", "description", "ingredients", "steps", "image", "tags", "categories"], RecipeSchema)

//validate ingredients

module.exports = mongoose.model("Recipe", RecipeSchema)
