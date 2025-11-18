"use server";

import { createServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

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

/**
 * Downloads an image from a URL and saves it to the public/images directory
 * @param imageUrl - The URL of the image to download
 * @param slug - The slug to use for the filename
 * @returns The local path to the saved image (e.g., /images/slug.png)
 */
export async function downloadImageFromUrl(
  imageUrl: string,
  slug: string
): Promise<string> {
  // Check auth
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    // Fetch the image
    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`);
    }

    // Determine file extension from Content-Type or URL
    const contentType = response.headers.get("content-type") || "";
    let extension = "jpg"; // default

    if (contentType.includes("png")) {
      extension = "png";
    } else if (contentType.includes("gif")) {
      extension = "gif";
    } else if (contentType.includes("webp")) {
      extension = "webp";
    } else if (contentType.includes("svg")) {
      extension = "svg";
    } else {
      // Try to get extension from URL
      const urlPath = new URL(imageUrl).pathname;
      const urlExt = urlPath.split(".").pop()?.toLowerCase();
      if (urlExt && ["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(urlExt)) {
        extension = urlExt === "jpeg" ? "jpg" : urlExt;
      }
    }

    // Get the image buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Ensure public/images directory exists
    const publicDir = join(process.cwd(), "public", "images");
    if (!existsSync(publicDir)) {
      await mkdir(publicDir, { recursive: true });
    }

    // Save the image
    const filename = `${slug}.${extension}`;
    const filePath = join(publicDir, filename);
    await writeFile(filePath, buffer);

    // Return the public path
    return `/images/${filename}`;
  } catch (error) {
    throw new Error(
      `Failed to download and save image: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
