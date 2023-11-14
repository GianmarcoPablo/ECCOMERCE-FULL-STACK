import User from "../models/Users.js";
import Role from "../models/Role.js";
import Category from "../models/Category.js";

const emailExists = async (email = "") => {
    const exists = await User.findOne({ email });
    if (exists) {
        throw new Error(`The email ${email} already registered in the database`);
    }
    return
}



const existsUserById = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error(`The id ${id} not exists`);
    }
    return
}

const existsCategory = async (id) => {
    const category = await Category.findById(id);
    if (!category) {
        throw new Error(`The id ${id} not exists`);
    }
    return
}

export {
    emailExists,
    existsUserById,
    existsCategory
}

