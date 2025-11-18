import { listProducts } from "@/lib/repositories/products";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { ProductGrid } from "@/components/ProductGrid";

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
          <ProductGrid products={products} />
        </div>
      </section>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </main>
  );
}
