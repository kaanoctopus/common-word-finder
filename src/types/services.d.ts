import {
    RegisterResponse,
    LoginResponse,
    User,
    WordFrequency,
    WordFrequencyWithEntry,
    ReviewCards,
    wordWithFreq,
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
    abstract addEntriesToList(
        list: WordFrequency[]
    ): Promise<WordFrequencyWithEntry[]>;
}

export abstract class FlashcardServiceBase {
    abstract addWordFlashcard(
        userId: string,
        word: string,
        meanings: string[],
        reading: string
    ): Promise<void>;
    abstract addWordsBulkToFlashcard(
        userId: string,
        words: string[],
        meanings: string[][],
        readings: string[]
    ): Promise<void>;
    abstract isExists(userId: string, word: string): Promise<boolean>;
    abstract getWordsFromFlashcard(userId: string): Promise<{key: string}[]>;
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
    abstract extractWordsWithFrequency(text: string): Promise<wordWithFreq[]>;
}
