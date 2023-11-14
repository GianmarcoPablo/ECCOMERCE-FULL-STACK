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

const getUsers = async (req, res) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    try {
        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(from))
                .limit(Number(limit))
        ])

        res.json({
            total,
            users
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Talk to the administrator"
        })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { _id, password, email, ...rest } = req.body;

    if (password) {
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest, { new: true });
    res.json({ user })
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { state: false });
    const userAuth = req.userAuth;
    res.json({
        user,
        userAuth
    })
}


export {
    createUser,
    getUsers,
    deleteUser,
    updateUser
}

