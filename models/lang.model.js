const mongoose = require("mongoose");

const langSchema = new mongoose.Schema({
  lang: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    maxlength: 30,
  },
  description: {
    type: String,

    maxlength: 120,
  },
  steps: {
    type: [String],
  },
  ingredients: {
    type: [String],
    ref: "Ingredient",
  },
});

module.exports = mongoose.model("Lang", langSchema);
