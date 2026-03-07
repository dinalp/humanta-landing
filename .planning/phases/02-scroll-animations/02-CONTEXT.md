# Phase 2: Scroll Animations - Context

**Gathered:** 2026-03-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Premium scroll-driven animations throughout the page: parallax hero, scroll-pinned story panels with clip-path image reveals, staggered text reveals, scroll-triggered section entrances, and buttery-smooth scroll via Lenis. This phase adds motion to the static layout from Phase 1. No interactive components (accordion, stepper, mobile nav) -- those are Phase 3.

</domain>

<decisions>
## Implementation Decisions

### Parallax & hero motion
- Subtle parallax on hero background (~20% slower than scroll) -- premium depth without distraction
- Parallax disabled on mobile -- static hero image instead (performance/reliability)
- Hero headline: word-by-word stagger reveal on page load
- Full choreographed hero entrance: headline words stagger in, then subtext fades in, then CTA buttons appear last
- Draws the eye naturally from headline down to action

### Story panel pinning
- Section pins to viewport while user scrolls through all 3 panels
- Text cross-fades between panels while images reveal via clip-path expand animation (circle/rectangle clips expanding to full)
- Pin scroll distance: Claude's discretion -- tune based on content and animation timing (~3x viewport as starting point)
- Mobile: no pinning -- panels stack vertically with scroll-triggered fade/slide reveals as each enters viewport

### Section reveal style
- Reveal type: Claude's discretion per section (fade-up, fade-in, slide-from-side -- pick what fits each section's content)
- Child elements stagger within sections: heading first, then subtext, then cards/items with slight delays
- Trigger point: early (~80% from top / 20% visible) -- content animating as user approaches
- Pricing cards and benefit cards: staggered cascade entrance (100-150ms delay between each card)

### Animation feel & timing
- Smooth & measured timing: ~0.6-0.8s durations, ease-out curves -- confident, premium, not rushed
- Animation replay on scroll-back: Claude's discretion (e.g., hero once-only, section reveals may replay or not based on what feels best)
- Lenis smooth scroll tuning: Claude's discretion -- tune lerp/parameters for best feel with the animation timings
- CTA banner special treatment: Claude's discretion -- may add parallax background + text fade-up or standard reveal

### Claude's Discretion
- Exact parallax speed values and easing
- Pin scroll distance for story section
- Section reveal type per section (fade-up vs. slide vs. fade-in)
- Animation replay behavior (once vs. replay per element type)
- Lenis lerp and smoothing parameters
- CTA banner animation approach
- Exact stagger delay values and easing curves
- Any additional micro-animations that enhance the premium feel without bloating

</decisions>

<specifics>
## Specific Ideas

- "wding.app -- don't replicate it but the animations and feel of the website I want to replicate" (primary animation reference)
- Story section "looks beautiful with the animations" -- the scroll-pinned panels are a key feature
- Clip-path expand for story image reveals (wding.app-style)
- Word-by-word hero headline stagger is the first impression -- must feel premium
- Brand feel: warm, human, premium -- animations should enhance warmth, not feel cold/techy

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- No animation libraries installed yet -- GSAP, Lenis, Framer Motion need to be added to package.json
- Current page is a single monolithic component (src/app/page.tsx, ~657 lines) -- will need componentization in Phase 1 before animations attach
- Next.js 16 + React 19 + Tailwind CSS 4 stack

### Established Patterns
- No animation patterns exist yet -- Phase 2 establishes the animation architecture
- "use client" already on page.tsx -- client components ready for animation hooks
- Tailwind CSS 4 for styling (animations will be JS-driven via GSAP/Framer Motion, not CSS)

### Integration Points
- GSAP ScrollTrigger attaches to section elements built in Phase 1
- Lenis wraps the entire page scroll at the layout level (src/app/layout.tsx or a provider)
- Story section panels need data-attributes or refs for GSAP pin/timeline
- Hero component needs refs for word-split and stagger animation

</code_context>

<deferred>
## Deferred Ideas

- wding.app reference also applicable to Phase 3 micro-interactions (hover effects, button animations)
- Page transition animations between home and /contact -- v2 enhancement (ENH-05)
- Scroll progress indicator bar -- v2 enhancement (ENH-07)
- Custom cursor effects -- v2 enhancement (ENH-04)

</deferred>

---

*Phase: 02-scroll-animations*
*Context gathered: 2026-03-07*
