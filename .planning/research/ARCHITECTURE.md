# Architecture Patterns

**Domain:** Premium animated B2B landing page (Next.js)
**Researched:** 2026-03-07
**Overall confidence:** HIGH (well-established patterns for Next.js App Router + animation libraries)

## Current State Analysis

The existing codebase is a single 657-line `page.tsx` monolith with:
- All sections inline (no component extraction)
- No animation libraries installed (only CSS keyframes)
- `"use client"` on the entire page (prevents server-side rendering of static content)
- No contact form backend
- No image optimization configuration for remote images
- Single font loaded (Poppins); project requires Inter and Manrope too
- Tailwind v4 with `@theme inline` (newer CSS-first config, no `tailwind.config.ts`)

This needs a complete restructure.

## Recommended Architecture

```
src/
  app/
    layout.tsx              # Root layout: fonts, metadata, global providers
    page.tsx                # Home page: composes section components (Server Component)
    contact/
      page.tsx              # Contact form page (Server Component shell)
    api/
      contact/
        route.ts            # POST handler: validate, store in DB, send email
  components/
    layout/
      Navbar.tsx            # Sticky nav with scroll state (Client)
      Footer.tsx            # Static footer (Server)
      FloatingCTA.tsx       # Fixed bottom-right "Let's talk" button (Client)
    sections/
      Hero.tsx              # Full-screen hero with parallax (Client)
      Story.tsx             # 3-panel scroll-triggered story (Client)
      HowItWorks.tsx        # 4-step tabbed stepper (Client)
      Pricing.tsx           # 2 pricing cards (Server, minimal interaction)
      FAQ.tsx               # Accordion (Client)
      CTABanner.tsx         # Full-width CTA with background image (Server)
    ui/
      Button.tsx            # Shared button variants
      SectionWrapper.tsx    # Consistent padding, max-width, scroll-reveal wrapper
      AnimatedText.tsx      # Reusable text reveal animation component
      Accordion.tsx         # Generic accordion primitive
      TabStepper.tsx        # Generic tab stepper primitive
    animation/
      ScrollProvider.tsx    # GSAP ScrollTrigger initialization (Client)
      useScrollReveal.ts    # Hook: fade-in on scroll via IntersectionObserver
      useParallax.ts        # Hook: parallax effect for hero/images
      useSmoothScroll.ts    # Hook: Lenis smooth scroll setup
    contact/
      ContactForm.tsx       # Form with validation (Client)
  lib/
    db.ts                   # Database client (Vercel Postgres)
    email.ts                # Email sending (Resend)
    validations.ts          # Zod schemas for contact form
    constants.ts            # Site-wide content strings, nav links, FAQ data
    fonts.ts                # Font configuration (Inter, Manrope, Poppins)
  types/
    index.ts                # Shared TypeScript types
```

### Key Architectural Decisions

**1. Server Components by default, Client Components only where needed.**
The current page is entirely `"use client"` which is wasteful. Most sections are static content. Only components that need browser APIs (scroll listeners, IntersectionObserver, form state, animation libraries) should be Client Components. This matters for performance: Server Components ship zero JS.

**2. Content lives in `lib/constants.ts`, not in components.**
All text content, FAQ items, pricing data, how-it-works steps, and nav links go in a constants file. Components consume this data. This makes future CMS migration trivial (swap constants for CMS fetches) and keeps components focused on presentation.

**3. Animations split between GSAP ScrollTrigger and Framer Motion.**
Use GSAP ScrollTrigger for scroll-linked animations (parallax, scroll-triggered panel reveals, timeline sequences). Use Framer Motion for UI micro-interactions (button hover, accordion open/close, tab transitions). Do not mix them on the same element. This prevents library conflicts and uses each tool for its strength.

## Component Boundaries

| Component | Responsibility | Communicates With | Client/Server |
|-----------|---------------|-------------------|---------------|
| `layout.tsx` | Fonts, metadata, ScrollProvider wrap | All pages | Server (wraps Client provider) |
| `page.tsx` | Compose sections in order | All section components | Server |
| `Navbar` | Sticky nav, scroll-aware styling, nav links | ScrollProvider (reads scroll position) | Client |
| `FloatingCTA` | Persistent "Let's talk" button | Links to /contact | Client |
| `Hero` | Full-screen hero, parallax bg, animated text | useParallax, AnimatedText | Client |
| `Story` | 3 scroll-triggered panels (text + image) | ScrollProvider (GSAP ScrollTrigger pins) | Client |
| `HowItWorks` | 4-step tabbed stepper on cream bg | TabStepper (local state) | Client |
| `Pricing` | 2 pricing cards, static display | Button (links to contact) | Server |
| `FAQ` | 6 expandable questions | Accordion (Framer Motion) | Client |
| `CTABanner` | Full-width CTA with background image | Button (links to contact) | Server |
| `Footer` | Branding, links, social icons | None | Server |
| `ContactForm` | Form fields, validation, submission | API route (fetch POST) | Client |
| `api/contact/route.ts` | Validate, store, send email | lib/db, lib/email | Server (API) |
| `ScrollProvider` | Initialize GSAP, Lenis smooth scroll | Wraps all Client animation consumers | Client |

## Data Flow

### Static Content Flow (most of the site)
```
lib/constants.ts (content data)
       |
       v
page.tsx (Server Component - imports sections)
       |
       v
Section Components (receive content as props or import directly)
       |
       v
HTML (rendered on server, hydrated only where Client Components exist)
```

### Animation Flow
```
ScrollProvider (layout.tsx)
  |-- Initializes GSAP ScrollTrigger globally
  |-- Initializes Lenis smooth scroll
  |-- Provides scroll context (optional, for Navbar opacity)
  |
  |-- Hero.tsx
  |     |-- useParallax() for background parallax
  |     |-- AnimatedText for staggered title reveal
  |
  |-- Story.tsx
  |     |-- GSAP ScrollTrigger.create() for pinned panels
  |     |-- Each panel: fade + slide on scroll progress
  |
  |-- SectionWrapper.tsx (wraps most sections)
        |-- useScrollReveal() via IntersectionObserver
        |-- Fade-in when section enters viewport
```

### Contact Form Flow
```
ContactForm.tsx (Client Component)
  |-- Local state: form fields, loading, error, success
  |-- Zod validation (client-side, from lib/validations.ts)
  |-- fetch POST /api/contact
       |
       v
api/contact/route.ts (Server)
  |-- Zod validation (server-side, same schema)
  |-- lib/db.ts: INSERT into contacts table
  |-- lib/email.ts: Send notification via Resend
  |-- Return JSON response
```

### Navigation Flow (Smooth Scroll)
```
Navbar link click
  |-- e.preventDefault()
  |-- Lenis.scrollTo('#section-id') for smooth scroll
  |-- URL hash updates (optional, for shareability)
```

## Animation Orchestration Strategy

### Layer 1: Smooth Scroll (Lenis)
Initialize Lenis in `ScrollProvider`. It intercepts native scroll and provides buttery-smooth momentum scrolling. GSAP ScrollTrigger's `scrollerProxy` integrates with Lenis so scroll-triggered animations respect the smooth scroll position.

```typescript
// animation/ScrollProvider.tsx
"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
}
```

### Layer 2: Scroll-Triggered Reveals (IntersectionObserver)
For simple fade-in-on-scroll effects (most sections), use a lightweight custom hook with IntersectionObserver. No GSAP overhead. This covers 70% of scroll animations.

```typescript
// animation/useScrollReveal.ts
"use client";
import { useEffect, useRef, useState } from "react";

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
```

### Layer 3: Complex Scroll Animations (GSAP ScrollTrigger)
For pinned panels in the Story section, parallax in the Hero, and scroll-linked timeline animations. These require precise scroll-position-to-animation-progress mapping that IntersectionObserver cannot provide.

### Layer 4: Micro-interactions (Framer Motion)
For hover states, accordion expand/collapse, tab transitions, button press effects. Framer Motion's `AnimatePresence` handles mount/unmount animations cleanly.

### Why NOT Framer Motion for scroll animations
Framer Motion's `useScroll` and `useTransform` work but become unwieldy for complex scroll sequences (pinned panels, staggered timelines). GSAP ScrollTrigger is purpose-built for this and provides `pin`, `scrub`, `snap`, and `timeline` out of the box. The Story section with 3 pinned panels is a textbook GSAP ScrollTrigger use case.

## Image Handling Strategy

### Remote Images from Framer
The live humanta.co site serves images from Framer's CDN. Next/Image requires explicit domain configuration:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "framerusercontent.com" },
      { protocol: "https", hostname: "*.framerusercontent.com" },
    ],
  },
};
```

### Image Component Pattern
All images use `next/image` for automatic WebP/AVIF conversion, lazy loading, and responsive `srcset`. For hero backgrounds, use `fill` + `priority`. For content images, use explicit `width`/`height`.

```typescript
// Hero background image pattern
<div className="relative w-full h-screen">
  <Image
    src="https://framerusercontent.com/images/..."
    alt="Hero background"
    fill
    priority
    className="object-cover"
    sizes="100vw"
  />
  <div className="absolute inset-0 bg-black/40" /> {/* overlay */}
</div>
```

### Performance Notes
- Hero image: `priority` flag (preloaded, no lazy load)
- Below-fold images: default lazy loading (automatic)
- `sizes` attribute: critical for responsive images. Use `100vw` for full-width, `(max-width: 768px) 100vw, 50vw` for grid layouts

## Font Loading Strategy

Three font families needed: Inter, Manrope, Poppins. Use `next/font/google` for all three with variable font support where available.

```typescript
// lib/fonts.ts
import { Inter, Manrope, Poppins } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});
```

```typescript
// layout.tsx
import { inter, manrope, poppins } from "@/lib/fonts";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

Then reference in CSS: `font-family: var(--font-inter)` etc. The current `@theme inline` approach in Tailwind v4 works well for this. Add the font variables to the theme block.

## Styling Architecture

### Tailwind v4 (CSS-first config) + CSS Modules for complex animations

**Tailwind v4** handles 95% of styling via utility classes. The project already uses `@theme inline` in `globals.css` which is correct for Tailwind v4 (no `tailwind.config.ts` needed).

**CSS Modules** for animation keyframes that are too complex for Tailwind's `animate-` utilities. Specifically:
- Gradient shift animations (already in globals.css)
- GSAP-controlled transitions (GSAP sets inline styles, no CSS needed)
- Complex hover effects with multiple properties

**globals.css** continues to hold:
- CSS custom properties (brand colors)
- `@theme inline` block (Tailwind token registration)
- Gradient utility classes (`.gradient-bg`, `.gradient-text`)
- Glow effects
- Base element styles (body, selection, smooth scroll)

**Do NOT use CSS Modules for layout or colors.** Keep those in Tailwind. CSS Modules are only for keyframe-heavy animation classes that would be verbose as Tailwind arbitrary values.

## API Route Architecture

### Contact Form (`app/api/contact/route.ts`)

```typescript
// Simplified structure
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { sendNotification } from "@/lib/email";

const ContactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  employees: z.enum(["1-50", "51-200", "201-500", "500+"]),
  notes: z.string().max(1000).optional(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 });

  await db.insert(contacts).values(parsed.data);
  await sendNotification(parsed.data);

  return NextResponse.json({ success: true });
}
```

**Database:** Vercel Postgres via Drizzle ORM (lightweight, type-safe, works natively with Vercel Postgres). A single `contacts` table is sufficient.

**Email:** Resend with a single transactional template. Send to the Humanta team inbox on each submission. No user-facing confirmation email needed initially.

**Rate limiting:** Use `@upstash/ratelimit` with Vercel KV for basic rate limiting (prevent spam). Optional for MVP but recommended.

## Responsive Breakpoint Strategy

Tailwind's default breakpoints are sufficient. No custom breakpoints needed.

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Default (mobile) | < 640px | Single column, stacked nav, full-width sections, smaller type |
| `sm` | 640px | Form fields side-by-side |
| `md` | 768px | Two-column grids (Story panels: text + image), nav horizontal |
| `lg` | 1024px | Three-column grids (benefits cards), larger hero type |
| `xl` | 1280px | Max-width container (1280px), comfortable spacing |

### Mobile-First Approach
Build mobile layout first, add complexity with `md:` and `lg:` prefixes. The site's content is linear enough that the mobile layout is essentially the default reading order.

### Key Responsive Patterns
- **Navbar:** Hamburger menu below `md:`, horizontal links at `md:` and above
- **Story panels:** Stacked (image above text) on mobile, side-by-side on `md:`
- **Pricing cards:** Stacked on mobile, side-by-side on `md:`
- **How It Works stepper:** Vertical steps on mobile, horizontal 4-column on `md:`
- **Hero text:** `text-4xl` mobile, `text-6xl` at `md:`, `text-7xl` at `lg:`

## Patterns to Follow

### Pattern 1: Section Wrapper with Scroll Reveal
Every section uses a consistent wrapper that handles padding, max-width, and fade-in animation.

```typescript
"use client";
import { useScrollReveal } from "@/components/animation/useScrollReveal";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: "dark" | "cream";
}

export function SectionWrapper({ children, className, id, background = "dark" }: SectionWrapperProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "py-16 md:py-24 relative",
        background === "dark" ? "bg-[#0a0a0a]" : "bg-[#FFF8F0]",
        className
      )}
    >
      <div className={cn(
        "max-w-6xl mx-auto px-6 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        {children}
      </div>
    </section>
  );
}
```

### Pattern 2: Separate Content from Presentation
```typescript
// lib/constants.ts
export const FAQ_ITEMS = [
  { question: "What is a Humanta Spark?", answer: "..." },
  // ...
];

// sections/FAQ.tsx
import { FAQ_ITEMS } from "@/lib/constants";
export function FAQ() {
  return FAQ_ITEMS.map((item) => <Accordion key={item.question} {...item} />);
}
```

### Pattern 3: Client Component Islands in Server Pages
```typescript
// page.tsx (Server Component - no "use client")
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing"; // Server
import { FAQ } from "@/components/sections/FAQ";

export default function Home() {
  return (
    <main>
      <Hero />        {/* Client - needs animation */}
      <Pricing />     {/* Server - static content */}
      <FAQ />         {/* Client - needs accordion interaction */}
    </main>
  );
}
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: "use client" on the Page
**What:** Marking `page.tsx` as a Client Component.
**Why bad:** Forces the entire page to be client-rendered, shipping all content as JavaScript. The current codebase does this.
**Instead:** Keep `page.tsx` as a Server Component. Import Client Components for interactive sections. Static sections (Pricing, CTABanner, Footer) render as zero-JS Server Components.

### Anti-Pattern 2: GSAP in Every Component
**What:** Initializing GSAP ScrollTrigger in each section independently.
**Why bad:** Multiple GSAP instances conflict, scroll positions break, performance suffers from redundant listeners.
**Instead:** Initialize GSAP once in ScrollProvider. Individual components create ScrollTrigger instances that register with the global GSAP timeline. Clean up in `useEffect` return.

### Anti-Pattern 3: Mixing Animation Libraries on Same Element
**What:** Applying both Framer Motion and GSAP to the same DOM element.
**Why bad:** Both fight for control of `transform` and `opacity`. Animations jitter or override each other.
**Instead:** GSAP owns scroll-linked transforms. Framer Motion owns UI interaction animations. Never overlap on the same element.

### Anti-Pattern 4: Hardcoding Content in JSX
**What:** Writing all text, FAQ items, pricing details directly in component JSX.
**Why bad:** Content changes require editing presentation components. Makes CMS migration harder.
**Instead:** Extract all content to `lib/constants.ts`. Components receive or import content data.

## Scalability Considerations

| Concern | Now (Landing Page) | Future (Multi-page Site) |
|---------|---------------------|--------------------------|
| Content | `lib/constants.ts` | CMS (Sanity/Contentful) |
| Routing | `/` and `/contact` | Add pages in `app/` directory |
| Animations | Global ScrollProvider | Same, works per-page |
| Images | Framer CDN | Self-hosted in `/public` or CMS |
| Database | Vercel Postgres (contacts only) | Same, add tables as needed |
| Email | Resend (notifications) | Same, add templates |

## Suggested Build Order

Based on component dependencies, build in this order:

1. **Foundation** (no dependencies)
   - `lib/fonts.ts` + `lib/constants.ts` + `lib/utils.ts`
   - `next.config.ts` (image domains)
   - `globals.css` updates
   - `layout.tsx` (fonts, metadata)

2. **Layout Components** (depends on Foundation)
   - `Navbar` (needs scroll state)
   - `Footer` (static, independent)
   - `FloatingCTA` (independent)

3. **Animation Infrastructure** (depends on Foundation)
   - `ScrollProvider` (GSAP + Lenis init)
   - `useScrollReveal` hook
   - `useParallax` hook
   - `SectionWrapper` component

4. **UI Primitives** (depends on Foundation)
   - `Button` component
   - `Accordion` component
   - `TabStepper` component
   - `AnimatedText` component

5. **Content Sections** (depends on Layout + Animation + UI)
   - `Hero` (needs useParallax, AnimatedText)
   - `Story` (needs ScrollProvider, GSAP ScrollTrigger)
   - `HowItWorks` (needs TabStepper)
   - `Pricing` (needs Button)
   - `FAQ` (needs Accordion)
   - `CTABanner` (needs Button)

6. **Page Composition** (depends on all sections)
   - `page.tsx` (compose sections)
   - Smooth scroll navigation wiring

7. **Contact Backend** (independent, can parallel with 5-6)
   - `lib/validations.ts` (Zod schemas)
   - `lib/db.ts` (Vercel Postgres + Drizzle)
   - `lib/email.ts` (Resend)
   - `api/contact/route.ts`
   - `ContactForm.tsx`
   - `contact/page.tsx`

8. **Polish** (depends on everything)
   - Responsive refinement
   - Animation timing/easing tuning
   - Lighthouse optimization
   - SEO metadata

**Key dependency insight:** The animation infrastructure (step 3) and UI primitives (step 4) can be built in parallel. The contact backend (step 7) is fully independent and can be built in parallel with content sections (step 5).

## Sources

- Next.js App Router documentation (Server/Client Component model) - HIGH confidence
- GSAP ScrollTrigger + Lenis integration pattern - HIGH confidence (widely documented)
- Framer Motion React integration - HIGH confidence
- Tailwind CSS v4 `@theme inline` configuration - HIGH confidence (observed in codebase)
- Vercel Postgres + Drizzle ORM pattern - MEDIUM confidence (training data, verify current Drizzle API)
- Resend email API - MEDIUM confidence (training data, verify current API)
- Lenis smooth scroll library - HIGH confidence (standard in premium landing pages)
