const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    name: String,
    description: {
      time: Number,
      mode: {
        oven: Boolean,
        pan: Boolean,
        microwaves: Boolean,
      },
    },
    image: String,
    ingredients: Object,
    steps: Array,
  },
  { collection: "recipes", versionKey: false }
);

module.exports = mongoose.model("Recipe", recipeSchema);
