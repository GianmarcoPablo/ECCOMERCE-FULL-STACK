import { request, response } from "express"
import User from "../models/Users.js";
import bcrypt from "bcrypt"

const createUser = async (req = request, res = response) => {
    const { name, email, password, role } = req.body;
    try {
        const user = new User({ name, email, password, role });

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();
        res.json({ user })
    } catch (error) {
        console.log(error);
        res.status(500).json({
              msg: "Talk to the administrator"
        })
    }
}

export {
    createUser
}

