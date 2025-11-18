import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen p-8 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Product Not Found</h1>
        <p className="text-lg mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 underline"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
}

