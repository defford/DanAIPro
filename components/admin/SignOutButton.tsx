"use client";

import { signOut } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
    >
      Sign Out
    </button>
  );
}

