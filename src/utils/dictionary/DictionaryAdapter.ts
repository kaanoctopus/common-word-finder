// import { getEntry as getJishoMeanings } from "./jisho";
import { getEntry as getLocalMeanings } from "./LocalDictionary";

export class DictionaryAdapter {
    private useLocalFallback: boolean;

    constructor() {
        this.useLocalFallback = true;
    }

    async getEntry(word: string) {
        if (this.useLocalFallback) {
            return getLocalMeanings(word);
        }

        // try {
        //     const meanings = await getJishoMeanings(word);
        //     return meanings;
        // } catch (error) {
            // console.error("Switching to local dictionary due to error:", error);
            this.useLocalFallback = true;
            return getLocalMeanings(word);
        // }
    }
}
