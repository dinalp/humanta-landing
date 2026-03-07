import type { Metadata } from "next";
import { Inter, Manrope, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { FloatingCTA } from "@/components/FloatingCTA";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Humanta | Where Human Connection Becomes Company Policy",
  description:
    "Humanta offers curated dinner experiences as employee benefits. Help your team build genuine connections outside the office with Humanta Nights.",
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
    title: "Humanta | Where Human Connection Becomes Company Policy",
    description:
      "Curated dinner experiences that bring your team together. Transform employee benefits into meaningful connections.",
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
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${poppins.variable}`}
    >
      <body className="font-body antialiased">
        <Providers>
          {children}
          <FloatingCTA />
        </Providers>
      </body>
    </html>
  );
}
