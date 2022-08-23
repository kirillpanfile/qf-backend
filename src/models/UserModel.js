const mongoose = require("mongoose")

const defaultPicture = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        roles: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Role" }],
        recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
        favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
        picture: { type: String, required: true, default: defaultPicture },
    },
    { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)
