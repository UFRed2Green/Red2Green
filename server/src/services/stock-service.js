import axios from "axios";
import { getDailyStockPrices, getMonthlyStockPrices, getWeeklyStockPrices } from "../utils/stock-aggregator.js";

export async function getStockPricesByTimeframe(ticker, range) {
    const stockDataDaily = await fetchStockPrices(ticker);

    if (range === "D") {
        return getDailyStockPrices(stockDataDaily);

    } else if (range === "W") {
        return getWeeklyStockPrices(stockDataDaily);

    } else if (range === "M") {
        return getMonthlyStockPrices(stockDataDaily);
    }
}

async function fetchStockPrices(ticker) {
    try {
        const response = await axios.get(
            `${process.env.FMP_BASE_URL}/historical-price-eod/light?symbol=${ticker}&apikey=${process.env.FPM_API_KEY}`
        );
        // console.log("API Response:", JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch stock price: ${error.message}`);
    }
}
