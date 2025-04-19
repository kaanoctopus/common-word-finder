export interface WordFrequency {
    word: string;
    frequency: number;
}

export interface WordFrequencyWithMeanings extends WordFrequency {
    meanings: string[] | null;
}

export interface jishoSense {
    english_definitions: string[];
}

export interface jishoEntry {
    senses?: Sense[];
}
