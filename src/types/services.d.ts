import {
    RegisterResponse,
    LoginResponse,
    User,
    WordFrequency,
    WordFrequencyWithMeanings,
    ReviewCards,
    wordWithFreq
} from "../types";

export abstract class AuthenticationServiceBase {
    abstract register(
        username: string,
        password: string,
        email: string
    ): Promise<RegisterResponse>;
    abstract login(email: string, password: string): Promise<LoginResponse>;
    abstract getUser(userId: string): Promise<User>;
}

export abstract class DictionaryServiceBase {
    abstract addMeaningsToList(
        list: WordFrequency[]
    ): Promise<WordFrequencyWithMeanings[]>;
}

export abstract class FlashcardServiceBase {
    abstract addWordFlashcard(
        userId: string,
        word: string,
        meanings: string[]
    ): Promise<void>;
    abstract addWordsBulkToFlashcard(
        userId: string,
        words: string[],
        meanings: string[][]
    ): Promise<void>;
    abstract getWordsFromFlashcard(userId: string): Promise<ReviewCards[]>;
    abstract getReviewWordsFromFlashcard(
        userId: string
    ): Promise<ReviewCards[]>;
    abstract updateReviewCount(userId: string, count: number): Promise<void>;
    abstract reviewFlashcard(
        userId: string,
        word: string,
        answer: boolean
    ): Promise<void>;
}

export abstract class ParserServiceBase {
    abstract extractWordsWithFrequency(text: string): Promise<wordWithFreq[]>
}
