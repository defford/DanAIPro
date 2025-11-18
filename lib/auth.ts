import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  try {
    const supabase = await createServerClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    
    if (error) {
      console.error("Auth error:", error);
      return null;
    }
    
    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/admin/login");
  }
  return user;
}

