import { FlashcardModel } from "../models/FlashcardModel";
import { UserModel } from "../models/UserModel";
import { ReviewCards, FlashcardServiceBase } from "../types";
import {
    calculateNextReview,
    filterNewWords,
    queuePromise,
} from "../utils/flashcardUtils";

export class FlashcardService implements FlashcardServiceBase {
    private static queue: Map<string, Promise<void>> = new Map();
    async addWordFlashcard(
        userId: string,
        word: string,
        meanings: string[]
    ): Promise<void> {
        const existing = await FlashcardModel.findCardByUserAndKey(
            userId,
            word
        );
        if (existing) throw new Error("Card already exists");
        await FlashcardModel.addCard(userId, word, meanings);
    }

    async addWordsBulkToFlashcard(
        userId: string,
        words: string[],
        meanings: string[][]
    ): Promise<void> {
        const existingCards = await FlashcardModel.findCardsByUserAndKeys(
            userId,
            words
        );
        const existingWordSet = new Set(existingCards.map((card) => card.key));

        const { wordsToAdd, meaningsToAdd } = filterNewWords(
            words,
            meanings,
            existingWordSet
        );

        if (wordsToAdd.length === 0) {
            throw new Error("All cards already exist");
        }

        await FlashcardModel.addCardsBulk(userId, wordsToAdd, meaningsToAdd);
    }

    async getWordsFromFlashcard(userId: string): Promise<ReviewCards[]> {
        return FlashcardModel.getCardsForUser(userId);
    }

    async getReviewWordsFromFlashcard(userId: string): Promise<ReviewCards[]> {
        const cards = await FlashcardModel.getReviewCardsForUser(userId);
        UserModel.updateReviewCount(userId, cards.length);
        return cards;
    }

    async updateReviewCount(userId: string, count: number): Promise<void> {
        await UserModel.updateReviewCount(userId, count);
    }

    async reviewFlashcard(
        userId: string,
        word: string,
        answer: boolean
    ): Promise<void> {
        const card = await FlashcardModel.findCardByUserAndKey(userId, word);
        if (!card) throw new Error("Card not found");

        const { interval, nextReview } = calculateNextReview(
            card.interval,
            answer
        );

        await queuePromise(FlashcardService.queue, card.id, () =>
            FlashcardModel.updateCard(card.id, interval, nextReview, answer)
        );
    }
}
