"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const [hidden, setHidden] = useState(true);
  const [inHero, setInHero] = useState(true);

  useEffect(() => {
    // Only show custom cursor on devices with a fine pointer (not touch)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      // Check if inside hero, CTA, or navbar (all use different cursors)
      let hideGradientCursor = false;
      for (const id of ["hero", "cta"]) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (
            e.clientY >= rect.top && e.clientY <= rect.bottom &&
            e.clientX >= rect.left && e.clientX <= rect.right
          ) {
            hideGradientCursor = true;
            break;
          }
        }
      }
      // Also hide when over the navbar
      if (!hideGradientCursor) {
        const nav = document.querySelector("nav");
        if (nav) {
          const rect = nav.getBoundingClientRect();
          if (
            e.clientY >= rect.top && e.clientY <= rect.bottom &&
            e.clientX >= rect.left && e.clientX <= rect.right
          ) {
            hideGradientCursor = true;
          }
        }
      }
      setInHero(hideGradientCursor);
    };

    const handleEnter = () => setHidden(false);
    const handleLeave = () => setHidden(true);

    // Smooth lerp animation loop
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 16}px, ${pos.current.y - 16}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        width: 32,
        height: 32,
        opacity: hidden || inHero ? 0 : 1,
        transition: "opacity 0.2s ease",
        background:
          "linear-gradient(135deg, #F26B3A 0%, #F09030 20%, #E8B830 40%, #A0C830 65%, #00B890 100%)",
        backgroundSize: "300% 300%",
        animation: "cursor-gradient-shift 4s ease infinite",
        WebkitMaskImage: "url('/logos/humanta-cursor-white.png')",
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskImage: "url('/logos/humanta-cursor-white.png')",
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
      }}
    />
  );
}
