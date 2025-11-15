import express from "express";
import { addTradeController, getTradesController, deleteTradeController, editTradeController } from "../controller/trade-controller.js";

const router = express.Router();

router.get("/", getTradesController);
router.post("/", addTradeController);
router.delete("/:tradeId", deleteTradeController);
router.put("/:tradeId", editTradeController);

export default router;
