import express from "express";
import { addTradeController, getTradesController, deleteTradeController } from "../controller/trade-controller.js";

const router = express.Router();

router.get("/", getTradesController);
router.post("/", addTradeController);
router.delete("/:tradeId", deleteTradeController);

export default router;
