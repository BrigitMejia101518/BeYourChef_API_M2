const mongoose = require("mongoose");
const recipeSchema = new mongoose.Schema({
    title: String,
    ingredients: String,
    preparation: String
}, { timestamps: true });


const Recipe = mongoose.model("Recipe", recipeSchema);


async function getAll() {
  return await Recipe.find();
}

async function getById(id) {
  return await Recipe.findById(id);
}

async function create(newRecipeData) {
  const newRecipe = new Recipe(newRecipeData);
  return await newRecipe.save();
}

async function update(id, updatedRecipeData) {
  return await Recipe.findByIdAndUpdate(id, updatedRecipeData, {
    new: true,
    runValidators: true 
  });
}

async function deleteRecipe(id) {
  return await Recipe.findByIdAndDelete(id);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteRecipe,
};