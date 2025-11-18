"use server";

import { createServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function signIn(email: string, password: string) {
  try {
    const supabase = await createServerClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Sign in error:", error);
      return { error: error.message };
    }

    // Revalidate the admin path to ensure auth state is updated
    revalidatePath("/admin/products");
    
    return { success: true, user: data.user };
  } catch (err) {
    console.error("Sign in exception:", err);
    return { 
      error: err instanceof Error ? err.message : "An unexpected error occurred" 
    };
  }
}

export async function signOut() {
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  return { success: true };
}

