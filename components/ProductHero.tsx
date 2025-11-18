import Image from "next/image";
import { Product } from "@/lib/repositories/products";

interface ProductHeroProps {
  product: Product;
}

export function ProductHero({ product }: ProductHeroProps) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-4">{product.review_title}</h1>
      {product.image_url && (
        <div className="relative w-full h-64 md:h-96 mb-6 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={product.image_url}
            alt={product.product_name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>
      )}
    </div>
  );
}

