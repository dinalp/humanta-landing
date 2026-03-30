"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface PersonaCard {
  persona: string;
  subtitle: string;
  accent: string;
  accentLight: string;
  icon: string;
  bullets: string[];
}

const personas: PersonaCard[] = [
  {
    persona: "The Manager",
    subtitle: "2 minutes. That's it.",
    accent: "#F26B3A",
    accentLight: "rgba(242,107,58,0.08)",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    bullets: [
      "Nominate someone on your team. Write them a personal note. Done in 2 minutes.",
      "No admin, no tracking, no spreadsheets. Humanta handles everything from here.",
      "Finally, a way to recognise your team that actually lands. Not a voucher they forget, but a moment they talk about for months.",
    ],
  },
  {
    persona: "The Employee",
    subtitle: "Show up. That's the only job.",
    accent: "#F09030",
    accentLight: "rgba(240,144,48,0.08)",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    bullets: [
      "You get a message: your manager recognised you. Here's something special.",
      "Tell us your vibe. Feeling creative, adventurous, or after something low-key?",
      "We match you with a curated moment. A moody wine bar, then a DJ lesson five minutes down the road. Bring someone you care about.",
    ],
  },
  {
    persona: "The People Leader",
    subtitle: "Set up once. Get data back.",
    accent: "#00B890",
    accentLight: "rgba(0,184,144,0.08)",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    bullets: [
      "Set it up once. Allocate credits. Managers do the rest.",
      "Get feedback data back after every Spark: sentiment, eNPS signals, photos.",
      "Zero admin. Zero logistics. Zero 'which restaurant should we book' emails.",
      "Your employer brand and EVP build themselves. Employees and their guests become advocates without you lifting a finger.",
    ],
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ".hiw-label",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".hiw-heading",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 78%",
          },
        }
      );

      gsap.fromTo(
        ".persona-card",
        { y: 50, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.18,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".hiw-cards-grid",
            start: "top 75%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="how-it-works"
      className="relative py-24 lg:py-36 px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: "#FAFAF8" }}
      ref={containerRef}
    >
      {/* Gradient wash */}
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at bottom left, rgba(242,107,58,0.08), rgba(240,144,48,0.04) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14 lg:mb-20">
          <p className="hiw-label text-[13px] font-semibold uppercase tracking-[0.08em] mb-4 text-[#F26B3A]">
            How Sparks works
          </p>
          <h2
            className="hiw-heading text-[28px] md:text-[40px] lg:text-[48px] font-bold leading-[1.15]"
            style={{
              color: "#1A1A1A",
              fontFamily: "var(--font-plus-jakarta), sans-serif",
            }}
          >
            Three people, one great moment
          </h2>
        </div>

        {/* Persona cards */}
        <div
          className="hiw-cards-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {personas.map((card, i) => {
            const isHovered = hoveredIndex === i;
            const isSibling = hoveredIndex !== null && hoveredIndex !== i;

            return (
            <div
              key={card.persona}
              className="persona-card group flex flex-col bg-white overflow-hidden transition-all duration-500 ease-out"
              onMouseEnter={() => setHoveredIndex(i)}
              style={{
                borderRadius: "16px",
                boxShadow: isHovered
                  ? "0 12px 40px rgba(0,0,0,0.12)"
                  : "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
                transform: isHovered
                  ? "scale(1.04) translateY(-8px)"
                  : isSibling
                  ? "scale(0.96)"
                  : "scale(1)",
                opacity: 1,
                zIndex: isHovered ? 10 : 1,
              }}
            >
              {/* Accent top bar */}
              <div
                className="h-[3px] w-full transition-all duration-500 group-hover:h-[4px]"
                style={{ backgroundColor: card.accent }}
              />

              <div className="p-7 lg:p-8 flex flex-col flex-1">
                {/* Icon + persona */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundColor: card.accentLight }}
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
                  <div>
                    <h3
                      className="text-[18px] lg:text-[20px] font-bold leading-tight"
                      style={{
                        color: "#1A1A1A",
                        fontFamily: "var(--font-plus-jakarta), sans-serif",
                      }}
                    >
                      {card.persona}
                    </h3>
                    <p className="text-[12px] font-medium mt-0.5" style={{ color: card.accent }}>
                      {card.subtitle}
                    </p>
                  </div>
                </div>

                {/* Bullet points */}
                <ul className="space-y-4 flex-1">
                  {card.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1"
                    >
                      <span
                        className="shrink-0 mt-[7px] w-[6px] h-[6px] rounded-full transition-transform duration-300 group-hover:scale-125"
                        style={{ backgroundColor: card.accent }}
                      />
                      <span className="text-[15px] lg:text-[16px] leading-[1.7] text-[#4B5563]">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
          })}
        </div>
      </div>
    </section>
  );
}
