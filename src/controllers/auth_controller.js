import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user_model.js";



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

export const login = async (req, res) => {
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

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: "1h"});

        res.status(200).json({
            mensaje: "Login correcto", 
            token,
        });
    }catch (error) {
        res.status(500). json({ mensaje: "Error en el Login"});
    }
};

export const getProfile = async (req, res) => {
    try {
        console.log(req.user);
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener el perfil" });
    }
};