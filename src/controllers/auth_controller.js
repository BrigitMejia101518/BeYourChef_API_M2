import bcrypt from "bcryptjs";
import User from "../models/user_model.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try{
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });
        if(userExist) {
            return res.status(409).json({ mensaje: "El email ya esta registrado"});
        }

        const hash = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hash });

        res.status(201).json({
            id: newUser._id,
            email: newUser.email,
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el registro" });
    }

};

export const Login = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ mensaje: "Credenciales incorrectas"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ mensaje: "Credenciales incorrectas"});
        }

        const token = jwt.sign({ id: User._id }, process.env.    JWT_SECRET, {
        expiresIn: "1h",
        });

        res.status(200).json({
            mensaje: "Login correcto", 
            token,
        });
    }catch (error) {
        res.status(500). json({ mensaje: "Error en el Login"});
    }
};

export const quienSoy = (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
        return res.status(401).json({ mensaje: "No hay token" });
        }

        const token = authHeader.split(" ")[1]; 

        const user = jwt.verify(token, process.env.JWT_SECRET);

        res.status(200).json({ mensaje: "Token válido", id: user.id });
    } catch (error) {
        res.status(401).json({ mensaje: "Token inválido o expirado" });
    }
};
