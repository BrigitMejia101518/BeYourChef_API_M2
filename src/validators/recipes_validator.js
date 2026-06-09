import { body, param } from "express-validator";

export const rulesCreateRecipe = [
    body("title")
        .notEmpty().withMessage("El título de la receta es obligatorio")
        .isLength({ min: 3 }).withMessage("El título debe tener al menos 3 caracteres"),
    
    body("ingredients")
        .isArray({ min: 1 }).withMessage("Debes incluir al menos un ingrediente en un formato de lista (array)"),
        
    body("instructions")
        .notEmpty().withMessage("Las instrucciones de la receta son obligatorias")
];


export const rulesUpdateRecipe = [
    param("id").isMongoId().withMessage("El id no es válido"),
    body("title")
    .optional()
    .notEmpty()
    .withMessage("El nombre no puede ir vacío")
    .isLength({ min: 3 })
    .withMessage("Mínimo 3 caracteres"),

    body("ingredients")
    .optional()
    .isArray({ min: 1 }).withMessage("Debes incluir al menos un ingrediente en formato array"),

    body("preparation")
        .optional()
        .notEmpty().withMessage("La preparación no puede ir vacía")
];



