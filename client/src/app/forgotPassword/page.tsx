import '@/app/styles/forgotPassword.css';

export default function ForgotPasswordPage() {
    return (
        <html><body>
            <main className=''>
                <form>
                    <input type='email'></input>
                    <button type="submit">Enter Code</button>
                </form>
                <button>Resend Email</button>
            </main>
        </body></html>
    );
}