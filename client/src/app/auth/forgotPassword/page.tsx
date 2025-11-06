'use client';

import '@/app/styles/forgotPassword.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { sendCode, changePass } from "@/lib/forgot-pass";
import { useToast } from '@/components/Toast';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

export default function ForgotPasswordPage() {
    const router = useRouter();
    const { showToast } = useToast();

    const [fullyVisible, setFullyVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(e: any) {
        e.preventDefault();
        if (!fullyVisible) {
            try {
                const data = await sendCode(email);
                if (data.success) {
                    showToast('success', data.message);
                    setFullyVisible(true);
                }
            } catch (err: any) {
                showToast('error', err.message);
            }
        } else {
            try {
                if (!email || !code || !newPassword) {
                    return;
                }

                const data = await changePass(email, code, newPassword);
                if (data.success) {
                    showToast('success', data.message);
                    setTimeout(() => {
                        router.push('/auth/login');
                    }, 1500);
                }

            } catch (err: any) {
                showToast('error', err.message);
            }
        }

    }

    async function handleResend() {
        try {
            const data = await sendCode(email);
            if (data.success) {
                showToast('success', data.message);
            }
        } catch (err: any) {
            showToast('error', err.message);
        }
    }

    return (
        <main>
            <div className='forgot-password-container'>
                <h1>Reset your password</h1>
                <form className='forgot-password-form' onSubmit={handleSubmit}>
                    <h3>Email</h3>
                    <input type='email' placeholder='user@email.com' onChange={(e) => setEmail(e.target.value)} required></input>

                    { fullyVisible &&
                        <>
                            <h3>Code</h3>
                            <input type='text' placeholder='123456' onChange={(e) => setCode(e.target.value)} required></input>
                            <h3>New Password</h3>
                            <div className='password-container'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className='password-input'
                                    placeholder='••••••••••'
                                    required
                                />
                                {newPassword.length > 0 && (
                                    <button
                                        type='button'
                                        className='hide-password-icon'
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                                    </button>
                                )}
                            </div>
                        </>
                    }

                    <button type='submit' className='enter-button'>{fullyVisible ? 'Change Password' : 'Send Code'}</button>
                </form>
                { fullyVisible && <button className='bottom-button' onClick={handleResend}>Resend Code</button>}
                <button className='bottom-button' onClick={() => {
                    router.push('/auth/login');
                }}>Back to Login</button>
                <div style={{margin: '20px'}}></div>
            </div>
            <div className='red-to-green-container'>
                <span className='red-text'>Red</span>
                <span className='two-text'>2</span>
                <span className='green-text'>Green</span>
            </div>
        </main>
    );
}
