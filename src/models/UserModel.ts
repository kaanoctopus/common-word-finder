import { PrismaClient } from "@prisma/client";
import { User } from "../types/auth";

export class UserModel {
    private static prisma = new PrismaClient();

    static async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    static async create(data: {
        username: string;
        password: string;
        email: string;
    }): Promise<User> {
        return this.prisma.user.create({ data });
    }

    static async findById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id } });
    }
}
