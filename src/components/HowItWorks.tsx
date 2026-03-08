"use client";

import { useRef } from "react";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function HowItWorks() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Heading reveal
      gsap.fromTo(
        ".hiw-heading",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      // Draw the connecting line as user scrolls
      gsap.fromTo(
        ".hiw-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".hiw-steps",
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.8,
          },
        }
      );

      // Each card: staggered reveal with scale
      const cards = gsap.utils.toArray<HTMLElement>(".step-card");
      cards.forEach((card, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
          },
        });

        // Number circle pops in
        tl.fromTo(
          card.querySelector(".step-number"),
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
        );

        // Content slides in
        tl.fromTo(
          card.querySelector(".step-content"),
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.25"
        );

        // Step number glow pulse on reveal
        tl.fromTo(
          card.querySelector(".step-glow"),
          { scale: 0.5, opacity: 0.8 },
          { scale: 2, opacity: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="how-it-works"
      className="bg-brand-cream py-24 lg:py-32"
      ref={containerRef}
    >
      <div className="max-w-4xl mx-auto px-6">
        <h2
          className="hiw-heading font-heading font-semibold text-3xl md:text-4xl lg:text-5xl text-brand-text text-center mb-20"
          style={{ opacity: 0 }}
        >
          How Humanta Works
        </h2>

        <div className="hiw-steps relative">
          {/* Animated connecting line */}
          <div className="absolute left-7 md:left-9 top-0 bottom-0 w-px">
            <div
              className="hiw-line h-full w-full bg-gradient-to-b from-brand-accent via-brand-accent/60 to-brand-accent/20"
              style={{ transformOrigin: "top", transform: "scaleY(0)" }}
            />
          </div>

          <div className="space-y-16 md:space-y-20">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <div
                key={step.number}
                className="step-card relative flex gap-7 md:gap-10 items-start"
              >
                {/* Step number with glow effect */}
                <div className="relative flex-shrink-0">
                  <div
                    className="step-glow absolute inset-0 rounded-full bg-brand-accent/40 pointer-events-none"
                    style={{ opacity: 0 }}
                  />
                  <div
                    className="step-number relative z-10 w-14 h-14 md:w-18 md:h-18 bg-brand-dark text-brand-accent rounded-full flex items-center justify-center text-xl md:text-2xl font-bold shadow-[0_0_20px_rgba(245,182,20,0.15)] border border-brand-accent/20"
                    style={{ opacity: 0 }}
                  >
                    {String(step.number).padStart(2, "0")}
                  </div>
                </div>

                {/* Content */}
                <div
                  className="step-content pt-2 md:pt-3"
                  style={{ opacity: 0 }}
                >
                  <h3 className="font-heading font-semibold text-xl md:text-2xl text-brand-text mb-2">
                    {step.title}
                  </h3>
                  <p className="text-brand-text-secondary text-base md:text-lg leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
