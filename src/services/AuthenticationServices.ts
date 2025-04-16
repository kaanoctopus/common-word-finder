import { UserModel } from "../models/UserModel";
import { User, RegisterResponse, LoginResponse } from "../types/auth";
import {
    hashPassword,
    comparePasswords,
    generateJWT,
    verifyJWT,
} from "../utils/authUtils";

export class AuthenticationService {
    async register(
        username: string,
        password: string,
        email: string
    ): Promise<RegisterResponse> {
        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await hashPassword(password);

        await UserModel.create({
            username,
            password: hashedPassword,
            email,
        });

        return { message: "User registered successfully" };
    }

    async login(email: string, password: string): Promise<LoginResponse> {
        const user = await UserModel.findByEmail(email);
        if (!user || !(await comparePasswords(password, user.password))) {
            throw new Error("Invalid credentials");
        }

        const token = generateJWT(user.id);

        return {
            token,
            user,
        };
    }

    async getUser(userId: string): Promise<User> {
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
}
