---
phase: 01-foundation-and-layout
plan: 01
subsystem: ui
tags: [tailwindcss4, next-font, typescript, responsive, next-image]

# Dependency graph
requires: []
provides:
  - Brand color tokens (dark, cream, accent) via @theme inline
  - Three fonts (Inter, Manrope, Poppins) configured as Tailwind utilities
  - TypeScript interfaces for all section data types
  - Complete content constants for all page sections
  - Self-hosted images from humanta.co
  - Sticky Navbar with scroll-based background transition
  - Full-viewport Hero with background image and CTA
affects: [01-02, 01-03, 02-scroll-animations, 03-interactive-components]

# Tech tracking
tech-stack:
  added: []
  patterns: [server-components-by-default, content-data-separation, theme-inline-font-bridge]

key-files:
  created:
    - src/types/index.ts
    - src/lib/constants.ts
    - src/components/Navbar.tsx
    - src/components/Hero.tsx
    - public/images/hero/hero-bg.png
    - public/images/story/panel-1.png
    - public/images/story/panel-2.png
    - public/images/story/panel-3.png
    - public/images/cta/cta-bg.png
  modified:
    - src/app/globals.css
    - src/app/layout.tsx
    - src/app/page.tsx

key-decisions:
  - "Used @theme inline for font variables (runtime resolution needed for next/font CSS vars)"
  - "Images kept as .png (original Framer format) rather than converting to .jpg"
  - "Story panel copy rewritten to target HR/People leaders with 3-act structure: problem, insight, solution"
  - "Hero image uses intimate dinner couple photo; story panel 1 uses lone-in-crowd for disconnection theme"

patterns-established:
  - "Server components by default: only Navbar uses 'use client' for scroll detection"
  - "Content data separation: all text in constants.ts, components import and render"
  - "@theme inline font bridge: next/font CSS vars to Tailwind utility classes"

requirements-completed: [NAV-01, NAV-03, NAV-05, HERO-01, GLOBAL-09]

# Metrics
duration: 5min
completed: 2026-03-07
---

# Phase 1 Plan 01: Foundation + Navbar + Hero Summary

**Brand theme with dark/cream/accent palette, three Google fonts via @theme inline, all content constants with TypeScript types, self-hosted Framer images, sticky Navbar with scroll transition, and full-viewport Hero**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-06T23:55:15Z
- **Completed:** 2026-03-07T00:00:09Z
- **Tasks:** 2
- **Files modified:** 12

## Accomplishments
- Replaced entire gradient color scheme with correct brand palette (dark #0a0a0a, cream #f5f3ee, accent #f5b614)
- Configured Inter, Manrope, Poppins fonts with @theme inline bridging to Tailwind utilities
- Created complete content data file with all section text scraped from humanta.co
- Downloaded and self-hosted 5 images from humanta.co (hero, 3 story panels, CTA background)
- Built sticky Navbar that transitions from transparent to solid dark on scroll
- Built full-viewport Hero with background image, tagline, headline, description, and CTA button

## Task Commits

Each task was committed atomically:

1. **Task 1: Foundation -- theme, fonts, types, constants, and image assets** - `88aa771` (feat)
2. **Task 2: Navbar and Hero components wired into page** - `f14c50c` (feat)

## Files Created/Modified
- `src/app/globals.css` - Brand color tokens and font theme via @theme inline
- `src/app/layout.tsx` - Root layout with Inter, Manrope, Poppins fonts
- `src/app/page.tsx` - Clean page composing Navbar + Hero
- `src/types/index.ts` - StoryPanel, Step, PricingPlan, FAQItem interfaces
- `src/lib/constants.ts` - All site content: nav links, hero, story panels, steps, pricing, FAQ, CTA, footer
- `src/components/Navbar.tsx` - Sticky nav with scroll-based background transition
- `src/components/Hero.tsx` - Full-viewport hero with background image and content
- `public/images/hero/hero-bg.png` - Hero background (couple at dinner)
- `public/images/story/panel-1.png` - Story panel 1 (person alone in crowd)
- `public/images/story/panel-2.png` - Story panel 2 (two people at table)
- `public/images/story/panel-3.png` - Story panel 3 (couple laughing together)
- `public/images/cta/cta-bg.png` - CTA banner background (warm atmospheric)

## Decisions Made
- Used `@theme inline` (not `@theme`) for font variables -- required because next/font sets CSS vars at runtime on the html element, not at CSS build time
- Kept images as `.png` (original Framer format) rather than converting to `.jpg` as plan suggested -- next/image auto-converts to WebP/AVIF anyway
- Story panel copy rewritten per user directive: 3-act structure targeting HR/People leaders (problem: disconnection, insight: offline connection matters, solution: Humanta handles it)
- Selected hero image as couple at intimate dinner (matches brand warmth), story panel 1 as person alone in rushing crowd (matches disconnection theme)
- Step 4 of "How It Works" written as "Measure the impact" since humanta.co now shows only 3 visible steps (Set the cadence, Curate the match, Live the moment) -- added measurement step for completeness per plan spec

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Image file extensions changed from .jpg to .png**
- **Found during:** Task 1 (Image download)
- **Issue:** Plan specified `.jpg` extensions but humanta.co serves all images as `.png` from Framer CDN
- **Fix:** Used `.png` extensions throughout -- next/image handles format optimization automatically
- **Files modified:** All image paths in constants.ts and Hero.tsx
- **Verification:** Build passes, images render correctly
- **Committed in:** 88aa771 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Minor path change only. No scope creep. next/image serves optimized formats regardless.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All foundation pieces in place: theme, fonts, types, constants, images
- Plans 01-02 and 01-03 can build directly on this -- import types from @/types, content from @/lib/constants
- Story panels, How It Works, Pricing, FAQ, CTA, and Footer components ready to implement
- All section anchor IDs will be added as sections are created in subsequent plans

## Self-Check: PASSED

- All 12 created/modified files verified on disk
- Both task commits (88aa771, f14c50c) verified in git log
- `npm run build` passes clean
- `npm run lint` passes clean

---
*Phase: 01-foundation-and-layout*
*Completed: 2026-03-07*
