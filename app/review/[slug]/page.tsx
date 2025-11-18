import { ReviewPageLoader } from "@/components/ReviewPageLoader";

interface ReviewPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { slug } = await params;

  return <ReviewPageLoader slug={slug} />;
}

