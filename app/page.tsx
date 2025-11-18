import Link from "next/link";
import Image from "next/image";
import { listProducts } from "@/lib/repositories/products";
import { ScrollIndicator } from "@/components/ScrollIndicator";

export default async function Home() {
  const products = await listProducts();

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

      {/* Hero Section */}
      <section className="relative z-10 px-6 sm:px-8 lg:px-12 pt-24 pb-20 sm:pt-32 sm:pb-28 lg:pt-40 lg:pb-36">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <h1 className="mb-8 leading-tight">
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-blue-900">Dan the AI Pro</span>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-purple-600 mt-2">Favorite Digital</span>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-purple-600">Products</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
              Curated digital products for content creators. Discover tools and resources that help you build, grow, and succeed in your creative journey.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="relative z-10 px-6 sm:px-8 lg:px-12 py-16 sm:py-24 bg-blue-900">
        <div className="max-w-6xl mx-auto">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-300 text-lg">No products available yet.</p>
            </div>
          ) : (
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
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>
                          {product.views} {product.views === 1 ? "view" : "views"}
                        </span>
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
          )}
        </div>
      </section>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </main>
  );
}
