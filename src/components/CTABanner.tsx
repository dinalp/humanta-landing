"use client";

import Image from "next/image";
import { CTA_CONTENT } from "@/lib/constants";
import { AnimatedButton } from "@/components/AnimatedButton";

export function CTABanner() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/cta/cta-bg.png"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority={false}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 text-center py-24 lg:py-32 px-6">
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
