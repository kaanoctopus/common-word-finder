import { Request, Response } from "express";
import { ParserServiceBase } from "../types";

export class ParserController {
    constructor(private parserService: ParserServiceBase) {}

    extractWordsWithFrequency = async (req: Request, res: Response) => {
        const { text } = req.body;

        try {
            const result = await this.parserService.extractWordsWithFrequency(text);
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    };
}
