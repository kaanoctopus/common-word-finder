import fs from "fs";
import path from "path";

const DICTIONARY_PATH = path.join(
    __dirname,
    "../../assets/jmdict/optimized-dictionary.json"
);

type OptimizedDictionary = Record<string, string[] | null>;

const meaningCache = new Map<string, string[] | null>();

/**
 * Loads the optimized dictionary into memory
 * Throws error if dictionary file doesn't exist
 */
const loadDictionary = (): OptimizedDictionary => {
    if (!fs.existsSync(DICTIONARY_PATH)) {
        throw new Error(
            `Optimized dictionary not found at ${DICTIONARY_PATH}. ` +
                `Please run the dictionary optimization script first.`
        );
    }

    const rawData = fs.readFileSync(DICTIONARY_PATH, "utf-8");
    return JSON.parse(rawData) as OptimizedDictionary;
};

let dictionary: OptimizedDictionary = loadDictionary();

/**
 * Gets meanings for a word from the pre-processed dictionary
 * @param input The word to look up
 * @returns Array of meanings or null if not found
 */
export const getMeanings = (input: string): string[] | null => {
    if (meaningCache.has(input)) {
        return meaningCache.get(input)!;
    }

    if (!dictionary) {
        dictionary = loadDictionary();
    }

    const meanings = dictionary[input] ?? null;

    meaningCache.set(input, meanings);

    return meanings;
};
