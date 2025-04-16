import { body } from "express-validator";

export const registerValidator = [
    body("username").isString().withMessage("Username is required"),
    body("password").isString().withMessage("Password is required"),
    body("email").isEmail().withMessage("Invalid email format"),
];

export const loginValidator = [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isString().withMessage("Password is required"),
];
