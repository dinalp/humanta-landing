# Phase 1: Foundation and Layout - Research

**Researched:** 2026-03-07
**Domain:** Next.js 16 landing page layout, Tailwind CSS 4 theming, responsive design, image optimization, typography
**Confidence:** HIGH

## Summary

Phase 1 establishes the complete visual structure of the Humanta landing page. The project already has Next.js 16.1.4 with React 19 and Tailwind CSS 4 installed and configured. The existing `page.tsx` contains a placeholder design with incorrect brand colors (gradient multi-color scheme) and content that does not match humanta.co. This phase replaces everything with a faithful reproduction of the live site's layout, content, images, and typography.

The key technical challenges are: (1) configuring three Google fonts (Inter, Manrope, Poppins) with Tailwind CSS 4's `@theme inline` directive, (2) downloading and self-hosting images from humanta.co with next/image optimization, (3) building the correct brand color palette (dark backgrounds + cream sections + orange #f5b614 accent), and (4) implementing responsive layouts for all sections across mobile, tablet, and desktop.

**Primary recommendation:** Tear down the existing placeholder page entirely. Build section-by-section as separate components, establishing the component architecture that Phases 2-4 will extend. Use server components by default (no `"use client"` at the page level) since this phase has no client-side interactivity beyond CSS scroll-behavior smooth scrolling and the nav scroll detection.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Match humanta.co overall layout and content but elevate the premium feel
- Better spacing and section design -- more polished than the Framer original
- Hero image is a placeholder (current Framer image) -- will be swapped for a Unicorn Studios graphic later
- Structure should support premium scroll-driven animations (Phase 2)
- Pull exact copy from humanta.co for all sections EXCEPT the story section
- Story section needs a rewrite: current copy is too wordy, positioned too high, doesn't impact the ICP (HR/People leaders) enough
- Story section visual design stays (text left + image right panels), the copy changes
- Claude to help rewrite story copy during implementation to be punchier and more ICP-focused
- All other section copy (hero, how it works, pricing, FAQ, CTA, footer) used as-is from humanta.co
- Download all images from humanta.co and self-host in /public
- Use next/image component for auto-optimization (WebP/AVIF, responsive sizes)
- Hero image is temporary placeholder until Unicorn Studios graphic is provided
- Equal priority: desktop and mobile
- Mobile: story panels stack vertically (image on top, text below)
- Mobile: pricing cards stack vertically (both visible, user scrolls)
- Tablet: fluid responsive transition between mobile and desktop -- no specific tablet breakpoint layout

### Claude's Discretion
- Premium styling direction (whitespace-heavy vs. rich density) -- pick what best fits the warm/human brand
- Section ordering -- Claude may reposition story section lower if B2B landing page best practices support it (user flagged it's too prominent currently)
- Exact spacing, padding, and typography sizing
- Component granularity and file structure
- Which Tailwind breakpoints to use

### Deferred Ideas (OUT OF SCOPE)
- wding.app animation reference -- captured for Phase 2 (Scroll Animations)
- Story section repositioning may need validation after copy rewrite -- revisit during Phase 2/3 if layout changes affect animation design
- Unicorn Studios hero graphic -- swap in when asset is provided (post Phase 1)
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| NAV-01 | Sticky nav with logo, section links (What we do, How it works, Plans), and "Get in touch" CTA button | Component architecture, sticky positioning with Tailwind, transparent-to-solid scroll transition |
| NAV-03 | Click nav link to smooth-scroll to corresponding section | CSS `scroll-behavior: smooth` (already in globals.css) + anchor `id` attributes on sections |
| NAV-05 | Nav transitions from transparent (over hero) to solid background on scroll | Client component with scroll event listener or IntersectionObserver, conditional class application |
| HERO-01 | Full-viewport hero with background image, tagline, headline, description text, and "Start now" CTA | next/image with `fill` + `priority`, responsive typography, hero content layout |
| STORY-01 | 3 dark-background panels with text (left) and image (right) telling the Humanta story | Grid/flex layout, responsive stacking (image-on-top mobile), image optimization |
| STORY-04 | Key phrases highlighted in orange (#f5b614) accent text | Inline `<span>` with accent color class |
| HIW-01 | "How Humanta Works" section with 4 numbered steps on cream background | Cream (#f5f3ee) background section, step cards/layout |
| PRICE-01 | 2 pricing cards: Essential (per redeemed spark) and Pilot Package - Sydney (10 Humanta Sparks) | Card component with feature lists |
| PRICE-02 | Each card shows feature checklist with checkmarks and "Get in touch" CTA | Checkmark SVG icon, feature list component |
| FAQ-01 | "Everything you need to know" section with 6 expandable questions | Static layout only (accordion interaction is Phase 3 FAQ-02) |
| CTA-01 | Full-width CTA section with warm background image, headline, and "Let's Talk" button | Background image with overlay, centered content |
| FOOT-01 | Footer with logo, tagline, section links, social links (LinkedIn, Instagram, TikTok), privacy policy link | Footer layout, social icon SVGs |
| GLOBAL-06 | Fully responsive across mobile, tablet, and desktop | Tailwind responsive prefixes (sm, md, lg), fluid typography |
| GLOBAL-09 | All images sourced from live Framer site (humanta.co) | Download images, self-host in /public, next/image optimization |
</phase_requirements>

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.4 | App Router, SSR, image optimization | Already installed, project foundation |
| React | 19.2.3 | Component framework | Already installed with Next.js 16 |
| Tailwind CSS | 4.x | Utility-first styling with @theme | Already installed, CSS-first config |
| TypeScript | 5.x | Type safety | Already installed |

### Supporting (No Additional Installs for Phase 1)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/font/google | (built-in) | Self-hosted Google Fonts (Inter, Manrope, Poppins) | Font loading in layout.tsx |
| next/image | (built-in) | Image optimization (WebP/AVIF, responsive sizes) | All images throughout the site |

### No New Dependencies Required
Phase 1 requires zero new npm packages. Everything needed is built into Next.js 16 and Tailwind CSS 4.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── layout.tsx           # Root layout: 3 fonts, metadata, body classes
│   ├── page.tsx             # Landing page: composes all section components
│   ├── globals.css          # Tailwind import, @theme, brand tokens, base styles
│   └── favicon.ico
├── components/
│   ├── Navbar.tsx           # Sticky nav (client component for scroll detection)
│   ├── Hero.tsx             # Full-viewport hero section
│   ├── Story.tsx            # 3 dark panels (text + image)
│   ├── HowItWorks.tsx       # 4-step section on cream background
│   ├── Pricing.tsx          # 2 pricing cards
│   ├── FAQ.tsx              # 6 questions (static for Phase 1)
│   ├── CTABanner.tsx        # Full-width CTA section
│   └── Footer.tsx           # Footer with links and socials
├── lib/
│   └── constants.ts         # Content data: nav links, story panels, FAQ items, pricing features
└── types/
    └── index.ts             # Shared TypeScript interfaces
public/
├── images/
│   ├── hero/                # Hero background image(s)
│   ├── story/               # Story panel images (3)
│   ├── cta/                 # CTA banner background
│   └── misc/                # Any other images
├── logo-black.png           # Already exists
└── logo-white.png           # Already exists
```

### Pattern 1: Server Components by Default
**What:** All section components are server components (no `"use client"` directive) except Navbar which needs scroll event handling.
**When to use:** Any component that only renders static content and doesn't need browser APIs.
**Example:**
```typescript
// src/components/Hero.tsx -- NO "use client" needed
import Image from "next/image";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      <Image
        src="/images/hero/hero-bg.jpg"
        alt="Humanta hero"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Hero content */}
      </div>
    </section>
  );
}
```

### Pattern 2: Content Data Separation
**What:** Extract all text content, FAQ items, pricing features, and navigation links into a constants file. Components import and render this data.
**When to use:** Every section with repeated/structured content.
**Example:**
```typescript
// src/lib/constants.ts
export const NAV_LINKS = [
  { label: "What we do", href: "#what-we-do" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Plans", href: "#plans" },
] as const;

export const STORY_PANELS = [
  {
    title: "...",
    description: "...",
    highlightText: "...",
    image: "/images/story/panel-1.jpg",
    imageAlt: "...",
  },
  // ... panels 2, 3
] as const;

export const FAQ_ITEMS = [
  { question: "...", answer: "..." },
  // ... all 6
] as const;
```

### Pattern 3: Tailwind CSS 4 Font Integration with next/font
**What:** Use `@theme inline` to bridge next/font CSS variables to Tailwind utility classes.
**When to use:** Root layout font setup.
**Example:**
```typescript
// src/app/layout.tsx
import { Inter, Manrope, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-inter);
  --font-heading: var(--font-manrope);
  --font-body: var(--font-poppins);

  --color-brand-dark: #0a0a0a;
  --color-brand-cream: #f5f3ee;
  --color-brand-accent: #f5b614;
  --color-brand-text: #070a06ed;
}
```

**Critical:** Use `@theme inline` (not plain `@theme`) when referencing CSS variables set by next/font. The `inline` keyword ensures the variable is resolved at the point of use (in the DOM where the font variable exists), not at the point of definition (in the CSS file where it doesn't exist yet).

### Pattern 4: Responsive Image with next/image fill Mode
**What:** Use `fill` mode for hero/CTA background images, explicit `width`/`height` for content images.
**When to use:** Background images that fill their container vs. inline content images.
**Example:**
```typescript
// Background image (hero, CTA banner)
<div className="relative w-full h-screen">
  <Image
    src="/images/hero/hero-bg.jpg"
    alt=""
    fill
    className="object-cover"
    priority
    sizes="100vw"
  />
</div>

// Content image (story panel)
<Image
  src="/images/story/panel-1.jpg"
  alt="Description"
  width={600}
  height={400}
  className="rounded-2xl"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Pattern 5: Sticky Nav with Scroll-Based Background
**What:** Client component that listens to scroll position and toggles between transparent and solid background.
**When to use:** NAV-05 requirement.
**Example:**
```typescript
// src/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { NAV_LINKS } from "@/lib/constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-brand-dark/95 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* Nav content */}
    </nav>
  );
}
```

### Anti-Patterns to Avoid
- **Putting all sections in a single file:** The existing page.tsx is 657 lines in one file. Split into separate components immediately.
- **Using `"use client"` on page.tsx:** Only Navbar needs client-side state. Keep the page and all other sections as server components.
- **Hardcoding content in JSX:** Extract text content to constants.ts for maintainability and future CMS migration.
- **Using the existing gradient color scheme:** The current globals.css has multi-color gradients (orange, mint, yellow, teal). The real humanta.co brand uses dark + cream + orange (#f5b614). Strip the existing color scheme entirely.
- **Ignoring `sizes` prop on images:** Always provide the `sizes` prop to next/image for responsive optimization. Without it, images serve at full resolution regardless of viewport.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading & optimization | Manual @font-face rules, preload links | next/font/google | Handles subsetting, self-hosting, preloading, preventing FOUT/FOIT |
| Image optimization | Manual sharp/imagemin pipelines, manual WebP conversion | next/image | Automatic format conversion (WebP/AVIF), responsive srcset, lazy loading, blur placeholders |
| Responsive breakpoints | Custom media query system | Tailwind responsive prefixes (sm:, md:, lg:) | Standard, well-tested breakpoint system |
| SVG icons (checkmarks, social) | Inline SVG in every component | Extracted SVG components or Lucide React | Consistency, reusability, smaller bundle |
| Smooth scroll | Custom JS scroll animation | CSS `scroll-behavior: smooth` | Browser-native, zero JS, already configured |

**Key insight:** Phase 1 has no complex interactivity. Everything can be achieved with Next.js built-ins, Tailwind CSS utilities, and HTML/CSS features. Zero additional dependencies needed.

## Common Pitfalls

### Pitfall 1: Tailwind CSS 4 @theme vs @theme inline
**What goes wrong:** Font utility classes (like `font-sans`) don't apply the correct font family. Text renders in browser defaults.
**Why it happens:** Using `@theme` (without `inline`) to reference CSS variables set by next/font. The variable isn't available when Tailwind resolves the theme at build time -- it's only available at runtime in the DOM.
**How to avoid:** Always use `@theme inline` when referencing CSS variables that are set via className on HTML elements (like next/font variables).
**Warning signs:** Fonts appear as serif/system defaults despite correct next/font configuration.

### Pitfall 2: next/image Missing width/height or fill
**What goes wrong:** Build error or layout shift. Images either fail to render or cause CLS (Cumulative Layout Shift).
**Why it happens:** next/image requires explicit dimensions for remote/public images. Without `width`+`height` or `fill`, it cannot calculate aspect ratio.
**How to avoid:** Use `fill` for background images (hero, CTA) inside a sized parent container. Use explicit `width`+`height` for content images (story panels, pricing).
**Warning signs:** Console warnings about missing width/height, images not rendering.

### Pitfall 3: Forgetting to Update Brand Colors
**What goes wrong:** Site looks nothing like humanta.co. Uses the placeholder gradient colors (orange, mint, yellow, teal) instead of actual brand palette.
**Why it happens:** The existing globals.css has a completely different color scheme from the actual humanta.co site.
**How to avoid:** Replace the entire color configuration. Actual brand: dark (#0a0a0a), cream (#f5f3ee), accent gold/amber (#f5b614), text near-black (#070a06).
**Warning signs:** Multi-color gradients visible, mint/teal colors appearing anywhere.

### Pitfall 4: Responsive Story Panel Layout
**What goes wrong:** Story panels look cramped on mobile, images lose impact, text becomes hard to read.
**Why it happens:** Desktop layout (text left + image right) doesn't work in narrow viewports.
**How to avoid:** Mobile: stack vertically with image on top, text below. Use `flex-col` on mobile, `md:flex-row` on desktop. Give images proper aspect ratios.
**Warning signs:** Horizontal overflow on mobile, tiny unreadable text, squished images.

### Pitfall 5: Hero Image Priority and LCP
**What goes wrong:** Hero image loads late, causing poor Largest Contentful Paint (LCP) score.
**Why it happens:** next/image lazy-loads by default. Hero is above the fold and must load immediately.
**How to avoid:** Add `priority` prop to the hero image. This disables lazy loading and adds a preload hint.
**Warning signs:** Hero appears blank momentarily on page load, poor Lighthouse LCP metric.

### Pitfall 6: Missing Section IDs for Navigation
**What goes wrong:** Nav links don't scroll to the right section or do nothing.
**Why it happens:** Section components lack `id` attributes that match the nav link `href` anchors.
**How to avoid:** Ensure every section has an `id` matching nav link hrefs: `id="what-we-do"`, `id="how-it-works"`, `id="plans"`.
**Warning signs:** Clicking nav links has no effect or scrolls to wrong position.

## Code Examples

### Brand Color Configuration (globals.css)
```css
/* Source: humanta.co live site analysis */
@import "tailwindcss";

@theme inline {
  /* Fonts - bridged from next/font CSS variables */
  --font-sans: var(--font-inter);
  --font-heading: var(--font-manrope);
  --font-body: var(--font-poppins);

  /* Brand colors */
  --color-brand-dark: #0a0a0a;
  --color-brand-cream: #f5f3ee;
  --color-brand-accent: #f5b614;
  --color-brand-text: #070a06;
  --color-brand-text-secondary: #8a8a8a;
  --color-brand-border: rgba(255, 255, 255, 0.1);
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--color-brand-dark);
  color: white;
}
```

### Multiple Font Setup (layout.tsx)
```typescript
// Source: Next.js official docs (nextjs.org/docs/app/getting-started/fonts)
import { Inter, Manrope, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} ${poppins.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
```

### Section Component Pattern
```typescript
// Source: Next.js App Router server component pattern
// src/components/HowItWorks.tsx
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-brand-cream">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-heading font-semibold text-brand-text text-center mb-16">
          How Humanta Works
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-14 h-14 bg-brand-accent text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-semibold">
                {index + 1}
              </div>
              <h3 className="font-heading font-semibold text-brand-text mb-2">
                {step.title}
              </h3>
              <p className="text-brand-text-secondary text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Pricing Card Pattern
```typescript
// src/components/Pricing.tsx
import { PRICING_PLANS } from "@/lib/constants";

function PricingCard({ plan }: { plan: typeof PRICING_PLANS[number] }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h3 className="font-heading text-xl font-semibold text-brand-text mb-2">
        {plan.name}
      </h3>
      <p className="text-brand-text-secondary mb-6">{plan.subtitle}</p>
      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <svg className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-brand-text text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <a href="#contact" className="block w-full text-center bg-brand-dark text-white py-3 rounded-full font-medium hover:bg-brand-dark/90 transition-colors">
        Get in touch
      </a>
    </div>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| tailwind.config.js (v3) | @theme directive in CSS (v4) | Tailwind CSS 4.0 (2025) | No JS config file, CSS-first theming |
| next/font + tailwind.config.js fontFamily | next/font + @theme inline CSS variables | Tailwind CSS 4.0 (2025) | Font variables bridged via CSS, not JS config |
| pages/ directory | app/ directory (App Router) | Next.js 13+ (stable since 14) | Server components by default, layouts, streaming |
| next.config.js `domains` for images | next.config.ts `remotePatterns` for images | Next.js 14+ | More specific, security-focused image allowlisting |

**Deprecated/outdated:**
- `tailwind.config.js` / `tailwind.config.ts`: Not used in Tailwind CSS 4. All configuration via `@theme` in CSS files.
- `next/image` `domains` config: Replaced by `remotePatterns` which allows protocol, pathname, and port restrictions.
- The existing gradient color scheme in globals.css: Must be completely replaced with actual humanta.co brand colors.

## Open Questions

1. **Exact content from humanta.co**
   - What we know: The site uses Framer which renders content via JavaScript, making scraping difficult. Requirements doc specifies section structure, and the user confirmed pulling exact copy from humanta.co for all sections except story.
   - What's unclear: The exact text content for each section, the exact image URLs for downloading.
   - Recommendation: During implementation, manually visit humanta.co in a browser, copy text content section by section, and download images via browser DevTools Network tab or right-click save. This is a manual content-gathering step that the implementer must do.

2. **Font usage mapping (which font for what)**
   - What we know: humanta.co uses Inter, Manrope, and Poppins. The CSS confirms these three fonts.
   - What's unclear: The exact mapping of which font is used for headings vs body vs nav.
   - Recommendation: Based on the Framer CSS analysis -- use Manrope for headings (bold/semibold), Inter for body text, and Poppins for nav/buttons/accents. The implementer should verify against the live site and adjust.

3. **Story section copy rewrite**
   - What we know: User wants the story copy rewritten to be punchier and more ICP-focused (HR/People leaders).
   - What's unclear: Exact new copy.
   - Recommendation: Claude should draft new story copy during implementation. Keep the 3-panel visual structure, rewrite text to be shorter, more impactful, focused on HR pain points and outcomes.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None currently installed |
| Config file | none -- see Wave 0 |
| Quick run command | `npm run build` (type-check + build verification) |
| Full suite command | `npm run build && npm run lint` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NAV-01 | Sticky nav renders with logo, links, CTA | smoke | `npm run build` (compilation check) | N/A |
| NAV-03 | Smooth scroll to sections | manual-only | Manual browser test (CSS scroll-behavior) | N/A |
| NAV-05 | Nav transparent-to-solid on scroll | manual-only | Manual browser test (scroll + observe) | N/A |
| HERO-01 | Hero renders with image, text, CTA | smoke | `npm run build` (compilation check) | N/A |
| STORY-01 | 3 story panels with text + image | smoke | `npm run build` (compilation check) | N/A |
| STORY-04 | Orange accent highlighted phrases | smoke | `npm run build` (compilation check) | N/A |
| HIW-01 | 4 steps on cream background | smoke | `npm run build` (compilation check) | N/A |
| PRICE-01 | 2 pricing cards rendered | smoke | `npm run build` (compilation check) | N/A |
| PRICE-02 | Feature checklists with checkmarks | smoke | `npm run build` (compilation check) | N/A |
| FAQ-01 | 6 FAQ questions displayed | smoke | `npm run build` (compilation check) | N/A |
| CTA-01 | CTA banner with image, headline, button | smoke | `npm run build` (compilation check) | N/A |
| FOOT-01 | Footer with logo, links, socials | smoke | `npm run build` (compilation check) | N/A |
| GLOBAL-06 | Responsive mobile/tablet/desktop | manual-only | Manual browser resize / DevTools test | N/A |
| GLOBAL-09 | Images from humanta.co self-hosted | smoke | `npm run build` (verifies image imports) | N/A |

### Sampling Rate
- **Per task commit:** `npm run build` (ensures TypeScript compiles and Next.js builds)
- **Per wave merge:** `npm run build && npm run lint`
- **Phase gate:** Full build green + manual visual check on localhost

### Wave 0 Gaps
- None critical -- this is a static layout phase. Build verification (`npm run build`) is sufficient for compilation checks.
- Visual verification is inherently manual for a layout phase (must look at the rendered page).
- E2E testing (Playwright/Cypress) would add value but is overhead for Phase 1. Consider adding in Phase 5.

## Sources

### Primary (HIGH confidence)
- [Next.js Official Docs - Fonts](https://nextjs.org/docs/app/getting-started/fonts) - Font loading with next/font/google, CSS variable pattern
- [Next.js Official Docs - Images](https://nextjs.org/docs/app/getting-started/images) - next/image component, fill mode, priority, remotePatterns
- [Tailwind CSS Official Docs - Theme](https://tailwindcss.com/docs/theme) - @theme directive, @theme inline, custom colors/fonts/spacing

### Secondary (MEDIUM confidence)
- [humanta.co](https://www.humanta.co/) - Live site CSS analysis confirming fonts (Inter, Manrope, Poppins), colors (#f5f3ee cream, #f5b614 accent, #070a06 text)
- [Tailwind CSS GitHub Discussion #13410](https://github.com/tailwindlabs/tailwindcss/discussions/13410) - @theme inline requirement for next/font CSS variables
- [Build with Matija - Google Fonts in Next.js 15 + Tailwind v4](https://www.buildwithmatija.com/blog/how-to-use-custom-google-fonts-in-next-js-15-and-tailwind-v4) - Complete integration pattern

### Tertiary (LOW confidence)
- humanta.co actual content (FAQ text, pricing details, step descriptions) -- could not be scraped due to Framer JS rendering. Must be gathered manually during implementation.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed, official docs verified
- Architecture: HIGH - Standard Next.js App Router patterns, well documented
- Font/Tailwind integration: HIGH - Verified with official Tailwind CSS 4 docs and community discussions
- Brand colors: MEDIUM - Confirmed from Framer CSS (#f5f3ee, #f5b614, #070a06) but some secondary colors may need adjustment during implementation
- Content/copy: LOW - Cannot scrape Framer-rendered content; must be gathered manually from browser
- Pitfalls: HIGH - Based on documented issues in official docs and community

**Research date:** 2026-03-07
**Valid until:** 2026-04-07 (stable stack, no fast-moving dependencies)
