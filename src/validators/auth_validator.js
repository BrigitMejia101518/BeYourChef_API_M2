const { body } = require("express-validator");

const rulesRegister = [
    body("email").isEmail().withMessage("El email no es válido").normalizeEmail(),
    body("password")
        .isLength({ min: 6 })
        .withMessage("La contraseña debe tener al menos 6 caracteres"),
];

const rulesLogin = [
    body("email")
    .isEmail().withMessage("Email no valido")
    .normalizeEmail(),

    body("password")
    .notEmpty().withMessage("La contraseña es obligatoria"),
]

module.exports = {rulesRegister, rulesLogin};


