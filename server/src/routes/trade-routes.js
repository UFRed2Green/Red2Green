import express from "express";
import { addTradeController, deleteTradeController } from "../controller/trade-controller.js";

const router = express.Router();

router.post("/", addTradeController);
router.delete("/:tradeId", deleteTradeController);

export default router;
