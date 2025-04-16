import express from "express";
import { AuthenticationService } from "../services/AuthenticationServices";
import { AuthenticationController } from "../controllers/AuthenticationController";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { handleValidation } from "../middlewares/HandleValidation";
import {
    loginValidator,
    registerValidator,
} from "../validations/AuthenticationValidation";
import cors from "cors";

const router = express.Router();
const authenticationService = new AuthenticationService();
const authenticationController = new AuthenticationController(
    authenticationService
);

router.use(cors());
router.post(
    "/login",
    loginValidator,
    handleValidation,
    authenticationController.login
);
router.post("/register", registerValidator, authenticationController.register);
router.get("/get-user", authMiddleware, authenticationController.getUser);

export default router;
