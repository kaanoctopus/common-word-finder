import { body } from "express-validator";

export const addWordFlashcardValidator = [
    body("word").isString().withMessage("Word is required"),
    body("meanings").isArray().withMessage("Meanings are required"),
    body("reading").isString().withMessage("Reading is required")
];

export const addWordsBulkValidator = [
    body("words").isArray().withMessage("Words are required"),
    body("meanings").isArray().withMessage("Meanings are required"),
    body("readings").isArray().withMessage("Readings is required")
];

export const reviewFlashcardValidator = [
    body("word").isString().withMessage("Word is required"),
    body("answer").isBoolean().withMessage("Answer is required"),
];

export const updateReviewCountValidator = [
    body("count").isNumeric().withMessage("Word is required"),
];
