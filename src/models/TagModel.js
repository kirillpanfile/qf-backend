const mongoose = require("mongoose")
const validation = require("../utils/langs.util")

const tag = new mongoose.Schema(
    {
        lang: { type: String, required: true },
        value: { type: String, required: true },
    },
    { _id: false }
)

const TagSchema = new mongoose.Schema({
    tag: [tag],
})

module.exports = mongoose.model("Tag", TagSchema)

validation.lang(["tag"], TagSchema)
validation.empty(["tag"], TagSchema)
