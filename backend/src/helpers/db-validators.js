import User from "../models/Users.js";
import Role from "../models/Role.js";

const emailExists = async (email = "") => {
    const exists = await User.findOne({ email });
    if (exists) {
        throw new Error(`The email ${email} already registered in the database`);
    }
}

const isRolValid  = async (role = "") => {
    const valids = ["ADMIN_ROLE", "USER_ROLE"];
    if (!valids.includes(role)) {
        throw new Error(`The role ${role} is not valid`);
    }
}

export {
    emailExists,
    isRolValid 
}

