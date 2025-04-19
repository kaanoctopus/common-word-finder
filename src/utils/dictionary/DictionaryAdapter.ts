import { getMeanings as getJishoMeanings } from "./jisho";
import { getMeanings as getLocalMeanings } from "./localDictionary";

export class DictionaryAdapter {
    private useLocalFallback: boolean;

    constructor() {
        this.useLocalFallback = true;
    }

    async getMeanings(word: string): Promise<string[] | null> {
        if (this.useLocalFallback) {
            return getLocalMeanings(word);
        }

        try {
            const meanings = await getJishoMeanings(word);
            return meanings;
        } catch (error) {
            console.error("Switching to local dictionary due to error:", error);
            this.useLocalFallback = true;
            return getLocalMeanings(word);
        }
    }
}
