import { Request, Response } from "express";

export class DictionaryController {
    constructor(private dictionaryService: any) {}

    addMeaningsToList = async (req: Request, res: Response) => {
        const { list } = req.body;

        try {
            const result = await this.dictionaryService.addMeaningsToList(list);
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    };
}
