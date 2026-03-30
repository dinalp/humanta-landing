"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";

const stats = [
  {
    number: "70%",
    body: "of team engagement is determined by the manager.",
    source: "Gallup",
  },
  {
    number: "21%",
    body: "of employees globally are engaged at work.",
    source: "Gallup, 2025",
  },
  {
    number: "45%",
    body: "less likely to leave within two years when employees receive high-quality recognition.",
    source: "Gallup / Workhuman, 2024",
  },
];

export function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const [slide, setSlide] = useState(0);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        sectionRef.current.querySelector(".social-proof-inner"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ backgroundColor: "#FAFAF8" }}
    >
      {/* Warm gradient wash */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] md:w-[700px] md:h-[500px]"
        style={{
          background: [
            "radial-gradient(ellipse at 40% 45%, rgba(242, 107, 58, 0.14) 0%, transparent 60%)",
            "radial-gradient(ellipse at 65% 50%, rgba(232, 184, 48, 0.10) 0%, transparent 55%)",
            "radial-gradient(ellipse at 50% 60%, rgba(0, 184, 144, 0.08) 0%, transparent 50%)",
          ].join(", "),
          filter: "blur(60px)",
        }}
      />

      <div className="social-proof-inner relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="sr-only">What people are saying</h2>
        {/* Slides with side arrows */}
        <div className="relative min-h-[280px] flex items-center justify-center">
          {/* Left arrow */}
          <button
            onClick={() => setSlide(slide === 0 ? 1 : 0)}
            className="hidden md:flex absolute -left-16 lg:-left-20 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center transition-all duration-300 hover:bg-[#1A1A1A] hover:text-white text-[#9CA3AF] z-20"
            aria-label="Previous slide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            onClick={() => setSlide(slide === 0 ? 1 : 0)}
            className="hidden md:flex absolute -right-16 lg:-right-20 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center transition-all duration-300 hover:bg-[#1A1A1A] hover:text-white text-[#9CA3AF] z-20"
            aria-label="Next slide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <AnimatePresence mode="wait">
            {slide === 0 ? (
              <motion.div
                key="quote"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-center"
              >
                <blockquote>
                  <p
                    className="font-heading text-[22px] sm:text-[26px] md:text-[30px] lg:text-[32px] italic leading-relaxed"
                    style={{ color: "#1A1A1A" }}
                  >
                    &ldquo;The thing I kept coming back to is that it solves a
                    real problem. Managers want to recognise their people but the
                    tools they have are either too corporate or too forgettable.
                    This gives them something worth giving.&rdquo;
                  </p>
                  <footer className="mt-8">
                    <p
                      className="text-base font-semibold"
                      style={{ color: "#1A1A1A" }}
                    >
                      George
                    </p>
                    <p className="text-sm text-text-secondary mt-1">
                      Head of People, Series A startup
                    </p>
                  </footer>
                </blockquote>
              </motion.div>
            ) : (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full"
              >
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12 text-center">
                  {stats.map((stat) => (
                    <div key={stat.number}>
                      <p
                        className="text-[48px] lg:text-[56px] font-extrabold leading-none mb-3"
                        style={{
                          color: "#1A1A1A",
                          fontFamily:
                            "var(--font-plus-jakarta), sans-serif",
                        }}
                      >
                        {stat.number}
                      </p>
                      <p className="text-[15px] lg:text-[16px] leading-[1.6] text-[#4B5563] mb-2">
                        {stat.body}
                      </p>
                      <p className="text-[12px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                        {stat.source}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile arrows below content */}
        <div className="flex md:hidden justify-center gap-4 mt-10">
          <button
            onClick={() => setSlide(slide === 0 ? 1 : 0)}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-[#D1D5DB] text-[#9CA3AF] transition-all duration-300 hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A]"
            aria-label="Previous slide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => setSlide(slide === 0 ? 1 : 0)}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-[#D1D5DB] text-[#9CA3AF] transition-all duration-300 hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A]"
            aria-label="Next slide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
