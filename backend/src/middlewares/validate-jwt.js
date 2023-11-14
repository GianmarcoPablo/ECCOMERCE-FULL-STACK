import jwt from "jsonwebtoken"
import User from "../models/Users.js";

const valiteJWT = async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
            req.user = await User.findById(decoded.uid).select("-password")
            return next()
        } catch (err) {
            const error = new Error("Token not valid")
            return res.status(403).json({ error: error.message })
        }
    }
    if (!token) {
        const error = new Error("Token not found")
        return res.status(403).json({ error: error.message })
    }
    next()
}

export {
    valiteJWT
}