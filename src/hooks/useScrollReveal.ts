"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  duration?: number;
  stagger?: number;
  childSelector?: string;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const {
    y = 40,
    x = 0,
    duration = 0.7,
    stagger = 0.12,
    childSelector,
    once = true,
  } = options;

  const ref = useRef<T>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const targets = childSelector
        ? gsap.utils.toArray(childSelector, ref.current)
        : ref.current;

      const scrollTrigger: ScrollTrigger.Vars = {
        trigger: ref.current,
        start: "top 80%",
        toggleActions: once
          ? "play none none none"
          : "play none none reverse",
      };

      gsap.fromTo(targets, { y, x, opacity: 0 }, {
        y: 0,
        x: 0,
        opacity: 1,
        duration,
        ease: "power2.out",
        stagger: childSelector ? stagger : 0,
        scrollTrigger,
      });
    },
    { scope: ref }
  );

  return ref;
}
