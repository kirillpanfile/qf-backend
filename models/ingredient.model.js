const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  lang: {
    en: {
      name: {
        type: String,
        required: true,
        maxlength: 100,
      },
    },
  },
});
