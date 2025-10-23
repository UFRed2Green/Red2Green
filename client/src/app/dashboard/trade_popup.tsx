import Link from "next/link";

export default function DashboardPage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="mt-4 text-gray-600">Welcome back! Here’s your dashboard.</p>

            <div className="mt-6 flex gap-4">
                <Link href="/" className="text-blue-600 underline">
                    Home
                </Link>
                
            </div>
        </main>
    );
}
