import '@/app/styles/dashboard/trade-history.css';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';

interface Trade {
  id: string;
  ticker: string;
  tradeType: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  tradeDate: string;
}

export default function TradeHistory() {
  const trades: Trade[] = [
    {
      id: '1',
      ticker: 'AAPL',
      tradeType: 'BUY',
      quantity: 10,
      price: 175.5,
      tradeDate: '2025-10-14',
    },
    {
      id: '2',
      ticker: 'GOOGL',
      tradeType: 'BUY',
      quantity: 5,
      price: 142.3,
      tradeDate: '2025-10-13',
    },
    {
      id: '3',
      ticker: 'AAPL',
      tradeType: 'SELL',
      quantity: 5,
      price: 178.2,
      tradeDate: '2025-10-15',
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2)}`;
  };

  return (
    <div className="trade-history-wrapper">
      <h2 className="section-heading">Trade History</h2>
      <p className="trade-history-subtitle">View and manage your trades</p>

      <div className="trade-history-table-wrapper">
        <table className="trade-history-table">
          <thead>
            <tr>
              <th className="col-ticker">Ticker</th>
              <th className="col-type">Type</th>
              <th className="col-qty">Qty</th>
              <th className="col-price">Price</th>
              <th className="col-total">Total</th>
              <th className="col-date">Date</th>
              <th className="col-action">Action</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade.id}>
                <td className="col-ticker">{trade.ticker}</td>
                <td className="col-type">
                  <span
                    className={`trade-type-badge ${trade.tradeType === 'BUY' ? 'buy' : 'sell'}`}
                  >
                    {trade.tradeType}
                  </span>
                </td>
                <td className="col-qty">{trade.quantity}</td>
                <td className="col-price">{formatCurrency(trade.price)}</td>
                <td className="col-total">{formatCurrency(trade.quantity * trade.price)}</td>
                <td className="col-date">{formatDate(trade.tradeDate)}</td>
                <td className="col-action">
                  <button className="edit-button" title="Edit trade">
                    <FiEdit2 />
                  </button>
                  <button className="delete-button" title="Delete trade">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
