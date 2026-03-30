import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { FloatingCTA } from "@/components/FloatingCTA";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { UnicornSDK } from "@/components/UnicornSDK";

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


export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "Humanta | The human connection layer for companies",
  appleWebApp: {
    statusBarStyle: "black-translucent",
  },
  description:
    "Humanta turns your perks or recognition budget into curated dining and experience moments. Matched to personality, booked end-to-end. Zero admin.",
  keywords: [
    "employee benefits",
    "team experiences",
    "corporate dining",
    "employee engagement",
    "HR benefits",
    "team building",
    "Sydney",
  ],
  openGraph: {
    title: "Humanta | The human connection layer for companies",
    description:
      "Curated dining and experience moments for your team. Matched to personality, booked end-to-end. Zero admin for HR.",
    type: "website",
    locale: "en_AU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable} ${plusJakarta.variable}`}>
      <body className="font-sans antialiased">
        <UnicornSDK />
        <Providers>
          <SmoothScrollProvider>
            {children}
            <FloatingCTA />
            <CustomCursor />
          </SmoothScrollProvider>
        </Providers>
      </body>
    </html>
  );
}
