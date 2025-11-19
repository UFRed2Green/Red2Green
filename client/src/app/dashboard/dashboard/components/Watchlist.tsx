"use client";

import React, { useState } from 'react';
import '@/app/styles/dashboard/watchlist.css';
import { FiTrash2 } from 'react-icons/fi';

export function Watchlist() {
  const [tickers, setTickers] = useState<string[]>([]);
  const [input, setInput] = useState('');

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
                className="delete-button"
                onClick={() => handleRemove(t)}
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
