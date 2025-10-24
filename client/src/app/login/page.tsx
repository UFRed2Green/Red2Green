"use client";

import '@/app/styles/login.css'
import { useState } from "react";
import { AiOutlineStock } from "react-icons/ai";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <html><body>
      <div className="container">
        {/* LEFT PANEL */}
        <HeroSection />

        {/* RIGHT PANEL */}
        <div className="right">
          <div className="form-container">
            <h2>Login</h2>

            <input type="email" placeholder="user@email.com" />

            <div className='password-container'>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='password-input'
                placeholder='Password'
              />
              <span
                className={`hide-password-icon ${showPassword ? 'active' : ''}`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
              </span>
            </div>

            <button>Login</button>
          </div>
        </div>
      </div>
    </body></html>
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
