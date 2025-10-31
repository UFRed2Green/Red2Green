/**
 * Trade form validation utilities
 */
export interface TradeFormData {
  ticker: string;
  quantity: string;
  price: string;
}

export function validateTradeForm(formData: TradeFormData): string {
  if (!formData.ticker.trim()) {
    return 'Ticker symbol is required';
  }

  if (!formData.quantity) {
    return 'Quantity is required';
  }

  if (!formData.price) {
    return 'Price per share is required';
  }

  return '';
}
