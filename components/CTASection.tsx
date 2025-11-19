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
        className="inline-block bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] text-[var(--text-on-accent)] font-bold py-4 px-8 rounded-[var(--radius)] text-lg transition-colors shadow-lg"
      >
        {buttonText}
      </a>
    </div>
  );
}

