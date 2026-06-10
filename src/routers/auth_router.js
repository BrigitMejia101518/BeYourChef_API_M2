import express from "express";
const router = express.Router();
import * as authController from "../controllers/auth_controller.js";
import { rulesRegister, rulesLogin } from "../validators/auth_validator.js";
import validate from "../middlewares/validate.js";


router.post("/register", rulesRegister, validate, authController.register);

router.post("/login", rulesLogin, validate, authController.Login);


export default router;