import { ReviewPageContent } from "@/components/ReviewPageContent";
import { getProductBySlug, listProducts } from "@/lib/repositories/products";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface ReviewPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await listProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ReviewPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Review Not Found",
    };
  }

  return {
    title: `${product.review_title} - DanAIPro`,
    description: `Read our in-depth review of ${product.product_name}.`,
  };
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ReviewPageContent product={product} />;
}

