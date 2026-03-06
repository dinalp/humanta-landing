# Technology Stack

**Project:** Humanta Landing Page
**Researched:** 2026-03-07
**Note:** WebSearch and WebFetch were unavailable during this research. Recommendations are based on training data (cutoff ~May 2025) and the existing codebase. Exact version numbers should be verified at install time with `npm info <package> version`. Confidence is marked accordingly.

## Already Installed (from package.json)

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.4 | App framework (App Router) |
| React | 19.2.3 | UI library |
| React DOM | 19.2.3 | React renderer |
| Tailwind CSS | ^4 | Utility-first CSS |
| @tailwindcss/postcss | ^4 | PostCSS integration for Tailwind |
| TypeScript | ^5 | Type safety |
| ESLint | ^9 | Code linting |
| eslint-config-next | 16.1.4 | Next.js ESLint rules |

## Recommended Stack

### Animation: GSAP + Framer Motion (use both, for different purposes)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| gsap | ^3.12 | Scroll-driven animations, timeline sequences, parallax | GSAP ScrollTrigger is the gold standard for scroll-linked animations. Nothing else comes close for pinning, scrubbing, and complex scroll timelines. Used by every premium agency site. | HIGH |
| @gsap/react | ^2.1 | React integration for GSAP | Official React hooks (`useGSAP`) that handle cleanup, context, and React 18+ strict mode. Eliminates the manual ref/cleanup boilerplate that causes memory leaks. | MEDIUM - verify latest version |
| motion (framer-motion) | ^11 | Component enter/exit animations, layout animations, hover/tap interactions | Declarative API is ideal for UI state transitions (accordion open/close, tab switches, modal entry). The `AnimatePresence` component handles unmount animations that GSAP cannot do declaratively. Renamed from `framer-motion` to `motion` in late 2024. | HIGH |

**Why both, not one:**
- GSAP excels at: scroll-driven timelines, parallax, pinning sections, staggered reveals on scroll, complex sequenced animations, animating non-React DOM properties
- Framer Motion excels at: React component lifecycle animations (mount/unmount), layout animations, gesture responses (hover, tap, drag), declarative spring physics
- For this project: GSAP handles the 3 scroll-triggered story panels, parallax hero, and section transitions. Framer Motion handles the FAQ accordion, tab stepper transitions, button hover states, and page transitions
- The two libraries coexist without conflict. GSAP operates on refs/DOM; Framer Motion operates on React component props

**GSAP licensing note:** As of GSAP 3.12+, GSAP is free for all use cases including commercial sites (no longer requires a paid "Business Green" license for commercial use). ScrollTrigger, ScrollSmoother, and other plugins are included in the standard package. Verify current license terms at gsap.com.

### CSS: Tailwind CSS 4 (already installed)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| tailwindcss | ^4 | All styling | Already installed. Tailwind v4 uses CSS-first configuration (no tailwind.config.js needed). Utility classes are ideal for a landing page with a defined design system. The existing codebase already uses Tailwind classes extensively. | HIGH |

**Configuration approach:** Tailwind v4 uses `@theme` directives in CSS instead of a JS config file. Define the Humanta brand tokens (colors, fonts, spacing) in `globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-humanta-orange: #f5b614;
  --color-humanta-cream: #faf5eb;
  --color-humanta-dark: #0a0a0a;
  --font-heading: "Manrope", sans-serif;
  --font-body: "Inter", sans-serif;
  --font-display: "Poppins", sans-serif;
}
```

**What NOT to use:**
- CSS Modules: Adds file sprawl for a landing page. Tailwind covers 95%+ of styling needs. Use inline `style` for the rare edge case.
- styled-components / Emotion: Runtime CSS-in-JS is a performance anti-pattern in server components. Tailwind is zero-runtime.
- Sass/SCSS: Unnecessary abstraction layer when Tailwind handles variables, responsive, and dark mode natively.

### Font Loading: next/font/google (built-in)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| next/font/google | (built-in) | Self-host Google Fonts with zero layout shift | Automatically downloads fonts at build time, serves from same domain (no external requests), generates CSS `size-adjust` to prevent CLS. Already partially configured in layout.tsx with Poppins. | HIGH |

**Implementation:** Load all three brand fonts in `layout.tsx`:

```typescript
import { Inter, Manrope, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

// Apply all three CSS variables to <body>
<body className={`${inter.variable} ${manrope.variable} ${poppins.variable}`}>
```

**What NOT to use:**
- `@font-face` in CSS with manual font files: next/font handles this automatically with better optimization
- Google Fonts CDN link tags: Adds external network request, causes CLS, blocked by some ad blockers

### Image Optimization: next/image (built-in)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| next/image | (built-in) | Responsive images with automatic optimization | Automatic WebP/AVIF conversion, lazy loading, srcset generation, blur placeholder support. Already in use in the current page.tsx. | HIGH |

**For the Framer site images:** Configure `next.config.ts` to allow external image domains:

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.framerusercontent.com",
      },
    ],
  },
};
```

**What NOT to use:**
- Raw `<img>` tags: Loses all optimization (no lazy loading, no format conversion, no responsive sizing)
- Third-party image CDNs (Cloudinary, imgix): Over-engineering for a landing page. next/image on Vercel uses Vercel's built-in image optimization

### Contact Form Backend: Vercel Postgres + Resend

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| @vercel/postgres | ^0.10 | Store contact form submissions | Native Vercel integration, serverless-compatible connection pooling, generous free tier (256MB storage). Uses Neon Postgres under the hood. Zero-config on Vercel deployment. | MEDIUM - verify version and current Vercel offering |
| resend | ^4 | Send email notifications on form submission | Modern email API built for developers. Simple SDK, great DX, generous free tier (100 emails/day, 3000/month). React Email integration for HTML email templates. Founded by ex-Vercel team, tight Next.js integration. | MEDIUM - verify latest version |
| react-email | ^3 | Email templates in React/JSX | Build email templates as React components. Type-safe, previewable, no more HTML email spaghetti. Pairs perfectly with Resend. | MEDIUM - verify version |
| zod | ^3.23 | Form validation (server + client) | Runtime type validation for form data in the API route. Prevents malformed submissions, generates TypeScript types from schemas. The standard for Next.js form validation. | HIGH |

**Architecture for contact form:**

```
Client Form (React)
  -> Server Action or API Route (/api/contact)
    -> Validate with Zod
    -> Insert into Vercel Postgres
    -> Send notification email via Resend
    -> Return success/error
```

**Use Server Actions (not API routes)** because:
- Native Next.js App Router pattern
- Progressive enhancement (works without JS)
- Type-safe end-to-end with TypeScript
- Simpler than maintaining separate API route files

**Alternative considered: Drizzle ORM**

| Technology | Version | Purpose | Why Consider | Why Skip |
|------------|---------|---------|--------------|----------|
| drizzle-orm | ^0.36 | Type-safe SQL ORM | Lightweight, type-safe, great DX | Over-engineering for a single `contacts` table. Raw SQL via `@vercel/postgres` `sql` template literal is sufficient for one table with 5 fields. Add Drizzle later if more tables are needed. |

### Smooth Scrolling: Lenis

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| lenis | ^1.1 | Smooth scroll behavior | Lightweight smooth-scroll library that normalizes scroll across browsers. Integrates with GSAP ScrollTrigger for consistent scroll-driven animations. Used by most premium agency sites. Much better than CSS `scroll-behavior: smooth` which doesn't work with ScrollTrigger. | MEDIUM - verify latest version |

**What NOT to use:**
- `scroll-behavior: smooth` CSS: Conflicts with GSAP ScrollTrigger, doesn't provide the premium feel
- Locomotive Scroll: Largely superseded by Lenis (same creator, Lenis is the successor). Locomotive Scroll has known issues with React and is heavier.
- GSAP ScrollSmoother: Requires GSAP Club membership (paid). Lenis is free and equally capable for this use case.

### Form Handling: React Hook Form

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| react-hook-form | ^7.53 | Contact form state management | Minimal re-renders (uncontrolled inputs), built-in validation, tiny bundle size (~9KB). Integrates with Zod via `@hookform/resolvers`. The standard for React form handling. | HIGH on library, MEDIUM on exact version |
| @hookform/resolvers | ^3.9 | Zod integration for React Hook Form | Connects Zod schemas to React Hook Form validation. One-liner setup. | MEDIUM on version |

### Deployment: Vercel (as specified)

| Technology | Purpose | Why | Confidence |
|------------|---------|-----|------------|
| Vercel | Hosting and deployment | Required by project spec. Native Next.js support (Vercel built Next.js). Automatic preview deployments, edge functions, image optimization, analytics. Free tier covers a landing page. | HIGH |

**Vercel-specific features to leverage:**
- **Vercel Analytics**: Free web vitals monitoring (LCP, FID, CLS) -- add `@vercel/analytics`
- **Vercel Speed Insights**: Real user performance data -- add `@vercel/speed-insights`
- **Preview deployments**: Every PR gets a unique URL for review
- **Edge runtime**: Contact form API route can run on edge for faster response

## Supporting Libraries

| Library | Version | Purpose | When to Use | Confidence |
|---------|---------|---------|-------------|------------|
| @vercel/analytics | ^1.3 | Web analytics | Add to layout.tsx, zero-config on Vercel | MEDIUM on version |
| @vercel/speed-insights | ^1.0 | Real user monitoring | Add to layout.tsx alongside analytics | MEDIUM on version |
| clsx | ^2.1 | Conditional class merging | When building reusable components with variant classes | HIGH |
| tailwind-merge | ^2.5 | Tailwind class deduplication | Combine with clsx for robust className handling | HIGH on library, MEDIUM on version |

## Libraries NOT to Use

| Library | Why Not |
|---------|---------|
| styled-components / Emotion | Runtime CSS-in-JS hurts server component performance. Tailwind is zero-runtime. |
| Locomotive Scroll | Superseded by Lenis. Known React integration issues. |
| Anime.js | Less ecosystem support than GSAP for scroll-driven work. Smaller community. |
| Three.js / React Three Fiber | Over-engineering. This is a content/marketing page, not a 3D experience. |
| Contentful / Sanity CMS | Explicitly out of scope per PROJECT.md. Content is hardcoded. |
| NextAuth / Auth.js | No authentication needed for a landing page. |
| Prisma | Heavy ORM, cold start issues on serverless. Drizzle or raw SQL is better for this scope. |
| Axios | Unnecessary -- `fetch` is built into Next.js with caching. No HTTP client needed. |
| Moment.js | Deprecated. Use native `Intl.DateTimeFormat` if dates are needed (they aren't). |

## Installation Plan

```bash
# Animation
npm install gsap @gsap/react motion

# Smooth scrolling
npm install lenis

# Contact form backend
npm install @vercel/postgres resend zod react-hook-form @hookform/resolvers

# Email templates (dev dependency -- only used to build/preview email templates)
npm install -D react-email @react-email/components

# Vercel tooling
npm install @vercel/analytics @vercel/speed-insights

# Utility
npm install clsx tailwind-merge
```

**Total new dependencies:** 13 packages (8 runtime, 5 dev/tooling)

## Version Verification Checklist

These versions are based on training data (cutoff ~May 2025). Before installing, verify current versions:

| Package | Stated Version | Verify With |
|---------|---------------|-------------|
| gsap | ^3.12 | `npm info gsap version` |
| @gsap/react | ^2.1 | `npm info @gsap/react version` |
| motion | ^11 | `npm info motion version` |
| lenis | ^1.1 | `npm info lenis version` |
| @vercel/postgres | ^0.10 | `npm info @vercel/postgres version` |
| resend | ^4 | `npm info resend version` |
| zod | ^3.23 | `npm info zod version` |
| react-hook-form | ^7.53 | `npm info react-hook-form version` |

## Sources

- Training data (May 2025 cutoff) -- versions and recommendations should be verified
- Existing codebase analysis (package.json, layout.tsx, page.tsx)
- Project requirements (.planning/PROJECT.md)
- GSAP documentation (gsap.com) -- HIGH confidence on capabilities, MEDIUM on exact versions
- Framer Motion/Motion documentation -- HIGH confidence on rename to `motion`, MEDIUM on exact API
- Vercel documentation -- HIGH confidence on platform features, MEDIUM on exact package versions
