"use client";

import { useMemo } from "react";

export function useHopLink(baseHopLink: string): string {
  return useMemo(() => {
    if (typeof window === "undefined") {
      return baseHopLink;
    }

    // Get incoming UTM parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get("utm_source") || "unknown";
    const utmCampaign = urlParams.get("utm_campaign") || "unknown";
    const utmMedium = urlParams.get("utm_medium") || "";
    const utmTerm = urlParams.get("utm_term") || "";
    const utmContent = urlParams.get("utm_content") || "";

    // Build the tracked affiliate link
    const finalHopLink = new URL(baseHopLink);
    finalHopLink.searchParams.set("traffic_source", utmSource);
    finalHopLink.searchParams.set("campaign", utmCampaign);
    
    if (utmMedium) {
      finalHopLink.searchParams.set("traffic_type", utmMedium);
    }
    if (utmTerm) {
      finalHopLink.searchParams.set("ad", utmTerm);
    }
    if (utmContent) {
      finalHopLink.searchParams.set("creative", utmContent);
    }

    return finalHopLink.href;
  }, [baseHopLink]);
}

