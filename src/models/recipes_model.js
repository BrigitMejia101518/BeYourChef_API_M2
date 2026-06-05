const mongoose = require("mongoose");
const recipeSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Al ponerlo aquí, nacerá primero
    title: String,
    ingredients: String,
    preparation: String
}, { timestamps: true });

// Creamos el modelo. Mongo creará la colección automáticamente en plural: "recipes"
const Recipe = mongoose.model("Recipe", recipeSchema);

// FUNCIONES DE NEGOCIO (Hacen exactamente lo mismo, pero usando el modelo Recipe)
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