import mongoose from "mongoose";


const recipeSchema = new mongoose.Schema({
    title: String,
    ingredients: [String],
    preparation: String
}, { timestamps: true });


export const Recipe = mongoose.model("Recipe", recipeSchema);


export async function getAll() {
  return await Recipe.find();
}

export async function getById(id) {
  return await Recipe.findById(id);
}

export async function create(newRecipeData) {
  const newRecipe = new Recipe(newRecipeData);
  return await newRecipe.save();
}

export async function update(id, updatedRecipeData) {
  return await Recipe.findByIdAndUpdate(id, updatedRecipeData, {
    new: true,
    runValidators: true 
  });
}

export async function deleteRecipe(id) {
  return await Recipe.findByIdAndDelete(id);
};