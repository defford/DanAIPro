import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/repositories/products";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-300 text-lg">No products found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/review/${product.slug}`}
          className="group block bg-white border border-blue-900 hover:border-blue-600 transition-all duration-300 p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {product.review_title}
              </h3>
              <p className="text-gray-600 text-base sm:text-lg mb-3">
                {product.product_name}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span>
                  {product.views} {product.views === 1 ? "view" : "views"}
                </span>
                {product.tags && product.tags.length > 0 && (
                  <div className="flex gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs uppercase tracking-wide font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {product.image_url && (
              <div className="relative w-full sm:w-48 h-48 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 cursor-pointer">
                <Image
                  src={product.image_url}
                  alt={product.product_name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                  sizes="(max-width: 640px) 100vw, 192px"
                />
              </div>
            )}
            <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
              <span className="text-lg">→</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

