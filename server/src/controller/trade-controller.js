import { addTrade } from "../services/trade-service.js";
import { success, error } from "../utils/response.js";
import { validateTradeInput } from "../utils/trade-validator.js";

export async function addTradeController(req, res) {
    try {
        const user_id = req.userId;
        const tradeDate = req.tradeDate;
        const { normalizedTicker, normalizedType, quantityNum, priceNum } = validateTradeInput(req.body);

        const result = await addTrade({
            userId: user_id,
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
