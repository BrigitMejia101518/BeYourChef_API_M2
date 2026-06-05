
const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipes_controller");
const { body, validationResult } = require("express-validator");


router.get("/", recipesController.getRecipes);
router.get("/:id", recipesController.getRecipe);



router.post(
    "/", 
    body("title").notEmpty().withMessage("El título de la receta es obligatorio"), 
    (req, res) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
        return res.status(422).json({ errores: errores.array() });
        }
        recipesController.createRecipe(req, res);
    }
);

router.put("/:id", recipesController.updateRecipe);



router.delete("/:id", recipesController.deleteRecipe);

module.exports = router;