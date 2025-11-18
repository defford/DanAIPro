"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ProductHero } from "./ProductHero";
import { CTASection } from "./CTASection";
import { Product } from "@/lib/repositories/products";
import Link from "next/link";

interface ReviewPageLoaderProps {
  slug: string;
}

export function ReviewPageLoader({ slug }: ReviewPageLoaderProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        const supabase = createClient();
        const { data, error: fetchError } = await supabase
          .from("products")
          .select("*")
          .eq("slug", slug)
          .single();

        if (fetchError) {
          if (fetchError.code === "PGRST116") {
            // Product not found
            setNotFound(true);
            setLoading(false);
            return;
          }
          throw new Error(fetchError.message);
        }

        if (!data) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        setProduct(data);
      } catch (err) {
        console.error("Error loading product:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading review...</p>
        </div>
      </main>
    );
  }

  if (notFound || !product) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Product Not Found</h1>
          <p className="text-lg mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Return to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <ProductHero product={product} />
        <div
          className="prose prose-lg prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-900 prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:list-disc prose-li:text-gray-900 prose-li:marker:text-gray-600 max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: product.review_body }}
        />
        <CTASection 
          baseHopLink={product.hoplink} 
          buttonText={product.link_hub_text || undefined}
        />
      </div>
    </main>
  );
}

