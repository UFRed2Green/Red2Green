"use client";

import { useState, useEffect } from 'react';
import { type Trade } from '@/lib/trades';
import '@/app/styles/dashboard/edit-trade-modal.css';

interface EditTradeModalProps {
  trade: Trade | null;
  onClose: () => void;
  onSave: (updatedTrade: Trade) => void;
  isSaving?: boolean;
}

export default function EditTradeModal({ trade, onClose, onSave, isSaving = false }: EditTradeModalProps) {
  const [editForm, setEditForm] = useState({
    ticker: "",
    tradeType: "BUY",
    quantity: 1,
    price: "",
    tradeDate: ""
  });

  useEffect(() => {
    if (trade) {
      setEditForm({
        ticker: trade.ticker,
        tradeType: trade.tradeType,
        quantity: trade.quantity,
        price: parseFloat(trade.price).toFixed(2),
        tradeDate: new Date(trade.tradeDate).toISOString().split('T')[0]
      });
    }
  }, [trade]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    if (!trade) return;

    const updatedTrade: Trade = {
      ...trade,
      ticker: editForm.ticker,
      tradeType: editForm.tradeType as "BUY" | "SELL",
      quantity: Number(editForm.quantity),
      price: parseFloat(editForm.price).toFixed(2),
      tradeDate: editForm.tradeDate
    };

    onSave(updatedTrade);
  };

  if (!trade) return null;

  return (
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

        <label>Trade Date</label>
        <input
          name="tradeDate"
          type="date"
          value={editForm.tradeDate}
          onChange={handleInputChange}
        />

        <div className="btn-row">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSaveEdit} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
