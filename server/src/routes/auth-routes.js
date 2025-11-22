import express from "express";
import { loginController, registerController, changePasswordController, getUserEmailController } from "../controller/auth-controller.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/change-password", changePasswordController);
router.post("/get-email", getUserEmailController);

export default router;
