export interface WordFrequency {
    word: string;
    frequency: number;
}

export interface WordFrequencyWithMeanings extends WordFrequency {
    meanings: string[] | null;
}
