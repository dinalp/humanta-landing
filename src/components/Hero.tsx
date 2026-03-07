"use client";

import { useRef } from "react";
import Image from "next/image";
import { HERO_CONTENT } from "@/lib/constants";
import { AnimatedButton } from "@/components/AnimatedButton";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!heroRef.current) return;

      // Parallax background -- desktop only (HERO-02)
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          gsap.to(".hero-bg-wrapper", {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        },
      });

      // Choreographed entrance (HERO-03)
      const split = SplitText.create(".hero-headline", { type: "words" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(split.words, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
      })
        .from(".hero-tagline", { y: 20, opacity: 0, duration: 0.5 }, "-=0.4")
        .from(".hero-subtext", { y: 30, opacity: 0, duration: 0.6 }, "-=0.2")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.5 }, "-=0.2");
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Background image with parallax wrapper */}
      <div className="hero-bg-wrapper absolute inset-0">
        <Image
          src="/images/hero/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50 z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Tagline */}
        <p
          className="hero-tagline font-body text-sm md:text-base uppercase tracking-widest text-white/70 mb-6"
          style={{ opacity: 0 }}
        >
          {HERO_CONTENT.tagline}
        </p>

        {/* Headline */}
        <h1 className="hero-headline font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8">
          {HERO_CONTENT.headline}
        </h1>

        {/* Description */}
        <p
          className="hero-subtext font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ opacity: 0 }}
        >
          {HERO_CONTENT.description}
        </p>

        {/* CTA */}
        <div className="hero-cta" style={{ opacity: 0 }}>
          <AnimatedButton
            href={HERO_CONTENT.ctaHref}
            className="inline-block bg-brand-accent text-brand-text px-8 py-4 rounded-full text-lg font-medium hover:bg-brand-accent/90 transition-colors"
          >
            {HERO_CONTENT.ctaLabel}
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}
