"use client";

import '@/app/styles/login.css'
import { useState } from "react";
import { AiOutlineStock } from "react-icons/ai";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container">
      {/* LEFT PANEL */}
      <HeroSection />

      {/* RIGHT PANEL */}
      <div className="right">
        <div className="form-container">
          <h2>Login</h2>
          <form className='login-form'>
            <h3>First Name</h3>
            <div className='email-container'>
              <input type="email" placeholder="user@email.com" />
            </div>

            <h3>Password</h3>
            <div className='password-container'>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='password-input'
                placeholder='••••••••••'
              />
              <span
                className={`hide-password-icon ${showPassword ? 'active' : ''}`}
                onClick={() => setShowPassword(!showPassword)}
              >
                { password.length > 0 && (showPassword ? <RiEyeOffFill /> : <RiEyeFill />)}
              </span>
            </div>

            <button>Login</button>
          </form>
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
