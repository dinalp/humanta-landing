"use client";

import { useRef } from "react";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { gsap, useGSAP } from "@/lib/gsap";

export function HowItWorks() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".hiw-heading", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".step-card", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".step-card",
          start: "top 85%",
        },
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
          className="hiw-heading font-heading font-semibold text-3xl md:text-4xl text-brand-text text-center mb-16"
          style={{ opacity: 0 }}
        >
          How Humanta Works
        </h2>

        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-brand-text/10" />

          <div className="space-y-12">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <div
                key={step.number}
                className="step-card relative flex gap-6 md:gap-8"
                style={{ opacity: 0 }}
              >
                {/* Step number circle */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-brand-accent text-white rounded-full flex items-center justify-center text-lg md:text-xl font-semibold shadow-sm">
                  {step.number}
                </div>

                {/* Content */}
                <div className="pt-1 md:pt-3">
                  <h3 className="font-heading font-semibold text-xl md:text-2xl text-brand-text mb-2">
                    {step.title}
                  </h3>
                  <p className="text-brand-text-secondary text-base md:text-lg leading-relaxed">
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
