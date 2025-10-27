'use client';

import '@/app/styles/forgotPassword.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { sendCode, changePass } from "@/lib/forgot-pass";

export default function ForgotPasswordPage() {
    const router = useRouter();

    const [fullyVisible, setFullyVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");

    async function handleSubmit(e: any) {
        e.preventDefault();
        if (!fullyVisible) {
            try {
                const data = await sendCode(email);

                if (data.success) {
                    setFullyVisible(true);
                } else {
                    console.log("Failed to send code.");
                }
            } catch (err: any) {
                console.error("Code failed to send:", err.message);
            }
        } else {
            try {
                if (!email || !code || !newPassword) {
                    console.log("Missing information");
                    return;
                }

                const data = await changePass(email, code, newPassword);

                if (data.success) {
                    router.push('/auth/forgotPassword/back');
                } else {
                    console.log("Failed to change password.");
                }

            } catch (err: any) {
                console.error("Failed to change password:", err.message);
            }
        }

        
    }

    async function handleResend() {
        try {
            const data = await sendCode(email);
        } catch (err: any) {
            console.error("Code failed to send:", err.message);
        }
    }

    return (
        <main>
            <div className='forgot-password-container'>
                <h1>Reset your password</h1>
                <form className='forgot-password-form'>
                    <h3>Email</h3>
                    <input type='email' placeholder='user@email.com' onChange={(e) => setEmail(e.target.value)}></input>

                    { fullyVisible &&
                        <>
                            <h3>Code</h3>
                            <input type='text' placeholder='123456' onChange={(e) => setCode(e.target.value)}></input>
                            <h3>New Password</h3>
                            <input type='text' placeholder='••••••••••' onChange={(e) => setNewPassword(e.target.value)}></input>
                        </>
                    }

                    <button type='submit' className='enter-button' onClick={(e) => {handleSubmit(e)}}>{fullyVisible ? 'Change Password' : 'Send Code'}</button>
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
