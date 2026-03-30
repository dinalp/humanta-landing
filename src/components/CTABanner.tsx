"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";

export function CTABanner() {
  const containerRef = useRef<HTMLElement>(null);
  const sceneContainerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{ destroy: () => void } | null>(null);

  // Manually initialize a second Unicorn Studio scene
  useEffect(() => {
    let mounted = true;

    const initScene = async () => {
      // Wait for the SDK to be available (loaded by the hero's UnicornScene)
      const waitForSDK = () =>
        new Promise<void>((resolve) => {
          const check = () => {
            if ((window as unknown as Record<string, unknown>).UnicornStudio) {
              resolve();
            } else {
              setTimeout(check, 200);
            }
          };
          check();
        });

      await waitForSDK();
      if (!mounted || !sceneContainerRef.current) return;

      const US = (window as unknown as Record<string, { addScene: (opts: Record<string, unknown>) => Promise<{ destroy: () => void }> }>).UnicornStudio;

      try {
        const scene = await US.addScene({
          elementId: "cta-unicorn",
          projectId: "MMzQ6ua96gJtL5DcS7iV",
          scale: 1,
          dpi: 1,
          fps: 60,
          lazyLoad: true,
          production: false,
        });
        if (mounted) {
          sceneRef.current = scene;
        }
      } catch {
        // Scene may already be initialized or SDK not ready
      }
    };

    initScene();

    return () => {
      mounted = false;
      if (sceneRef.current) {
        sceneRef.current.destroy();
      }
    };
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ".cta-headline",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".cta-subline",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".cta-button",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="cta"
      ref={containerRef}
      className="relative overflow-hidden min-h-[400px]"
    >
      {/* Unicorn Studios WebGL background */}
      <div
        ref={sceneContainerRef}
        id="cta-unicorn"
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: "calc(100% + 80px)" }}
      />

      {/* Content */}
      <div className="relative z-10 py-28 lg:py-40 px-6 lg:px-8">
        <div className="max-w-[740px] mx-auto text-center">
          <h2
            className="cta-headline text-[28px] md:text-[38px] lg:text-[46px] font-bold leading-[1.15]"
            style={{
              color: "#FFFFFF",
              fontFamily: "var(--font-plus-jakarta), sans-serif",
            }}
          >
            Stop spending money on things people forget
          </h2>

          <p
            className="cta-subline text-[16px] lg:text-[18px] mt-5 lg:mt-6 leading-[1.7] text-white/80"
          >
            One conversation is all it takes. We&apos;ll show you what recognition
            looks like when people actually remember it.
          </p>

          <Link
            href="/contact"
            className="cta-button inline-flex items-center gap-2 mt-10 lg:mt-12 bg-white text-[#1A1A1A] px-8 py-3.5 rounded-full text-[15px] font-semibold hover:bg-white/90 hover:scale-[1.04] transition-all duration-300"
          >
            Talk to us
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
