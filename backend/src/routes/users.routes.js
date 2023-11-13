import { Router } from "express";
import { createUser } from "../controllers/user.controllers.js";
import { check } from "express-validator"
import { emailExists, isRolValid } from "../helpers/db-validators.js";
import { validateFields } from "../middlewares/validate-fields.js";

const router = Router();

router.post("/", [
    check("name", "The name is required").not().isEmpty(),
    check("password", "The password must be more than 6 characters").isLength({ min: 6, max: 15 }),
    check("email", "The email is required").isEmail(),
    check("email").custom(emailExists),
    check("role").custom((role) => isRolValid(role)),
    validateFields
], createUser)


export default router;