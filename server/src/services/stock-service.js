import axios from "axios";

export async function getStockPricesByTimeframe(ticker, range) {
    const rangeMap = {
        "D": "1day",
        "W": "1week",
        "M": "1month"
    };

    const interval = rangeMap[range];
    const data = await fetchStockPrices(ticker, interval);

    // Transform to include only datetime and close
    return data.values?.map(({ datetime, close }) => ({ datetime, close })) || [];
}

async function fetchStockPrices(ticker, range) {
    // 30 data points are fetched by default (e.g. 30 days for 1day interval)
    try {
        const response = await axios.get(
            `${process.env.TWELVEDATA_API_BASE_URL}/time_series?symbol=${ticker}&interval=${range}&apikey=${process.env.TWELVEDATA_API_KEY}`
        );
        // console.log("API Response:", JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch stock price: ${error.message}`);
    }
}
