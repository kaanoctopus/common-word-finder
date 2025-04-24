import { Request, Response } from "express";
import { FlashcardServiceBase } from "../types";

export class FlashcardController {
    constructor(private flashcardService: FlashcardServiceBase) {}

    addWordFlashcard = async (req: Request, res: Response) => {
        const { word, meanings, reading } = req.body;
        const userId = req.userId as string;

        try {
            const result = await this.flashcardService.addWordFlashcard(
                userId,
                word,
                meanings,
                reading
            );
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    };

    addWordsBulkToFlashcard = async (req: Request, res: Response) => {
        const { words, meanings, readings } = req.body;
        const userId = req.userId as string;

        try {
            const result = await this.flashcardService.addWordsBulkToFlashcard(
                userId,
                words,
                meanings,
                readings
            );
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    };

    isExists = async (req: Request, res: Response) => {
        const { word } = req.body;

        const userId = req.userId as string;

        try {
            const result = await this.flashcardService.isExists(
                userId,
                word,
            );
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    };

    getWordsFromFlashcard = async (req: Request, res: Response) => {
        const userId = req.userId as string;

        try {
            const result = await this.flashcardService.getWordsFromFlashcard(
                userId
            );
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    };

    getReviewWordsFromFlashcard = async (req: Request, res: Response) => {
        const userId = req.userId as string;

        try {
            const result = await this.flashcardService.getReviewWordsFromFlashcard(
                userId
            );
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    };

    reviewFlashcard = async (req: Request, res: Response) => {
        const { word, answer } = req.body;
        const userId = req.userId as string;

        try {
            const result = await this.flashcardService.reviewFlashcard(
                userId,
                word,
                answer
            );
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    };

    updateReviewCount = async (req: Request, res: Response) => {
        const { count } = req.body;
        const userId = req.userId as string;

        try {
            const result = await this.flashcardService.updateReviewCount(
                userId,
                count
            );
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    }
}
