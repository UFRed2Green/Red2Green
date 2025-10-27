import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function WatchlistPage() {
  return (
    <ProtectedRoute>
      <main className="watchlist-container">
        <div className="watchlist-header">
          <h1>Watchlist</h1>
        </div>
        <div className="watchlist-content">
          <p>Your watchlist will appear here</p>
        </div>
      </main>
    </ProtectedRoute>
  );
}
