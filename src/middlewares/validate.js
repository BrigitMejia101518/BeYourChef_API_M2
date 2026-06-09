import { validationResult } from "express-validator";

const validate = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(422).json({ errores: errores.array() });
    }
    next();
};

export default validate;