import express from "express";
import { emailController } from "../controller/email-controller.js";

const router = express.Router();

router.post("/send", emailController.send);

export default router;
