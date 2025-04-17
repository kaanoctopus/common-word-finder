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
import helmet from "helmet";


const router = express.Router();
const authenticationService = new AuthenticationService();
const authenticationController = new AuthenticationController(
    authenticationService
);

router.use(helmet());
router.use(cors());

router.post(
    "/login",
    (req:any, res:any, next:any) => {
        if (Buffer.isBuffer(req.body)) {
          req.body = JSON.parse(req.body.toString()); // Manually parse Buffer
        }
        console.log("Request Body:", req.body); // Log the request body
        next();
      },
    loginValidator,
    handleValidation,
    authenticationController.login
);
router.post("/register", registerValidator, handleValidation, authenticationController.register);
router.get("/get-user", authMiddleware, authenticationController.getUser);

export default router;
