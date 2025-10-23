import express from "express";
import { forgotPasswordController } from "../controller/forgot-password-controller.js";

const router = express.Router();

router.post("/change", forgotPasswordController.changePassword);

export default router;
