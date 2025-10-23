import Link from "next/link";

export default function LoginPage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-8">
            <h1 className="text-3xl font-semibold">Login</h1>
            <form className="flex flex-col gap-4 mt-6 w-80">
                <input type="email" placeholder="Email" className="border p-2 rounded" />
                <input type="password" placeholder="Password" className="border p-2 rounded" />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                    Sign In
                </button>
            </form>

            <div className="mt-6 flex gap-4">
                <Link href="/dashboard" className="text-blue-600 underline">
                    Dashboard
                </Link>
            </div>
        </main>
    );
}
