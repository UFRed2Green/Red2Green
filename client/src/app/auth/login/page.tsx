"use client";

import '@/app/styles/login.css';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineStock } from "react-icons/ai";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  return (
    <main className="login-container">
      <HeroSection />
      <LoginForm />
    </main>
  );
}

function HeroSection() {
  return (
    <div className="login-hero-section-container">
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

function LoginForm() {
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
      router.replace("/dashboard/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <h1 className="login-form-header">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <h3>Email</h3>
        <input
          type="email"
          placeholder="user@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
        
        <h3>Password</h3>
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password-input"
            placeholder="••••••••••"
            required
            disabled={isLoading}
          />

          {password.length > 0 && (
            <button
              type="button"
              className="hide-password-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
            </button>
          )}
        </div>

        <button className="login-button" type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="auth-links">
        <Link href="/auth/forgotPassword" className="forgot-password-link">
          Forgot Password?
        </Link>
      </div>
    </div>
  );
}