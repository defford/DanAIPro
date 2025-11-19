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
          className="group block bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-all duration-300 p-6 sm:p-8 rounded-[var(--radius)] shadow-[var(--card-shadow)] hover:-translate-y-1"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                {product.review_title}
              </h3>
              <p className="text-[var(--text-secondary)] text-base sm:text-lg mb-3">
                {product.product_name}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-secondary)]">
                <span>
                  {product.views} {product.views === 1 ? "view" : "views"}
                </span>
                {product.tags && product.tags.length > 0 && (
                  <div className="flex gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[var(--bg-secondary)] text-[var(--text-secondary)] px-2 py-1 rounded-full text-xs uppercase tracking-wide font-medium border border-[var(--border-color)]"
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
            <div className="flex items-center text-[var(--accent-primary)] font-semibold group-hover:translate-x-1 transition-transform">
              <span className="text-lg">→</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}


