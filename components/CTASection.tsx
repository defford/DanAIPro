"use client";

import { useHopLink } from "@/lib/hooks/useHopLink";
import { trackCtaClick } from "@/lib/analytics";

interface CTASectionProps {
  baseHopLink: string;
  className?: string;
  buttonText?: string;
}

export function CTASection({
  baseHopLink,
  className = "",
  buttonText = "Buy Now",
}: CTASectionProps) {
  const trackedLink = useHopLink(baseHopLink);

  const handleClick = () => {
    trackCtaClick("buy_button");
  };

  return (
    <div className={`my-8 ${className}`}>
      <a
        href={trackedLink}
        onClick={handleClick}
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
      >
        {buttonText}
      </a>
    </div>
  );
}

