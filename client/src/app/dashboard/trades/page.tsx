import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function TradesPage() {
  return (
    <ProtectedRoute>
      <main className="trades-container">
        <div className="trades-header">
          <h1>Trades</h1>
        </div>
        <div className="trades-content">
          <p>Your trades will appear here</p>
        </div>
      </main>
    </ProtectedRoute>
  );
}
