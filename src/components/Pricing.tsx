"use client";

import { useRef } from "react";
import { PRICING_PLANS } from "@/lib/constants";
import { AnimatedButton } from "@/components/AnimatedButton";
import { gsap, useGSAP } from "@/lib/gsap";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5 text-brand-accent shrink-0"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function Pricing() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".pricing-heading", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".pricing-card", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".pricing-card",
          start: "top 85%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="plans"
      className="bg-brand-cream py-24 lg:py-32"
      ref={containerRef}
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="pricing-heading font-heading font-semibold text-3xl md:text-4xl text-brand-text text-center mb-16"
          style={{ opacity: 0 }}
        >
          Plans
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className="pricing-card bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col"
              style={{ opacity: 0 }}
            >
              <h3 className="font-heading text-xl font-semibold text-brand-text">
                {plan.name}
              </h3>
              <p className="text-brand-text-secondary mt-1 mb-6">
                {plan.subtitle}
              </p>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-brand-text text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <AnimatedButton
                href={plan.ctaHref}
                className="bg-brand-dark text-white rounded-full py-3 w-full text-center font-medium hover:bg-brand-dark/90 transition-colors block"
              >
                {plan.ctaLabel}
              </AnimatedButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
