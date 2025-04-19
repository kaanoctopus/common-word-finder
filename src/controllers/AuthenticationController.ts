import { Request, Response } from "express";
import {AuthenticationServiceBase} from "../types"

export class AuthenticationController {
    constructor(private authenticationService: AuthenticationServiceBase) {}

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        try {
            const result = await this.authenticationService.login(
                email,
                password
            );
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    };

    register = async (req: Request, res: Response) => {
        const { username, password, email } = req.body;

        try {
            const result = await this.authenticationService.register(
                username,
                password,
                email
            );
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    };

    getUser = async (req: Request, res: Response) => {
        try {
            const result = await this.authenticationService.getUser(req.userId as string);
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    };
}
