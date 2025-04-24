import { DictionaryAdapter } from "./DictionaryAdapter";
import { WordFrequency, WordFrequencyWithEntry } from "../../types";

const BATCH_SIZE = 50;
const MAX_RETRIES = 2;

const dictionaryAdapter = new DictionaryAdapter();

export async function getEntryWithRetry(
    word: string,
    frequency: number,
    attempt = 1
): Promise<WordFrequencyWithEntry> {
    try {
        const entry = await dictionaryAdapter.getEntry(word);
        return entry ?
        { word, frequency, meanings: entry?.m, reading: entry.r } : { word, frequency, meanings: [], reading: "" };
    } catch (error) {
        if (attempt < MAX_RETRIES) {
            return getEntryWithRetry(word, frequency, attempt + 1);
        }

        console.error(
            `Failed to fetch meanings for word: ${word} after ${attempt} attempts`,
            error
        );
        return { word, frequency, meanings: [], reading: "" };
    }
}

export async function processWordListInBatches(
    list: WordFrequency[]
): Promise<WordFrequencyWithEntry[]> {
    const results: WordFrequencyWithEntry[] = [];

    for (let i = 0; i < list.length; i += BATCH_SIZE) {
        const batch = list.slice(i, i + BATCH_SIZE);
        const batchResults = await Promise.all(
            batch.map(({ word, frequency }) =>
                getEntryWithRetry(word, frequency)
            )
        );
        results.push(...batchResults);
    }

    return results;
}
