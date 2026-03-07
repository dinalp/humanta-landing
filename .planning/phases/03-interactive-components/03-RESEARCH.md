# Phase 3: Interactive Components - Research

**Researched:** 2026-03-07
**Domain:** Client-side interactivity -- animated UI components (accordion, tabbed stepper, mobile menu, floating CTA, scroll spy, micro-interactions) with reduced-motion accessibility
**Confidence:** HIGH

## Summary

Phase 3 adds all interactive behaviors to the existing static layout from Phase 1. The components already exist (Navbar, FAQ, HowItWorks) but need client-side state and animation. The single new library required is **Motion** (formerly Framer Motion), which the project already decided on. Every component in this phase is a "use client" component in Next.js App Router.

The core pattern is: each component manages its own local state (useState for open/closed, active tab, etc.), uses Motion's `motion` components for enter/exit animations, and respects `prefers-reduced-motion` via Motion's built-in `MotionConfig` wrapper. Scroll spy for active nav highlighting uses the native Intersection Observer API -- no additional library needed.

**Primary recommendation:** Install `motion` (v12.x), wrap the app in `<MotionConfig reducedMotion="user">`, then convert each static component to its interactive version one at a time. Keep all animation logic co-located with the component that owns it.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| NAV-02 | Mobile hamburger menu with animated slide-in | Motion AnimatePresence for slide-in/out panel; hamburger button toggles state |
| NAV-04 | Active section highlighted in nav on scroll | Intersection Observer API with threshold-based detection; no library needed |
| HIW-02 | Tabbed stepper with animated transitions | Motion layout animations or AnimatePresence for tab content switching |
| FAQ-02 | Expand/collapse FAQ with smooth height animation | Motion `animate={{ height: "auto" }}` with AnimatePresence for open/close |
| GLOBAL-01 | Floating "Let's talk" button bottom-right | Fixed-position component in layout.tsx or page.tsx; simple CSS + Motion hover scale |
| GLOBAL-04 | Micro-interactions on buttons/links (hover scale, glow) | Motion `whileHover` and `whileTap` props on interactive elements |
| GLOBAL-05 | Reduced-motion users see content without animations | `<MotionConfig reducedMotion="user">` at app root + CSS `prefers-reduced-motion` media query for non-Motion animations |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| motion | ^12.35 | All component animations (accordion, menu, tabs, hover) | Renamed from framer-motion; de facto React animation library; built-in height:auto, AnimatePresence, reduced-motion support |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| (none -- browser API) | N/A | Intersection Observer for scroll spy | NAV-04 active section detection |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Motion for accordion | CSS-only `<details>` + `grid-template-rows` trick | No height animation control, no exit animations, browser inconsistencies |
| Motion for menu slide | CSS transitions + class toggling | Loses AnimatePresence (exit animations require JS to delay unmount) |
| Intersection Observer | react-intersection-observer npm package | Adds dependency for a simple use case; native API is 5 lines of code |

**Installation:**
```bash
npm install motion
```

**Import pattern (Next.js App Router):**
```typescript
"use client";
import { motion, AnimatePresence } from "motion/react";
```

Note: Import from `motion/react` (NOT `framer-motion`). The `framer-motion` package is legacy.

## Architecture Patterns

### Recommended Project Structure
```
src/
  components/
    Navbar.tsx          # Add: mobile menu state, hamburger button, slide-in panel, scroll spy
    FAQ.tsx             # Add: accordion state, AnimatePresence height animation
    HowItWorks.tsx      # Add: active tab state, tab navigation, animated content switching
    FloatingCTA.tsx     # NEW: fixed-position "Let's talk" button
  app/
    layout.tsx          # Add: MotionConfig wrapper, FloatingCTA component
```

### Pattern 1: AnimatePresence for Mount/Unmount Animations
**What:** Wrap conditionally rendered content in AnimatePresence to animate exit
**When to use:** Mobile menu overlay, FAQ answer expand/collapse
**Example:**
```typescript
// Source: motion.dev/docs/react-animate-presence
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-brand-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-heading font-medium text-lg text-white">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-white text-2xl"
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
```

### Pattern 2: Mobile Menu with Slide-In
**What:** Full-screen overlay menu that slides in from right with backdrop
**When to use:** NAV-02 mobile hamburger
**Example:**
```typescript
// Mobile menu slide-in pattern
function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40"
            onClick={onClose}
          />
          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 bottom-0 w-80 bg-brand-dark z-50 p-8"
          >
            <button onClick={onClose} aria-label="Close menu" className="mb-8">
              {/* X icon */}
            </button>
            <nav className="flex flex-col gap-6">
              {links.map((link) => (
                <a key={link.href} href={link.href} onClick={onClose}
                   className="text-xl font-heading text-white">
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

### Pattern 3: Tabbed Stepper with Content Animation
**What:** Tab buttons + animated content panel that crossfades between steps
**When to use:** HIW-02 How It Works stepper
**Example:**
```typescript
function TabbedStepper({ steps }: { steps: Step[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = steps[activeIndex];

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex gap-4 mb-8">
        {steps.map((step, i) => (
          <button
            key={step.number}
            onClick={() => setActiveIndex(i)}
            className={`relative px-4 py-2 ${i === activeIndex ? "text-brand-accent" : "text-brand-text-secondary"}`}
          >
            {step.title}
            {i === activeIndex && (
              <motion.div
                layoutId="active-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent"
              />
            )}
          </button>
        ))}
      </div>
      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          <h3>{activeStep.title}</h3>
          <p>{activeStep.description}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

### Pattern 4: Scroll Spy with Intersection Observer
**What:** Detect which section is in viewport and highlight corresponding nav link
**When to use:** NAV-04 active section highlighting
**Example:**
```typescript
"use client";
import { useState, useEffect } from "react";

const SECTION_IDS = ["what-we-do", "how-it-works", "plans", "faq"];

function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" } // triggers when section crosses center
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return activeSection;
}
```

### Pattern 5: Reduced Motion Global Config
**What:** Wrap app root in MotionConfig to auto-disable transform/layout animations for reduced-motion users
**When to use:** GLOBAL-05 -- applied once in layout.tsx
**Example:**
```typescript
// src/app/layout.tsx
import { MotionConfig } from "motion/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MotionConfig reducedMotion="user">
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}
```

**Important:** `MotionConfig` is a client component. Since layout.tsx is a server component by default, extract the MotionConfig wrapper into a separate `"use client"` provider component (e.g., `Providers.tsx`) and use it in layout.tsx.

### Anti-Patterns to Avoid
- **Animating CSS height directly:** Use Motion's `height: "auto"` support, not manual height measurement with refs. Motion handles this natively.
- **Using `framer-motion` import path:** Always import from `motion/react`. The old `framer-motion` package still works but is legacy and will diverge.
- **Mounting AnimatePresence around static content:** AnimatePresence is only needed for conditional rendering (enter/exit). For persistent elements, use `animate` prop directly.
- **Scroll event listeners for scroll spy:** Use Intersection Observer instead. Scroll listeners fire on every frame and hurt performance; IO is asynchronous and GPU-friendly.
- **Forgetting `overflow-hidden` on accordion containers:** Without it, animating height from 0 shows a flash of content.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Height auto animation | Manual ref measurement + requestAnimationFrame | Motion `animate={{ height: "auto" }}` | Edge cases with dynamic content, resize, SSR hydration |
| Exit animations | setTimeout + CSS classes to delay unmount | Motion AnimatePresence | React unmounts synchronously; only AnimatePresence defers DOM removal |
| Reduced motion detection | Custom media query listener hook | Motion `<MotionConfig reducedMotion="user">` | Handles all motion components globally, no per-component logic |
| Tab indicator animation | CSS transition on pseudo-element | Motion `layoutId` shared layout animation | Smooth cross-element morph that CSS cannot achieve |
| Body scroll lock (mobile menu) | Custom scroll lock with position:fixed | CSS `overflow: hidden` on body when menu open | position:fixed causes scroll-to-top on iOS; overflow:hidden is simpler and sufficient for overlay menus |

**Key insight:** Motion already solves every animation problem in this phase. The only non-Motion code is Intersection Observer for scroll spy (which is a detection problem, not an animation problem).

## Common Pitfalls

### Pitfall 1: MotionConfig in Server Component
**What goes wrong:** Adding `<MotionConfig>` directly in layout.tsx causes "client component imported in server component" error
**Why it happens:** layout.tsx is a server component by default in Next.js App Router
**How to avoid:** Create a `Providers.tsx` client component that wraps children with MotionConfig, then use `<Providers>` in layout.tsx
**Warning signs:** Build error mentioning "use client" directive

### Pitfall 2: AnimatePresence `mode` Mismatch
**What goes wrong:** Old and new tab content overlap during transition
**Why it happens:** Default AnimatePresence mode is "sync" (both enter and exit simultaneously)
**How to avoid:** Use `mode="wait"` for tabs/steppers where only one item should show at a time
**Warning signs:** Content flicker or double-rendering during transitions

### Pitfall 3: Accordion Content Flash
**What goes wrong:** FAQ answer text briefly visible at full height before collapsing
**Why it happens:** Missing `overflow-hidden` on the motion.div container, or `initial` prop not set
**How to avoid:** Always add `className="overflow-hidden"` and set `initial={false}` on AnimatePresence to skip initial animation on page load
**Warning signs:** Flash of content on first render

### Pitfall 4: Scroll Spy Firing Incorrectly at Page Top/Bottom
**What goes wrong:** Active section jumps erratically when at the very top or bottom of page
**Why it happens:** Multiple sections visible simultaneously; rootMargin not tuned correctly
**How to avoid:** Use `rootMargin: "-50% 0px -50% 0px"` to only trigger when section crosses the vertical center of the viewport
**Warning signs:** Nav highlight jumps between sections rapidly

### Pitfall 5: Mobile Menu Not Closing on Link Click
**What goes wrong:** User clicks a nav link in the mobile menu, page scrolls but menu stays open
**Why it happens:** No `onClick` handler on links to close the menu
**How to avoid:** Each link in mobile menu calls `onClose()` alongside navigation
**Warning signs:** Menu stays open after navigation

### Pitfall 6: Focus Trap Missing in Mobile Menu
**What goes wrong:** Tab key moves focus behind the open menu overlay
**Why it happens:** No focus management on the overlay
**How to avoid:** Trap focus within the menu when open; return focus to hamburger button on close. Use `aria-modal="true"` and `role="dialog"` on the menu panel.
**Warning signs:** Keyboard users can interact with content behind the overlay

## Code Examples

### Floating CTA Button
```typescript
// src/components/FloatingCTA.tsx
"use client";
import { motion } from "motion/react";

export function FloatingCTA() {
  return (
    <motion.a
      href="#contact"
      className="fixed bottom-6 right-6 z-40 bg-brand-accent text-brand-text px-6 py-3 rounded-full font-medium shadow-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.4 }}
    >
      Let&apos;s talk
    </motion.a>
  );
}
```

### Micro-interaction Button Wrapper
```typescript
// Reusable animated button/link wrapper
"use client";
import { motion } from "motion/react";

export function AnimatedButton({
  children,
  ...props
}: React.ComponentProps<typeof motion.button>) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
```

### Hamburger Icon Animation
```typescript
// Animated hamburger lines
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="w-6 h-5 flex flex-col justify-between">
      <motion.span
        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        className="block h-0.5 w-6 bg-white origin-center"
      />
      <motion.span
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        className="block h-0.5 w-6 bg-white"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        className="block h-0.5 w-6 bg-white origin-center"
      />
    </div>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `import { motion } from "framer-motion"` | `import { motion } from "motion/react"` | Motion v11 (2024) | Must use new import path; old package is legacy |
| Manual height measurement for accordion | `animate={{ height: "auto" }}` | Framer Motion v10+ | No refs or useMeasure needed |
| Custom `useReducedMotion` hook | `<MotionConfig reducedMotion="user">` | Framer Motion v10+ | Global solution, no per-component wiring |
| CSS `scroll-behavior: smooth` only | Intersection Observer for scroll spy | Browser API (stable) | Precise section detection independent of scroll behavior |

**Deprecated/outdated:**
- `framer-motion` npm package: Still published but redirects to `motion`. Use `motion` directly.
- `useReducedMotion()` hook: Still works but `MotionConfig reducedMotion="user"` is the recommended global approach.
- `AnimateSharedLayout`: Removed. Use `layoutId` prop directly on motion components.

## Open Questions

1. **Exact hamburger `y` offset for X animation**
   - What we know: The three-line hamburger animates to an X shape by rotating top/bottom lines and hiding middle
   - What's unclear: The exact pixel offset for `y` depends on the final spacing between lines (gap in the flex container)
   - Recommendation: Tune the `y` value (8-10px) during implementation based on the actual rendered size

2. **Tab indicator design for How It Works stepper**
   - What we know: Need a visual indicator showing the active step (number/tab)
   - What's unclear: Whether to use horizontal tabs, numbered circles, or a step-progress-bar style
   - Recommendation: Use numbered step circles (matching Phase 1's existing circle design) as tab buttons with an underline or ring indicator via `layoutId`

3. **Floating CTA visibility on contact section**
   - What we know: Floating button should appear on all pages
   - What's unclear: Whether it should hide when the user is already at the contact/CTA section to avoid redundancy
   - Recommendation: Keep it always visible for simplicity; hiding adds complexity for minimal UX gain

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected -- needs setup |
| Config file | none -- see Wave 0 |
| Quick run command | N/A |
| Full suite command | N/A |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NAV-02 | Mobile menu opens/closes with animation | manual-only | Visual interaction test | N/A |
| NAV-04 | Active nav link updates on scroll | manual-only | Scroll position + DOM check | N/A |
| HIW-02 | Tab stepper switches content with animation | manual-only | Click + content visibility | N/A |
| FAQ-02 | Accordion expands/collapses smoothly | manual-only | Click + height animation | N/A |
| GLOBAL-01 | Floating CTA visible on all pages | manual-only | DOM presence check | N/A |
| GLOBAL-04 | Hover micro-interactions on buttons | manual-only | Visual hover state | N/A |
| GLOBAL-05 | Reduced motion disables animations | manual-only | prefers-reduced-motion emulation | N/A |

**Justification for manual-only:** All requirements are visual/interaction-based (animations, hover states, scroll-triggered behavior). These require browser rendering and user interaction to validate meaningfully. Unit testing animation libraries provides no value -- the verification is "does it look and feel right?" Build verification (`next build`) confirms no compilation errors.

### Sampling Rate
- **Per task commit:** `npm run build` (type-check + build succeeds)
- **Per wave merge:** `npm run build` + manual browser verification
- **Phase gate:** All 7 requirements manually verified in browser (desktop + mobile viewport)

### Wave 0 Gaps
- [ ] No test framework installed (acceptable for this phase -- all requirements are visual/manual)
- [ ] Build command (`npm run build`) serves as the automated smoke test

## Sources

### Primary (HIGH confidence)
- [motion npm](https://www.npmjs.com/package/motion) - v12.35.0 confirmed, React 18.2+ compatibility
- [motion.dev/docs/react-quick-start](https://motion.dev/docs/react-quick-start) - Import path `motion/react`, installation via `npm i motion`
- [motion.dev/docs/react-animate-presence](https://motion.dev/docs/react-animate-presence) - AnimatePresence for exit animations
- [motion.dev/docs/react-accessibility](https://motion.dev/docs/react-accessibility) - MotionConfig `reducedMotion="user"` for global reduced-motion support

### Secondary (MEDIUM confidence)
- [Multiple web sources on accordion pattern](https://dev.to/astylidis/simple-and-nice-accordion-with-framer-motion-l2l) - `height: "auto"` animation pattern verified across multiple tutorials
- [Intersection Observer for scroll spy](https://blog.maximeheckel.com/posts/scrollspy-demystified/) - rootMargin-based approach with `-50% 0px -50% 0px`
- [Josh W. Comeau on prefers-reduced-motion](https://www.joshwcomeau.com/react/prefers-reduced-motion/) - Background on the media query and React patterns

### Tertiary (LOW confidence)
- None -- all findings verified through official docs or multiple sources

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Motion v12 is the clear choice; project decision already locked this in; verified on npm
- Architecture: HIGH - All patterns are well-established Motion patterns documented on motion.dev
- Pitfalls: HIGH - Common issues well-documented across community; verified against official docs

**Research date:** 2026-03-07
**Valid until:** 2026-04-07 (stable domain; Motion v12 is mature)
