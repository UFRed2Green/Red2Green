import { addTrade, deleteTrade } from "../services/trade-service.js";
import { success, error } from "../utils/response.js";
import { validateTradeInput } from "../utils/trade-validator.js";

export async function addTradeController(req, res) {
    try {
        const userId = req.userId;
        const tradeDate = req.tradeDate;
        const { normalizedTicker, normalizedType, quantityNum, priceNum } = validateTradeInput(req.body);

        const result = await addTrade({
            userId: userId,
            ticker: normalizedTicker,
            tradeType: normalizedType,
            quantity: quantityNum,
            price: priceNum,
            tradeDate: tradeDate,
        });
        return success(res, result, "Trade added successfully", 201);
    } catch (err) {
        console.error(err);
        return error(res, "TRADE_ADD_FAILED", err.message, err.status || 500);
    }
}

export async function deleteTradeController(req, res) {
    try {
        const userId = req.userId;
        const { tradeId } = req.params;

        const result = await deleteTrade({ tradeId, userId: userId });
        return success(res, result, "Trade deleted successfully", 200);
    } catch (err) {
        console.error(err);
        return error(res, "TRADE_DELETE_FAILED", err.message, err.status || 500);
    }
}