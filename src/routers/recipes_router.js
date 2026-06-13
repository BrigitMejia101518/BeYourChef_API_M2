
import express from "express";
const router = express.Router();
import * as recipesController from "../controllers/recipes_controller.js";
import validate from "../middlewares/validate.js";
import { rulesCreateRecipe, rulesUpdateRecipe} from "../validators/recipes_validator.js";
import verifyToken from "../middlewares/verifyToken.js";


router.get("/", recipesController.getRecipes);
router.get("/:id", recipesController.getRecipe);

router.post("/", verifyToken, rulesCreateRecipe, validate, recipesController.createRecipe);

router.put("/:id", verifyToken, rulesUpdateRecipe, validate, recipesController.updateRecipe);

router.delete("/:id", verifyToken, recipesController.deleteRecipe);


export default router;