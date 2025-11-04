/**
 * Shared type definitions for trade-related data
 */
export type TradeType = 'BUY' | 'SELL';

export interface Trade {
    tradeId: string;
    ticker: string;
    tradeType: TradeType;
    quantity: number;
    price: string;
    tradeDate: string;
    userId: number;
}

export interface AddTradeInput {
    ticker: string;
    tradeType: TradeType;
    quantity: number;
    price: number;
    tradeDate?: string;
}

/**
 * Shared API request utility to reduce code duplication
 */
async function apiRequest<T>(
    url: string,
    token: string,
    options: { method: string; body?: string } = { method: 'GET' }
): Promise<T> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method: options.method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        },
        ...(options.body && { body: options.body }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error?.message || errorData.message || `Request failed: ${res.statusText}`);
    }

    const response = await res.json();
    if (response.success && response.data) {
        return response.data;
    }

    throw new Error(response.message || "Invalid response format");
}

export async function getTrades(token: string): Promise<Trade[]> {
    return apiRequest<Trade[]>('/api/trades', token);
}

export async function addTrade(token: string, tradeData: AddTradeInput): Promise<Trade> {
    return apiRequest<Trade>('/api/trades', token, {
        method: 'POST',
        body: JSON.stringify(tradeData),
    });
}

export async function deleteTrade(token: string, tradeId: string): Promise<void> {
    await apiRequest<void>(`/api/trades/${tradeId}`, token, { method: 'DELETE' });
}
