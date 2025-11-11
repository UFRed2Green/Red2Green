import axios from "axios";

export async function getStockPricesByTimeframe(ticker, range) {
    const stockDataDaily = await fetchStockPrices(ticker);

    if (range === "D") {
        return stockDataDaily;

    } else if (range === "W") {
        getWeeklyStockPrices(stockDataDaily);

    } else if (range === "M") {
        getMonthlyStockPrices(stockDataDaily);
    }
}

async function fetchStockPrices(ticker) {
    try {
        const response = await axios.get(
            `${process.env.FMP_BASE_URL}/historical-price-eod/light?symbol=${ticker}&apikey=${process.env.FPM_API_KEY}`
        );
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch stock price: ${error.message}`);
    }
}

function getWeeklyStockPrices() {
    
}

function getMonthlyStockPrices() {
    
}
