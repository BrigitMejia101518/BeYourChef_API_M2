import { body } from "express-validator";

export const rulesRegister = [
    body("email").isEmail().withMessage("El email no es válido").normalizeEmail(),
    body("password")
        .isLength({ min: 6 })
        .withMessage("La contraseña debe tener al menos 6 caracteres"),
];

export const rulesLogin = [
    body("email")
    .isEmail().withMessage("Email no valido")
    .normalizeEmail(),

    body("password")
    .notEmpty().withMessage("La contraseña es obligatoria"),
];




