import express from "express";
import { getStockPricesController } from "../controller/stock-controller.js";

const router = express.Router();

router.post("/:ticker", getStockPricesController);

export default router;
