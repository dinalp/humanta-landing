"use client";

import { motion } from "motion/react";

export function FloatingCTA() {
  return (
    <motion.a
      href="#contact"
      className="fixed bottom-6 right-6 z-40 bg-brand-accent text-brand-text px-6 py-3 rounded-full font-medium shadow-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.4 }}
    >
      Let&apos;s talk
    </motion.a>
  );
}
