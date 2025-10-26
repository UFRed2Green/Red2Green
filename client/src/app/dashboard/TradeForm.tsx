"use client";

import { useState } from "react";

export type Trade = {
  tradeId?: string;
  tradeDate?: string;
  ticker: string;
  tradeType: "BUY" | "SELL";
  quantity: number;
  price: number;
};

export default function TradeForm({ onCreate }: { onCreate?: (t: Trade) => void }) {
  const [ticker, setTicker] = useState("");
  const [tradeType, setTradeType] = useState<"BUY" | "SELL">("BUY");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setError(null);
    if (!ticker.trim()) return setError("Ticker is required");
    if (!Number.isInteger(quantity) || quantity <= 0) return setError("Quantity must be a positive integer");
    if (!(Number(price) > 0)) return setError("Price must be a positive number");

    setLoading(true);
    try {
      const payload = { ticker: ticker.trim().toUpperCase(), tradeType, quantity, price };
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) headers["Authorization"] = token;
      const base = typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : '';
      const res = await fetch(`${base}/api/trades`, { method: 'POST', headers, body: JSON.stringify(payload) });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error?.message || json?.message || 'Failed to add trade');
      onCreate?.(json.data);
      setTicker("");
      setTradeType("BUY");
      setQuantity(0);
      setPrice(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <html><body>
    <div className="flex flex-col gap-3">
      {error && <div className="text-red-600 text-sm">{error}</div>}

      <label className="text-sm font-medium">Ticker</label>
      <input value={ticker} onChange={(e) => setTicker(e.target.value)} className="border p-2 rounded" placeholder="AAPL" />

      <label className="text-sm font-medium">Type</label>
      <select value={tradeType} onChange={(e) => setTradeType(e.target.value as "BUY" | "SELL")} className="border p-2 rounded">
        <option value="BUY">Buy</option>
        <option value="SELL">Sell</option>
      </select>

      <label className="text-sm font-medium">Quantity</label>
      <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="border p-2 rounded" min={1} />

      <label className="text-sm font-medium">Price</label>
      <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="border p-2 rounded" min={0.01} step="0.01" />

      <div className="flex justify-end gap-2 mt-2">
        <button onClick={submit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Trade'}
        </button>
      </div>
    </div>
    </body></html>
  );
}
