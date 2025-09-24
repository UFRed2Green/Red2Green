import Link from "next/link";

export default function LandingPage() {
  return (
    <html><body>
      <main className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-4xl font-bold">Welcome to Red 2 Green 🚀</h1>
        <p className="mt-4 text-lg text-gray-600">This is the landing page.</p>
        <div className="mt-6 flex gap-4">
          <Link href="/login" className="text-blue-600 underline">
            Login
          </Link>
          <Link href="/register" className="text-blue-600 underline">
            Register
          </Link>
          <Link href="/dashboard" className="text-blue-600 underline">
            Dashboard
          </Link>
        </div>
      </main>
    </body></html>
  );
}
