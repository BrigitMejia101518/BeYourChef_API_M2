import express from "express";
const router = express.Router();
import * as authController from "../controllers/auth_controller.js";
import { rulesRegister, rulesLogin } from "../validators/auth_validator.js";
import validate from "../middlewares/validate.js";
import verifyToken from "../middlewares/verifyToken.js";


router.post("/register", rulesRegister, validate, authController.register);

router.post("/login", rulesLogin, validate, authController.login);

router.get("/profile", verifyToken, validate, authController.getProfile);

router.post("/favorite/:recipeId", verifyToken, authController.addFavorite);

export default router;