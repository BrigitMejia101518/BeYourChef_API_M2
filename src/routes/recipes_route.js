const express = require("express");
const routes = express.routes();
const recipesController = require("../controllers/recipes_controller");

router.get("/", recipesController.getRecipes);
router.get("/:id", recipesController.getRecipe);
router.post("/", recipesController.createRecipe);
router.put("/:id", recipesController.updateRecipe);
router.delete("/:id", recipesController.deleteRecipe);

module.exports = router;