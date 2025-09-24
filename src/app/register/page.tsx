import Link from "next/link";

export default function RegisterPage() {
    return (
        <html><body>
            <main className="flex flex-col items-center justify-center min-h-screen p-8">
                <h1 className="text-3xl font-semibold">Register</h1>
                <form className="flex flex-col gap-4 mt-6 w-80">
                    <input type="text" placeholder="Name" className="border p-2 rounded" />
                    <input type="email" placeholder="Email" className="border p-2 rounded" />
                    <input type="password" placeholder="Password" className="border p-2 rounded" />
                    <button type="submit" className="bg-green-600 text-white p-2 rounded">
                        Sign Up
                    </button>
                </form>

                <div className="mt-6 flex gap-4">
                    <Link href="/login" className="text-blue-600 underline">
                        Login
                    </Link>
                </div>

            </main>
        </body></html>
    );
}
