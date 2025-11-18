"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ProductEditForm } from "./ProductEditForm";
import { Product } from "@/lib/repositories/products";
import { useRouter } from "next/navigation";

interface ProductEditLoaderProps {
  productId: string;
}

export function ProductEditLoader({ productId }: ProductEditLoaderProps) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const supabase = createClient();
        const { data, error: fetchError } = await supabase
          .from("products")
          .select("*")
          .eq("id", productId)
          .single();

        if (fetchError) {
          if (fetchError.code === "PGRST116") {
            router.push("/admin/products");
            return;
          }
          throw new Error(fetchError.message);
        }

        if (!data) {
          router.push("/admin/products");
          return;
        }

        setProduct(data);
      } catch (err) {
        console.error("Error loading product:", err);
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [productId, router]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error: {error}
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return <ProductEditForm product={product} />;
}

