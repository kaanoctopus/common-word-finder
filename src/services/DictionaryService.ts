import { DictionaryAdapter } from "../utils/dictionary/DictionaryAdapter";

export class DictionaryService {
    async addMeaningsToList(
        list: { word: string; frequency: number }[]
    ): Promise<
        { word: string; frequency: number; meanings: string[] | null }[]
    > {
        const dictionaryAdapter = new DictionaryAdapter();

        const results = await Promise.all(
            list.map(async ({ word, frequency }) => {
                try {
                    const meanings = await dictionaryAdapter.getMeanings(word);
                    return { word, frequency, meanings };
                } catch (error) {
                    console.error(
                        `Failed to fetch meanings for word: ${word}`,
                        error
                    );
                    return { word, frequency, meanings: [] };
                }
            })
        );

        return results;
    }
}
