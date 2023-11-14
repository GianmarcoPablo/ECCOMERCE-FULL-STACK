import { Router } from "express";
import { createCategory, getCategories, getCategory, deleteCategory, updateCategory } from "../controllers/category.controller.js";
import { valiteJWT } from "../middlewares/validate-jwt.js";
import { isAdminRole } from "../middlewares/validate-roles.js";
import { check } from "express-validator"
import { existsCategory } from "../helpers/db-validators.js";
import { validateFields } from "../middlewares/validate-fields.js";


const router = Router();

router.post("/", [
    valiteJWT,
    check("name", "Name is required").not().isEmpty(),
    validateFields
], createCategory)

router.get("/", getCategories)

router.get("/:id", [
    check("id", "Id is not valid").isMongoId(),
    check("id").custom(existsCategory),
    validateFields
], getCategory)

router.put("/:id", [
    valiteJWT,
    check("id", "Id is not valid").isMongoId(),
    check("id").custom(existsCategory),
    validateFields
], updateCategory)

router.delete("/:id", [
    valiteJWT,
    isAdminRole,
    check("id", "Id is not valid").isMongoId(),
    check("id").custom(existsCategory),
    validateFields
], deleteCategory)

router.put("/:id", [], updateCategory)

export default router;