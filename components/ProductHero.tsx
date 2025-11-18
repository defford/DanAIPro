"use client";

import Image from "next/image";
import { Product } from "@/lib/repositories/products";
import { useHopLink } from "@/lib/hooks/useHopLink";
import { trackCtaClick } from "@/lib/analytics";

interface ProductHeroProps {
  product: Product;
}

export function ProductHero({ product }: ProductHeroProps) {
  const trackedLink = useHopLink(product.hoplink);

  const handleImageClick = () => {
    trackCtaClick("product_image");
  };

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-4">{product.review_title}</h1>
      {product.image_url && (
        <a
          href={trackedLink}
          onClick={handleImageClick}
          className="block relative w-full h-64 md:h-96 mb-6 rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <Image
            src={product.image_url}
            alt={product.product_name}
            fill
            className="object-cover pointer-events-none"
            priority
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </a>
      )}
    </div>
  );
}

