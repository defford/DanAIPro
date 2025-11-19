import { Product } from "@/lib/repositories/products";
import { ProductHero } from "./ProductHero";
import { CTASection } from "./CTASection";

interface ReviewPageContentProps {
    product: Product;
}

export function ReviewPageContent({ product }: ReviewPageContentProps) {
    return (
        <main className="min-h-screen pt-24 pb-8 px-8 bg-[var(--bg-primary)] transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <ProductHero product={product} />
                <div
                    className="prose prose-lg prose-headings:font-bold prose-headings:text-[var(--text-primary)] prose-p:text-[var(--text-secondary)] prose-strong:text-[var(--text-primary)] prose-strong:font-semibold prose-ul:list-disc prose-li:text-[var(--text-secondary)] prose-li:marker:text-[var(--accent-primary)] max-w-none mb-8"
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
