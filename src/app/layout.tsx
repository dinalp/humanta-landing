import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { FloatingCTA } from "@/components/FloatingCTA";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { UnicornSDK } from "@/components/UnicornSDK";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://humanta.co";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Humanta | The human connection layer for companies",
    template: "%s | Humanta",
  },
  description:
    "Turn your recognition budget into curated dining and experience moments. Matched to personality, booked end-to-end, zero admin for HR.",
  keywords: [
    "employee recognition",
    "employee benefits",
    "team experiences",
    "corporate dining",
    "employee engagement",
    "HR benefits",
    "team building",
    "employee perks",
    "Sydney",
  ],
  alternates: {
    canonical: "/",
  },
  appleWebApp: {
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "Humanta | The human connection layer for companies",
    description:
      "Turn your recognition budget into curated dining and experience moments. Matched to personality, booked end-to-end, zero admin for HR.",
    url: SITE_URL,
    siteName: "Humanta",
    type: "website",
    locale: "en_AU",
    images: [
      {
        url: "/logos/humanta-mark-black.png",
        width: 512,
        height: 512,
        alt: "Humanta logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Humanta | The human connection layer for companies",
    description:
      "Turn your recognition budget into curated dining and experience moments. Matched to personality, booked end-to-end, zero admin for HR.",
    images: ["/logos/humanta-mark-black.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <UnicornSDK />
        <Providers>
          <SmoothScrollProvider>
            {children}
            <FloatingCTA />
            <CustomCursor />
          </SmoothScrollProvider>
        </Providers>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
