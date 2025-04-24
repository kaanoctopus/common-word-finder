import { body } from "express-validator";

interface WordFrequency {
    word: string;
    frequency: number;
}

export const addEntriesToListValidator = [
    body("*")
        .isArray()
        .withMessage("Input must be an array")
        .custom((array) => {
            return (array as Array<WordFrequency>).every((item: WordFrequency) => {
                return (
                    typeof item.word === "string" &&
                    typeof item.frequency === "number"
                );
            });
        })
        .withMessage(
            "Each item must have a word (string) and frequency (number)"
        ),
];
