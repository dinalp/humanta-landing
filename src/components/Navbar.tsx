"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useActiveSection } from "@/hooks/useActiveSection";

const NAV_LINKS = [
  { label: "The problem", href: "/#about" },
  { label: "Our approach", href: "/#sparks" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Why us", href: "/#difference" },
  { label: "FAQ", href: "/#faq" },
];

interface NavbarProps {
  forceDark?: boolean;
}

export function Navbar({ forceDark = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(forceDark);
  const [hidden, setHidden] = useState(forceDark);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(forceDark || currentY > 50);

      // Only show again when actively scrolling UP
      if (currentY < lastScrollY.current) {
        setHidden(false);
      } else if (currentY > 100 && currentY > lastScrollY.current) {
        setHidden(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [forceDark]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-border-light"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 flex-shrink-0 group"
          >
            <Image
              src={scrolled ? "/logos/humanta-mark-black.png" : "/logos/humanta-mark-white.png"}
              alt="Humanta - employee recognition and team experiences"
              width={32}
              height={32}
              className="h-8 w-8 transition-transform duration-500 ease-out group-hover:scale-125 group-hover:rotate-12"
              priority
            />
            <span className={`text-xl font-heading font-bold transition-all duration-500 ease-out group-hover:tracking-wider group-hover:scale-105 origin-left ${
              scrolled ? "text-text-primary" : "text-white"
            }`}>
              Humanta
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => {
              const sectionId = link.href.replace("/#", "");
              const isActive = activeSection === sectionId;

              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.2, duration: 0.5 }}
                  className={`relative text-sm font-medium transition-colors duration-200 hover-underline ${
                    scrolled
                      ? isActive
                        ? "text-text-primary"
                        : "text-text-secondary hover:text-text-primary"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-humanta-coral"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.a>
              );
            })}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link
                href="/contact"
                className={`hidden md:inline-flex px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  scrolled
                    ? "bg-bg-dark text-text-on-dark hover:bg-bg-dark-card hover:shadow-lg"
                    : "bg-white/15 text-white border border-white/30 hover:bg-white/25"
                }`}
              >
                Talk to us
              </Link>
            </motion.div>

            {/* Hamburger button (mobile) */}
            <button
              type="button"
              className="md:hidden relative w-6 h-5 flex flex-col justify-between"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <motion.span
                className={`block w-full h-0.5 rounded-full ${scrolled ? "bg-text-primary" : "bg-white"} origin-center`}
                animate={
                  menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className={`block w-full h-0.5 rounded-full ${scrolled ? "bg-text-primary" : "bg-white"}`}
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className={`block w-full h-0.5 rounded-full ${scrolled ? "bg-text-primary" : "bg-white"} origin-center`}
                animate={
                  menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.25 }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              role="dialog"
              aria-modal="true"
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-full bg-white flex flex-col shadow-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            >
              {/* Close button */}
              <div className="flex justify-end p-6">
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="text-text-primary p-1 hover:text-humanta-coral transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-6 px-8 pt-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-xl font-heading font-semibold text-text-primary hover:text-humanta-coral transition-colors"
                  >
                    {link.label}
                  </a>
                ))}

                {/* CTA in mobile menu */}
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-4 inline-flex justify-center bg-bg-dark text-text-on-dark px-6 py-3 rounded-full text-sm font-semibold hover:bg-bg-dark-card transition-all duration-300"
                >
                  Talk to us
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
