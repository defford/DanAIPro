import { listProducts, getAllTags } from "@/lib/repositories/products";
import { ProductGrid } from "@/components/ProductGrid";
import Link from "next/link";

interface BrowsePageProps {
  searchParams: Promise<{
    tag?: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function BrowsePage({ searchParams }: BrowsePageProps) {
  const resolvedSearchParams = await searchParams;
  const selectedTag = resolvedSearchParams.tag;
  const products = await listProducts(selectedTag);
  const tags = await getAllTags();

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-32 right-16 w-80 h-80 bg-blue-500 rounded-full opacity-30"></div>
        <div className="absolute top-52 right-40 w-64 h-64 bg-purple-500 rounded-full opacity-30"></div>
        <div className="absolute top-72 right-24 w-72 h-72 bg-blue-400 rounded-full opacity-25"></div>
        <div className="absolute bottom-48 right-20 w-96 h-96 bg-purple-400 rounded-full opacity-25"></div>
        <div className="absolute bottom-24 right-48 w-64 h-64 bg-blue-500 rounded-full opacity-30"></div>
      </div>

      <section className="relative z-10 px-6 sm:px-8 lg:px-12 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-8">
            Browse Products
          </h1>
          
          {/* Tag Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            <Link
              href="/browse"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                !selectedTag
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300 hover:border-blue-600 hover:text-blue-600"
              }`}
            >
              All
            </Link>
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/browse?tag=${encodeURIComponent(tag)}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  selectedTag === tag
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-300 hover:border-blue-600 hover:text-blue-600"
                }`}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </Link>
            ))}
          </div>

          {/* Products Grid */}
          <ProductGrid products={products} />
        </div>
      </section>
    </main>
  );
}

