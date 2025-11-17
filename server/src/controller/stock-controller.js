import { getStockPricesByTimeframe } from "../services/stock-service.js";
import { success, error } from "../utils/response.js";

export async function getStockPricesController(req, res) {
    try {
        const { ticker } = req.params;
        const { range } = req.body;
        const result = await getStockPricesByTimeframe(ticker, range);
        return success(res, result, "Stock price fetched successfully", 200);
    } catch (err) {
        console.error(err);
        return error(res, "STOCK_FETCH_FAILED", err.message, err.status || 500);
    }
}