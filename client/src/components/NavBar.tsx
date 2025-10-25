'use client';

import '@/app/styles/navbar.css';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FaChartLine, FaExchangeAlt, FaEye, FaCog, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  const isActive = (href: string) => pathname === href;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

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
            <Link href="/dashboard/dashboard" className={isActive('/dashboard/dashboard') ? 'active' : ''}>
              <FaChartLine className="nav-icon" />
              <span>Dashboard</span>
            </Link>
            <Link href="/dashboard/trades" className={isActive('/trades') ? 'active' : ''}>
              <FaExchangeAlt className="nav-icon" />
              <span>Trades</span>
            </Link>
            <Link href="/dashboard/watchlist" className={isActive('/watchlist') ? 'active' : ''}>
              <FaEye className="nav-icon" />
              <span>Watchlist</span>
            </Link>
            <Link href="/dashboard/settings" className={isActive('/settings') ? 'active' : ''}>
              <FaCog className="nav-icon" />
              <span>Settings</span>
            </Link>
          </>
        )}
      </div>

      <div className="auth-buttons">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="logout">
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
