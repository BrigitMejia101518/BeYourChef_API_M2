import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
        return res.status(401).json({ mensaje: "No hay token" });
        }

        const token = authHeader.split(" ")[1];

        const dates = jwt.verify(token, process.env.JWT_SECRET);

        req.user = dates;

        next();
    } catch (error) {
        return res.status(401).json({ mensaje: "Token inválido o expirado" });
    }
};