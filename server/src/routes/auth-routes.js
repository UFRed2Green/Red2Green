import express from "express";
import { loginController, registerController, changePasswordController } from "../controller/auth-controller.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/change-password", changePasswordController);

export default router;
