import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
