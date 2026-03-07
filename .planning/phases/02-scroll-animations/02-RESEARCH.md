# Phase 2: Scroll Animations - Research

**Researched:** 2026-03-07
**Domain:** Scroll-driven animations (GSAP, Lenis, parallax, pinning, text reveals)
**Confidence:** HIGH

## Summary

Phase 2 adds premium scroll-driven animations to the static layout built in Phase 1. The stack is GSAP (ScrollTrigger + SplitText) for scroll-linked animations and text reveals, plus Lenis for buttery-smooth scroll momentum. All three are now fully free (GSAP since the Webflow acquisition in 2024). The existing component architecture (Hero, Story, HowItWorks, Pricing, FAQ, CTABanner) provides clean attachment points -- each component gets a `useGSAP` hook with scoped refs.

The most complex piece is the Story section scroll-pinning: the entire section pins while 3 panels cross-fade with clip-path image reveals. This requires a GSAP timeline bound to ScrollTrigger with `scrub`. The hero gets a choreographed entrance (SplitText word stagger + sequenced fade-ins) and parallax background. All other sections get scroll-triggered fade/slide reveals with child staggering. Lenis wraps the page at the layout level and syncs with GSAP's ticker.

**Primary recommendation:** Use `gsap` (3.14.x) with `@gsap/react` for the `useGSAP` hook pattern, `gsap/SplitText` for text splitting, and `lenis` (1.3.x) with `lenis/react` for smooth scroll. Each component owns its own animation via `useGSAP` with a scoped container ref.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Subtle parallax on hero background (~20% slower than scroll) -- premium depth without distraction
- Parallax disabled on mobile -- static hero image instead (performance/reliability)
- Hero headline: word-by-word stagger reveal on page load
- Full choreographed hero entrance: headline words stagger in, then subtext fades in, then CTA buttons appear last
- Story section pins to viewport while user scrolls through all 3 panels
- Text cross-fades between panels while images reveal via clip-path expand animation (circle/rectangle clips expanding to full)
- Mobile: no pinning -- panels stack vertically with scroll-triggered fade/slide reveals
- Reveal type per section: Claude's discretion (fade-up, fade-in, slide-from-side)
- Child elements stagger within sections: heading first, then subtext, then cards/items
- Trigger point: early (~80% from top / 20% visible)
- Pricing and benefit cards: staggered cascade entrance (100-150ms delay between each card)
- Smooth & measured timing: ~0.6-0.8s durations, ease-out curves
- "wding.app" is the primary animation reference for feel (warm, human, premium)

### Claude's Discretion
- Exact parallax speed values and easing
- Pin scroll distance for story section
- Section reveal type per section (fade-up vs. slide vs. fade-in)
- Animation replay behavior (once vs. replay per element type)
- Lenis lerp and smoothing parameters
- CTA banner animation approach
- Exact stagger delay values and easing curves
- Any additional micro-animations that enhance premium feel

### Deferred Ideas (OUT OF SCOPE)
- wding.app hover effects, button animations (Phase 3)
- Page transition animations (ENH-05, v2)
- Scroll progress indicator bar (ENH-07, v2)
- Custom cursor effects (ENH-04, v2)
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HERO-02 | Parallax effect on hero background image (desktop only) | GSAP ScrollTrigger with `scrub: true` on the hero background image, translating Y at reduced rate. Disable via `matchMedia` on mobile. |
| HERO-03 | Staggered text reveal animation on hero headline on page load | GSAP SplitText to split headline into words, then `gsap.from()` with `stagger` and `ease: "power3.out"`. Sequenced timeline for full choreography. |
| STORY-02 | Scroll-pinned panel transitions via GSAP | ScrollTrigger `pin: true` on story container, `scrub: 1` timeline controlling panel cross-fades. ~3x viewport `end: "+=300%"`. |
| STORY-03 | Clip-path/scale image reveals as panels enter | Animate `clipPath` from `"circle(0% at 50% 50%)"` to `"circle(100% at 50% 50%)"` (or `inset()`) via GSAP within the pinned timeline. |
| GLOBAL-02 | Scroll-triggered section reveals (fade + slide) throughout the page | Reusable `useScrollReveal` hook or utility using ScrollTrigger on each section with `start: "top 80%"`. |
| GLOBAL-03 | Buttery-smooth scroll momentum via Lenis | `ReactLenis` provider in layout, synced to GSAP ticker. `lerp: 0.1`, `smoothWheel: true`. |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| gsap | 3.14.x | Animation engine, ScrollTrigger, SplitText | Industry standard for scroll animations; now fully free; best performance and API for complex timelines |
| @gsap/react | 2.1.x | `useGSAP` hook for React lifecycle integration | Official GSAP React binding; automatic cleanup via `gsap.context()` |
| lenis | 1.3.x | Smooth scroll momentum | Lightweight, syncs perfectly with GSAP ticker, widely adopted (97+ npm dependents) |

### Sub-packages (included in gsap)
| Import | Purpose | Notes |
|--------|---------|-------|
| `gsap/ScrollTrigger` | Scroll-linked animations, pinning | Register via `gsap.registerPlugin()` |
| `gsap/SplitText` | Word/character text splitting | Now free; used for hero headline stagger |
| `lenis/react` | `<ReactLenis>` provider + `useLenis` hook | Built into the `lenis` package |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| GSAP SplitText | SplitType (npm) | SplitType is lighter but SplitText is now free and integrates natively with GSAP timelines |
| Lenis | GSAP ScrollSmoother | ScrollSmoother is GSAP-native but Lenis is the community standard and the user's stack choice |
| GSAP for reveals | Framer Motion | Motion/Framer Motion is great for component animations (Phase 3) but GSAP is better for scroll-linked timelines |

**Installation:**
```bash
npm install gsap @gsap/react lenis
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── layout.tsx           # Wrap children with <SmoothScrollProvider>
│   └── page.tsx             # Unchanged -- imports all section components
├── components/
│   ├── Hero.tsx             # Add "use client", useGSAP for parallax + entrance
│   ├── Story.tsx            # Add "use client", useGSAP for pinning + clip-path
│   ├── HowItWorks.tsx       # Add "use client", useGSAP for section reveal
│   ├── Pricing.tsx          # Add "use client", useGSAP for card cascade
│   ├── FAQ.tsx              # Add "use client", useGSAP for section reveal
│   ├── CTABanner.tsx        # Add "use client", useGSAP for reveal + optional parallax
│   └── Navbar.tsx           # No animation changes in Phase 2
├── providers/
│   └── SmoothScrollProvider.tsx  # ReactLenis + GSAP ticker sync
└── hooks/
    └── useScrollReveal.ts   # Reusable fade/slide reveal hook
```

### Pattern 1: GSAP Plugin Registration (once, at module scope)
**What:** Register all GSAP plugins once in a shared location
**When to use:** Every component that uses GSAP
**Example:**
```typescript
// src/lib/gsap.ts
"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };
```

### Pattern 2: Lenis + GSAP Ticker Sync Provider
**What:** A React provider that creates a Lenis instance and syncs it with GSAP's ticker
**When to use:** Wrap the entire app in layout.tsx
**Example:**
```typescript
// src/providers/SmoothScrollProvider.tsx
"use client";
import { ReactLenis } from "lenis/react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Sync Lenis with GSAP ticker -- required for ScrollTrigger accuracy
    const update = (time: number) => {
      // Lenis instances auto-update via ReactLenis
    };
    gsap.ticker.lagSmoothing(0);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
```

Note: When using `<ReactLenis root>`, the provider attaches to the document root. The GSAP ticker sync is handled by adding a listener:

```typescript
// Inside the provider or a useEffect
import { useLenis } from "lenis/react";

// In a child component or via the provider:
const lenis = useLenis((scroll) => {
  // Called on every scroll event
});

// GSAP ticker integration (in useEffect):
gsap.ticker.add((time) => {
  lenis?.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
```

### Pattern 3: Component-scoped useGSAP with ScrollTrigger
**What:** Each component owns its animations via useGSAP with a container ref scope
**When to use:** Every animated component
**Example:**
```typescript
"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function HowItWorks() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // All selectors scoped to containerRef
    gsap.from(".step-card", {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });
  }, { scope: containerRef });

  return <section ref={containerRef}>{/* ... */}</section>;
}
```

### Pattern 4: Hero Choreographed Entrance (SplitText + Timeline)
**What:** Split headline into words, stagger in, then sequence subtext and CTA
**When to use:** Hero component on page load
**Example:**
```typescript
useGSAP(() => {
  const split = SplitText.create(".hero-headline", { type: "words" });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(split.words, {
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.08,
  })
  .from(".hero-subtext", {
    y: 30,
    opacity: 0,
    duration: 0.6,
  }, "-=0.3")
  .from(".hero-cta", {
    y: 20,
    opacity: 0,
    duration: 0.5,
  }, "-=0.2");
}, { scope: heroRef });
```

### Pattern 5: Story Section Pin + Clip-Path Timeline
**What:** Pin the story section, scrub through panel cross-fades with clip-path image reveals
**When to use:** Story section with 3 panels
**Example:**
```typescript
useGSAP(() => {
  const panels = gsap.utils.toArray<HTMLElement>(".story-panel");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.current,
      pin: true,
      scrub: 1,
      start: "top top",
      end: "+=300%", // 3x viewport height for 3 panels
    },
  });

  // Panel 1 is visible by default; animate panels 2 and 3 in
  panels.forEach((panel, i) => {
    if (i === 0) return;

    // Cross-fade: previous panel text out, new panel text in
    tl.to(panels[i - 1].querySelector(".panel-text"), {
      opacity: 0,
      duration: 0.3,
    })
    .from(panel.querySelector(".panel-text"), {
      opacity: 0,
      duration: 0.3,
    })
    // Clip-path reveal on image
    .fromTo(panel.querySelector(".panel-image"), {
      clipPath: "circle(0% at 50% 50%)",
    }, {
      clipPath: "circle(100% at 50% 50%)",
      duration: 0.5,
    }, "<");
  });
}, { scope: containerRef });
```

### Pattern 6: Parallax via ScrollTrigger
**What:** Hero background moves slower than scroll
**When to use:** Hero background image (desktop only)
**Example:**
```typescript
useGSAP(() => {
  // Only on desktop
  ScrollTrigger.matchMedia({
    "(min-width: 768px)": () => {
      gsap.to(".hero-bg", {
        yPercent: 20, // moves 20% of its height over scroll distance
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
  });
}, { scope: heroRef });
```

### Anti-Patterns to Avoid
- **Animating the pinned element itself:** Never animate transform/position on the element that has `pin: true`. Animate nested children instead -- GSAP measures the pinned element's position and animating it causes jitter.
- **Forgetting GSAP plugin registration:** All plugins (ScrollTrigger, SplitText) must be registered with `gsap.registerPlugin()` before use. Do this once at import time, not inside hooks.
- **Creating ScrollTriggers in server components:** `useGSAP` requires `"use client"`. All animated components must be client components.
- **Using useEffect instead of useGSAP:** `useGSAP` handles automatic cleanup of all GSAP instances (timelines, ScrollTriggers, SplitText). Using `useEffect` requires manual cleanup and is error-prone with React 18 strict mode.
- **Not calling ScrollTrigger.refresh():** After dynamic layout changes (fonts loading, images loading), call `ScrollTrigger.refresh()` to recalculate pin positions. Important for Next.js where images load lazily.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Smooth scroll | Custom requestAnimationFrame scroll interpolation | Lenis | Touch device support, accessibility, momentum curves, GSAP sync |
| Text splitting | Manual DOM manipulation to wrap words in spans | GSAP SplitText | Handles reflow, line detection, accessibility (aria), revert cleanup |
| Scroll-linked animation | IntersectionObserver + manual progress calculation | GSAP ScrollTrigger | Pin spacer math, scrub smoothing, responsive breakpoints, cleanup |
| Clip-path animation | CSS @keyframes with scroll-linked timing | GSAP `clipPath` tween | Precise scrub sync, cross-browser normalization, timeline integration |
| Parallax effect | Manual scroll event listeners + transform | ScrollTrigger `scrub` | No jank from scroll event throttling, automatic cleanup, responsive |

**Key insight:** Scroll-linked animations have deceptively complex edge cases: pin spacer height calculation, mobile viewport resize, font-loading reflow, Next.js image lazy loading. GSAP handles all of these; hand-rolled solutions will break.

## Common Pitfalls

### Pitfall 1: Pin Position Miscalculation After Lazy Content Load
**What goes wrong:** Pinned sections jump or unpin at wrong positions because GSAP calculated positions before images/fonts loaded.
**Why it happens:** ScrollTrigger measures element positions on creation. If content shifts after (images loading, web fonts rendering), positions are stale.
**How to avoid:** Call `ScrollTrigger.refresh()` after fonts and critical images load. Use `next/font` (already in place) which preloads fonts. For images, use Next.js `priority` on hero image (already done) and consider a `load` event listener.
**Warning signs:** Pinned section unpins too early or too late; parallax starts at wrong scroll position.

### Pitfall 2: Lenis + ScrollTrigger Desync
**What goes wrong:** ScrollTrigger animations fire at wrong scroll positions or feel laggy.
**Why it happens:** Lenis intercepts native scroll and interpolates position. If GSAP reads native `scrollY` instead of Lenis's interpolated value, they disagree.
**How to avoid:** Always sync via `lenis.on('scroll', ScrollTrigger.update)` and drive Lenis RAF from GSAP ticker. Use `gsap.ticker.lagSmoothing(0)` to prevent GSAP from skipping frames.
**Warning signs:** Animations feel delayed relative to scroll; pin triggers fire late.

### Pitfall 3: Mobile Performance with Complex Scroll Animations
**What goes wrong:** Pinned sections cause jank on mobile; clip-path animations drop frames.
**Why it happens:** Mobile GPUs struggle with large clip-path repaints and simultaneous transform animations.
**How to avoid:** Disable pinning on mobile (already decided). Use simpler reveals (opacity + translateY) instead of clip-path on mobile. Use `will-change: transform` sparingly.
**Warning signs:** Scroll feels choppy on iOS Safari; battery drain during scroll.

### Pitfall 4: React 18 Strict Mode Double-Firing
**What goes wrong:** Animations play twice or ScrollTriggers are created in duplicate.
**Why it happens:** React 18 strict mode (dev only) mounts/unmounts/remounts components. Without proper cleanup, GSAP instances accumulate.
**How to avoid:** Always use `useGSAP` (not `useEffect`) -- it uses `gsap.context()` which automatically reverts all instances on unmount.
**Warning signs:** Animations stutter in dev but work in production; console warnings about duplicate ScrollTriggers.

### Pitfall 5: Next.js Image Component vs. GSAP Transform
**What goes wrong:** Next.js `<Image>` with `fill` uses absolute positioning + `object-fit`. GSAP transforms on the parent container can cause the image to appear displaced.
**Why it happens:** The `fill` prop sets `position: absolute` on the image, and GSAP transforms affect the containing block.
**How to avoid:** For parallax, apply GSAP transform to the `<Image>` element directly (via a wrapper div), not to the section container. Ensure the image wrapper has `overflow: hidden` on its parent.
**Warning signs:** Image appears offset or clips incorrectly during parallax.

### Pitfall 6: SplitText Revert on Unmount
**What goes wrong:** After SplitText splits headline into `<div>` wrapper elements, these persist in the DOM if not reverted, breaking text selection and accessibility.
**Why it happens:** SplitText modifies the DOM by wrapping text nodes. Without cleanup, the modified DOM remains.
**How to avoid:** `useGSAP` automatically reverts SplitText instances created within its scope. Verify by checking that text returns to normal after component unmount in dev tools.
**Warning signs:** Inspecting the headline shows unexpected nested `<div>` elements wrapping individual words.

## Code Examples

### Complete Lenis + GSAP Provider Setup
```typescript
// src/providers/SmoothScrollProvider.tsx
"use client";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function GsapLenisSync() {
  const lenisRef = useRef<ReturnType<typeof useLenis>>(null);

  useLenis((lenis) => {
    // This fires on every scroll -- update ScrollTrigger
    ScrollTrigger.update();
  });

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);
  }, []);

  return null;
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <GsapLenisSync />
      {children}
    </ReactLenis>
  );
}
```

### Reusable Section Reveal Hook
```typescript
// src/hooks/useScrollReveal.ts
"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  duration?: number;
  stagger?: number;
  childSelector?: string; // e.g., ".card" for staggered children
  once?: boolean;
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const {
    y = 40,
    x = 0,
    duration = 0.7,
    stagger = 0.1,
    childSelector,
    once = true,
  } = options;

  useGSAP(() => {
    const targets = childSelector
      ? gsap.utils.toArray(childSelector)
      : ref.current;

    gsap.from(targets, {
      y,
      x,
      opacity: 0,
      duration,
      ease: "power2.out",
      stagger: childSelector ? stagger : 0,
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        toggleActions: once ? "play none none none" : "play none none reverse",
      },
    });
  }, { scope: ref });

  return ref;
}
```

### Story Section Structure for Pinning
```typescript
// Key structural requirement: the Story component must change from
// stacked panels to a single viewport-height container with
// absolutely positioned panels for the pin animation.
// Desktop: pinned container, panels overlay each other
// Mobile: stacked panels with simple scroll reveals

// Desktop structure needed:
<section ref={containerRef} className="relative h-screen">
  {/* This entire section pins */}
  <div className="story-panel absolute inset-0">{/* Panel 1 */}</div>
  <div className="story-panel absolute inset-0">{/* Panel 2 */}</div>
  <div className="story-panel absolute inset-0">{/* Panel 3 */}</div>
</section>

// Mobile structure (stacked, no pin):
<section>
  <div className="story-panel">{/* Panel 1 */}</div>
  <div className="story-panel">{/* Panel 2 */}</div>
  <div className="story-panel">{/* Panel 3 */}</div>
</section>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@studio-freight/lenis` | `lenis` (new package name) | 2024 | Old package deprecated; use `lenis` and `lenis/react` |
| GSAP Club membership for SplitText/ScrollTrigger | All GSAP plugins free | 2024 (Webflow acquisition) | No licensing concerns; use `gsap/SplitText` directly |
| `useEffect` + manual `gsap.context()` cleanup | `useGSAP` hook from `@gsap/react` | 2024 | Simpler, automatic cleanup, SSR-safe |
| Manual text splitting (DOM manipulation) | `SplitText.create()` (static method) | GSAP 3.12+ | Cleaner API, auto-accessibility attributes |
| Intersection Observer for scroll reveals | GSAP ScrollTrigger | Ongoing | ScrollTrigger handles pin, scrub, snap -- IO is too basic |

**Deprecated/outdated:**
- `@studio-freight/lenis` and `@studio-freight/react-lenis`: Renamed to `lenis` -- old packages deprecated
- GSAP Club GreenSock membership: No longer needed; all plugins free
- `locomotive-scroll`: Less maintained; Lenis is the successor in spirit and adoption

## Open Questions

1. **Lenis `lenis/react` exact API for GSAP ticker sync**
   - What we know: `useLenis` provides scroll callback; GSAP ticker can drive Lenis RAF
   - What's unclear: Whether `<ReactLenis root>` with `autoRaf` conflicts with manual GSAP ticker driving
   - Recommendation: Set `autoRaf: false` when driving Lenis from GSAP ticker to avoid double-RAF. Test during implementation.

2. **Story section structural refactor scope**
   - What we know: Current Story component uses stacked flex layout with alternating row directions. Desktop pin animation needs absolutely positioned overlapping panels.
   - What's unclear: Exact extent of markup changes needed
   - Recommendation: Refactor Story component to use responsive classes -- `absolute inset-0` on desktop (via `md:absolute md:inset-0`), stacked on mobile. This is a significant structural change, not just adding animations.

3. **ScrollTrigger.refresh() timing with Next.js**
   - What we know: Next.js lazy-loads images and fonts can cause layout shift
   - What's unclear: Best hook point for refresh after all critical content loads
   - Recommendation: Use a `useEffect` with `ScrollTrigger.refresh()` after component mount + a small delay, or listen for `window.onload`.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Manual visual testing + Lighthouse |
| Config file | none -- no automated test framework detected |
| Quick run command | `npm run dev` (visual inspection) |
| Full suite command | `npm run build` (build success = no TypeScript/import errors) |

### Phase Requirements --> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| HERO-02 | Parallax on hero background (desktop) | manual-only | Visual: scroll hero on desktop, verify BG moves slower | N/A |
| HERO-03 | Staggered text reveal on headline | manual-only | Visual: page load, verify word-by-word stagger | N/A |
| STORY-02 | Scroll-pinned panel transitions | manual-only | Visual: scroll through story section on desktop | N/A |
| STORY-03 | Clip-path image reveals | manual-only | Visual: verify images reveal with clip-path during scroll | N/A |
| GLOBAL-02 | Scroll-triggered section reveals | manual-only | Visual: scroll page, verify sections fade/slide in | N/A |
| GLOBAL-03 | Smooth scroll momentum (Lenis) | manual-only | Visual: scroll page, verify buttery-smooth momentum | N/A |

**Justification for manual-only:** Scroll animations are inherently visual/perceptual. Automated testing of GSAP/scroll behavior requires headed browser + scroll simulation (Playwright), which is disproportionate for a landing page. Build success (`npm run build`) validates TypeScript correctness and import resolution.

### Sampling Rate
- **Per task commit:** `npm run build` (catches TypeScript errors, broken imports)
- **Per wave merge:** `npm run build` + manual visual check on `npm run dev`
- **Phase gate:** Full visual walkthrough on desktop + mobile viewport

### Wave 0 Gaps
- None -- animation testing is manual/visual; build verification is sufficient for automated checks

## Sources

### Primary (HIGH confidence)
- [GSAP official React docs](https://gsap.com/resources/React/) - useGSAP hook pattern, scoping, cleanup, SSR safety
- [GSAP ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) - pin, scrub, start/end, matchMedia
- [Lenis GitHub](https://github.com/darkroomengineering/lenis) - GSAP ticker sync pattern, ReactLenis provider, configuration options
- npm registry - gsap 3.14.2, @gsap/react 2.1.2, lenis 1.3.18 (verified via `npm view`)

### Secondary (MEDIUM confidence)
- [GSAP SplitText docs](https://gsap.com/docs/v3/Plugins/SplitText/) - Now free via Webflow acquisition; `SplitText.create()` API
- [GSAP community forums](https://gsap.com/community/forums/topic/34696-scrolltrigger-with-lenis/) - Lenis + ScrollTrigger sync patterns
- [Clip-path animation examples](https://gsap.com/community/forums/topic/43868-gsap-scrolltrigger-image-reveal-animation-with-clip-path-shows-misaligned-sections-after-animation/) - Community patterns for clip-path reveals

### Tertiary (LOW confidence)
- wding.app animation reference - User's target feel; could not fetch live site for detailed analysis; implementation will be based on described effects (clip-path reveals, premium pacing)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - gsap, @gsap/react, lenis are well-documented with verified versions
- Architecture: HIGH - useGSAP + scoped refs is the official GSAP-recommended React pattern
- Pitfalls: HIGH - documented from official GSAP forums and React docs
- Story pin implementation: MEDIUM - structural refactor of Story.tsx is the most complex part; exact clip-path values need tuning
- Lenis+GSAP sync: MEDIUM - multiple patterns exist; exact ReactLenis + ticker integration needs validation during implementation

**Research date:** 2026-03-07
**Valid until:** 2026-04-07 (stable libraries, 30-day window)
