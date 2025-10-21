import '@/app/styles/forgotPassword.css';

export default function ForgotPasswordPage() {
    return (
        <html><body>
            <main className='forgot-password-container'>
                <h1></h1>
                <form className='forgot-password-form'>
                    <input type='email' placeholder='user@email.com'></input>
                    <input type='text' placeholder='New Password'></input>
                    <button type="submit">Enter Code</button>
                </form>
                <button>Resend Email</button>
            </main>
        </body></html>
    );
}