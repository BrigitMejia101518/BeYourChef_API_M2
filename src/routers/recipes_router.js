
import express from "express";
const router = express.Router();
import * as recipesController from "../controllers/recipes_controller.js";
import validate from "../middlewares/validate.js";
import { rulesCreateRecipe, rulesUpdateRecipe} from "../validators/recipes_validator.js";



router.get("/", recipesController.getRecipes);
router.get("/:id", recipesController.getRecipe);

router.post("/", rulesCreateRecipe, validate, recipesController.createRecipe);

router.put("/:id", rulesUpdateRecipe, validate, recipesController.updateRecipe);

router.delete("/:id", recipesController.deleteRecipe);


export default router;