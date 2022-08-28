const mongoose = require("mongoose")

const TaslSchema = new mongoose.Schema(
    {
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
            required: true,
            enum: ["Low", "Normal", "High", "Urgent"],
            default: "Low",
        },
        status: {
            type: String,
            required: true,
            enum: ["Open", "In Progress", "In Review", "Closed"],
            default: "Open",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Task", TaslSchema)
