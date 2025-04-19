import { Request, Response, NextFunction } from "express";

export const bufferBodyParser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.method !== "GET" && req.body && Buffer.isBuffer(req.body)) {
        try {
            req.body = JSON.parse(req.body.toString());
        } catch (error) {
            console.error("Failed to parse buffer body:", error);
            res.status(400).send({ error: "Invalid JSON body" });
            return;
        }
    }
    next();
};
