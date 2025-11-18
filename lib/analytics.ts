// Analytics helper functions
import { siteConfig } from "@/config/site";

export function trackCtaClick(label: string = "buy_button") {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "cta_click", {
      event_category: "engagement",
      event_label: label,
    });
  }
}

export function trackPageView(url: string) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "page_view", {
      page_path: url,
    });
  }
}

