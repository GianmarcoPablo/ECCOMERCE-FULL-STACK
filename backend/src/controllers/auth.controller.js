import { generateJWT } from "../helpers/generate-jwt.js";
import User from "../models/Users.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: "User not exist"
            })
        }
        if (!user.state) {
            return res.status(400).json({
                msg: "User not exist"
            })
        }

        const validatePassword = bcrypt.compareSync(password, user.password);
        if (!validatePassword) {
            return res.status(400).json({
                msg: "Password incorrect"
            })
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Talk to the administrator"
        })
    }
}

export {
    login
}