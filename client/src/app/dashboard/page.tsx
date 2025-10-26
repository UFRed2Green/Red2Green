"use client";

import Link from "next/link";
import "@/app/styles/dashboard/dashboard.css";
import { useState } from "react";

export default function DashboardPage() {
  // Example local state for trades
  const [trades, setTrades] = useState([
    { ticker: "AAPL", type: "BUY", qty: 10, price: 150 },
    { ticker: "MSFT", type: "SELL", qty: 5, price: 310 },
  ]);

  function addTrade(trade: any) {
    setTrades([...trades, trade]);
  }

  return (
    <html><body>
        <main className="dashboard-container">
          {/* LEFT COLUMN */}
          <div className="left-column">
            {/* --- PERFORMANCE CHART --- */}
            <div className="stock-performance-container card-container">
              <h2>Performance Chart</h2>
              {/* Insert chart component here later */}
              <div className="chart-placeholder">[Chart coming soon]</div>
            </div>

            {/* --- ADD NEW TRADE --- */}
            <div className="add-new-trade-container card-container">
              <h2>Add New Trade</h2>
              <TradeForm onAddTrade={addTrade} />
            </div>

            {/* --- TRADE HISTORY --- */}
            <div className="trade-history-container card-container">
              <h2>Trade History</h2>
              <ul>
                {trades.map((t, i) => (
                  <li key={i}>
                    {t.ticker} – {t.type} {t.qty} @ ${t.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="right-column">
            <div className="total-invested-container card-container">
              <h2>Total Invested</h2>
              ${trades.reduce((sum, t) => sum + t.qty * t.price, 0)}
            </div>

            <div className="total-revenue-container card-container">
              <h2>Total Revenue</h2>
              $0 {/* Placeholder until you track closed trades */}
            </div>

            <div className="realized-pl-container card-container">
              <h2>Realized P&L</h2>
              Coming soon
            </div>

            <div className="total-trades-container card-container">
              <h2>Total Trades</h2>
              {trades.length}
            </div>

            <div className="risk-reward-container card-container">
              <h2>Risk Reward</h2>
              Coming soon
            </div>

            <div className="position-sizes-container card-container">
              <h2>Position Sizes</h2>
              [Bar chart placeholder]
            </div>
          </div>
        </main>
      
    </body></html>
  );
}

// --- SMALL TRADE FORM COMPONENT ---
function TradeForm({ onAddTrade }: { onAddTrade: Function }) {
  const [ticker, setTicker] = useState("");
  const [type, setType] = useState("BUY");
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onAddTrade({ ticker, type, qty, price });
    setTicker("");
    setQty(0);
    setPrice(0);
  }

  return (
    <form onSubmit={handleSubmit} className="trade-form">
      <input
        type="text"
        placeholder="Ticker"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="BUY">BUY</option>
        <option value="SELL">SELL</option>
      </select>
      <input
        type="number"
        placeholder="Quantity"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        required
      />
      <button type="submit">Add Trade</button>
    </form>
  );
}
