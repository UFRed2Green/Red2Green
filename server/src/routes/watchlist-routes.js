import express from "express";
import {
    getWatchlistController,
    addWatchlistController,
    removeWatchlistController
} from "../controller/watchlist-controller.js";

const router = express.Router();

router.get("/", getWatchlistController);
router.post("/", addWatchlistController);
router.delete("/:id", removeWatchlistController);

export default router;
