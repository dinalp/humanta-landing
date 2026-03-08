"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#contact"
          className="group fixed bottom-8 right-8 z-40 flex items-center gap-3 bg-brand-accent text-brand-dark pl-7 pr-5 py-4 rounded-full font-semibold text-base shadow-[0_8px_30px_rgba(245,182,20,0.35)] hover:shadow-[0_8px_40px_rgba(245,182,20,0.55)] transition-shadow"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          Let&apos;s talk
          <span className="flex items-center justify-center w-8 h-8 bg-brand-dark/10 rounded-full transition-transform group-hover:translate-x-0.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-brand-dark"
            >
              <path
                d="M3 8h10m0 0L9 4m4 4L9 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
