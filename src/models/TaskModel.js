const mongoose = require("mongoose")

const TaslSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    flag: {
        type: String,
        enum: ["Low", "Normal", "High", "Urgent"],
        default: "Low",
    },
    status: {
        type: String,
        enum: ["To Do", "In Progress", "In Review", "Done"],
        default: "Open",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
})

module.exports = mongoose.model("Task", TaslSchema)
