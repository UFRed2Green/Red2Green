'use client';

import '@/app/styles/navbar.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FaChartLine, FaExchangeAlt, FaEye, FaCog, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

export default function NavBar() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="topbar">
      <div className="logo">
        <Link href="/">
          <FaChartLine className="logo-icon" />
          <span>Red2Green</span>
        </Link>
      </div>

      <div className="nav-links">
        {isAuthenticated && (
          <>
            <Link href="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
              <FaChartLine className="nav-icon" />
              <span>Dashboard</span>
            </Link>
            <Link href="/trades" className={isActive('/trades') ? 'active' : ''}>
              <FaExchangeAlt className="nav-icon" />
              <span>Trades</span>
            </Link>
            <Link href="/watchlist" className={isActive('/watchlist') ? 'active' : ''}>
              <FaEye className="nav-icon" />
              <span>Watchlist</span>
            </Link>
            <Link href="/settings" className={isActive('/settings') ? 'active' : ''}>
              <FaCog className="nav-icon" />
              <span>Settings</span>
            </Link>
          </>
        )}
      </div>

      <div className="auth-buttons">
        {isAuthenticated ? (
          <button className="logout" disabled>
            <FaSignOutAlt className="button-icon" />
            <span>Logout</span>
          </button>
        ) : (
          <>
            <Link href="/auth/login" className="login-btn">
              <FaSignInAlt className="button-icon" />
              <span>Login</span>
            </Link>
            <Link href="/auth/register" className="register-btn">
              <FaUserPlus className="button-icon" />
              <span>Register</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
