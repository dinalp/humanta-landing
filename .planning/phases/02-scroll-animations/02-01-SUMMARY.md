---
phase: 02-scroll-animations
plan: 01
subsystem: ui
tags: [gsap, lenis, scroll-trigger, split-text, parallax, smooth-scroll, animation]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: "Static layout with Hero, sections, and layout.tsx structure"
provides:
  - "GSAP plugin registration module (src/lib/gsap.ts)"
  - "Lenis smooth scroll provider with GSAP ticker sync"
  - "Reusable useScrollReveal hook for scroll-triggered animations"
  - "Hero parallax background (desktop) and choreographed entrance"
affects: [02-scroll-animations, 03-interactive-components]

# Tech tracking
tech-stack:
  added: [gsap, "@gsap/react", lenis]
  patterns: [gsap-plugin-registration, lenis-gsap-ticker-sync, scroll-trigger-matchmedia, split-text-stagger]

key-files:
  created:
    - src/lib/gsap.ts
    - src/providers/SmoothScrollProvider.tsx
    - src/hooks/useScrollReveal.ts
  modified:
    - package.json
    - src/app/layout.tsx
    - src/components/Hero.tsx

key-decisions:
  - "Lenis with autoRaf:true and lerp:0.1/duration:1.2 for smooth scroll feel"
  - "ScrollTrigger.matchMedia for desktop-only parallax (min-width: 768px)"
  - "SplitText word-by-word stagger with power3.out easing for premium entrance"
  - "Inline opacity:0 on animated elements to prevent FOUC before GSAP runs"

patterns-established:
  - "GSAP import pattern: always import from @/lib/gsap (centralized registration)"
  - "useGSAP with scope ref for automatic ScrollTrigger/SplitText cleanup"
  - "SmoothScrollProvider wraps app inside Providers in layout.tsx"
  - "useScrollReveal hook for reusable scroll-triggered reveals"

requirements-completed: [HERO-02, HERO-03, GLOBAL-03]

# Metrics
duration: 1min
completed: 2026-03-07
---

# Phase 02 Plan 01: Scroll Animation Foundation Summary

**GSAP/Lenis animation infrastructure with hero parallax background and word-by-word choreographed entrance sequence**

## Performance

- **Duration:** 1 min
- **Started:** 2026-03-07T00:45:20Z
- **Completed:** 2026-03-07T00:46:45Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Installed gsap, @gsap/react, lenis and created centralized GSAP plugin registration
- Lenis smooth scroll wrapping the entire app with GSAP ticker sync for buttery-smooth momentum
- Hero parallax background on desktop (20% slower scroll), disabled on mobile via matchMedia
- Choreographed hero entrance: word-by-word headline stagger, then tagline, subtext, CTA in sequence
- Reusable useScrollReveal hook ready for Plan 02 section reveals

## Task Commits

Each task was committed atomically:

1. **Task 1: Install packages and create animation foundation** - `826032c` (feat)
2. **Task 2: Hero parallax background and choreographed entrance** - `ed5293c` (feat)

## Files Created/Modified
- `src/lib/gsap.ts` - Centralized GSAP plugin registration and re-exports
- `src/providers/SmoothScrollProvider.tsx` - Lenis smooth scroll with GSAP ticker sync
- `src/hooks/useScrollReveal.ts` - Reusable scroll-triggered reveal hook
- `src/app/layout.tsx` - Added SmoothScrollProvider wrapping children
- `src/components/Hero.tsx` - Parallax BG wrapper, SplitText headline, choreographed entrance timeline
- `package.json` - Added gsap, @gsap/react, lenis dependencies

## Decisions Made
- Lenis configured with lerp:0.1, duration:1.2, autoRaf:true -- smooth premium feel without manual RAF management
- ScrollTrigger.matchMedia used for desktop-only parallax (768px breakpoint) -- no parallax on mobile
- SplitText with type:"words" and 0.08s stagger -- word-by-word reveal with overlap for fluid feel
- Timeline overlaps (-=0.4, -=0.2) create continuous choreography rather than sequential pauses
- Inline style opacity:0 on tagline/subtext/CTA prevents FOUC; headline handled by SplitText per-word

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Animation infrastructure fully operational for Plan 02 (section scroll reveals, story pinning)
- useScrollReveal hook ready for immediate use on all sections
- GSAP import pattern established: all future animation code imports from @/lib/gsap

---
*Phase: 02-scroll-animations*
*Completed: 2026-03-07*
