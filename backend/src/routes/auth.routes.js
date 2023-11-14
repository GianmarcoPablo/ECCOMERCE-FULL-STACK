import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields.js";
import { valiteJWT } from "../middlewares/validate-jwt.js";
const router = Router();

router.post("/login", [
    check("email", "The email is required").isEmail(),
    check("password", "The password is required").not().isEmpty(),
    check("password", "The password must be more than 6 characters").isLength({ min: 6, max: 15 }),
    validateFields
], login)

router.get("/profile", valiteJWT, (req, res) => {
    const { user } = req
    res.json(user)  
})

export default router;