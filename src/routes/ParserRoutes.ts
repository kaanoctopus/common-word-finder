import express from "express";
import { ParserService } from "../services/ParserService";
import { ParserController } from "../controllers/ParserController";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { handleValidation } from "../middlewares/HandleValidation";
import { extractWordsValidator } from "../validations/ParserValidation";
import cors from "cors";

const router = express.Router();
const parserService = new ParserService();
const parserController = new ParserController(parserService);

router.use(cors());
router.post("/extract-words", authMiddleware, /*extractWordsValidator, handleValidation,*/ parserController.extractWordsWithFrequency);

export default router;
