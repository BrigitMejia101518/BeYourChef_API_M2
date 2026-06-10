import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer " )) {
        return res.status(401).json({ mensaje: "No hay token" });
        }

        const token = authHeader.split(" ")[1];

        const date = jwt.verify(token, process.env.JWT_SECRET);

        req.user = date;

        next();
    } catch (error) {
        if(error.name === "TokenExpiredError"){
            return res.status(401).json({error: "Tu sesión ha caducado, vuelve a iniciar sesión"});
        }
        return res.status(401).json({ mensaje: "Token inválido" });
    }
};


export default verifyToken;