"use client";

import { useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [showTrade, setShowTrade] = useState(false);

  function handleClick() {
    setShowTrade(true);
  }

  function closeTrade() {
    setShowTrade(false);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
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

      {/* Trade Modal */}
      {showTrade && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Make a Trade</h2>
            <p>Enter trade details here.</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeTrade}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
