"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function Story() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ".thesis-label",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".thesis-headline",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
          },
        }
      );

      gsap.fromTo(
        ".thesis-body",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".thesis-body",
            start: "top 85%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-[#FAFAF8] py-24 lg:py-36 px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:gap-20 xl:gap-28">
          {/* Left column: problem statement */}
          <div className="lg:w-[45%] lg:sticky lg:top-32 lg:self-start mb-12 lg:mb-0">
            <span className="thesis-label inline-block text-[13px] font-semibold uppercase tracking-[0.08em] text-[#F26B3A] mb-5">
              The problem
            </span>
            <h2
              className="thesis-headline text-[28px] sm:text-[36px] lg:text-[44px] font-bold leading-[1.15] text-[#1A1A1A]"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              Your team doesn't remember the gift card. They never will.
            </h2>
          </div>

          {/* Right column: thesis breakdown */}
          <div className="lg:w-[55%] space-y-10">
            <div className="thesis-body">
              <p className="text-[16px] lg:text-[17px] leading-[1.75] text-[#4B5563]">
                Companies pour money into perks that vanish the moment they land.
                Gift cards get spent on petrol. Pizza parties get eye-rolls.
                Points platforms collect dust. Meanwhile, the one thing people
                actually want from their employer has nothing to do with a
                discount code.
              </p>
            </div>

            <div className="thesis-body">
              <p className="text-[16px] lg:text-[17px] leading-[1.75] text-[#4B5563]">
                They want to feel recognised. Not with a Slack emoji or a
                templated email, but in a way that reaches into their actual
                life. The kind of recognition their partner hears about over
                dinner. The kind that makes someone proud to work where they
                work.
              </p>
            </div>

            <div className="thesis-body">
              <p className="text-[16px] lg:text-[17px] leading-[1.75] text-[#4B5563]">
                AI is reshaping every team. Restructures are thinning them out.
                The companies that win from here aren't just the most efficient.
                They're the ones where people are genuinely engaged, where
                retention isn't a spreadsheet problem but a culture one.
              </p>
            </div>

            <div className="thesis-body">
              <p className="text-[18px] lg:text-[20px] leading-[1.6] text-[#1A1A1A] font-semibold"
                 style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                Human connection isn't a perk. It's an operating input. The
                companies that invest in it will outperform. Humanta makes that
                investment easy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
