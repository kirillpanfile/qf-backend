const mongoose = require("mongoose")
const validation = require("../utils/langs.util")

const category = new mongoose.Schema(
    {
        lang: { type: String, required: true },
        value: { type: String, required: true },
    },
    { _id: false }
)

const CategoryScgema = new mongoose.Schema({
    category: [category],
})

module.exports = mongoose.model("Category", CategoryScgema)

validation.lang(["category"], CategoryScgema)
validation.empty(["category"], CategoryScgema)
