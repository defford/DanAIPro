export const siteConfig = {
  affiliateNickname:
    process.env.NEXT_PUBLIC_AFFILIATE_NICKNAME || "danaipro",
  defaultLandingPage:
    process.env.NEXT_PUBLIC_DEFAULT_LANDING_PAGE || "Default",
  ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "",
} as const;

