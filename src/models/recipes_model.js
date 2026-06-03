
const fs = require("node:fs").promises;
const path = require("node:path");

const FILE_PATH = path.join(__dirname, "..", "..", "recipes.json");



async function fileReader() {

    try {

        const content = await fs.readFile(FILE_PATH, "utf-8");
        return JSON.parse(content);

    } catch (error) {

        if (error.code === "ENOENT") {
            console.log(":warning: El archivo recipes.json no existe.");

            await fs.writeFile(FILE_PATH, "[]", "utf-8");
            return []; 
        }
        throw error; 
    }
}


async function filewrite(Recipes) {

recipes.forEach((recipe, index) => {
recipe.id = index + 1;
});


const jsonText = JSON.stringify(recipes, null, 2);


await fs.writeFile(FILE_PATH, jsonText, "utf-8");
}


async function getAll() {
    return await fileReader();
    
}

async function getById(id) {
    const recipes = await fileReader();
    return recipes.find((r) => r.id === id) || null;
}

async function create(newRecipeData) {
    const recipes = await fileReader();
    const nextId = recipes.length + 1;

    const newRecipe = { id: nextId, ...newRecipeData };
    recipes.push(newRecipe);

    await fileWriter(recipes);
    return newRecipe;
}

async function update(id, updatedRecipeData) {
    const recipes = await fileReader();
    const index = recipes.findIndex((m) => m.id === id);

    if (index === -1) return null;

    recipes[index] = { id, ...updatedRecipeData };
    await fileWriter(recipes);
    return recipes[index];
}

async function deleteRecipe(id) {
    const recipes = await fileReader();
    const index = recipes.findIndex((m) => m.id === id);

    if (index === -1) return null;

    const [deletedRecipe] = recipes.splice(index, 1);
    await fileWriter(recipes);
    return deletedRecipe;
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteRecipe
};

