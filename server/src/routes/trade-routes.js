import express from "express";
import { addTradeController } from "../controller/trade-controller.js";

const router = express.Router();

router.post("/", addTradeController);

export default router;
