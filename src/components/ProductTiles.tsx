"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";

const sparksFeatures = [
  { label: "Recognition or perk", desc: "Spot recognition for standout moments, or a recurring perk on a quarterly, biannual, or annual cadence." },
  { label: "AI-matched", desc: "We match the experience to who they actually are." },
  { label: "Zero admin", desc: "We book, manage, and handle every detail end to end." },
  { label: "Real feedback", desc: "Sentiment, eNPS, and photos back to your People team." },
];

export function ProductTiles() {
  const sectionRef = useRef<HTMLElement>(null);
  const sparksGlowRef = useRef<HTMLDivElement>(null);
  const teamsGlowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ".product-tile",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".spark-feature",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".spark-features",
            start: "top 85%",
          },
        }
      );

      // Mouse-follow glow on Sparks tile
      const sparksTile = document.querySelector<HTMLElement>(".sparks-tile");
      if (sparksTile && sparksGlowRef.current) {
        const glow = sparksGlowRef.current;
        sparksTile.addEventListener("mousemove", (e) => {
          const rect = sparksTile.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          gsap.to(glow, {
            x: x - 200,
            y: y - 200,
            duration: 0.8,
            ease: "power2.out",
          });
        });
        sparksTile.addEventListener("mouseenter", () => {
          gsap.to(glow, { opacity: 1, duration: 0.4 });
        });
        sparksTile.addEventListener("mouseleave", () => {
          gsap.to(glow, { opacity: 0, duration: 0.4 });
        });
      }

      // Mouse-follow glow on Teams tile
      const teamsTile = document.querySelector<HTMLElement>(".teams-tile");
      if (teamsTile && teamsGlowRef.current) {
        const glow = teamsGlowRef.current;
        teamsTile.addEventListener("mousemove", (e) => {
          const rect = teamsTile.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          gsap.to(glow, {
            x: x - 150,
            y: y - 150,
            duration: 0.8,
            ease: "power2.out",
          });
        });
        teamsTile.addEventListener("mouseenter", () => {
          gsap.to(glow, { opacity: 1, duration: 0.4 });
        });
        teamsTile.addEventListener("mouseleave", () => {
          gsap.to(glow, { opacity: 0, duration: 0.4 });
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="sparks"
      className="bg-white py-20 lg:py-28 px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12 lg:mb-16">
          <span className="product-tile inline-block text-[13px] font-semibold uppercase tracking-[0.08em] text-[#F26B3A]">
            Two approaches, one thesis
          </span>
        </div>

        <div className="grid lg:grid-cols-5 gap-5 lg:gap-6">
          {/* Sparks tile */}
          <div
            className="sparks-tile product-tile relative overflow-hidden rounded-2xl lg:col-span-3 transition-transform duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl"
            style={{ backgroundColor: "#1A1A1A" }}
          >
            {/* Mouse-follow glow */}
            <div
              ref={sparksGlowRef}
              className="absolute w-[400px] h-[400px] rounded-full pointer-events-none opacity-0"
              style={{
                background:
                  "radial-gradient(circle, rgba(242,107,58,0.15) 0%, transparent 70%)",
                top: 0,
                left: 0,
              }}
            />

            {/* Static gradient accents */}
            <div
              className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at top right, rgba(242,107,58,0.08), transparent 70%)",
              }}
            />

            <div className="relative p-8 lg:p-10">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#F26B3A]">
                  Humanta Sparks
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F26B3A] text-white">
                  Flagship
                </span>
              </div>

              <h3
                className="text-[26px] lg:text-[32px] font-bold text-[#F5F5F0] leading-[1.15] mb-3"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                The recognition and perk that creates real memories
              </h3>

              <p className="text-[15px] lg:text-[16px] leading-[1.7] text-[#999] max-w-[500px] mb-8">
                Use it as a spot recognition tool or roll it out as a quarterly,
                biannual, or annual perk for your whole team. Either way, each
                Spark is a curated moment of dining and an experience for the
                employee and someone they care about. The manager&apos;s personal
                note travels with every single one.
              </p>

              {/* Feature grid */}
              <div className="spark-features grid sm:grid-cols-2 gap-4 mb-8">
                {sparksFeatures.map((f) => (
                  <div
                    key={f.label}
                    className="spark-feature rounded-xl p-4 transition-all duration-300 hover:bg-white/[0.08] hover:scale-[1.02] cursor-default"
                    style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                  >
                    <p className="text-[13px] font-semibold text-[#F5F5F0] mb-1 transition-colors duration-300 group-hover:text-[#F26B3A]">
                      {f.label}
                    </p>
                    <p className="text-[13px] leading-[1.6] text-[#777]">
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 bg-white text-[#1A1A1A] px-6 py-3 rounded-full text-[13px] font-semibold hover:bg-white/90 hover:scale-[1.03] hover:shadow-lg transition-all duration-300"
              >
                See how it works
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Teams tile */}
          <div
            className="teams-tile product-tile relative overflow-hidden rounded-2xl lg:col-span-2 flex flex-col transition-transform duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            {/* Mouse-follow glow */}
            <div
              ref={teamsGlowRef}
              className="absolute w-[300px] h-[300px] rounded-full pointer-events-none opacity-0"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,184,144,0.10) 0%, transparent 70%)",
                top: 0,
                left: 0,
              }}
            />

            <div className="relative p-8 lg:p-10 flex flex-col flex-1">
              <div className="flex-1">
                <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#9CA3AF] mb-6 block">
                  Humanta Teams
                </span>

                <h3
                  className="text-[24px] lg:text-[28px] font-bold text-[#1A1A1A] leading-[1.15] mb-4"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  Group experiences, minus the scramble
                </h3>

                <p className="text-[15px] lg:text-[16px] leading-[1.7] text-[#6B7280] mb-6">
                  Your team already spends money on group events. We make that
                  investment count. Curated group experiences that take the
                  planning, politics, and last-minute scrambling out of the
                  equation.
                </p>

                <div className="space-y-3 mb-8">
                  {["You pick the date, we handle the rest", "Curated venues and activities", "No more office manager scramble"].map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-2.5 transition-transform duration-300 hover:translate-x-1 cursor-default"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00B890] mt-2 shrink-0 transition-transform duration-300 hover:scale-150" />
                      <span className="text-[14px] text-[#4B5563] leading-[1.6]">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[#1A1A1A] text-[#1A1A1A] px-6 py-3 rounded-full text-[13px] font-semibold hover:bg-[#1A1A1A] hover:text-white hover:scale-[1.03] hover:shadow-lg transition-all duration-300 self-start"
              >
                Talk to us
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-300"
                >
                  <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
