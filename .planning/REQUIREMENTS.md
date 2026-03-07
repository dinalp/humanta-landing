# Requirements: Humanta Landing Page

**Defined:** 2026-03-07
**Core Value:** The site must feel premium and human -- matching the warmth and polish of the Framer original while giving full code ownership and a working contact pipeline.

## v1 Requirements

### Navigation

- [x] **NAV-01**: User sees sticky nav with Humanta logo, section links (What we do, How it works, Plans), and "Get in touch" CTA button
- [ ] **NAV-02**: User can open mobile hamburger menu with animated slide-in containing all nav links
- [x] **NAV-03**: User can click nav link to smooth-scroll to the corresponding section
- [ ] **NAV-04**: User sees the active section highlighted in the nav as they scroll
- [x] **NAV-05**: Nav transitions from transparent (over hero) to solid background on scroll

### Hero

- [x] **HERO-01**: User sees full-viewport hero with background image, "Make human connection company policy" tagline, "Humanta" headline, description text, and "Start now" CTA
- [ ] **HERO-02**: User sees parallax effect on hero background image when scrolling (desktop only)
- [ ] **HERO-03**: User sees staggered text reveal animation on hero headline on page load

### Story

- [x] **STORY-01**: User sees 3 dark-background panels with text (left) and image (right) telling the Humanta story
- [ ] **STORY-02**: User experiences scroll-pinned panel transitions (GSAP) as they scroll through the story section
- [ ] **STORY-03**: User sees images reveal via clip-path/scale animations as panels enter
- [x] **STORY-04**: User sees key phrases highlighted in orange (#f5b614) accent text

### How It Works

- [x] **HIW-01**: User sees "How Humanta Works" section with 4 numbered steps on cream background
- [ ] **HIW-02**: User can navigate between steps via tab/stepper UI with animated transitions

### Pricing

- [x] **PRICE-01**: User sees 2 pricing cards: Essential (per redeemed spark) and Pilot Package - Sydney (10 Humanta Sparks)
- [x] **PRICE-02**: Each card shows feature checklist with checkmarks and "Get in touch" CTA

### FAQ

- [ ] **FAQ-01**: User sees "Everything you need to know" section with 6 expandable questions
- [ ] **FAQ-02**: User can expand/collapse FAQ items with smooth height animation

### CTA Banner

- [ ] **CTA-01**: User sees full-width CTA section with warm background image, "Ready to keep and attract the best talent?" headline, and "Let's Talk" button

### Contact

- [ ] **CONTACT-01**: User can visit /contact page with form: Name, Email, Phone, Employees dropdown, Notes
- [ ] **CONTACT-02**: Form validates input client-side and server-side with clear error messages
- [ ] **CONTACT-03**: Submissions stored in database (Vercel Postgres)
- [ ] **CONTACT-04**: Email notification sent to Humanta team on submission (Resend)
- [ ] **CONTACT-05**: User sees loading, success, and error states on form submission

### Footer

- [ ] **FOOT-01**: User sees footer with Humanta logo, tagline, section links, social links (LinkedIn, Instagram, TikTok), and privacy policy link

### Global

- [ ] **GLOBAL-01**: User sees floating "Let's talk" button (bottom-right) on all pages
- [ ] **GLOBAL-02**: User experiences scroll-triggered section reveals (fade + slide) throughout the page
- [ ] **GLOBAL-03**: User experiences buttery-smooth scroll momentum (Lenis)
- [ ] **GLOBAL-04**: User sees micro-interactions on buttons/links (hover scale, glow)
- [ ] **GLOBAL-05**: Users with reduced-motion OS setting see content without animations
- [ ] **GLOBAL-06**: Site is fully responsive across mobile, tablet, and desktop
- [ ] **GLOBAL-07**: Site achieves Lighthouse 90+ performance score
- [ ] **GLOBAL-08**: Site is deployed to Vercel
- [x] **GLOBAL-09**: All images sourced from live Framer site (humanta.co)

## v2 Requirements

### Enhancements

- **ENH-01**: CMS integration for FAQ, pricing, and content management
- **ENH-02**: Blog / content pages
- **ENH-03**: Analytics dashboard (Vercel Analytics + Speed Insights)
- **ENH-04**: Custom cursor effects (desktop only)
- **ENH-05**: Page transitions between home and /contact
- **ENH-06**: Social proof section (testimonials, client logos)
- **ENH-07**: Scroll progress indicator bar

## Out of Scope

| Feature | Reason |
|---------|--------|
| Authentication / user accounts | Landing page only, no user-facing product |
| Payment processing | Humanta pricing is custom/B2B, not self-serve |
| Multi-language / i18n | English-only, Sydney market |
| Dark/light mode toggle | Brand aesthetic is intentionally dark + cream sections |
| Chatbot / live chat | Premature -- contact form is sufficient for lead volume |
| Video backgrounds | Performance killer, accessibility issues |
| Carousel/slider components | Poor UX, low engagement |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| NAV-01 | Phase 1 | Complete |
| NAV-02 | Phase 3 | Pending |
| NAV-03 | Phase 1 | Complete |
| NAV-04 | Phase 3 | Pending |
| NAV-05 | Phase 1 | Complete |
| HERO-01 | Phase 1 | Complete |
| HERO-02 | Phase 2 | Pending |
| HERO-03 | Phase 2 | Pending |
| STORY-01 | Phase 1 | Complete |
| STORY-02 | Phase 2 | Pending |
| STORY-03 | Phase 2 | Pending |
| STORY-04 | Phase 1 | Complete |
| HIW-01 | Phase 1 | Complete |
| HIW-02 | Phase 3 | Pending |
| PRICE-01 | Phase 1 | Complete |
| PRICE-02 | Phase 1 | Complete |
| FAQ-01 | Phase 1 | Pending |
| FAQ-02 | Phase 3 | Pending |
| CTA-01 | Phase 1 | Pending |
| CONTACT-01 | Phase 4 | Pending |
| CONTACT-02 | Phase 4 | Pending |
| CONTACT-03 | Phase 4 | Pending |
| CONTACT-04 | Phase 4 | Pending |
| CONTACT-05 | Phase 4 | Pending |
| FOOT-01 | Phase 1 | Pending |
| GLOBAL-01 | Phase 3 | Pending |
| GLOBAL-02 | Phase 2 | Pending |
| GLOBAL-03 | Phase 2 | Pending |
| GLOBAL-04 | Phase 3 | Pending |
| GLOBAL-05 | Phase 3 | Pending |
| GLOBAL-06 | Phase 1 | Pending |
| GLOBAL-07 | Phase 5 | Pending |
| GLOBAL-08 | Phase 5 | Pending |
| GLOBAL-09 | Phase 1 | Complete |

**Coverage:**
- v1 requirements: 34 total
- Mapped to phases: 34
- Unmapped: 0

---
*Requirements defined: 2026-03-07*
*Last updated: 2026-03-07 after roadmap creation*
