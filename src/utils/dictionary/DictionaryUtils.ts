import { DictionaryAdapter } from "./DictionaryAdapter";
import { WordFrequency, WordFrequencyWithMeanings } from "../../types";

const BATCH_SIZE = 50;
const MAX_RETRIES = 2;

const dictionaryAdapter = new DictionaryAdapter();

export async function getWordMeaningsWithRetry(
    word: string,
    frequency: number,
    attempt = 1
): Promise<WordFrequencyWithMeanings> {
    try {
        const meanings = await dictionaryAdapter.getMeanings(word);
        return { word, frequency, meanings };
    } catch (error) {
        if (attempt < MAX_RETRIES) {
            return getWordMeaningsWithRetry(word, frequency, attempt + 1);
        }

        console.error(
            `Failed to fetch meanings for word: ${word} after ${attempt} attempts`,
            error
        );
        return { word, frequency, meanings: [] };
    }
}

export async function processWordListInBatches(
    list: WordFrequency[]
): Promise<WordFrequencyWithMeanings[]> {
    const results: WordFrequencyWithMeanings[] = [];

    for (let i = 0; i < list.length; i += BATCH_SIZE) {
        const batch = list.slice(i, i + BATCH_SIZE);
        const batchResults = await Promise.all(
            batch.map(({ word, frequency }) =>
                getWordMeaningsWithRetry(word, frequency)
            )
        );
        results.push(...batchResults);
    }

    return results;
}
