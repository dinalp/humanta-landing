"use client";

import { useRef } from "react";
import Image from "next/image";
import { CTA_CONTENT } from "@/lib/constants";
import { AnimatedButton } from "@/components/AnimatedButton";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function CTABanner() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Content fade-up reveal
      gsap.fromTo(".cta-content", { y: 40, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // Desktop-only subtle parallax on background
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          gsap.to(".cta-bg-wrapper", {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="relative overflow-hidden" ref={containerRef}>
      <div className="cta-bg-wrapper absolute inset-0">
        <Image
          src="/images/cta/cta-bg.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
      </div>
      <div className="absolute inset-0 bg-black/50" />

      <div
        className="cta-content relative z-10 text-center py-24 lg:py-32 px-6"
        style={{ opacity: 0 }}
      >
        <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white max-w-3xl mx-auto mb-8">
          {CTA_CONTENT.headline}
        </h2>
        <AnimatedButton
          href={CTA_CONTENT.ctaHref}
          className="inline-block bg-brand-accent text-brand-dark font-semibold px-8 py-4 rounded-full text-lg hover:bg-brand-accent/90 transition-colors"
        >
          {CTA_CONTENT.ctaLabel}
        </AnimatedButton>
      </div>
    </section>
  );
}
