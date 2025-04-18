import { PrismaClient } from "@prisma/client";
import { ReviewCards } from "../types";

export class FlashcardModel {
    private static prisma = new PrismaClient();

    static async addCard(userId: string, key: string, meanings: string[]) {
        return this.prisma.card.create({
            data: {
                key,
                meanings,
                interval: 1,
                nextReview: new Date(),
                state: "learned",
                userId,
            },
        });
    }

    static async addCardsBulk(
        userId: string,
        keys: string[],
        meaningsList: string[][]
    ) {
        const cards = keys.map((key, i) => ({
            key,
            meanings: meaningsList[i],
            interval: 1,
            nextReview: new Date(),
            state: "learned",
            userId,
        }));

        return this.prisma.card.createMany({ data: cards });
    }

    static async getCardsForUser(userId: string): Promise<ReviewCards[]> {
        return this.prisma.card.findMany({
            where: { userId },
            select: {
                key: true,
                state: true,
                meanings: true,
            },
        });
    }

    static async getReviewCardsForUser(userId: string): Promise<ReviewCards[]> {
        return await this.prisma.card.findMany({
            where: {
                userId,
                OR: [
                    { nextReview: { lt: new Date() } },
                    { state: { not: "learned" } },
                ],
            },
            select: {
                key: true,
                state: true,
                meanings: true,
            },
        });
    }

    static async findCardByUserAndKey(userId: string, key: string) {
        return this.prisma.card.findFirst({ where: { userId, key } });
    }

    static async findCardsByUserAndKeys(userId: string, keys: string[]) {
        return this.prisma.card.findMany({
            where: {
                userId,
                key: { in: keys }
            },
            select: {
                key: true
            }
        });
    }


    static async updateCard(
        id: string,
        interval: number,
        nextReview: Date,
        answer: boolean
    ) {
        const card = await this.prisma.card.findUnique({ where: { id } });
    
        if (!card) {
            throw new Error("Card not found");
        }
    
        const updatedData: Record<string, any> = {};
    
        switch (card.state) {
            case "learned":
                if (!answer) {
                    updatedData.state = "relearning1";
                }
                updatedData.interval = interval;
                updatedData.nextReview = nextReview;
                break;
    
            case "relearning1":
                if (answer) {
                    updatedData.state = "relearning2";
                } else {
                    updatedData.state = "relearning1"; // Explicit fallback
                }
                break;
    
            case "relearning2":
                updatedData.state = answer ? "learned" : "relearning1";
                break;
    
            default:
                console.warn(`Unhandled state: ${card.state}`);
                return;
        }
    
        if (Object.keys(updatedData).length === 0) {
            console.warn(`No updates to apply for card ${id}.`);
            return;
        }
    
        console.log(`Updating card ${id} from state ${card.state} with`, updatedData);
    
        try {
            await this.prisma.card.update({
                where: { id },
                data: updatedData,
            });
        } catch (error) {
            console.error(`Failed to update card ${id}:`, error);
            throw error;
        }
    }
    
}
