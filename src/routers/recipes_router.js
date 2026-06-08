
const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipes_controller");
const validate = require("../middlewares/validate");
const { rulesCreateRecipe, rulesUpdateRecipe} = require("../validators/recipes_validator")



router.get("/", recipesController.getRecipes);
router.get("/:id", recipesController.getRecipe);

router.post("/", rulesCreateRecipe, validate, recipesController.createRecipe);

router.put("/:id", rulesUpdateRecipe, validate, recipesController.updateRecipe);

router.delete("/:id", recipesController.deleteRecipe);


module.exports = router;