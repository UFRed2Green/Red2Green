"use client";

import '@/app/styles/register.css';
import Link from 'next/link';
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { AiOutlineStock } from "react-icons/ai";
import { useState } from 'react';

export default function RegisterPage() {
    return (
        <html><body>
            <main className='register-container'>
                
                <HeroSection />
                <RegisterForm />
            </main>
        </body></html>
    );
}

function HeroSection() {
    return (
        <div className='register-hero-section-container'>
            <p className='welcome-text'>
                The best way to track your profits.
                <br />
                Sign up for free.
            </p>

            <div className='stock-line'>
                <AiOutlineStock size={400} className='stock-icon'/>
            </div>
            
            <div className='red-to-green-container'>
                <span className='red-text'>Red</span>
                <span className='two-text'>2</span>
                <span className='green-text'>Green</span>
            </div>
        </div>
    );
}

function RegisterForm() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='register-form-container'>
            <h1 className='register-form-header'>Create an account</h1>
            <form className='register-form'>
                <input type='first-name' placeholder='First Name'/>
                <input type='last-name' placeholder='Last Name'/>
                <input type='email' placeholder='user@email.com'/>
                <div className='password-container'>
                    <input 
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='password-input'
                        placeholder='Password'
                    />

                    {password.length > 0 && (
                        <button
                            type='button'
                            className='hide-password-icon'
                            onClick={() => setShowPassword(!showPassword)}    
                        >
                            {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                        </button>
                    )}
                </div>
                <button className='sign-up-button' type="submit">Sign Up</button>
            </form>
            <button className='login-button'>Already have an account? Log in</button>
        </div>
    );
}
