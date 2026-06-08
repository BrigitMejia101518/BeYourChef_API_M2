const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");
const {rulesRegister, rulesLogin } = require("../validators/auth_validator");
const validate = require("../middlewares/validate");


router.post("/register", rulesRegister, validate, authController.register);

router.post("/login", rulesLogin, validate, authController.Login);


module.exports = router;