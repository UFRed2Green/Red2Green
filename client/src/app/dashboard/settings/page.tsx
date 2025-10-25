import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <main className="settings-container">
        <div className="settings-header">
          <h1>Settings</h1>
        </div>
        <div className="settings-content">
          <p>Your settings will appear here</p>
        </div>
      </main>
    </ProtectedRoute>
  );
}
