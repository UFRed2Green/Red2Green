'use client';

import '@/app/styles/settings.css';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import ChangePasswordForm from './components/ChangePasswordForm';

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <main className="settings-main">
        <ChangePasswordForm />
      </main>
    </ProtectedRoute>
  );
}
