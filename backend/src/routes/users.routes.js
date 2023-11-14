import { Router } from "express";
import { createUser, getUsers, deleteUser, updateUser } from "../controllers/user.controllers.js";
import { check } from "express-validator"
import { emailExists, existsUserById } from "../helpers/db-validators.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { valiteJWT } from "../middlewares/validate-jwt.js";
import { hasRole } from "../middlewares/validate-roles.js";

const router = Router();

router.post("/", [
    check("name", "The name is required").not().isEmpty(),
    check("password", "The password must be more than 6 characters").isLength({ min: 6, max: 15 }),
    check("email", "The email is required").isEmail(),
    check("email").custom(emailExists),
    validateFields
], createUser)

router.get("/", getUsers)

router.put("/:id", [
    check("id", "The id is not valid").isMongoId(),
    check("id").custom((id) => existsUserById(id)),
    validateFields
], updateUser)

router.delete("/:id",
    valiteJWT,
    hasRole("ADMIN_ROLE"),
    [
        check("id", "The id is not valid").isMongoId(),
        check("id").custom((id) => existsUserById(id)),
        validateFields
    ], deleteUser)


export default router;