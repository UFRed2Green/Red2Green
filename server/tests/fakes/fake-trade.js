
export function createFakeTrade(overrides = {}) {
  const baseTrade = {
    tradeId: "test-trade-uuid-1234",
    ticker: "AAPL",
    tradeType: "BUY",
    quantity: 10,
    price: 150.0,
    tradeDate: new Date().toISOString(),
    userId: 1,
  };

  return { ...baseTrade, ...overrides };
}