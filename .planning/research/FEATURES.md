# Feature Landscape

**Domain:** Premium B2B SaaS/Service Landing Page
**Project:** Humanta Landing Page
**Researched:** 2026-03-07
**Confidence:** MEDIUM (based on training data patterns for premium B2B landing pages; no live web verification available)

## Table Stakes

Features users (HR buyers, B2B decision-makers) expect. Missing = site feels amateur or untrustworthy.

### Navigation & Structure

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Sticky/fixed top navigation | Users expect persistent access to nav on scroll; every premium B2B site has this | Low | Already in current build. Needs backdrop-blur, logo, section links, CTA button |
| Smooth scroll to sections | Jarring jump-scrolling feels broken on a single-page site | Low | Use native CSS `scroll-behavior: smooth` or Lenis for butter-smooth scrolling |
| Mobile hamburger menu | Mobile users cannot use horizontal nav; this is universal expectation | Low | Off-canvas slide menu with animated hamburger icon. Must include all section links + CTA |
| Logo links to top/home | Universal web convention; users will click logo expecting scroll-to-top | Low | Wrap logo in anchor to `#top` or `scrollTo(0)` |
| Active section highlighting in nav | Users need to know where they are on a long-scroll page | Medium | Use Intersection Observer to toggle active class on nav links as sections enter viewport |

### Hero Section

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Full-viewport hero with clear headline + CTA | First impression; B2B buyers decide in 3-5 seconds whether to stay | Low | Already present. Needs real imagery (not gradient orbs) per PROJECT.md requirements |
| Primary + secondary CTA buttons | One high-commitment ("Start now"), one low-commitment ("Learn more" / "How it works") | Low | Already present in current build |
| Above-the-fold value proposition | Must answer "What is this and why should I care?" instantly | Low | Current headline is good. Keep it concise |

### Content Sections

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Problem/pain section | B2B buyers need to feel understood before hearing the solution | Low | Already present. Needs scroll-triggered reveal per PROJECT.md |
| Solution/value section | Must bridge from pain to "here's how we fix it" | Low | Already present |
| How-it-works stepper (3-4 steps) | Reduces perceived complexity; B2B buyers need to understand the process | Medium | PROJECT.md specifies 4-step tabbed stepper. Current build has static numbered cards -- needs interactive tabs |
| Social proof / trust signals | B2B buyers need reassurance: logos, testimonials, or stats | Medium | NOT in current build. At minimum: "Trusted by X companies" or a stat bar. Even placeholder structure helps |
| Pricing section with plan cards | Buyers expect transparent pricing; hiding it increases bounce | Medium | PROJECT.md requires 2 cards (Essential + Pilot). Current build has a single pricing card -- needs split into 2 distinct plans |
| FAQ accordion | Reduces support burden; answers objections before they become blockers | Medium | PROJECT.md requires 6 questions. NOT in current build yet |
| CTA banner section | Final conversion point before footer; recaptures visitors who scrolled the whole page | Low | PROJECT.md requires warm background image + "Let's Talk" button. NOT in current build |

### Contact & Conversion

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Contact form with field validation | B2B buyers expect a structured form, not just an email link | Medium | PROJECT.md requires: Name, Email, Phone, Employees dropdown, Notes. Current build only has email input -- major gap |
| Form submission confirmation | Users need feedback that their submission worked | Low | Current build has basic thank-you state; needs polish |
| Email notifications on submission | Business-critical: leads must reach the team immediately | Medium | Requires Resend or similar. Not implemented yet |
| Database storage for leads | Submissions must persist; email-only risks lost leads | Medium | Requires Vercel Postgres or similar. Not implemented yet |
| Floating CTA button | Persistent conversion opportunity as user scrolls; reduces friction | Low | PROJECT.md requires "Let's talk" bottom-right. NOT in current build |

### Footer

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Footer with branding + links | Universal expectation; signals legitimacy | Low | Already present but sparse |
| Social media links | B2B buyers check social presence for legitimacy | Low | PROJECT.md requires LinkedIn, Instagram, TikTok. NOT in current build |
| Privacy policy link | Legal requirement in many jurisdictions; B2B buyers notice absence | Low | PROJECT.md requires this. NOT in current build |

### Responsive Design

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Mobile-first responsive layout | 50%+ of B2B landing traffic is mobile; non-negotiable | Medium | Tailwind makes this manageable. Must test every section at 320px, 768px, 1024px, 1440px breakpoints |
| Touch-friendly tap targets (min 44px) | Mobile usability requirement per WCAG and Apple HIG | Low | Check all buttons, links, accordion triggers |
| Responsive typography scale | Text must be readable without pinch-zoom on mobile | Low | Use Tailwind responsive prefixes (`text-lg md:text-2xl`) -- partially done |
| Responsive image handling | Images must not overflow or cause horizontal scroll on mobile | Low | Use Next.js Image with responsive sizing |

### Performance

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Lighthouse 90+ score | PROJECT.md constraint. Slow sites kill conversion | Medium | Requires: optimized images, font preloading, minimal JS bundle, GPU-accelerated animations |
| Optimized images (WebP/AVIF, lazy loading) | Largest Contentful Paint is often hero image | Low | Next.js Image handles format + lazy loading automatically |
| Font preloading | Prevents FOUT/FOIT which looks unprofessional | Low | Use `next/font` with Inter, Manrope, Poppins |

### Accessibility (Baseline)

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Keyboard navigation for all interactive elements | WCAG 2.1 AA requirement; also helps power users | Medium | Focus styles on nav links, buttons, form fields, accordion triggers, tabs |
| Color contrast ratios (4.5:1 minimum) | WCAG 2.1 AA. Gray text on dark backgrounds is the main risk area | Low | Audit `text-gray-400`, `text-gray-500` on `#0a0a0a` backgrounds -- likely failing |
| Semantic HTML (landmarks, headings hierarchy) | Screen readers and SEO depend on this | Low | Use `<header>`, `<main>`, `<section>`, `<footer>`, proper `<h1>`-`<h6>` nesting |
| Form labels and error states | Required for screen reader users; also improves UX for everyone | Low | Current email input lacks visible label and aria attributes |
| Alt text for all images | WCAG requirement; Next.js Image requires `alt` prop | Low | Already partially done |
| `prefers-reduced-motion` support | Users with vestibular disorders need this; increasingly expected | Low | Wrap all GSAP/Framer Motion animations in reduced-motion checks |

## Differentiators

Features that elevate the site from "competent" to "premium." Not expected, but create lasting impression.

### Animation & Motion (Core Differentiator for Humanta)

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Scroll-triggered section reveals | Content appears as user scrolls, creating narrative pacing. Standard on Awwwards-level sites | Medium | Use Framer Motion `useInView` + `motion.div` with `initial`/`animate` props. Stagger children by 100-150ms for cascade effect |
| Parallax hero background | Depth and polish on first impression. Hero image moves slower than overlay text | Medium | GSAP ScrollTrigger with `y` transform on background image. Keep parallax subtle (0.3-0.5 speed ratio) to avoid nausea |
| Staggered text/element reveals | Words or list items appearing sequentially creates premium editorial feel | Medium | Framer Motion `staggerChildren` in parent `variants`. Apply to headlines (word-by-word), feature cards (card-by-card), bullet lists |
| Scroll-linked section transitions | Sections blend or transform as they enter/exit viewport, creating continuity | High | GSAP ScrollTrigger with pinning and scrub. Use for the 3-panel story section (text left + image right). Most complex animation pattern |
| Image reveal animations (clip-path / scale) | Images that "uncover" or grow into view feel cinematic vs. basic fade-in | Medium | Use `clipPath` animation from `inset(100% 0 0 0)` to `inset(0)`, or scale from 1.1 to 1.0 with overflow hidden |
| Button/link micro-interactions | Hover states with scale, glow, or magnetic cursor effects signal attention to detail | Low | CSS transforms + Framer Motion `whileHover`. Magnetic effect: track cursor position within button bounds, offset button position slightly toward cursor |
| Smooth page transitions | Moving between home and /contact should feel seamless, not like a page reload | High | Framer Motion `AnimatePresence` with layout animations. Consider View Transitions API (native browser, good support in 2025) as simpler alternative |
| Counter/stat animations | Numbers counting up as they enter viewport adds dynamism to trust signals | Low | Framer Motion `useInView` trigger + `useSpring` or simple `requestAnimationFrame` counter |

### Navigation Enhancements

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Nav background transition on scroll | Nav goes from transparent (over hero) to solid/blur on scroll. Creates depth layering | Low | Use scroll event or Intersection Observer. Transition `background-color` and `backdrop-filter`. Already partially done with `bg-[#0a0a0a]/80 backdrop-blur-md` but should start transparent |
| Animated mobile menu (slide + stagger) | Menu items animating in one-by-one feels premium vs. instant appear | Low | Framer Motion `AnimatePresence` for menu container + `staggerChildren` for menu items |
| Progress indicator on scroll | Thin colored bar at top showing page progress. Subtle but polished | Low | `window.scrollY / documentHeight` mapped to `scaleX` of a fixed bar. Use brand orange |

### Pricing Section Enhancements

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Highlighted/recommended plan | Visual emphasis on the preferred plan with badge ("Most Popular" or "Recommended") | Low | Scale card slightly larger, add border glow, add badge element |
| Pricing card hover effects | Cards that lift, glow, or shift on hover signal interactivity | Low | `transform: translateY(-4px)` + box-shadow transition on hover |
| Feature comparison checkmarks | Visual checklist comparing what each plan includes makes comparison effortless | Low | Checkmark vs. dash/x icon grid below pricing |

### FAQ Enhancements

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Animated accordion (height transition) | Smooth open/close vs. instant toggle feels polished | Medium | Framer Motion `AnimatePresence` with height animation. Or use CSS `grid-template-rows: 0fr` to `1fr` trick for pure CSS animation |
| Plus/minus or chevron icon rotation | Visual indicator of open/close state with smooth rotation | Low | `rotate(45deg)` on plus icon, or `rotate(180deg)` on chevron |

### Contact Form Enhancements

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Multi-field contact form (dedicated page) | Full-featured form on /contact page builds trust vs. single email input | Medium | Name, Email, Phone, Company Size dropdown, Notes textarea. Server action for submission |
| Inline validation with helpful messages | Real-time feedback as user fills form reduces frustration | Medium | Use React Hook Form or native validation. Show errors below fields on blur |
| Loading state on submit button | Prevents double-submission and shows system is working | Low | Swap button text to spinner/loading state during API call |
| Success animation | Celebratory feedback (checkmark animation, confetti-subtle) reinforces positive action | Low | Framer Motion spring animation on checkmark SVG path draw |

### Visual Polish

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Custom cursor effects | Cursor that changes size/color on interactive elements feels premium | Medium | Only implement on desktop (pointer: fine). Track cursor with `mousemove`, render custom div. Can feel gimmicky if overdone -- keep subtle |
| Gradient mesh backgrounds (animated) | Subtle movement in background gradients creates living, breathing feel | Low | CSS `@keyframes` on gradient position or hue-rotate. Current build has static gradient orbs -- animate their position slowly |
| Card glass-morphism effects | Frosted glass cards with backdrop-blur feel modern and premium | Low | `backdrop-blur-xl bg-white/5 border border-white/10`. Already partially used |
| Scroll-triggered background color shifts | Background transitioning from dark to cream as user scrolls into lighter sections | Medium | GSAP ScrollTrigger to interpolate `backgroundColor` between sections. Matches PROJECT.md requirement for cream/off-white sections |

## Anti-Features

Features to explicitly NOT build. These add complexity without proportional value for this specific project.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Chatbot / live chat widget | Adds JS weight, requires monitoring, premature for early-stage B2B service | Contact form + email address. Add chat later when lead volume justifies it |
| Cookie consent banner | Only needed if using analytics cookies. Start without tracking; add consent when analytics are added | Ship without analytics first. When adding analytics, use Vercel Analytics (no consent needed) or add banner then |
| Video backgrounds / autoplay video | Heavy bandwidth, poor mobile performance, accessibility nightmare, kills Lighthouse score | Use optimized static images with subtle CSS/GSAP animation for movement |
| Complex page transitions with route-level animations | Diminishing returns for a 2-page site (home + /contact). High complexity, subtle benefit | Simple fade transition at most. Focus animation budget on scroll-triggered content reveals |
| Carousel/slider for testimonials | Carousels have terrible UX: low engagement, accessibility challenges, content gets buried | Static grid of 2-3 testimonials visible at once. Or a single featured quote |
| Infinite scroll or lazy-loaded sections | This is a short landing page, not a feed. Lazy loading sections adds complexity for no gain | Load all sections upfront. Lazy-load images only (Next.js Image handles this) |
| Dark/light mode toggle | Brand aesthetic is specifically dark. A toggle undermines the intentional design direction | Commit to the dark theme. Use cream/off-white for contrast sections as designed |
| Multi-language / i18n | Out of scope per PROJECT.md. Humanta operates in Sydney; English-only for now | Hardcoded English content |
| Blog / content pages | Out of scope per PROJECT.md. Adds CMS complexity | Defer entirely until content strategy justifies it |
| A/B testing infrastructure | Premature optimization. Ship one version, measure, then iterate | Manual iteration based on analytics. Add A/B testing tooling later if needed |
| Parallax on mobile | Mobile parallax is janky on iOS Safari (address bar resize triggers), drains battery, causes motion sickness | Disable parallax transforms on touch devices. Use simple fade-in reveals instead |
| Heavy custom cursor on mobile | Mobile has no cursor. Custom cursor JS on mobile is wasted computation | Gate custom cursor behind `@media (hover: hover) and (pointer: fine)` |

## Feature Dependencies

```
Navigation (sticky + smooth scroll) --> Active section highlighting (requires Intersection Observer)
                                    --> Nav background transition (requires scroll listener)
                                    --> Mobile hamburger menu (independent but needed early)

Hero section --> Parallax effect (requires GSAP ScrollTrigger setup)
            --> Staggered text reveal (requires Framer Motion setup)

Scroll-triggered reveals (Framer Motion useInView) --> Applied to ALL content sections
                                                    --> Must be set up as reusable component/hook

3-panel story section --> Scroll-linked transitions (requires GSAP ScrollTrigger with pin)
                      --> Image reveal animations (clip-path)

How-it-works stepper --> Tab interaction state management
                     --> Tab transition animations

Pricing section --> 2 plan cards (content/data)
              --> Highlighted plan styling
              --> Hover effects

FAQ accordion --> Animated height transitions
             --> Open/close state management

Contact form (full) --> Form validation
                    --> Server action / API route
                    --> Database storage (Vercel Postgres)
                    --> Email notification (Resend)
                    --> Success/error states

Floating CTA button --> Always visible (z-index management)
                    --> Links to /contact or opens form modal

Footer --> Social links (LinkedIn, Instagram, TikTok URLs)
       --> Privacy policy page/modal
       --> Section navigation links

prefers-reduced-motion --> Must wrap ALL animation features
                       --> Set up as global motion preference context
```

## MVP Recommendation

**Priority 1 -- Ship these first (structural foundation):**

1. Sticky navigation with section links, mobile hamburger, active highlighting
2. Full hero with real background image (from Framer site), dual CTAs
3. All content sections with correct layout and content from humanta.co
4. 2-card pricing section (Essential + Pilot)
5. FAQ accordion with 6 questions
6. Full contact form on /contact page with database + email
7. Floating "Let's talk" CTA button
8. Footer with social links and privacy policy
9. Fully responsive at all breakpoints
10. Accessibility baseline (keyboard nav, contrast, semantic HTML, reduced motion)

**Priority 2 -- Add after structure is solid (animation layer):**

1. Scroll-triggered section reveals (reusable `<RevealOnScroll>` wrapper component)
2. Staggered text reveals on headlines
3. Image fade-in / clip-path reveals
4. FAQ accordion height animation
5. Nav background transition (transparent to solid)
6. Button hover micro-interactions
7. Parallax hero (desktop only)

**Priority 3 -- Polish after core is complete:**

1. 3-panel scroll-linked story section (GSAP ScrollTrigger pin)
2. Counter animations on stats
3. Pricing card hover effects
4. Progress bar indicator
5. Custom cursor (desktop only)
6. Animated gradient backgrounds

**Defer entirely:**

- Social proof / testimonials section: Needs real customer data. Add placeholder structure but do not fabricate testimonials
- Page transitions between home and /contact: Low ROI for 2-page site
- Analytics / tracking: Ship first, measure second

## Gap Analysis: Current Build vs Requirements

| Requirement (from PROJECT.md) | Current State | Gap |
|-------------------------------|---------------|-----|
| Sticky nav with section links | Has nav but missing section links | Small gap |
| Mobile navigation | No hamburger menu | Medium gap |
| 3 scroll-triggered story panels | Problem section exists but no scroll animation, wrong layout | Large gap |
| 4-step tabbed stepper | 4 static cards, no tab interaction | Medium gap |
| 2 pricing plan cards | Single pricing display, not 2 cards | Medium gap |
| FAQ accordion (6 questions) | Not implemented | Large gap |
| Full-width CTA banner | Not implemented | Medium gap |
| Contact page (/contact) with full form | Only email input on homepage | Large gap |
| Floating "Let's talk" button | Not implemented | Small gap |
| Scroll-driven animations throughout | No animations (no GSAP or Framer Motion installed) | Large gap |
| Social links in footer | Not implemented | Small gap |
| Privacy policy link | Not implemented | Small gap |
| Real images from humanta.co | Using gradient orbs / icons only | Large gap |

## Sources

- PROJECT.md requirements and constraints (primary source for feature scope)
- Current codebase analysis (page.tsx, package.json) for gap identification
- Training data knowledge of B2B SaaS landing page patterns, WCAG 2.1 AA requirements, Framer Motion and GSAP animation capabilities (MEDIUM confidence -- not verified against live sources this session)
- Premium landing page conventions observed across Stripe, Linear, Vercel, Notion, and similar B2B sites (training data, not live verified)
