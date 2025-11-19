import { apiRequest } from './api';

interface StockPrice {
    datetime: string;
    close: string;
}

export async function getStockPrices(token: string, ticker: string, range: "D" | "W" | "M"): Promise<StockPrice[]> {
    return apiRequest<StockPrice[]>(`/api/stocks/${ticker}`, token, {
        method: "POST",
        body: JSON.stringify({ range }),
    });
}
