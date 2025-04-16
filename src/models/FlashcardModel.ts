import { PrismaClient } from "@prisma/client";

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

    static async getCardsForUser(userId: string) {
        return this.prisma.card.findMany({ where: { userId } });
    }

    static async findCardByUserAndKey(userId: string, key: string) {
        return this.prisma.card.findFirst({ where: { userId, key } });
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
                }
                break;

            case "relearning2":
                updatedData.state = answer ? "learned" : "relearning1";
        }

        return this.prisma.card.update({
            where: { id },
            data: updatedData,
        });
    }
}
