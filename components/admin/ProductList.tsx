"use client";

import { Product } from "@/lib/repositories/products";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setDeletingId(id);
    try {
      const supabase = createClient();
      
      // Check auth first
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("You must be logged in to delete products");
      }

      // Delete product using client-side Supabase
      const { error: deleteError } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (deleteError) {
        throw new Error(`Failed to delete product: ${deleteError.message}`);
      }

      router.refresh();
    } catch (error) {
      console.error("Delete error:", error);
      alert(error instanceof Error ? error.message : "Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">No products yet.</p>
        <Link
          href="/admin/products/new"
          className="text-blue-600 hover:text-blue-700 underline"
        >
          Add your first product
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Slug
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {product.product_name}
                </div>
                <div className="text-sm text-gray-500">{product.review_title}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {product.slug}
                </code>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link
                  href={`/review/${product.slug}`}
                  target="_blank"
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  View
                </Link>
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={deletingId === product.id}
                  className="text-red-600 hover:text-red-900 disabled:opacity-50"
                >
                  {deletingId === product.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

