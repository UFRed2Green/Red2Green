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

export async function getTrades(token: string): Promise<Trade[]> {
    console.log('getTrades called with token:', token ? 'Token exists' : 'No token');
    console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trades`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        },
    });

    console.log('Response status:', res.status);

    if (!res.ok) {
        const errorData = await res.json();
        console.log('Error data:', errorData);
        throw new Error(errorData.error || errorData.message || `Failed to fetch trades: ${res.statusText}`);
    }

    const response = await res.json();
    if (response.success && response.data) {
        return response.data;
    }

    throw new Error(response.message || "Failed to fetch trades: Invalid response format");
}

export async function addTrade(token: string, tradeData: AddTradeInput): Promise<Trade> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trades`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        },
        body: JSON.stringify(tradeData),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error?.message || errorData.message || `Failed to add trade: ${res.statusText}`);
    }

    const response = await res.json();
    if (response.success && response.data) {
        return response.data;
    }

    throw new Error(response.message || "Failed to add trade: Invalid response format");
}

export async function deleteTrade(token: string, tradeId: string): Promise<void> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trades/${tradeId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        },
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error?.message || errorData.message || `Failed to delete trade: ${res.statusText}`);
    }

    const response = await res.json();
    if (!response.success) {
        throw new Error(response.message || "Failed to delete trade");
    }
}
