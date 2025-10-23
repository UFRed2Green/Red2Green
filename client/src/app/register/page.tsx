"use client";

import '@/app/styles/register.css';
import { useRouter } from 'next/navigation';
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { AiOutlineStock } from "react-icons/ai";
import { useState } from 'react';
import { register } from '@/lib/register';

export default function RegisterPage() {
    return (
        <main className='register-container'>

            <HeroSection />
            <RegisterForm />
        </main>
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
                <AiOutlineStock size={400} className='stock-icon' />
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
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        try {
            const data = await register(firstName, lastName, email, password);
        } catch (err: any) {
            console.error("Register failed:", err.message);
        }
    }

    return (
        <div className='register-form-container'>
            <h1 className='register-form-header'>Create an account</h1>
            <form className='register-form' onSubmit={handleRegister}>
                <h3>First Name</h3>
                <input type='first-name' placeholder='Red' onChange={e => setFirstName(e.target.value)}/>
                <h3>Last Name</h3>
                <input type='last-name' placeholder='Green' onChange={e => setLastName(e.target.value)}/>
                <h3>Email</h3>
                <input type='email' placeholder='user@email.com' onChange={e => setEmail(e.target.value)}/>
                <h3>Password</h3>
                <div className='password-container'>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='password-input'
                        placeholder='••••••••••'
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
            <button className='login-button' onClick={() => {
                router.push('/login');
            }}>Already have an account? Log in</button>
        </div>
    );
}
