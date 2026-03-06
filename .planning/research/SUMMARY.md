# Research Summary: Humanta Landing Page

**Domain:** Premium animated B2B landing page
**Researched:** 2026-03-07
**Overall confidence:** MEDIUM (WebSearch/WebFetch unavailable; recommendations based on training data + codebase analysis)

## Executive Summary

The Humanta landing page is a well-scoped project: a single marketing site with premium scroll animations, a contact form with database storage, and deployment to Vercel. The existing codebase already has the right foundation -- Next.js 16 with App Router, React 19, Tailwind CSS 4, and TypeScript. The current page.tsx is a complete but static implementation that needs animation, real images, design refinement, and a functional contact backend.

The recommended stack uses GSAP for scroll-driven animations (parallax, pinned panels, staggered reveals) and Framer Motion (now `motion`) for React component animations (accordion, tabs, hover states). This dual-library approach is standard for premium agency sites in 2025 -- each library excels at different animation categories without conflict.

The contact form backend is straightforward: a Next.js Server Action validates input with Zod, stores it in Vercel Postgres, and sends a notification email via Resend. No ORM is needed for a single table. React Hook Form handles the client-side form state.

The main risk area is animation performance on mobile devices. GSAP scroll animations need careful GPU-acceleration (transform/opacity only, no layout-triggering properties) and reduced complexity on mobile viewports.

## Key Findings

**Stack:** Next.js 16 + Tailwind 4 (existing) + GSAP/ScrollTrigger (scroll animations) + Motion (component animations) + Lenis (smooth scroll) + Vercel Postgres + Resend (contact form)

**Architecture:** Static landing page with a single Server Action endpoint for form submissions. No API routes, no CMS, no auth. All content hardcoded in components.

**Critical pitfall:** Animation performance on mobile -- must use GPU-accelerated properties only (transform, opacity) and reduce/disable complex scroll animations on mobile to maintain 60fps and Lighthouse 90+ scores.

## Implications for Roadmap

Based on research, suggested phase structure:

1. **Foundation and Layout** - Set up fonts, brand tokens, component structure, responsive layouts
   - Addresses: Navigation, hero, all section layouts, footer
   - Avoids: Premature animation before layout is solid

2. **Design Fidelity** - Match the Framer site design exactly with real images and typography
   - Addresses: Image sourcing, color palette, spacing, responsive design
   - Avoids: Animation polish before visual parity

3. **Scroll Animations** - Add GSAP ScrollTrigger animations and Lenis smooth scroll
   - Addresses: Parallax hero, scroll-triggered story panels, staggered reveals, section transitions
   - Avoids: Adding animations before content/layout is finalized (causes constant re-tuning)

4. **Interactive Components** - FAQ accordion, tabbed stepper, hover states with Framer Motion
   - Addresses: Accordion, tabs, button interactions, floating CTA
   - Avoids: N/A -- these are independent of scroll animations

5. **Contact Form Backend** - Server Action + Vercel Postgres + Resend email
   - Addresses: Form validation, database storage, email notifications
   - Avoids: Building backend before frontend is visually complete

6. **Performance and Polish** - Lighthouse optimization, mobile animation tuning, Vercel deployment
   - Addresses: Core Web Vitals, accessibility, SEO meta, analytics
   - Avoids: Premature optimization before features are complete

**Phase ordering rationale:**
- Layout before animations: Animations depend on final DOM structure and scroll distances. Changing layout after adding ScrollTrigger animations requires re-calibrating all triggers.
- Design before animations: Visual fidelity must be confirmed before spending time on animation timing/easing.
- Scroll animations before interactive components: They are independent but scroll animations are higher complexity/risk, so tackle early.
- Backend last: It is functionally independent. Delaying it reduces context switching.

**Research flags for phases:**
- Phase 3 (Scroll Animations): Likely needs deeper research on GSAP ScrollTrigger + React 19 integration patterns, especially with Next.js App Router server/client component boundaries
- Phase 5 (Contact Form): Standard patterns, unlikely to need research. Verify @vercel/postgres setup docs at implementation time.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | MEDIUM | Library choices are well-established, but exact versions could not be verified (no web access). All version numbers should be verified at install time. |
| Features | HIGH | Clear requirements in PROJECT.md. Standard landing page feature set. |
| Architecture | HIGH | Simple architecture with well-known patterns. No novel technical challenges. |
| Pitfalls | MEDIUM | Common pitfalls are well-documented in training data, but could not verify any recent Next.js 16 or React 19 specific issues. |

## Gaps to Address

- Exact current versions of all recommended packages (could not verify due to no web access)
- GSAP licensing changes post-May 2025 (GSAP went fully free in late 2023, but terms may have evolved)
- Next.js 16 specific features or breaking changes that affect animation library integration
- React 19 compatibility confirmation for GSAP React hooks and Motion library
- Vercel Postgres pricing/offering changes (Vercel has been evolving their database products)
- Whether `@vercel/postgres` is still the recommended package or if Vercel has shifted to a different database product
