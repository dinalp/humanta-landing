import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the Humanta team about employee recognition and curated team experiences. Based in Sydney, Australia.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Humanta",
    description:
      "Talk to the Humanta team about employee recognition and curated team experiences. Based in Sydney, Australia.",
    url: "https://humanta.co/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#1A1A1A] pt-24 md:pt-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-28">
          <div className="flex flex-col lg:flex-row lg:gap-16 xl:gap-24">
            {/* Left column */}
            <div className="lg:w-[45%] mb-12 lg:mb-0">
              <Image
                src="/logos/humanta-mark-white.png"
                alt="Humanta logo"
                width={56}
                height={56}
                className="w-12 h-12 lg:w-14 lg:h-14 mb-8"
              />

              <h1
                className="text-[40px] md:text-[52px] lg:text-[60px] font-bold text-white leading-[1.05] mb-8"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                Let&apos;s get
                <br />
                in touch
              </h1>

              <p className="text-[16px] lg:text-[17px] text-[#999] leading-[1.7] mb-4">
                Ready to upgrade employee recognition from transactional to
                memorable?
              </p>
              <p className="text-[16px] lg:text-[17px] text-[#999] leading-[1.7]">
                Let&apos;s build a Humanta program that fits your culture and
                budget.
              </p>

              {/* Divider */}
              <div className="h-px bg-[#333] my-10" />

              {/* Contact details */}
              <div className="space-y-5">
                <a
                  href="tel:+61422339636"
                  className="flex items-center gap-3 text-[#999] hover:text-white transition-colors duration-200"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  <span className="text-[15px]">+61 422 339 636</span>
                </a>
                <a
                  href="mailto:contact@humanta.co"
                  className="flex items-center gap-3 text-[#999] hover:text-white transition-colors duration-200"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                  </svg>
                  <span className="text-[15px]">contact@humanta.co</span>
                </a>
              </div>
            </div>

            {/* Right column: form */}
            <div className="lg:w-[55%]">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
