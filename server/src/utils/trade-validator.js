export function validateTradeInput({ ticker, tradeType, quantity, price }) {
    const normalizedTicker =
        typeof ticker === "string" ? ticker.trim().toUpperCase() : "";
    const normalizedType =
        typeof tradeType === "string" ? tradeType.toUpperCase() : "";
    const quantityNum = Number(quantity);
    const priceNum = Number(price);

    if (!normalizedTicker) throw new Error("Ticker is required");
    if (!["BUY", "SELL"].includes(normalizedType))
        throw new Error("Invalid trade type: must be 'BUY' or 'SELL'");
    if (
        !Number.isFinite(quantityNum) ||
        quantityNum <= 0 ||
        !Number.isInteger(quantityNum)
    )
        throw new Error("Invalid quantity: must be a positive integer");
    if (!Number.isFinite(priceNum) || priceNum <= 0)
        throw new Error("Invalid price: must be a positive number");

    return { normalizedTicker, normalizedType, quantityNum, priceNum };
}
