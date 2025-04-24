import fs from "fs";
import path from "path";

const DICTIONARY_PATH = path.join(
    __dirname,
    "../../assets/jmdict/optimized-dictionary-new.json"
);

type DictionaryEntry = {
    m: string[];
    r: string;
};

type OptimizedDictionary = Record<string, DictionaryEntry>;

const entryCache = new Map<string, DictionaryEntry | null>();

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
 * Gets dictionary entry (meanings + reading) for a word
 * @param input The word to look up
 * @returns Entry or null if not found
 */
export const getEntry = (input: string): DictionaryEntry | null => {
    if (entryCache.has(input)) {
        return entryCache.get(input)!;
    }

    if (!dictionary) {
        dictionary = loadDictionary();
    }

    const entry = dictionary[input] ?? null;

    entryCache.set(input, entry);

    return entry;
};
