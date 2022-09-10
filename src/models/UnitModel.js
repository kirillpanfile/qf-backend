const mongoose = require("mongoose")
const validation = require("../utils/langs.util")

const unit = new mongoose.Schema(
    {
        lang: { type: String, required: true },
        value: { type: String, required: true },
    },
    { _id: false }
)

const unitSchema = new mongoose.Schema({
    unit: [unit],
})

module.exports = mongoose.model("Unit", unitSchema)

validation.lang(["unit"], unitSchema)
validation.empty(["unit"], unitSchema)
