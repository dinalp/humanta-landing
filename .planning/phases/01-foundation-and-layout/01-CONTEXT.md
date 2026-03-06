# Phase 1: Foundation and Layout - Context

**Gathered:** 2026-03-07
**Status:** Ready for planning

<domain>
## Phase Boundary

All page sections built with static content, responsive design, real images from humanta.co, and brand styling. This phase delivers the complete visual structure that Phases 2 (animations), 3 (interactions), and 4 (contact backend) build on. No animations, no interactivity, no backend — just solid, premium layout.

</domain>

<decisions>
## Implementation Decisions

### Design fidelity
- Match humanta.co overall layout and content but elevate the premium feel
- Better spacing and section design — more polished than the Framer original
- Hero image is a placeholder (current Framer image) — will be swapped for a Unicorn Studios graphic later
- Structure should support premium scroll-driven animations (Phase 2)

### Content & copy
- Pull exact copy from humanta.co for all sections EXCEPT the story section
- Story section needs a rewrite: current copy is too wordy, positioned too high (too much reading initially), doesn't impact the ICP (HR/People leaders) enough — storytelling with no impact in too prominent a position
- Story section looks beautiful with animations — the visual design stays, the copy changes
- Claude to help rewrite story copy during implementation to be punchier and more ICP-focused
- All other section copy (hero, how it works, pricing, FAQ, CTA, footer) used as-is from humanta.co

### Image sourcing
- Download all images from humanta.co and self-host in /public
- Use next/image component for auto-optimization (WebP/AVIF, responsive sizes)
- Keep all current images as starting point — swap individual assets as new ones arrive
- Hero image is temporary placeholder until Unicorn Studios graphic is provided

### Responsive behavior
- Equal priority: desktop and mobile (visitors come from both work laptops and LinkedIn/social on phones)
- Mobile: story panels stack vertically (image on top, text below)
- Mobile: pricing cards stack vertically (both visible, user scrolls)
- Tablet: fluid responsive transition between mobile and desktop — no specific tablet breakpoint layout

### Claude's Discretion
- Premium styling direction (whitespace-heavy vs. rich density) — pick what best fits the warm/human brand
- Section ordering — Claude may reposition story section lower if B2B landing page best practices support it (user flagged it's too prominent currently)
- Exact spacing, padding, and typography sizing
- Component granularity and file structure
- Which Tailwind breakpoints to use

</decisions>

<specifics>
## Specific Ideas

- "I want you to look at wding.app — don't replicate it but the animations and feel of the website I want to replicate" (reference for Phase 2 animations, but informs the layout structure needed in Phase 1)
- Story section "looks beautiful with the animations" — preserve the visual design pattern (text left + image right panels) even while reworking copy and potentially repositioning
- Hero image will change to a Unicorn Studios graphic — build the hero component so the image is easily swappable
- Brand feel: premium, warm, human — not corporate or cold

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- logo-black.png, logo-white.png: Humanta logos already in /public
- Fresh Next.js 16 + React 19 + Tailwind CSS 4 project — no existing components

### Established Patterns
- None yet — this is Phase 1, establishing all patterns
- Tailwind CSS 4 for styling (already configured with PostCSS)
- TypeScript throughout

### Integration Points
- src/app/page.tsx: Main landing page (currently default Next.js template)
- src/app/layout.tsx: Root layout (fonts, metadata)
- src/app/globals.css: Global styles

</code_context>

<deferred>
## Deferred Ideas

- wding.app animation reference — captured for Phase 2 (Scroll Animations)
- Story section repositioning may need validation after copy rewrite — revisit during Phase 2/3 if layout changes affect animation design
- Unicorn Studios hero graphic — swap in when asset is provided (post Phase 1)

</deferred>

---

*Phase: 01-foundation-and-layout*
*Context gathered: 2026-03-07*
