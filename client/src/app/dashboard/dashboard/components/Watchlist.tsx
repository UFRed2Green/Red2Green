"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getWatchlist, addToWatchlist, removeFromWatchlist, type WatchlistItem } from '@/lib/watchlist';
import '@/app/styles/dashboard/watchlist.css';
import { FiTrash2 } from 'react-icons/fi';

export function Watchlist() {
  const { token } = useAuth();
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const fetchWatchlist = useCallback(async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await getWatchlist(token);
      setWatchlist(data);
    } catch (error) {
      console.error('Failed to fetch watchlist:', error);
      alert(error instanceof Error ? error.message : 'Failed to fetch watchlist');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const t = input.trim().toUpperCase();
    if (!t) return;

    if (!token) {
      alert('You must be logged in to add tickers');
      return;
    }

    if (watchlist.some(item => item.ticker === t)) {
      alert('Ticker already in watchlist');
      setInput('');
      return;
    }

    try {
      setIsAdding(true);
      const newItem = await addToWatchlist(token, t);
      setWatchlist(prev => [newItem, ...prev]);
      setInput('');
    } catch (error) {
      console.error('Failed to add ticker:', error);
      alert(error instanceof Error ? error.message : 'Failed to add ticker');
    } finally {
      setIsAdding(false);
    }
  }

  async function handleRemove(item: WatchlistItem) {
    if (!token) {
      alert('You must be logged in to remove tickers');
      return;
    }

    try {
      await removeFromWatchlist(token, item.id);
      setWatchlist(prev => prev.filter(w => w.id !== item.id));
    } catch (error) {
      console.error('Failed to remove ticker:', error);
      alert(error instanceof Error ? error.message : 'Failed to remove ticker');
    }
  }

  return (
    <div className="watchlist-container">
      <div className="watchlist-header">
        <h2 className="section-heading">Watchlist</h2>
      </div>
      <div className="watchlist-content">
        <form className="watchlist-form" onSubmit={handleAdd} aria-label="Add ticker">
        <label htmlFor="ticker-input" className="sr-only">Ticker</label>
        <input
          id="ticker-input"
          value={input}
          onChange={e => setInput((e.target as HTMLInputElement).value)}
          placeholder="Add ticker (e.g. AAPL)"
          className="watchlist-input"
          disabled={isAdding || isLoading}
        />
        <button type="submit" className="watchlist-add" disabled={isAdding || isLoading}>
          {isAdding ? 'Adding...' : 'Add'}
        </button>
      </form>

      {isLoading ? (
        <p>Loading watchlist...</p>
      ) : watchlist.length === 0 ? (
        <p>Your watchlist is empty. Add tickers above.</p>
      ) : (
        <ul className="watchlist-list">
          {watchlist.map(item => (
            <li key={item.id} className="ticker-item">
              <span>{item.ticker}</span>
              <button
                type="button"
                aria-label={`Remove ${item.ticker}`}
                className="delete-button"
                onClick={() => handleRemove(item)}
              >
                <FiTrash2 />
              </button>
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
}
