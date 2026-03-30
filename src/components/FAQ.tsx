"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";

const FAQ_ITEMS = [
  {
    question: "We already do gift cards. Why would we switch?",
    answer:
      "Gift cards disappear into someone\u2019s grocery shop and nobody thinks about them again. A Spark is quality time with a loved one and a memory that stays with them. Those two things are more powerful than any dollar figure. Their partner associates positive feelings with the company. Two people walk away as advocates. That\u2019s a fundamentally different return on the same budget.",
  },
  {
    question: "How much admin does this create for our People team?",
    answer:
      "None. Your People team sets the programme up once: budget, eligibility, cadence. From there, managers nominate in 2 minutes and employees claim in 5. We handle venue booking, dietary requirements, timing, and logistics. Your team gets feedback data back without doing any of the work.",
  },
  {
    question: "What does it cost?",
    answer:
      "Each Spark sits within the range most companies already spend on gift cards and ad-hoc bonuses. The difference is what you get back. We\u2019ll walk you through pricing on a call so we can tailor it to your team size and cadence.",
  },
  {
    question: "Is there a minimum commitment?",
    answer:
      "We offer a 10-Spark pilot so you can see the impact before committing further. No lock-in contracts. Sparks are valid for 12 months with full rollover, so there\u2019s no pressure to use them immediately.",
  },
  {
    question: "What data do we actually get back?",
    answer:
      "After every Spark, we collect employee sentiment, an eNPS-style score, and (with permission) photos from the experience. You get a quarterly one-page narrative showing how recognition is landing across your team. Real signal, not another dashboard.",
  },
  {
    question: "How quickly can we get started?",
    answer:
      "Most teams are live within a week. We handle onboarding, set up your programme parameters, and brief your managers. The first Sparks can go out the same week.",
  },
  {
    question: "We\u2019re not all based in Sydney. Can we still use it?",
    answer:
      "We\u2019re currently live across Sydney\u2019s best precincts. If the majority of your team is Sydney-based, we\u2019re a great fit. We\u2019re expanding into new cities. Talk to us about your situation and we\u2019ll let you know what\u2019s possible.",
  },
];

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div className="faq-item group">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between py-6 md:py-7 text-left transition-colors duration-200"
      >
        <div className="flex items-start gap-4 pr-4">
          <span
            className="text-[13px] font-bold tracking-wider mt-1 shrink-0 transition-colors duration-300"
            style={{ color: isOpen ? "#F26B3A" : "#D1D5DB" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="font-heading font-semibold text-[17px] md:text-[19px] leading-[1.3] transition-colors duration-200"
            style={{ color: isOpen ? "#1A1A1A" : "#374151" }}
          >
            {question}
          </span>
        </div>
        <div
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: isOpen ? "#1A1A1A" : "#F3F4F6",
          }}
        >
          <motion.svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <path
              d="M7 1v12M1 7h12"
              stroke={isOpen ? "#FFFFFF" : "#6B7280"}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </motion.svg>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="overflow-hidden"
          >
            <div className="pb-6 md:pb-7 pl-[52px] text-[#6B7280] text-[15px] md:text-[16px] leading-[1.7] max-w-[600px]">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Divider */}
      <div className="h-px bg-[#E5E7EB]" />
    </div>
  );
}

export function FAQ() {
  const containerRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".faq-label",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            },
          }
        );

        gsap.fromTo(
          ".faq-heading",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 78%",
            },
          }
        );

        gsap.fromTo(
          ".faq-item",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".faq-item",
              start: "top 85%",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="faq"
      className="bg-white py-24 lg:py-36"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:gap-20 xl:gap-28">
          {/* Left column: header + CTA */}
          <div className="lg:w-[35%] lg:sticky lg:top-32 lg:self-start mb-12 lg:mb-0">
            <span className="faq-label inline-block text-[13px] font-semibold uppercase tracking-[0.08em] text-[#F26B3A] mb-5">
              FAQ
            </span>
            <h2
              className="faq-heading text-[28px] md:text-[36px] lg:text-[42px] font-bold text-[#1A1A1A] leading-[1.15] mb-6"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              Questions people actually ask
            </h2>
            <p className="text-[15px] lg:text-[16px] text-[#6B7280] leading-[1.7] mb-8">
              Can't find what you're looking for? We're happy to walk you
              through it.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-[#1A1A1A] text-[#1A1A1A] px-6 py-3 rounded-full text-[13px] font-semibold hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
            >
              Talk to us
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Right column: accordion */}
          <div className="lg:w-[65%]">
            <div className="h-px bg-[#E5E7EB]" />
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
