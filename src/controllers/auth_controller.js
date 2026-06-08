const bcrypt = require("bcryptjs");
const User = require("../models/user_model");

const register = async (req, res) => {
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

const Login = async (req, res) => {
    try{
        const { email, password } = req.body;

        const User = await User.findOne({ email });
        if (!User) {
            return res.status(401).json({ mensaje: "Credenciales incorrectas"});
        }
        const isMatch = await bcrypt.compare(password, User.password);
        if (!isMatch) {
            return res.status(401).json({ mensaje: "Credenciales incorrectas"});
        }

        res.status(200).json({
            mensaje: "Login correcto", 
            id: User._id,
            email: User.email,
        });
    }catch (error) {
        res.status(500). json({ mensaje: "Error en el Login"});
    }
};


module.exports = { register, Login };