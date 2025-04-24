import express from "express";
import { FlashcardService } from "../services/FlashcardService";
import { FlashcardController } from "../controllers/FlashcardController";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { handleValidation } from "../middlewares/HandleValidation";
import {
    addWordFlashcardValidator,
    addWordsBulkValidator,
    reviewFlashcardValidator,
    updateReviewCountValidator,
} from "../validations/FlashcardValidation";
import cors from "cors";

const router = express.Router();
const flashcardService = new FlashcardService();
const flashcardController = new FlashcardController(flashcardService);

router.use(cors());
router.post(
    "/add-word",
    authMiddleware,
    addWordFlashcardValidator,
    handleValidation,
    flashcardController.addWordFlashcard
);
router.post(
    "/add-words-bulk",
    authMiddleware,
    addWordsBulkValidator,
    handleValidation,
    flashcardController.addWordsBulkToFlashcard
);
router.get(
    "/get-words",
    authMiddleware,
    flashcardController.getWordsFromFlashcard
);
router.get(
    "/get-review-words",
    authMiddleware,
    flashcardController.getReviewWordsFromFlashcard
);
router.post(
    "/check-if-exists",
    authMiddleware,
    flashcardController.isExists
);
router.post(
    "/review",
    authMiddleware,
    reviewFlashcardValidator,
    handleValidation,
    flashcardController.reviewFlashcard
);
router.post(
    "/update-review-count",
    authMiddleware,
    updateReviewCountValidator,
    handleValidation,
    flashcardController.updateReviewCount
);

export default router;
