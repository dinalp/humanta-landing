"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface DetailCard {
  number: string;
  title: string;
  body: string;
  variant: "dark" | "light";
  accent: string;
  accentLight: string;
  icon: string;
}

const details: DetailCard[] = [
  {
    number: "01",
    title: "The personal note",
    body: "The manager writes a personal message. We print it and have it waiting at the table when they sit down for dinner. If dining isn't part of their Spark, we deliver it in a beautifully designed email. Either way, the recognition lands in a way no gift card ever could.",
    variant: "dark",
    accent: "#F26B3A",
    accentLight: "rgba(242,107,58,0.12)",
    icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
  },
  {
    number: "02",
    title: "Zero choice paralysis",
    body: "Employees tell us what they're into and we deliver up to eight curated options matched to their personality. No endless scrolling, no decision fatigue. They pick the one that speaks to them, and we take it from there.",
    variant: "light",
    accent: "#F09030",
    accentLight: "rgba(240,144,48,0.08)",
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z",
  },
  {
    number: "03",
    title: "Two ambassadors, not one",
    body: "Both the employee and their guest walk away with a memory tied to the company. That\u2019s emotional equity no points platform can buy.",
    variant: "light",
    accent: "#E8B830",
    accentLight: "rgba(232,184,48,0.08)",
    icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
  },
  {
    number: "04",
    title: "Feedback without surveys",
    body: "After every Spark, we collect sentiment, eNPS signals, and photos. You get a quarterly one-page narrative. Not a dashboard you\u2019ll never check.",
    variant: "dark",
    accent: "#00B890",
    accentLight: "rgba(0,184,144,0.15)",
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
  },
];

export function Pricing() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ".diff-label",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".diff-heading",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
        }
      );

      gsap.fromTo(
        ".diff-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ".diff-cards-wrapper", start: "top 80%" },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="difference"
      className="py-24 lg:py-36 px-6 lg:px-8"
      style={{ backgroundColor: "#FFFFFF" }}
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-14 lg:mb-20 max-w-3xl">
          <p className="diff-label text-[13px] font-semibold uppercase tracking-[0.08em] mb-5 text-[#F26B3A]">
            The details that matter
          </p>
          <h2
            className="diff-heading text-[28px] md:text-[40px] lg:text-[48px] font-bold leading-[1.15]"
            style={{
              color: "#1A1A1A",
              fontFamily: "var(--font-plus-jakarta), sans-serif",
            }}
          >
            We&apos;ve thought about this more than anyone else
          </h2>
        </div>

        {/* 2x2 checkerboard */}
        <div className="diff-cards-wrapper grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-5xl mx-auto">
          {details.map((card) => {
            const isDark = card.variant === "dark";

            return (
              <div
                key={card.number}
                className="diff-card group relative overflow-hidden rounded-2xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-xl"
                style={{
                  backgroundColor: isDark ? "#1A1A1A" : "#FAFAF8",
                  borderRadius: "16px",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: isDark
                      ? `radial-gradient(circle at 30% 20%, ${card.accentLight}, transparent 60%)`
                      : `radial-gradient(circle at 50% 0%, ${card.accentLight}, transparent 70%)`,
                  }}
                />

                {/* Accent line that grows on hover */}
                <div
                  className="h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out"
                  style={{ backgroundColor: card.accent }}
                />

                <div className="relative p-7 lg:p-8">
                  {/* Icon + number row */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        backgroundColor: isDark
                          ? "rgba(255,255,255,0.06)"
                          : card.accentLight,
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={card.accent}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d={card.icon} />
                      </svg>
                    </div>
                    <span
                      className="text-[12px] font-bold tracking-wider"
                      style={{ color: card.accent }}
                    >
                      {card.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-[20px] lg:text-[22px] font-bold mb-3 leading-tight"
                    style={{
                      color: isDark ? "#F5F5F0" : "#1A1A1A",
                      fontFamily: "var(--font-plus-jakarta), sans-serif",
                    }}
                  >
                    {card.title}
                  </h3>

                  {/* Body */}
                  <p
                    className="text-[15px] lg:text-[16px] leading-[1.7]"
                    style={{ color: isDark ? "#999" : "#6B7280" }}
                  >
                    {card.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
