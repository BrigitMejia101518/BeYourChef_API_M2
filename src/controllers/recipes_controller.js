
const recipeModel = require("../models/recipes_model");

async function getRecipes(req, res) {
    try {
        const recipes = await recipeModel.getAll();
        return res.status(200).json(recipes);
    } catch (error) {
        return res.status(500).json({ error: "Error interno del servidor al listar" });
    }
}

async function getRecipe(req, res) {
    try {
        const id = req.params.id;
        const recipe = await recipeModel.getById(id);

        if (!recipe) {
            return res.status(404).json({ error: "Receta no encontrada" });
        }
        return res.json(recipe);
    } catch (error) {
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}

async function createRecipe(req, res) {
    const { title, ingredients, preparation } = req.body;

    if (!title || !ingredients || !preparation) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    try {
        const newDoc = await recipeModel.create({ title, ingredients, preparation });
        return res.status(201).json(newDoc);
    } catch (error) {
        return res.status(500).json({ error: "Error interno al guardar la receta" });
    }
}

async function updateRecipe(req, res) {
    const id = req.params.id;
    const { title, ingredients, preparation } = req.body;

    if (!title || !ingredients || !preparation) {
        return res.status(400).json({ error: "Faltan campos obligatorios para PUT" });
    }

    try {
        
        const updated = await recipeModel.update(id, { title, ingredients, preparation });
        if (!updated) {
            return res.status(404).json({ error: "Receta no encontrada para reemplazar" });
        }
        return res.json(updated);
    } catch (error) {
        return res.status(500).json({ error: "Error interno al actualizar" });
    }
}

async function deleteRecipe(req, res) {
    const id = req.params.id;

    try {
        // LLAMADA CORRECTA: Usamos el objeto 'recipeModel' y su método 'deleteRecipe'
        const deleted = await recipeModel.deleteRecipe(id);
        
        if (!deleted) {
            return res.status(404).json({ error: "Receta no encontrada para borrar" });
        }
        
        return res.json({ mensaje: "Receta eliminada correctamente", deleted });
    } catch (error) {
        console.error("Error real en la consola:", error); // Esto te dirá en la terminal si Mongoose protesta por otra cosa
        return res.status(500).json({ error: "Error interno al borrar" });
    }
}

module.exports = {
    getRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
};