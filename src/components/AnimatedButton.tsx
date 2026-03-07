"use client";

import { motion } from "motion/react";
import type { ComponentProps } from "react";

type AnimatedButtonProps = ComponentProps<typeof motion.a>;

export function AnimatedButton({ children, ...props }: AnimatedButtonProps) {
  return (
    <motion.a
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.a>
  );
}
