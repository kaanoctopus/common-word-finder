import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import { PrismaClient } from "@prisma/client";

import parserRoutes from "../../routes/ParserRoutes";
import dictonaryRoutes from "../../routes/DictionaryRoutes";
import authenticationRoutes from "../../routes/AuthenticationRoutes";
import flashcardRoutes from "../../routes/FlashcardRoutes";
import { rateLimiter } from "../../middlewares/RateLimiter";
import { bufferBodyParser } from "../../middlewares/netlify";

const app = express();

const prisma = new PrismaClient();

app.use(cors());
app.use(rateLimiter);
app.use(express.json({ limit: "50mb" }));
app.use(bufferBodyParser);

async function testConnection() {
    try {
        await prisma.$connect();
        console.log("Prisma connected to the database");
    } catch (error) {
        console.error("Prisma connection error:", error);
    }
}

testConnection();


app.use("/api/", parserRoutes);
app.use("/api/", dictonaryRoutes);
app.use("/api/", authenticationRoutes);
app.use("/api/", flashcardRoutes);

module.exports.handler = serverless(app);
