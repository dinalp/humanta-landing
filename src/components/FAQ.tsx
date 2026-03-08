"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FAQ_ITEMS } from "@/lib/constants";
import { gsap, useGSAP } from "@/lib/gsap";

function AccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item border-b border-brand-border" style={{ opacity: 0 }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="font-heading font-medium text-lg text-white pr-4">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-white text-2xl shrink-0"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-white/70 font-body text-base">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(".faq-heading", { y: 30, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.fromTo(".faq-item", { y: 30, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".faq-item",
          start: "top 85%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="faq"
      className="bg-brand-dark py-24 lg:py-32"
      ref={containerRef}
    >
      <div className="max-w-3xl mx-auto px-6">
        <h2
          className="faq-heading font-heading font-semibold text-3xl md:text-4xl text-white text-center mb-16"
          style={{ opacity: 0 }}
        >
          Everything you need to know
        </h2>

        <div>
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
