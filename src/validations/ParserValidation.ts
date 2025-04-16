import { body } from "express-validator";

export const extractWordsValidator = [
    body("text").isString().withMessage("Text is required"),
];
