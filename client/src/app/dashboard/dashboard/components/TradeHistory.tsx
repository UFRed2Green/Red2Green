"use client";

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getTrades, deleteTrade, type Trade } from '@/lib/trades';
import { formatTradeDate } from '@/utils/trades/date-formatting';
import '@/app/styles/dashboard/trade-history.css';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';

interface TradeHistoryProps {
  refreshTrigger?: boolean;
  onTradeDeleted?: () => void;
}

export default function TradeHistory({ refreshTrigger, onTradeDeleted }: TradeHistoryProps) {
  const { token } = useAuth();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  //Joshua addition for edit trade
  const [editingTrade, setEditingTrade] = useState<Trade | null>(null);
  const [editForm, setEditForm] = useState({
    ticker: "",
    tradeType: "BUY",
    quantity: 1,
    price: "",
    tradeDate: ""
  });

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

    if (!confirm('Are you sure you want to delete this trade?')) return;

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

    onTradeDeleted?.();
  };

  // Joshua addition for edit trade
  const openEditModal = (trade: Trade) => {
    setEditingTrade(trade);

    const isoDate = new Date(trade.tradeDate);
    const mm = String(isoDate.getMonth() + 1).padStart(2, "0");
    const dd = String(isoDate.getDate()).padStart(2, "0");
    const yyyy = isoDate.getFullYear();

    setEditForm({
      ticker: trade.ticker,
      tradeType: trade.tradeType,
      quantity: trade.quantity,
      price: parseFloat(trade.price).toFixed(2),
      tradeDate: `${mm}/${dd}/${yyyy}`
    });
  };

  const closeEditModal = () => {
    setEditingTrade(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  // 📌 SAVE EDITED TRADE (No API yet)
  const handleSaveEdit = () => {
    if (!editingTrade) return;

    const updatedTrade: Trade = {
      ...editingTrade,
      ticker: editForm.ticker,
      tradeType: editForm.tradeType as "BUY" | "SELL",
      quantity: Number(editForm.quantity),
      price: parseFloat(editForm.price).toFixed(2),
      tradeDate: new Date(editForm.tradeDate).toISOString()
    };

    console.log("Updated Trade:", updatedTrade);
    closeEditModal();
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
              <th>Ticker</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {trades.map((trade) => {
              const priceNum = parseFloat(trade.price);
              const total = priceNum * trade.quantity;
              const isBuy = trade.tradeType === "BUY";

              return (
                <tr key={trade.tradeId}>
                  <td>{trade.ticker}</td>
                  <td>
                    <span className={`trade-type-badge ${isBuy ? "buy" : "sell"}`}>
                      {trade.tradeType}
                    </span>
                  </td>
                  <td>{trade.quantity}</td>
                  <td>{formatCurrency(priceNum)}</td>
                  <td>{formatCurrency(total)}</td>
                  <td>{formatTradeDate(trade.tradeDate)}</td>

                  <td className="col-action">
                    <button
                      className="edit-button"
                      title="Edit trade"
                      onClick={() => openEditModal(trade)}
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => handleDelete(trade.tradeId)}
                      disabled={deletingId === trade.tradeId}
                    >
                      {deletingId === trade.tradeId ? "..." : <FiTrash2 />}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {editingTrade && (
        <div className="modal-bg">
          <div className="modal-box">
            <h3>Edit Trade</h3>

            <label>Ticker Symbol</label>
            <input
              name="ticker"
              value={editForm.ticker}
              onChange={handleInputChange}
              type="text"
            />

            <label>Trade Type</label>
            <select
              name="tradeType"
              value={editForm.tradeType}
              onChange={handleInputChange}
            >
              <option value="BUY">BUY</option>
              <option value="SELL">SELL</option>
            </select>

            <label>Quantity</label>
            <input
              name="quantity"
              type="number"
              value={editForm.quantity}
              onChange={handleInputChange}
            />

            <label>Price per Share</label>
            <input
              name="price"
              type="number"
              step="0.01"
              value={editForm.price}
              onChange={handleInputChange}
            />

            <label>Date (MM/DD/YYYY)</label>
            <input
              name="tradeDate"
              type="text"
              value={editForm.tradeDate}
              onChange={handleInputChange}
            />

            <div className="btn-row">
              <button className="cancel-btn" onClick={closeEditModal}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSaveEdit}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
