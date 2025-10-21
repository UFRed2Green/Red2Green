import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-blue-600">
            Red2Green
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/dashboard/history" className="text-gray-700 hover:text-blue-600">
              History
            </Link>
            <Link href="/profile" className="text-gray-700 hover:text-blue-600">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
