const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    langs: {
      type: mongoose.Schema.Types.Mixed,
      ref: "Lang",
    },
    likes: {
      type: [String],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    approved: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    image: {
      type: String,
      required: true,
    },
    hot: {
      type: Boolean,
      default: false,
    },
    time: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
