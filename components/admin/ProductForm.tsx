"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export function ProductForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    slug: "",
    product_name: "",
    hoplink: "",
    review_title: "",
    review_body: "",
    image_url: "",
    link_hub_text: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      
      // Check auth first
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("You must be logged in to create products");
      }

      // Create product using client-side Supabase
      const { data, error: insertError } = await supabase
        .from("products")
        .insert([
          {
            slug: formData.slug,
            product_name: formData.product_name,
            hoplink: formData.hoplink,
            review_title: formData.review_title,
            review_body: formData.review_body,
            image_url: formData.image_url || null,
            link_hub_text: formData.link_hub_text || null,
            affiliate_nickname: "danaipro",
            landing_page: "Default",
          },
        ])
        .select()
        .single();

      if (insertError) {
        throw new Error(`Failed to create product: ${insertError.message}`);
      }

      // Success - redirect to products list
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      console.error("Create product error:", err);
      setError(err instanceof Error ? err.message : "Failed to create product");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="slug" className="block text-sm font-medium mb-2">
          Slug
        </label>
        <input
          id="slug"
          type="text"
          value={formData.slug}
          onChange={(e) =>
            setFormData({ ...formData, slug: e.target.value.toLowerCase() })
          }
          required
          pattern="[a-z0-9-]+"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="ai-tool"
        />
        <p className="mt-1 text-sm text-gray-500">
          e.g., ai-tool
        </p>
      </div>

      <div>
        <label htmlFor="product_name" className="block text-sm font-medium mb-2">
          Product Name
        </label>
        <input
          id="product_name"
          type="text"
          value={formData.product_name}
          onChange={(e) =>
            setFormData({ ...formData, product_name: e.target.value })
          }
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="AI Productivity Writer"
        />
        <p className="mt-1 text-sm text-gray-500">
          e.g., AI Productivity Writer
        </p>
      </div>

      <div>
        <label htmlFor="hoplink" className="block text-sm font-medium mb-2">
          Base HopLink
        </label>
        <input
          id="hoplink"
          type="url"
          value={formData.hoplink}
          onChange={(e) =>
            setFormData({ ...formData, hoplink: e.target.value })
          }
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="https://bfaeb...hop.clickbank.net"
        />
        <p className="mt-1 text-sm text-gray-500">
          e.g., https://bfaeb...hop.clickbank.net
        </p>
      </div>

      <div>
        <label htmlFor="review_title" className="block text-sm font-medium mb-2">
          Review Title
        </label>
        <input
          id="review_title"
          type="text"
          value={formData.review_title}
          onChange={(e) =>
            setFormData({ ...formData, review_title: e.target.value })
          }
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="The One Tool That Saves Me 10 Hours a Week..."
        />
        <p className="mt-1 text-sm text-gray-500">
          e.g., The One Tool That Saves Me 10 Hours a Week...
        </p>
      </div>

      <div>
        <label htmlFor="review_body" className="block text-sm font-medium mb-2">
          Review Body (HTML)
        </label>
        <textarea
          id="review_body"
          value={formData.review_body}
          onChange={(e) =>
            setFormData({ ...formData, review_body: e.target.value })
          }
          required
          rows={10}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm text-black"
          placeholder="<p>I've used this for 6 months...</p>"
        />
        <p className="mt-1 text-sm text-gray-500">
          e.g., &lt;p&gt;I've used this for 6 months...&lt;/p&gt;
        </p>
      </div>

      <div>
        <label htmlFor="image_url" className="block text-sm font-medium mb-2">
          Image URL
        </label>
        <input
          id="image_url"
          type="text"
          value={formData.image_url}
          onChange={(e) =>
            setFormData({ ...formData, image_url: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="/images/ai-tool.png"
        />
        <p className="mt-1 text-sm text-gray-500">
          e.g., /images/ai-tool.png
        </p>
      </div>

      <div>
        <label htmlFor="link_hub_text" className="block text-sm font-medium mb-2">
          Link Hub Text
        </label>
        <input
          id="link_hub_text"
          type="text"
          value={formData.link_hub_text}
          onChange={(e) =>
            setFormData({ ...formData, link_hub_text: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="🤖 My #1 AI Writing Tool"
        />
        <p className="mt-1 text-sm text-gray-500">
          e.g., 🤖 My #1 AI Writing Tool
        </p>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
        <Link
          href="/admin/products"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
