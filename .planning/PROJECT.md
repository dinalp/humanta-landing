# Humanta Landing Page

## What This Is

A premium Next.js landing page for Humanta — a B2B service that turns employee recognition budgets into curated, off-screen experiences (dinners, activities) for team members and someone they love. The site replaces the current Framer-built humanta.co with a developer-owned codebase, matching the existing design and content while adding premium scroll-driven animations and a functional contact form with database storage.

## Core Value

The site must feel premium and human — matching the warmth and polish of the Framer original while giving full code ownership, a working contact pipeline, and the ability to iterate freely.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Full-screen hero section with background image, overlay text, nav bar, and "Start now" CTA
- [ ] Sticky navigation with Humanta logo, section links (What we do, How it works, Plans), and "Get in touch" button
- [ ] Dark story/problem section with 3 scroll-triggered panels (text left + image right) with fade/reveal animations
- [ ] "How Humanta Works" section with 4-step tabbed stepper (Set the cadence, We match them, Booked & managed, Track the ROI) on cream background
- [ ] Pricing plans section with 2 cards: Essential (per redeemed spark) and Pilot Package - Sydney (10 Humanta Sparks)
- [ ] FAQ accordion section with 6 expandable questions on cream background
- [ ] Full-width CTA banner with warm background image and "Let's Talk" button
- [ ] Footer with Humanta branding, section links, social links (LinkedIn, Instagram, TikTok), and privacy policy link
- [ ] Contact page (/contact) with form: Name, Email, Phone, Employees (dropdown), Notes — submissions stored in database and sent via email
- [ ] Floating "Let's talk" button (bottom-right) persistent across all pages
- [ ] Premium scroll-driven animations throughout (GSAP/Framer Motion): parallax hero, staggered text reveals, scroll-linked section transitions, image fade-ins, micro-interactions on buttons/links
- [ ] Smooth scroll navigation between sections
- [ ] Fully responsive design (mobile, tablet, desktop)
- [ ] Images sourced from the live Framer site (humanta.co)
- [ ] Deployed to Vercel

### Out of Scope

- CMS integration — content is hardcoded for now; add CMS later if update frequency demands it
- Blog or dynamic content pages
- Authentication or user accounts
- Payment processing
- Backend API beyond contact form submission
- Multi-language support

## Context

- Currently built on Framer at humanta.co — moving to Next.js for full code ownership
- Humanta is a B2B service targeting HR/People teams at companies
- "Sparks" are experience credits that employees redeem for curated dining/activity experiences
- The brand aesthetic is warm, premium, human — dark tones with warm photography, cream/off-white for lighter sections, orange/gold (#f5b614) as accent color
- Typography: Inter, Manrope, and Poppins font families
- The existing Framer site has smooth scroll animations and section transitions that need to be replicated and enhanced
- This build is a separate staging site initially, not immediately replacing the live Framer site

## Constraints

- **Tech stack**: Next.js (App Router), React, Tailwind CSS, Framer Motion and/or GSAP for animations
- **Deployment**: Vercel
- **Contact form backend**: Database (Vercel Postgres or similar) + email notifications (Resend or similar)
- **Design fidelity**: Must closely match the existing humanta.co design — same content, layout, color palette, typography
- **Performance**: Lighthouse score 90+ — images optimized, animations GPU-accelerated, fonts preloaded

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js over Framer | Full code ownership, custom backend for contact form, no platform lock-in | — Pending |
| Hardcode content (no CMS) | Landing page content is stable; CMS adds unnecessary complexity for now | — Pending |
| GSAP + Framer Motion for animations | Best-in-class scroll-driven animation libraries for React/Next.js | — Pending |
| Vercel Postgres + Resend for contact form | Native Vercel integration, simple setup, generous free tier | — Pending |
| Pull images from live Framer site | Fastest path to visual parity; replace with self-hosted assets later | — Pending |

---
*Last updated: 2026-03-06 after initialization*
