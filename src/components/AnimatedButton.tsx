"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Variant = "dark" | "outline" | "light";

interface AnimatedButtonProps {
  href?: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

const variantClasses: Record<Variant, string> = {
  dark: "bg-bg-dark text-text-on-dark hover:bg-bg-dark-card shadow-sm hover:shadow-md",
  outline:
    "border border-text-primary text-text-primary hover:bg-bg-dark hover:text-text-on-dark",
  light: "bg-white text-text-primary hover:bg-bg-secondary shadow-sm hover:shadow-md",
};

export function AnimatedButton({
  href,
  variant = "dark",
  className = "",
  children,
  onClick,
}: AnimatedButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition-all duration-300 cursor-pointer ${variantClasses[variant]} ${className}`;

  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.a>
  );
}
