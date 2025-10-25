import { ReactNode } from 'react';
import '@/app/styles/globals.css';

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
        {children}
      </body>
    </html>
  );
}
