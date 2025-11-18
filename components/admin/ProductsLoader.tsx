"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ProductList } from "./ProductList";
import { Product } from "@/lib/repositories/products";

export function ProductsLoader() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const supabase = createClient();
        const { data, error: fetchError } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        setProducts(data || []);
      } catch (err) {
        console.error("Error loading products:", err);
        setError(err instanceof Error ? err.message : "Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Loading products...</p>
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

  return <ProductList products={products} />;
}

