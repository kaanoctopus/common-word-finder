import { body } from "express-validator";

export const addWordFlashcardValidator = [
    body("token").isString().withMessage("Token is required"),
    body("word").isString().withMessage("Word is required"),
    body("meanings").isArray().withMessage("Meanings are required"),
];

export const addWordsBulkValidator = [
    body("token").isString().withMessage("Token is required"),
    body("words").isArray().withMessage("Words are required"),
    body("meanings").isArray().withMessage("Meanings are required"),
    body("meanings.*").isString().withMessage("Each meaning must be a string"),
];

export const reviewFlashcardValidator = [
    body("token").isString().withMessage("Token is required"),
    body("word").isString().withMessage("Word is required"),
    body("answer").isBoolean().withMessage("Answer is required"),
];
