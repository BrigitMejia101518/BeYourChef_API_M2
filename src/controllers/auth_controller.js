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
module.exports = { register };