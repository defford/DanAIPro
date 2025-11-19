import Link from "next/link";

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/95 backdrop-blur-sm border-b border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors">
            Dan the AI Pro
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/browse"
              className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors font-medium"
            >
              Browse
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
