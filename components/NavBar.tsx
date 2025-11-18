import Link from "next/link";

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-blue-900 hover:text-blue-700 transition-colors">
            Dan the AI Pro
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Products
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

