"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { addTrade } from '@/lib/trades';
import '@/app/styles/dashboard/trade-form.css';

interface TradeFormProps {
  onTradeAdded?: () => void;
}

const getTodayDate = () => new Date().toISOString().split('T')[0];

const getInitialFormState = () => ({
  ticker: '',
  tradeType: 'BUY' as 'BUY' | 'SELL',
  quantity: '',
  price: '',
  tradeDate: getTodayDate(),
});

export default function TradeForm({ onTradeAdded }: TradeFormProps) {
  const { token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(getInitialFormState());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      alert('You must be logged in to add a trade');
      return;
    }

    if (!formData.ticker.trim() || !formData.quantity || !formData.price) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await addTrade(token, {
        ticker: formData.ticker.trim().toUpperCase(),
        tradeType: formData.tradeType,
        quantity: parseInt(formData.quantity),
        price: parseFloat(formData.price),
        tradeDate: formData.tradeDate,
      });

      // Reset form to initial state with fresh date
      setFormData(getInitialFormState());

      onTradeAdded?.();
    } catch (error) {
      console.error('Failed to add trade:', error);
      alert(error instanceof Error ? error.message : 'Failed to add trade');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="trade-form-container">
      <h2 className="section-heading">Add New Trade</h2>
      <p className="trade-form-subtitle">Enter trade details to add to your portfolio</p>

      <form className="trade-form-content" onSubmit={handleSubmit}>
        <div className="trade-form-row">
          <div className="trade-form-field">
            <label className="trade-form-label">Ticker Symbol</label>
            <input
              type="text"
              name="ticker"
              className="trade-form-input"
              placeholder="AAPL"
              value={formData.ticker}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="trade-form-field">
            <label className="trade-form-label">Trade Type</label>
            <select
              name="tradeType"
              className="trade-form-select"
              value={formData.tradeType}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="BUY">Buy</option>
              <option value="SELL">Sell</option>
            </select>
          </div>
        </div>

        <div className="trade-form-row">
          <div className="trade-form-field">
            <label className="trade-form-label">Quantity</label>
            <input
              type="number"
              name="quantity"
              className="trade-form-input"
              placeholder="10"
              min={1}
              value={formData.quantity}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="trade-form-field">
            <label className="trade-form-label">Price per Share</label>
            <input
              type="number"
              name="price"
              className="trade-form-input"
              placeholder="150.00"
              min={0.01}
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>
        </div>

        <div className="trade-form-field-full">
          <label className="trade-form-label">Trade Date</label>
          <input
            type="date"
            name="tradeDate"
            className="trade-form-input"
            value={formData.tradeDate}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
        </div>

        <button
          type="submit"
          className="trade-form-button"
          disabled={isSubmitting}
        >
          <span className="trade-form-button-icon">+</span>
          <span className="trade-form-button-text">
            {isSubmitting ? 'Adding...' : 'Add Trade'}
          </span>
        </button>
      </form>
    </div>
  );
}
