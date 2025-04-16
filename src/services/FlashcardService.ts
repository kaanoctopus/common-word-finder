import { FlashcardModel } from "../models/FlashcardModel";
import { Cards } from "../types";
import { calculateNextReview } from "../utils/flashcardUtils";

export class FlashcardService {
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
        const existingWordSet = new Set(
            (
                await Promise.all(
                    words.map((word) =>
                        FlashcardModel.findCardByUserAndKey(userId, word)
                    )
                )
            )
                .map((card, i) => (card ? words[i] : null))
                .filter((word): word is string => word !== null)
        );

        const newWords: { word: string; meanings: string[] }[] = [];
        for (let i = 0; i < words.length; i++) {
            if (!existingWordSet.has(words[i])) {
                newWords.push({ word: words[i], meanings: meanings[i] });
            }
        }

        if (newWords.length === 0) {
            throw new Error("All cards already exist");
        }

        const wordsToAdd = newWords.map((w) => w.word);
        const meaningsToAdd = newWords.map((w) => w.meanings);

        await FlashcardModel.addCardsBulk(userId, wordsToAdd, meaningsToAdd);
    }

    async getWordsFromFlashcard(userId: string): Promise<Cards[]> {
        return FlashcardModel.getCardsForUser(userId);
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
        await FlashcardModel.updateCard(card.id, interval, nextReview, answer);
    }
}
