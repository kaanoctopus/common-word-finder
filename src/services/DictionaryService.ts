import {
    processWordListInBatches
} from "../utils/dictionary/DictionaryUtils";
import {
    WordFrequency,
    WordFrequencyWithMeanings,
    DictionaryServiceBase
} from "../types";

export class DictionaryService implements DictionaryServiceBase {
    async addMeaningsToList(
        list: WordFrequency[]
    ): Promise<WordFrequencyWithMeanings[]> {
        return processWordListInBatches(list);
    }
}
