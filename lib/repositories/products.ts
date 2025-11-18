import { createServerClient } from "@/lib/supabase/server";

export interface Product {
  id: string;
  slug: string;
  product_name: string;
  hoplink: string;
  review_title: string;
  review_body: string;
  image_url: string | null;
  link_hub_text: string | null;
  affiliate_nickname: string;
  landing_page: string;
  views: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export async function listProducts(tag?: string): Promise<Product[]> {
  const supabase = await createServerClient();
  let query = supabase
    .from("products")
    .select("*")
    .order("views", { ascending: false });

  if (tag) {
    query = query.contains("tags", [tag]);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching products:", error);
    throw new Error(`Failed to fetch products: ${error.message}`);
  }

  return data || [];
}

export async function getAllTags(): Promise<string[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("tags");

  if (error) {
    console.error("Error fetching tags:", error);
    throw new Error(`Failed to fetch tags: ${error.message}`);
  }

  if (!data) return [];

  // Flatten array of arrays and get unique values
  const allTags = data.flatMap(p => p.tags || []);
  return Array.from(new Set(allTags)).sort();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // No rows returned
      return null;
    }
    console.error("Error fetching product:", error);
    throw new Error(`Failed to fetch product: ${error.message}`);
  }

  return data;
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    console.error("Error fetching product:", error);
    throw new Error(`Failed to fetch product: ${error.message}`);
  }

  return data;
}
