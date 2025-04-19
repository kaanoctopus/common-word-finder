import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getToken, verifyJWT } from "../utils/authUtils";
import { handleValidation } from "./HandleValidation";

declare module "express" {
    interface Request {
        userId?: string;
    }
}

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const token = getToken(req);

    if (!token) {
        req.body.errors = [{ msg: "Unauthorized" }];
        handleValidation(req, res, next);
        return;
    }

    try {
        const decoded = verifyJWT(token) as jwt.JwtPayload;
        req.userId = decoded.id;
        next();
    } catch {
        req.body.errors = [{ msg: "Invalid Token" }];
        handleValidation(req, res, next);
        return;
    }
};
