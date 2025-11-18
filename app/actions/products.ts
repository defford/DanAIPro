"use server";

import { createServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface CreateProductInput {
  slug: string;
  product_name: string;
  hoplink: string;
  review_title: string;
  review_body: string;
  image_url?: string;
  link_hub_text?: string;
  affiliate_nickname?: string;
  landing_page?: string;
  tags?: string[];
}

export async function createProduct(input: CreateProductInput) {
  const supabase = await createServerClient();
  
  // Check auth - if user is not authenticated, RLS will block the insert
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        slug: input.slug,
        product_name: input.product_name,
        hoplink: input.hoplink,
        review_title: input.review_title,
        review_body: input.review_body,
        image_url: input.image_url || null,
        link_hub_text: input.link_hub_text || null,
        tags: input.tags || [],
        affiliate_nickname: input.affiliate_nickname || "danaipro",
        landing_page: input.landing_page || "Default",
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create product: ${error.message}`);
  }

  revalidatePath("/admin/products");
  revalidatePath(`/review/${input.slug}`);
  revalidatePath("/");
  revalidatePath("/browse");

  return data;
}

export async function updateProduct(
  id: string,
  input: Partial<CreateProductInput>
) {
  const supabase = await createServerClient();
  
  // Check auth - if user is not authenticated, RLS will block the update
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("products")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update product: ${error.message}`);
  }

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/browse");
  if (input.slug) {
    revalidatePath(`/review/${input.slug}`);
  }

  return data;
}

export async function deleteProduct(id: string) {
  const supabase = await createServerClient();
  
  // Check auth - if user is not authenticated, RLS will block the delete
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    throw new Error(`Failed to delete product: ${error.message}`);
  }

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/browse");
}
