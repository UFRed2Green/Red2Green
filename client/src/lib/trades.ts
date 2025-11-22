import { apiRequest } from './api';

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

export interface TradeInput {
    ticker: string;
    tradeType: TradeType;
    quantity: number;
    price: number;
    tradeDate?: string;
}

export async function getTrades(token: string): Promise<Trade[]> {
    return apiRequest<Trade[]>('/api/trades', token);
}

export async function addTrade(token: string, tradeData: TradeInput): Promise<Trade> {
    return apiRequest<Trade>('/api/trades', token, {
        method: 'POST',
        body: JSON.stringify(tradeData),
    });
}

export async function deleteTrade(token: string, tradeId: string): Promise<void> {
    await apiRequest<void>(`/api/trades/${tradeId}`, token, { method: 'DELETE' });
}

export async function editTrade(token: string, tradeId: string, tradeData: TradeInput): Promise<Trade> {
    return apiRequest<Trade>(`/api/trades/${tradeId}`, token, {
        method: 'PUT',
        body: JSON.stringify(tradeData),
    });
}
