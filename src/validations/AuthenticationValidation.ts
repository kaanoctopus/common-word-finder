import { body } from "express-validator";

export const registerValidator = [
    body("username").trim().isString().withMessage("Username is required"),
    body("password").isString().withMessage("Password is required"),
    body("email").trim().isEmail().withMessage("Invalid email format"),
];

export const loginValidator = [
    body("email").trim().isEmail().withMessage("Invalid email format"),
    body("password").isString().withMessage("Password is required"),
];
