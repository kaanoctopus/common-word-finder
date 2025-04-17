import { Request, Response } from "express";

export class FlashcardController {
    constructor(private flashcardService: any) {}

    addWordFlashcard = async (req: Request, res: Response) => {
        const { word, meanings } = req.body;
        const userId = req.userId;

        try {
            const result = await this.flashcardService.addWordFlashcard(
                userId,
                word,
                meanings
            );
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    };

    addWordsBulkToFlashcard = async (req: Request, res: Response) => {
        const { words, meanings } = req.body;
        const userId = req.userId;

        try {
            const result = await this.flashcardService.addWordsBulkToFlashcard(
                userId,
                words,
                meanings
            );
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    };

    getWordsFromFlashcard = async (req: Request, res: Response) => {
        const userId = req.userId;

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
        const userId = req.userId;

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
        const userId = req.userId;

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
}
