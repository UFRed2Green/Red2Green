import { ReactNode } from 'react';
import NavBar from '@/components/NavBar';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
