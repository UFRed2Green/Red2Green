'use client';

import '@/app/styles/forgotPassword.css';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
    const router = useRouter();

    return (
        <main>
            <h1>Your password has been successfully changed</h1>
            <button
                className='bottom-button'
                style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
                onClick={() => {
                    router.push('/login');
                }}>
                Back to Login
            </button>
        </main>
    );
    
}
