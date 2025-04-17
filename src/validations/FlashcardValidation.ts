import { body } from "express-validator";

export const addWordFlashcardValidator = [
    body("word").isString().withMessage("Word is required"),
    body("meanings").isArray().withMessage("Meanings are required"),
];

export const addWordsBulkValidator = [
    body("words").isArray().withMessage("Words are required"),
    body("meanings").isArray().withMessage("Meanings are required"),
];

export const reviewFlashcardValidator = [
    body("word").isString().withMessage("Word is required"),
    body("answer").isBoolean().withMessage("Answer is required"),
];
