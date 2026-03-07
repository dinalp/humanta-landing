"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

export function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = HOW_IT_WORKS_STEPS[activeIndex];

  return (
    <section id="how-it-works" className="bg-brand-cream py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-heading font-semibold text-3xl md:text-4xl text-brand-text text-center mb-16">
          How Humanta Works
        </h2>

        {/* Tab buttons */}
        <div className="flex overflow-x-auto gap-2 sm:gap-4 mb-12 pb-2 -mx-2 px-2">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl flex-shrink-0 transition-colors ${
                  isActive
                    ? "bg-white shadow-sm"
                    : "hover:bg-white/50"
                }`}
              >
                <div className="relative w-10 h-10 flex items-center justify-center">
                  {isActive && (
                    <motion.div
                      layoutId="active-step"
                      className="absolute inset-0 rounded-full bg-brand-accent"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  <span
                    className={`relative z-10 text-sm font-semibold ${
                      isActive
                        ? "text-white"
                        : "text-brand-text/40"
                    }`}
                  >
                    {step.number}
                  </span>
                  {!isActive && (
                    <div className="absolute inset-0 rounded-full bg-white border-2 border-brand-text/20" />
                  )}
                </div>
                <span
                  className={`text-sm whitespace-nowrap ${
                    isActive
                      ? "text-brand-text font-semibold"
                      : "text-brand-text-secondary"
                  }`}
                >
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Progress indicator */}
        <div className="w-full h-1 bg-brand-text/10 rounded-full mb-10">
          <motion.div
            className="h-full bg-brand-accent rounded-full"
            animate={{ width: `${((activeIndex + 1) / HOW_IT_WORKS_STEPS.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Content area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-accent text-white rounded-full text-2xl font-semibold mb-6">
              {activeStep.number}
            </div>
            <h3 className="font-heading font-semibold text-2xl md:text-3xl text-brand-text mb-4">
              {activeStep.title}
            </h3>
            <p className="text-brand-text-secondary text-lg leading-relaxed max-w-xl mx-auto">
              {activeStep.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
