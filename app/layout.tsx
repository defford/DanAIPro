import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { PageViewTracker } from "@/components/PageViewTracker";

export const metadata: Metadata = {
  title: "Affiliate Hub",
  description: "Product reviews and affiliate links",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />
        <PageViewTracker />
        {children}
      </body>
    </html>
  );
}

