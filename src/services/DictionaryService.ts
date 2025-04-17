import { DictionaryAdapter } from "../utils/dictionary/DictionaryAdapter";

export class DictionaryService {
    private dictionaryAdapter: DictionaryAdapter;
    private static readonly BATCH_SIZE = 50;
    private static readonly MAX_RETRIES = 2;

    constructor() {
        this.dictionaryAdapter = new DictionaryAdapter();
    }

    async addMeaningsToList(
        list: { word: string; frequency: number }[]
    ): Promise<
        { word: string; frequency: number; meanings: string[] | null }[]
    > {
        const results: {
            word: string;
            frequency: number;
            meanings: string[] | null;
        }[] = [];

        // Process in batches to avoid memory overload and improve performance
        for (let i = 0; i < list.length; i += DictionaryService.BATCH_SIZE) {
            const batch = list.slice(i, i + DictionaryService.BATCH_SIZE);
            const batchResults = await this.processBatch(batch);
            results.push(...batchResults);
        }

        return results;
    }

    private async processBatch(
        batch: { word: string; frequency: number }[]
    ): Promise<
        { word: string; frequency: number; meanings: string[] | null }[]
    > {
        const batchPromises = batch.map(({ word, frequency }) =>
            this.getWordMeaningsWithRetry(word, frequency)
        );

        return await Promise.all(batchPromises);
    }

    private async getWordMeaningsWithRetry(
        word: string,
        frequency: number,
        attempt = 1
    ): Promise<{ word: string; frequency: number; meanings: string[] | null }> {
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
