"use client";

import Script from "next/script";
import { siteConfig } from "@/config/site";

export function GoogleAnalytics() {
  const ga4Id = siteConfig.ga4MeasurementId;

  if (!ga4Id) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ga4Id}');
        `}
      </Script>
    </>
  );
}

