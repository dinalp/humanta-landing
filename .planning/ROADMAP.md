# Roadmap: Humanta Landing Page

## Overview

This roadmap delivers a premium Next.js landing page that replicates and enhances the existing Framer-built humanta.co. The build progresses from static layout and content (establishing visual parity) through scroll animations and interactive components, then adds the contact form backend, and finishes with performance optimization and deployment. Each phase delivers a verifiable capability that builds on the previous one.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation and Layout** - All page sections built with static content, responsive design, real images, and brand styling (completed 2026-03-07)
- [ ] **Phase 2: Scroll Animations** - GSAP ScrollTrigger parallax, pinned story panels, staggered reveals, and Lenis smooth scroll
- [ ] **Phase 3: Interactive Components** - FAQ accordion, How It Works stepper, mobile nav, floating CTA, hover micro-interactions, and reduced-motion support
- [ ] **Phase 4: Contact Form Backend** - Contact page with form validation, Vercel Postgres storage, and Resend email notifications
- [ ] **Phase 5: Performance and Deployment** - Lighthouse 90+ optimization and Vercel production deployment

## Phase Details

### Phase 1: Foundation and Layout
**Goal**: User can browse all page sections with correct content, images, typography, colors, and responsive layout -- visually matching humanta.co
**Depends on**: Nothing (first phase)
**Requirements**: NAV-01, NAV-03, NAV-05, HERO-01, STORY-01, STORY-04, HIW-01, PRICE-01, PRICE-02, FAQ-01, CTA-01, FOOT-01, GLOBAL-06, GLOBAL-09
**Success Criteria** (what must be TRUE):
  1. User sees a sticky nav bar with Humanta logo, section links, and "Get in touch" button that transitions from transparent to solid on scroll
  2. User can click any nav link and the page smooth-scrolls to the correct section
  3. User sees all content sections (hero, story panels, how it works, pricing cards, FAQ, CTA banner, footer) with real images from humanta.co, correct typography (Inter/Manrope/Poppins), and brand colors (dark + cream + orange accent)
  4. User can view the site on mobile, tablet, and desktop with appropriate responsive layouts
**Plans**: 3 plans

Plans:
- [x] 01-01-PLAN.md — Foundation (theme, fonts, types, constants, images) + Navbar + Hero
- [ ] 01-02-PLAN.md — Story, How It Works, and Pricing sections
- [ ] 01-03-PLAN.md — FAQ, CTA Banner, Footer + full page assembly + visual verification

### Phase 2: Scroll Animations
**Goal**: User experiences premium scroll-driven animations throughout the page -- parallax hero, pinned story panels, staggered text reveals, and buttery-smooth scroll
**Depends on**: Phase 1
**Requirements**: HERO-02, HERO-03, STORY-02, STORY-03, GLOBAL-02, GLOBAL-03
**Success Criteria** (what must be TRUE):
  1. User sees parallax movement on the hero background image when scrolling (desktop)
  2. User sees staggered text reveal animation on the hero headline on page load
  3. User experiences scroll-pinned story panels with clip-path/scale image reveals as they scroll through the story section
  4. User sees fade-and-slide section reveals triggered by scroll throughout the page
  5. User experiences smooth scroll momentum across the entire page (Lenis)
**Plans**: TBD

Plans:
- [ ] 02-01: TBD
- [ ] 02-02: TBD

### Phase 3: Interactive Components
**Goal**: User can interact with all dynamic UI elements -- accordion, tabbed stepper, mobile menu, floating CTA, and hover effects -- with reduced-motion support
**Depends on**: Phase 1
**Requirements**: NAV-02, NAV-04, HIW-02, FAQ-02, GLOBAL-01, GLOBAL-04, GLOBAL-05
**Success Criteria** (what must be TRUE):
  1. User can open a mobile hamburger menu with animated slide-in containing all nav links
  2. User sees the active section highlighted in the nav as they scroll
  3. User can navigate between the 4 How It Works steps via a tabbed stepper with animated transitions
  4. User can expand and collapse FAQ items with smooth height animation
  5. User sees a floating "Let's talk" button (bottom-right) on all pages, and hover micro-interactions on buttons/links; users with reduced-motion settings see content without animations
**Plans**: TBD

Plans:
- [ ] 03-01: TBD
- [ ] 03-02: TBD

### Phase 4: Contact Form Backend
**Goal**: User can submit a contact inquiry that is validated, stored in a database, and triggers an email notification to the Humanta team
**Depends on**: Phase 1
**Requirements**: CONTACT-01, CONTACT-02, CONTACT-03, CONTACT-04, CONTACT-05
**Success Criteria** (what must be TRUE):
  1. User can visit /contact and fill out a form with Name, Email, Phone, Employees dropdown, and Notes
  2. User sees clear validation error messages for invalid input (both client-side and server-side)
  3. User sees loading, success, and error states during form submission
  4. Submission is stored in Vercel Postgres and an email notification is sent to the Humanta team via Resend
**Plans**: TBD

Plans:
- [ ] 04-01: TBD
- [ ] 04-02: TBD

### Phase 5: Performance and Deployment
**Goal**: Site achieves Lighthouse 90+ scores and is deployed to Vercel for production use
**Depends on**: Phase 2, Phase 3, Phase 4
**Requirements**: GLOBAL-07, GLOBAL-08
**Success Criteria** (what must be TRUE):
  1. Site achieves Lighthouse performance score of 90+ with optimized images, GPU-accelerated animations, and preloaded fonts
  2. Site is deployed to Vercel and accessible via a public URL
**Plans**: TBD

Plans:
- [ ] 05-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5
(Phases 2, 3, and 4 can execute in parallel after Phase 1)

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation and Layout | 3/3 | Complete   | 2026-03-07 |
| 2. Scroll Animations | 0/2 | Not started | - |
| 3. Interactive Components | 0/2 | Not started | - |
| 4. Contact Form Backend | 0/2 | Not started | - |
| 5. Performance and Deployment | 0/1 | Not started | - |
