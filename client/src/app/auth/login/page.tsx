"use client";

import '@/app/styles/login.css'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineStock } from "react-icons/ai";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      // Redirect to dashboard on successful login
      router.replace("/dashboard/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      {/* LEFT PANEL */}
      <HeroSection />

      {/* RIGHT PANEL */}
      <div className="right">
        <div className="form-container">
          <h2>Login</h2>
          <form className='login-form' onSubmit={handleSubmit}>
            <h3>Email</h3>
            <div className='email-container'>
              <input
                type="email"
                placeholder="user@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <h3>Password</h3>
            <div className='password-container'>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='password-input'
                placeholder='••••••••••'
                required
                disabled={isLoading}
              />
              <span
                className={`hide-password-icon ${showPassword ? 'active' : ''}`}
                onClick={() => setShowPassword(!showPassword)}
              >
                { password.length > 0 && (showPassword ? <RiEyeOffFill /> : <RiEyeFill />)}
              </span>
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="auth-links">
            <Link href="/auth/forgotPassword" className="forgot-password-link">
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <div className="register-hero-section-container">
      <p className="welcome-text">
        The best way to track your profits.
        <br />
        Sign up for free.
      </p>

      <div className="stock-line">
        <AiOutlineStock size={400} className="stock-icon" />
      </div>

      <div className="red-to-green-container">
        <span className="red-text">Red</span>
        <span className="two-text">2</span>
        <span className="green-text">Green</span>
      </div>
    </div>
  );
}
