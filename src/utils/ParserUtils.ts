import { JapaneseParser } from "nlcst-parse-japanese";
import { ParsedOutput } from "../types";
import { EXCLUDED_POS } from "../config/constants";

const japaneseParser = new JapaneseParser();

export const parseJapaneseText = async (
    text: string
): Promise<ParsedOutput> => {
    await japaneseParser.ready();
    return japaneseParser.parse(text);
};

// check if the word is a grammatical word
// if it is return false
export const isValidWord = (
    pos: string | undefined,
    value: string | undefined
): boolean => {
    return !!pos && !!value && !EXCLUDED_POS.has(pos) && value !== "、";
};
