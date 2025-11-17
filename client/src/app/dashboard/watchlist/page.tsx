"use client";

import React, { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import '@/app/styles/dashboard/watchlist.css';

export default function WatchlistPage() {
  const [tickers, setTickers] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem('watchlistTickers');
      if (raw) setTickers(JSON.parse(raw));
    } catch (e) {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('watchlistTickers', JSON.stringify(tickers));
    } catch (e) {
      // ignore quota errors
    }
  }, [tickers]);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const t = input.trim().toUpperCase();
    if (!t) return;
    if (tickers.includes(t)) {
      setInput('');
      return;
    }
    setTickers(prev => [...prev, t]);
    setInput('');
  }

  function handleRemove(ticker: string) {
    setTickers(prev => prev.filter(t => t !== ticker));
  }

  return (
    <ProtectedRoute>
      <main className="watchlist-container">
        <div className="watchlist-header">
          <h1>Watchlist</h1>
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
            />
            <button type="submit" className="watchlist-add">Add</button>
          </form>

          {tickers.length === 0 ? (
            <p>Your watchlist is empty. Add tickers above.</p>
          ) : (
            <ul className="watchlist-list">
              {tickers.map(t => (
                <li key={t} className="ticker-item">
                  <span>{t}</span>
                  <button
                    type="button"
                    aria-label={`Remove ${t}`}
                    className="remove-button"
                    onClick={() => handleRemove(t)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
