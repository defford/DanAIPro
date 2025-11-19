import { createServerClient as createSupabaseServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}

export async function createServerClient() {
  const cookieStore = await cookies();

  return createSupabaseServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch (error) {
          // In server actions, we can't set cookies directly
          // The cookies will be set via the response headers
          // This is expected behavior in Next.js server actions
        }
      },
    },
  });
}

import { createClient } from "@supabase/supabase-js";

export function createStaticClient(options?: {
  global?: {
    fetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  };
}) {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, options);
}

