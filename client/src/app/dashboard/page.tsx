"use client";

import { useState } from "react";
import Link from "next/link";

type Trade = {
  tradeId?: string;
  ticker: string;
  tradeType: "BUY" | "SELL";
  quantity: number;
  price: number;
  tradeDate?: string;
};

export default function DashboardPage() {
  const [showTrade, setShowTrade] = useState(false);
  const [ticker, setTicker] = useState("");
  const [tradeType, setTradeType] = useState<"BUY" | "SELL">("BUY");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);

  function handleClick() {
    setShowTrade(true);
    setError(null);
    setSuccess(null);
  }

  function closeTrade() {
    setShowTrade(false);
  }

  function validate(): string | null {
    if (!ticker.trim()) return "Ticker is required";
    if (!["BUY", "SELL"].includes(tradeType)) return "Trade type must be BUY or SELL";
    if (!Number.isInteger(Number(quantity)) || Number(quantity) <= 0) return "Quantity must be a positive integer";
    const p = Number(price);
    if (!Number.isFinite(p) || p <= 0) return "Price must be a positive number";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch("/api/trades", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {}),
        },
        body: JSON.stringify({
          ticker: ticker.trim(),
          tradeType,
          quantity: Number(quantity),
          price: Number(price),
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json?.error?.message || json?.message || "Failed to add trade");
        setLoading(false);
        return;
      }

      const created: Trade = json?.data || json;
      setTrades((prev) => [created, ...prev]);
      setSuccess("Trade added successfully");
      // reset form
      setTicker("");
      setTradeType("BUY");
      setQuantity(1);
      setPrice("");
      // close after short delay
      setTimeout(() => {
        setShowTrade(false);
      }, 700);
    } catch (err: any) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center justify-start min-h-screen p-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-4 text-gray-600">Welcome back! Here’s your dashboard.</p>

      <div className="mt-6 flex gap-4">
        <Link href="/" className="text-blue-600 underline">
          Home
        </Link>
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Trade
        </button>
      </div>

      {/* Trades list */}
      <div className="w-full max-w-3xl mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Trades</h2>
        {trades.length === 0 ? (
          <div className="text-gray-500">No trades yet</div>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="text-left text-sm text-gray-600">
                <th className="px-2 py-1">Date</th>
                <th className="px-2 py-1">Ticker</th>
                <th className="px-2 py-1">Type</th>
                <th className="px-2 py-1">Qty</th>
                <th className="px-2 py-1">Price</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((t, idx) => (
                <tr key={t.tradeId || idx} className="border-t">
                  <td className="px-2 py-1 text-sm text-gray-600">{t.tradeDate ? new Date(t.tradeDate).toLocaleString() : "-"}</td>
                  <td className="px-2 py-1 text-sm">{t.ticker}</td>
                  <td className="px-2 py-1 text-sm">{t.tradeType}</td>
                  <td className="px-2 py-1 text-sm">{t.quantity}</td>
                  <td className="px-2 py-1 text-sm">{t.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Trade Modal */}
      {showTrade && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Make a Trade</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label className="text-sm">Ticker</label>
              <input
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                className="border p-2 rounded"
                placeholder="e.g. AAPL"
              />

              <label className="text-sm">Type</label>
              <select value={tradeType} onChange={(e) => setTradeType(e.target.value as any)} className="border p-2 rounded">
                <option value="BUY">BUY</option>
                <option value="SELL">SELL</option>
              </select>

              <label className="text-sm">Quantity</label>
              <input
                type="number"
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border p-2 rounded"
              />

              <label className="text-sm">Price</label>
              <input
                type="number"
                step="0.01"
                value={price as any}
                onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                className="border p-2 rounded"
              />

              {error && <div className="text-red-600 text-sm">{error}</div>}
              {success && <div className="text-green-600 text-sm">{success}</div>}

              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={closeTrade} className="bg-gray-300 px-3 py-2 rounded">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
                  {loading ? "Saving..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
