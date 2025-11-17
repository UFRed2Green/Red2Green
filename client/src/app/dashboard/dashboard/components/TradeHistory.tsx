"use client";

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getTrades, deleteTrade, type Trade } from '@/lib/trades';
import { formatTradeDate } from '@/utils/trades/date-formatting';
import '@/app/styles/dashboard/trade-history.css';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';

interface TradeHistoryProps {
  refreshTrigger?: boolean;
}

export default function TradeHistory({ refreshTrigger }: TradeHistoryProps) {
  const { token } = useAuth();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchTrades = useCallback(async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await getTrades(token);
      setTrades(data);
    } catch (error) {
      console.error('Failed to fetch trades:', error);
      alert(error instanceof Error ? error.message : 'Failed to fetch trades');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchTrades();
  }, [fetchTrades, refreshTrigger]);

  const handleDelete = async (tradeId: string) => {
    if (!token) {
      alert('You must be logged in to delete a trade');
      return;
    }

    if (!confirm('Are you sure you want to delete this trade?')) {
      return;
    }

    setDeletingId(tradeId);

    try {
      await deleteTrade(token, tradeId);
      setTrades(prev => prev.filter(trade => trade.tradeId !== tradeId));
    } catch (error) {
      console.error('Failed to delete trade:', error);
      alert(error instanceof Error ? error.message : 'Failed to delete trade');
    } finally {
      setDeletingId(null);
    }
  };

  const formatCurrency = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return `$${numValue.toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <div className="trade-history-wrapper">
        <h2 className="section-heading">Trade History</h2>
        <p className="trade-history-subtitle">View and manage your trades</p>
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">Loading trades...</div>
        </div>
      </div>
    );
  }

  if (trades.length === 0) {
    return (
      <div className="trade-history-wrapper">
        <h2 className="section-heading">Trade History</h2>
        <p className="trade-history-subtitle">View and manage your trades</p>
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">No trades yet. Add your first trade above!</div>
        </div>
      </div>
    );
  }

  return (
    <div className="trade-history-wrapper">
      <h2 className="section-heading">Trade History</h2>
      <p className="trade-history-subtitle">View and manage your trades</p>

      <div className="trade-history-table-wrapper">
        <table className="trade-history-table">
          <thead>
            <tr>
              <th className="col-ticker">Ticker</th>
              <th className="col-type">Type</th>
              <th className="col-qty">Qty</th>
              <th className="col-price">Price</th>
              <th className="col-total">Total</th>
              <th className="col-date">Date</th>
              <th className="col-action">Action</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => {
              const priceNum = parseFloat(trade.price);
              const total = trade.quantity * priceNum;
              const isBuy = trade.tradeType === 'BUY';

              return (
                <tr key={trade.tradeId}>
                  <td className="col-ticker">{trade.ticker}</td>
                  <td className="col-type">
                    <span className={`trade-type-badge ${isBuy ? 'buy' : 'sell'}`}>
                      {trade.tradeType}
                    </span>
                  </td>
                  <td className="col-qty">{trade.quantity}</td>
                  <td className="col-price">{formatCurrency(priceNum)}</td>
                  <td className="col-total">{formatCurrency(total)}</td>
                  <td className="col-date">{formatTradeDate(trade.tradeDate)}</td>
                  <td className="col-action">
                    <button className="edit-button" title="Edit trade">
                      <FiEdit2 />
                    </button>
                    <button
                      className="delete-button"
                      title="Delete trade"
                      onClick={() => handleDelete(trade.tradeId)}
                      disabled={deletingId === trade.tradeId}
                    >
                      {deletingId === trade.tradeId ? '...' : <FiTrash2 />}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
