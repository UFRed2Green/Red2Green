import { getWatchlist, addToWatchlist, removeFromWatchlist } from "../services/watchlist-service.js";
import { success, error } from "../utils/response.js";

export async function getWatchlistController(req, res) {
    try {
        const userId = req.userId;
        const result = await getWatchlist({ userId });
        return success(res, result, "Watchlist retrieved successfully", 200);
    } catch (err) {
        console.error(err);
        return error(res, "WATCHLIST_GET_FAILED", err.message, err.status || 500);
    }
}

export async function addWatchlistController(req, res) {
    try {
        const userId = req.userId;
        const { ticker } = req.body;

        if (!ticker || typeof ticker !== 'string') {
            return error(res, "INVALID_INPUT", "Ticker is required", 400);
        }

        const normalizedTicker = ticker.trim().toUpperCase();

        if (!normalizedTicker) {
            return error(res, "INVALID_INPUT", "Ticker cannot be empty", 400);
        }

        const result = await addToWatchlist({ userId, ticker: normalizedTicker });
        return success(res, result, "Ticker added to watchlist", 201);
    } catch (err) {
        console.error(err);
        return error(res, "WATCHLIST_ADD_FAILED", err.message, err.status || 500);
    }
}

export async function removeWatchlistController(req, res) {
    try {
        const userId = req.userId;
        const { id } = req.params;

        await removeFromWatchlist({ id, userId });
        return success(res, null, "Ticker removed from watchlist", 200);
    } catch (err) {
        console.error(err);
        return error(res, "WATCHLIST_REMOVE_FAILED", err.message, err.status || 500);
    }
}
