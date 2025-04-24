import {
    processWordListInBatches
} from "../utils/dictionary/DictionaryUtils";
import {
    WordFrequency,
    WordFrequencyWithEntry,
    DictionaryServiceBase
} from "../types";

export class DictionaryService implements DictionaryServiceBase {
    async addEntriesToList(
        list: WordFrequency[]
    ): Promise<WordFrequencyWithEntry[]> {
        return processWordListInBatches(list);
    }
}
