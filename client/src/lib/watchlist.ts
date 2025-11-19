import { apiRequest } from './api';

/**
 * Shared type definitions for watchlist-related data
 */
export interface WatchlistItem {
    id: string;
    ticker: string;
    userId: number;
    createdAt: string;
}

export async function getWatchlist(token: string): Promise<WatchlistItem[]> {
    return apiRequest<WatchlistItem[]>('/api/watchlist', token);
}

export async function addToWatchlist(token: string, ticker: string): Promise<WatchlistItem> {
    return apiRequest<WatchlistItem>('/api/watchlist', token, {
        method: 'POST',
        body: JSON.stringify({ ticker }),
    });
}

export async function removeFromWatchlist(token: string, id: string): Promise<void> {
    await apiRequest<void>(`/api/watchlist/${id}`, token, { method: 'DELETE' });
}
