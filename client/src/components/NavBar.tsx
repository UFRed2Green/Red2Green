'use client';

import '@/app/styles/navbar.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="topbar">
      <div className="nav-links">
        <Link href="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
          Dashboard
        </Link>
        <Link href="/trades" className={isActive('/trades') ? 'active' : ''}>
          Trades
        </Link>
        <Link href="/watchlist" className={isActive('/watchlist') ? 'active' : ''}>
          Watchlist
        </Link>
        <Link href="/settings" className={isActive('/settings') ? 'active' : ''}>
          Settings
        </Link>
      </div>
      <a href="#" className="logout">
        Logout
      </a>
    </div>
  );
}