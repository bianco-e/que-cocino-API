const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");
const Ingredient = require("../models/ingredient");

router.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send("Hi!");
});

router.get("/recipes/random", (req, res) => {
  Recipe.aggregate([{ $sample: { size: 1 } }], (err, doc) => {
    if (err) return console.log(err);
    res.send(doc);
  });
});

router.post("/recipes/filter", (req, res) => {
  const { having, notHaving } = req.body;
  Recipe.findOne(
    {
      "ingredients.name": { $in: having, $nin: notHaving },
    },
    (err, doc) => {
      if (err) return console.log(err);
      res.send(doc || { nomatches: true });
    }
  );
});

router.post("/recipes/add", (req, res) => {
  const recipe = new Recipe(req.body);
  recipe.save((err, addedRecipe) => {
    if (err) return console.log(err);
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send("Added" + addedRecipe);
    res.end();
  });
});

router.post("/ingredients/add", (req, res) => {
  const ingredient = new Ingredient(req.body);
  ingredient.save((err, addedIngredient) => {
    if (err) return console.log(err);
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send("Added" + addedIngredient);
    res.end();
  });
});

router.get("/ingredients/contains/:keyword", (req, res) => {
  const { keyword } = req.params;
  Ingredient.find({ name: { $regex: keyword, $options: "i" } }, { _id: 0 })
    .limit(5)
    .exec((err, docs) => {
      if (err) return console.log(err);
      res.send(docs.map((ingredient) => ingredient.name));
    });
});

module.exports = router;
