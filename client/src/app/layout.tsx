import { ReactNode } from 'react';
import '@/app/styles/globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import { Toast } from '@/components/Toast';
import NavBar from '@/components/NavBar';

export const metadata = {
  title: 'Red2Green - Trading Tracker',
  description: 'The best way to track your trading profits',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <AuthProvider>
            <NavBar />
            {children}
          </AuthProvider>
          <Toast />
        </ToastProvider>
      </body>
    </html>
  );
}
