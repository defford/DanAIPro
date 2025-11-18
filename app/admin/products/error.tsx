"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Admin products error:", error);
  }, [error]);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <div className="flex gap-4">
          <button
            onClick={() => reset()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Try again
          </button>
          <button
            onClick={() => router.push("/admin/login")}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    </main>
  );
}

