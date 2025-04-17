import { DictionaryAdapter } from "../utils/dictionary/DictionaryAdapter";
import { WordFrequency, WordFrequencyWithMeanings } from "../types";

export class DictionaryService {
    private dictionaryAdapter: DictionaryAdapter;
    private static readonly BATCH_SIZE = 50;
    private static readonly MAX_RETRIES = 2;

    constructor() {
        this.dictionaryAdapter = new DictionaryAdapter();
    }

    async addMeaningsToList(
        list: WordFrequency[]
    ): Promise<WordFrequencyWithMeanings[]> {
        const results: WordFrequencyWithMeanings[] = [];

        // Process in batches to avoid memory overload and improve performance
        for (let i = 0; i < list.length; i += DictionaryService.BATCH_SIZE) {
            const batch = list.slice(i, i + DictionaryService.BATCH_SIZE);
            const batchResults = await this.processBatch(batch);
            results.push(...batchResults);
        }

        return results;
    }

    private async processBatch(
        batch: WordFrequency[]
    ): Promise<WordFrequencyWithMeanings[]> {
        const batchPromises = batch.map(({ word, frequency }) =>
            this.getWordMeaningsWithRetry(word, frequency)
        );

        return await Promise.all(batchPromises);
    }

    private async getWordMeaningsWithRetry(
        word: string,
        frequency: number,
        attempt = 1
    ): Promise<WordFrequencyWithMeanings> {
        try {
            const meanings = await this.dictionaryAdapter.getMeanings(word);
            return { word, frequency, meanings };
        } catch (error) {
            if (attempt < DictionaryService.MAX_RETRIES) {
                return this.getWordMeaningsWithRetry(
                    word,
                    frequency,
                    attempt + 1
                );
            }

            console.error(
                `Failed to fetch meanings for word: ${word} after ${attempt} attempts`,
                error
            );
            return { word, frequency, meanings: [] };
        }
    }
}
