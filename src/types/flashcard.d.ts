export type Cards = {
    id: string;
    key: string;
    meanings: string[];
    nextReview: Date;
    interval: number;
    userId: string;
}

export type ReviewCards = {
    key: string;
    meanings: string[];
    state: string;
    reading: string;
}