import '@/app/styles/dashboard/trade-form.css';

export type Trade = {
  tradeId?: string;
  tradeDate?: string;
  ticker: string;
  tradeType: "BUY" | "SELL";
  quantity: number;
  price: number;
};

export default function TradeForm() {
  return (
    <div className="trade-form-container">
      {/* Header Section */}
      <div className="trade-form-header">
        <div className="trade-form-title">
          <div className="trade-form-icon">+</div>
          <h2 className="trade-form-heading">Add New Trade</h2>
        </div>
        <p className="trade-form-subtitle">Enter trade details to add to your portfolio</p>
      </div>

      {/* Form Content */}
      <div className="trade-form-content">
        {/* Top Row - Ticker & Trade Type */}
        <div className="trade-form-row">
          <div className="trade-form-field">
            <label className="trade-form-label">Ticker Symbol</label>
            <input
              type="text"
              className="trade-form-input"
              placeholder="AAPL"
            />
          </div>

          <div className="trade-form-field">
            <label className="trade-form-label">Trade Type</label>
            <select className="trade-form-select">
              <option value="BUY">Buy</option>
              <option value="SELL">Sell</option>
            </select>
          </div>
        </div>

        {/* Middle Row - Quantity & Price */}
        <div className="trade-form-row">
          <div className="trade-form-field">
            <label className="trade-form-label">Quantity</label>
            <input
              type="number"
              className="trade-form-input"
              placeholder="10"
              min={1}
            />
          </div>

          <div className="trade-form-field">
            <label className="trade-form-label">Price per Share</label>
            <input
              type="number"
              className="trade-form-input"
              placeholder="150.00"
              min={0.01}
              step="0.01"
            />
          </div>
        </div>

        {/* Trade Date */}
        <div className="trade-form-field-full">
          <label className="trade-form-label">Trade Date</label>
          <input
            type="date"
            className="trade-form-input"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button className="trade-form-button">
        <span className="trade-form-button-icon">+</span>
        <span className="trade-form-button-text">Add Trade</span>
      </button>
    </div>
  );
}
