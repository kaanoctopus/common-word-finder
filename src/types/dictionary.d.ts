export interface WordFrequency {
    word: string;
    frequency: number;
}

export interface WordFrequencyWithEntry extends WordFrequency {
    meanings: string[] | null;
    reading: string | null
}

export interface jishoSense {
    english_definitions: string[];
}

export interface jishoEntry {
    senses?: Sense[];
}
