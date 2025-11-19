'use client';

import '@/app/styles/navbar.css';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FaChartLine, FaExchangeAlt, FaEye, FaCog, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  const handleLogout = () => {
    logout();
    router.push('/');
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="topbar">
      <div className="logo">
        <Link href="/" onClick={closeMobileMenu}>
          <FaChartLine className="logo-icon" />
          <span>Red2Green</span>
        </Link>
      </div>

      {/* Hamburger Menu Button - Mobile Only */}
      <button
        className="hamburger-menu"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation Links - Desktop & Mobile */}
      <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        {isAuthenticated && (
          <>
            <Link
              href="/dashboard/dashboard"
              className={isActive('/dashboard/dashboard') ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              <FaChartLine className="nav-icon" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className={isActive('/dashboard/settings') ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              <FaCog className="nav-icon" />
              <span>Settings</span>
            </Link>
          </>
        )}
      </div>

      {/* Auth Buttons - Desktop & Mobile */}
      <div className={`auth-buttons ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="logout">
            <FaSignOutAlt className="button-icon" />
            <span>Logout</span>
          </button>
        ) : (
          <>
            <Link href="/auth/login" className="login-btn" onClick={closeMobileMenu}>
              <FaSignInAlt className="button-icon" />
              <span>Login</span>
            </Link>
            <Link href="/auth/register" className="register-btn" onClick={closeMobileMenu}>
              <FaUserPlus className="button-icon" />
              <span>Register</span>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMobileMenu}></div>
      )}
    </div>
  );
}
