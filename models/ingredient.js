const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema(
  {
    name: String,
  },
  { collection: "ingredients", versionKey: false }
);

module.exports = mongoose.model("Ingredient", ingredientSchema);
