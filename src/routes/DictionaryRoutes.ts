import express from "express";
import { DictionaryService } from "../services/DictionaryService";
import { DictionaryController } from "../controllers/DictionaryController";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { handleValidation } from "../middlewares/HandleValidation";
import { addMeaningsToListValidator } from "../validations/DictionaryValidation";
import cors from "cors";

const router = express.Router();
const dictionaryService = new DictionaryService();
const dictionaryController = new DictionaryController(dictionaryService);

router.use(cors());
router.post(
    "/meanings",
    authMiddleware,
    addMeaningsToListValidator,
    handleValidation,
    dictionaryController.addMeaningsToList
);

export default router;
