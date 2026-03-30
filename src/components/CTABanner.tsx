"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";

export function CTABanner() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ".cta-headline",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".cta-subline",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".cta-button",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="cta"
      ref={containerRef}
      className="relative overflow-hidden min-h-[400px]"
    >
      {/* WebGL scene via vanilla SDK */}
      <div
        data-us-project="MMzQ6ua96gJtL5DcS7iV"
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: "calc(100% + 80px)", width: "100%" }}
      />

      {/* Content */}
      <div className="relative z-10 py-28 lg:py-40 px-6 lg:px-8">
        <div className="max-w-[740px] mx-auto text-center">
          <h2
            className="cta-headline text-[28px] md:text-[38px] lg:text-[46px] font-bold leading-[1.15]"
            style={{
              color: "#FFFFFF",
              fontFamily: "var(--font-plus-jakarta), sans-serif",
            }}
          >
            Stop spending money on things people forget
          </h2>

          <p className="cta-subline text-[16px] lg:text-[18px] mt-5 lg:mt-6 leading-[1.7] text-white/80">
            One conversation is all it takes. We&apos;ll show you what
            recognition looks like when people actually remember it.
          </p>

          <Link
            href="/contact"
            className="cta-button inline-flex items-center gap-2 mt-10 lg:mt-12 bg-white text-[#1A1A1A] px-8 py-3.5 rounded-full text-[15px] font-semibold hover:bg-white/90 hover:scale-[1.04] transition-all duration-300"
          >
            Talk to us
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10m0 0L9 4m4 4L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
