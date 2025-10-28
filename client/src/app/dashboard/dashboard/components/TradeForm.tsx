import '@/app/styles/dashboard/trade-form.css';

export default function TradeForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement trade adding functionality
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

        <div className="trade-form-field-full">
          <label className="trade-form-label">Trade Date</label>
          <input type="date" className="trade-form-input" />
        </div>

        <button type="submit" className="trade-form-button">
          <span className="trade-form-button-icon">+</span>
          <span className="trade-form-button-text">Add Trade</span>
        </button>
      </form>
    </div>
  );
}
