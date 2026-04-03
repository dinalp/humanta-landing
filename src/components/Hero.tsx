"use client";

import Link from "next/link";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen min-h-[600px] overflow-hidden bg-[#0a0a0a]"
      style={{ cursor: "url('/logos/humanta-cursor-white.png') 16 16, auto" }}
    >
      {/* WebGL scene via vanilla SDK (loaded globally in layout) */}
      <div
        id="us-hero"
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ bottom: "-80px", width: "100%", height: "calc(100% + 80px)", opacity: 0 }}
      />

      {/* Content overlay */}
      <div className="relative z-10 flex items-center h-full px-6 lg:px-12 xl:px-20">
        <div className="max-w-[1400px] mx-auto w-full">
          {/* Headline + subtitle layout */}
          <div className="relative">
            <h1
              className="text-white leading-[1.08] tracking-tight font-extrabold"
              style={{
                fontFamily: "var(--font-plus-jakarta), sans-serif",
                fontSize: "clamp(44px, 8vw, 110px)",
              }}
            >
              <span className="block overflow-hidden pb-2">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease, delay: 0.3 }}
                  className="block"
                >
                  The human
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-2">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease, delay: 0.45 }}
                  className="block"
                >
                  connection
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-2">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease, delay: 0.6 }}
                  className="block"
                >
                  layer for
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-2">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease, delay: 0.75 }}
                  className="block"
                >
                  companies
                </motion.span>
              </span>
            </h1>

            {/* Subtitle positioned to the right, alongside the headline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease, delay: 1 }}
              className="lg:absolute lg:right-0 lg:top-[35%] lg:max-w-[260px] xl:max-w-[300px] mt-8 lg:mt-0"
            >
              <p className="text-[15px] lg:text-[16px] text-white/70 leading-[1.7]">
                We help companies invest in real human connection. Individual
                recognition moments for employees and someone they care about.
                Group experiences that actually bring teams together. All of it
                cleverly matched to personality, managed end to end, with zero
                admin for your People team.
              </p>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 1.1 }}
            className="mt-10 lg:mt-14"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-white text-[#1A1A1A] px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-all duration-300"
            >
              Talk to us
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path
                  d="M3 8h10m0 0L9 4m4 4L9 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
