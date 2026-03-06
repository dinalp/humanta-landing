# Domain Pitfalls

**Domain:** Animation-heavy Next.js landing page (premium B2B, GSAP + Framer Motion, remote images, contact form)
**Researched:** 2026-03-07
**Overall confidence:** MEDIUM-HIGH (training data; WebSearch unavailable for verification)

---

## Critical Pitfalls

Mistakes that cause rewrites, broken production deploys, or fundamental UX failures.

### Pitfall 1: GSAP + React Hydration Mismatch

**What goes wrong:** GSAP directly manipulates the DOM. During SSR/SSG, React renders HTML on the server. When the client hydrates, GSAP animations that run before hydration completes cause React's virtual DOM to diverge from the actual DOM. This produces hydration mismatch warnings, visual flashes (FOUC), and sometimes broken layouts where elements appear in their "animated-to" state on server render then snap to their "animated-from" state on hydrate.

**Why it happens:** GSAP's `gsap.to()`, `gsap.from()`, and `gsap.fromTo()` set inline styles directly on DOM nodes. If these run during or before React hydration, React sees a DOM that doesn't match what it rendered on the server. The `gsap.from()` method is especially dangerous because it sets the element to the "from" state immediately, then animates -- so the server-rendered "final" state gets replaced with the "start" state, causing a visible flash.

**Consequences:**
- Console hydration warnings in development
- Elements flash between states on page load (server-rendered position -> GSAP start position -> animated position)
- In severe cases, React bails out of hydration and re-renders the entire component tree, nuking performance
- Scroll position can jump if element heights change during this process

**Prevention:**
1. **Always use `"use client"` for animated components** and wrap GSAP initialization in `useLayoutEffect` (not `useEffect`) to ensure DOM is ready before GSAP touches it
2. **Use GSAP's `gsap.context()`** (introduced in GSAP 3.11+) to scope all animations to a component ref. This is the official React integration pattern:
   ```typescript
   const container = useRef<HTMLDivElement>(null);
   useLayoutEffect(() => {
     const ctx = gsap.context(() => {
       // All animations scoped to container
       gsap.from(".hero-text", { opacity: 0, y: 50 });
     }, container);
     return () => ctx.revert(); // Clean up on unmount
   }, []);
   ```
3. **Use `gsap.set()` in CSS or initial inline styles** to define the pre-animation state, so SSR and client agree on initial appearance. Alternatively, use CSS `visibility: hidden` and let GSAP reveal elements, preventing any flash.
4. **Never use `gsap.from()` without setting initial state in CSS first.** Use `gsap.fromTo()` instead, which is deterministic about both start and end states.
5. **Install `@gsap/react` package** -- GSAP provides an official `useGSAP` hook that wraps `useLayoutEffect` with proper context cleanup. Prefer this over manual `useLayoutEffect`.

**Detection:**
- Hydration mismatch warnings in browser console during development
- Elements "flashing" or "jumping" on initial page load
- Different appearance between SSR preview (view-source) and hydrated page

**Phase relevance:** Phase 1 (foundation/hero) -- must establish the GSAP+React pattern correctly from the first animated component. Getting this wrong early means retrofitting every animated section later.

**Confidence:** HIGH -- this is extremely well-documented and the single most common GSAP+Next.js mistake.

---

### Pitfall 2: Framer Motion + GSAP Conflicts

**What goes wrong:** Using both Framer Motion and GSAP on the same elements, or even in the same component tree without clear boundaries, causes animation conflicts. Both libraries try to control the same CSS properties (transform, opacity) simultaneously, resulting in jittering, overwritten animations, or animations that "fight" each other.

**Why it happens:** Framer Motion uses its own animation loop and manages transforms via inline styles. GSAP also sets inline styles. When both target the same element, whichever runs last "wins" on each frame, causing visual jitter. Additionally, Framer Motion's `AnimatePresence` exit animations can conflict with GSAP ScrollTrigger teardown.

**Consequences:**
- Animations stutter or appear to "fight" (element oscillates between two positions)
- Performance degrades because two animation runtimes are calculating transforms per frame
- Exit animations break when component unmounts
- Debugging becomes extremely difficult because you can't tell which library is controlling an element

**Prevention:**
1. **Establish clear library boundaries by component type:**
   - **GSAP:** Scroll-driven animations (ScrollTrigger), complex timelines, parallax effects, scroll-linked section transitions, pinning sections
   - **Framer Motion:** Micro-interactions (button hovers, accordion open/close, tab transitions), page transitions, presence-based enter/exit animations, simple gesture responses
2. **Never put both on the same DOM element.** If a section has GSAP scroll animations AND a Framer Motion button hover, the GSAP animation goes on the section wrapper, the Framer Motion animation goes on the button -- never overlapping.
3. **Document the boundary rule** in a code comment or team convention file so it stays consistent across all components.
4. **Consider using only GSAP** if the animations are predominantly scroll-driven. GSAP can handle micro-interactions too. Reducing to one library eliminates this entire pitfall category. Given this project's emphasis on scroll-driven animations, GSAP-only is a viable approach.

**Detection:**
- Any element with both `motion.div` wrapper AND a GSAP tween targeting it
- Jittery animations that work individually but break when combined
- Performance profiler showing double animation frame calculations

**Phase relevance:** Must be decided in Phase 1 architecture. The library boundary convention needs to be established before any animation code is written.

**Confidence:** HIGH -- well-known conflict pattern.

---

### Pitfall 3: Scroll Animation Jank on Mobile (especially iOS Safari)

**What goes wrong:** Smooth scroll-triggered animations on desktop become janky, stuttering, or completely broken on mobile devices. iOS Safari is the worst offender. Animations tied to scroll position visually lag behind the user's finger, feel unresponsive, or cause the page to feel "heavy."

**Why it happens:** Multiple compounding factors:
- **iOS Safari's address bar:** Safari's collapsing/expanding URL bar triggers viewport resize events during scroll, which GSAP ScrollTrigger interprets as layout changes, recalculating positions and causing visual jumps
- **Passive scroll listeners:** Mobile browsers use passive scroll event listeners by default for performance. GSAP ScrollTrigger needs to intercept scroll events, and passive listeners can cause timing mismatches
- **Lower GPU budget:** Mobile GPUs cannot composite as many layers simultaneously. Desktop-appropriate effects (multiple parallax layers, large blur effects, simultaneous transforms on 10+ elements) overwhelm mobile GPUs
- **Touch scroll momentum:** iOS's rubber-banding and momentum scroll don't fire scroll events at the same rate as actual scrolling, causing gaps in animation progress
- **Large background blur elements:** The `blur-[128px]` and `blur-[150px]` effects in the current codebase are particularly expensive on mobile GPUs

**Consequences:**
- Animations stutter and feel cheap (destroying the "premium" brand feel)
- Page scrolling itself becomes sluggish
- Battery drain on mobile devices
- Safari address bar transitions cause scroll position jumps mid-animation
- Users on older phones experience significant frame drops

**Prevention:**
1. **Use `will-change: transform` on animated elements** (via Tailwind `will-change-transform`) to promote them to GPU-composited layers. But only on elements that actually animate -- overuse causes memory pressure.
2. **Reduce animation complexity on mobile:**
   ```typescript
   ScrollTrigger.config({
     ignoreMobileResize: true // Prevents Safari address bar recalculation
   });

   // Use matchMedia for responsive animations
   const mm = gsap.matchMedia();
   mm.add("(min-width: 768px)", () => {
     // Full parallax, staggered reveals, complex timelines
   });
   mm.add("(max-width: 767px)", () => {
     // Simpler fade-ins, no parallax, fewer animated elements
   });
   ```
3. **Replace CSS `blur()` with pre-rendered blurred images on mobile,** or reduce blur radius significantly. The current `blur-[128px]` on multiple gradient orbs will cause frame drops on most phones.
4. **Only animate `transform` and `opacity`** -- these are the only CSS properties that can be GPU-composited without triggering layout/paint. Never animate width, height, top, left, margin, padding, or border on scroll.
5. **Use `ScrollTrigger.normalizeScroll(true)`** on mobile to smooth out touch scroll inconsistencies. This creates a more predictable scroll position for animations.
6. **Test on actual devices.** Chrome DevTools throttling does not replicate iOS Safari scroll behavior. Test on a real iPhone with Safari.

**Detection:**
- Open Chrome DevTools Performance tab, enable "CPU 4x slowdown," scroll the page. If frames drop below 60fps, mobile will be worse.
- Any CSS property being animated that is not `transform` or `opacity`
- More than 3-4 simultaneously animating elements visible in viewport
- Blur effects larger than 20px on elements that overlap animated content

**Phase relevance:** Every phase that adds animations. Must be validated after each section is built, not deferred to a "polish" phase. The `ScrollTrigger.config({ ignoreMobileResize: true })` call should be in the very first ScrollTrigger setup.

**Confidence:** HIGH -- extensively documented across GSAP forums, StackOverflow, and real-world projects.

---

### Pitfall 4: Remote Image Loading Performance and Next.js Image Configuration

**What goes wrong:** The project plans to source images from the live Framer site (humanta.co). Using `next/image` with remote images requires explicit domain configuration, and getting it wrong causes broken images in production, massive Cumulative Layout Shift (CLS), or slow load times that kill the Lighthouse 90+ target.

**Why it happens:**
- `next/image` requires `remotePatterns` in `next.config.ts` for security -- without it, remote images fail silently or throw build errors
- Framer-hosted images may be served from CDN domains that differ from `humanta.co` (often `framerusercontent.com` or similar), requiring investigation of actual image URLs
- Without explicit `width`/`height` or `fill` prop, images cause layout shift as they load
- Remote images bypass Next.js's build-time optimization -- they're optimized on-demand, meaning first loads are slow
- Large hero/background images can be 2-5MB unoptimized from Framer's CDN

**Consequences:**
- Broken images in production (missing `remotePatterns` config)
- Lighthouse CLS score tanks if images don't have dimensions reserved
- First Contentful Paint (FCP) and Largest Contentful Paint (LCP) suffer with unoptimized remote images
- Framer may change CDN URLs or add hotlink protection, breaking all images without warning

**Prevention:**
1. **Investigate actual Framer image URLs first.** Before coding, visit humanta.co, inspect the images, note the actual CDN domains. Configure all of them:
   ```typescript
   // next.config.ts
   const nextConfig: NextConfig = {
     images: {
       remotePatterns: [
         { protocol: 'https', hostname: 'framerusercontent.com' },
         { protocol: 'https', hostname: '*.framerusercontent.com' },
         // Add actual domains found during inspection
       ],
     },
   };
   ```
2. **Download and self-host critical images** (hero background, CTA banner) rather than relying on remote fetching. These are LCP-critical and need to load fast. Store them in `/public/images/` and use local paths.
3. **Always use `priority` prop on above-the-fold images** (hero section). This triggers preloading:
   ```tsx
   <Image src="/images/hero.jpg" alt="..." fill priority />
   ```
4. **Use `placeholder="blur"` with `blurDataURL`** for a polished loading experience that prevents layout shift and feels premium.
5. **Set explicit `sizes` prop** to prevent Next.js from generating unnecessarily large images:
   ```tsx
   <Image src="..." fill sizes="(max-width: 768px) 100vw, 50vw" />
   ```
6. **Plan to migrate off remote images quickly.** Relying on another service's CDN is a ticking time bomb. Download all images in Phase 1 and self-host from the start if possible.

**Detection:**
- Run `next build` -- Next.js will error if `remotePatterns` is missing for referenced domains
- Lighthouse audit will flag CLS and LCP issues
- Images appearing as broken icons in production but working in development (some dev modes are more permissive)

**Phase relevance:** Phase 1 (foundation). Image configuration must be correct before any section with images is built. Hero image is LCP-critical and directly impacts Lighthouse score.

**Confidence:** HIGH -- Next.js `remotePatterns` behavior is well-documented and the project explicitly plans remote images.

---

### Pitfall 5: Layout Shift from Multiple Web Fonts (Inter, Manrope, Poppins)

**What goes wrong:** Loading three Google Fonts families (Inter, Manrope, Poppins) causes visible text reflow -- the "Flash of Unstyled Text" (FOUT) or "Flash of Invisible Text" (FOIT). Text renders in a fallback system font, then snaps to the custom font with different metrics, causing layout shift across the entire page. With three fonts, this can happen three separate times.

**Why it happens:**
- Each font family requires downloading multiple weight files. Poppins with weights [300,400,500,600,700] alone is 5 font files. Three families with multiple weights could mean 15+ font files.
- `next/font/google` handles optimization well, but only for fonts actually imported and configured. The current code only imports Poppins -- Inter and Manrope from the requirements are missing.
- Even with `next/font`, the `font-display: swap` behavior (which Next.js uses by default) means text is visible in fallback font first, then reflows when custom font loads.
- Different fonts have different x-heights, letter-spacing, and character widths. Swapping from system fallback to a custom font changes text line counts, element heights, and layout.

**Consequences:**
- CLS score exceeds Lighthouse thresholds (should be under 0.1, font swap can cause 0.15+)
- Text visibly "jumps" or reflows, especially in headlines where the font size amplifies metric differences
- Multiple font families mean multiple potential reflows
- Page feels janky and unprofessional during load -- the opposite of "premium"

**Prevention:**
1. **Minimize font families.** Three families is excessive for a landing page. Recommend using at most two: one for headings (Manrope or Poppins), one for body (Inter). Two families with 3-4 weights each is already 6-8 files.
2. **Use `next/font/google` for ALL fonts** (which is already started for Poppins). It automatically self-hosts, adds `font-display: swap`, and generates `@font-face` declarations. Configure all fonts in `layout.tsx`:
   ```typescript
   const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
   const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });
   const poppins = Poppins({
     subsets: ['latin'],
     weight: ['400', '600', '700'], // Only weights actually used
     variable: '--font-poppins',
   });
   ```
3. **Limit font weights to only what's used.** The current code imports Poppins 300-700 (5 weights). Audit the design and include only weights that appear in the actual UI. Each removed weight saves ~20-40KB.
4. **Use `adjustFontFallback: true`** (default in `next/font`) which automatically generates a CSS `size-adjust` rule to match the fallback font's metrics to the custom font, reducing reflow.
5. **Preload the most critical font** (likely the heading font) by ensuring it's the first `next/font` import. Next.js will add `<link rel="preload">` for it.
6. **Set initial styles to match custom font metrics** using CSS `size-adjust`, `ascent-override`, `descent-override` on the fallback font -- `next/font` does this automatically, but verify it's working by checking the generated CSS.

**Detection:**
- Load the page with "Slow 3G" network throttle in DevTools. Watch for text reflow.
- Lighthouse CLS score above 0.1
- Run `next build` and check the font optimization output -- it should list preloaded fonts
- Check the generated HTML source for `<link rel="preload" as="font">` tags

**Phase relevance:** Phase 1 (layout/typography setup). Font configuration must be finalized before sections are built, because font metrics affect spacing, line heights, and component dimensions.

**Confidence:** HIGH -- this is a well-understood web performance issue and the project has three font families in its spec.

---

## Moderate Pitfalls

### Pitfall 6: Contact Form Security -- Spam and Abuse

**What goes wrong:** A publicly accessible contact form with database storage and email notifications becomes a spam target within days of deployment. Bots submit hundreds or thousands of fake entries, filling the database and triggering email notifications that could get the sending domain flagged.

**Prevention:**
1. **Implement rate limiting on the API route.** Use Vercel's `@vercel/edge` or a simple in-memory rate limiter (acceptable for low-traffic B2B sites):
   ```typescript
   // Simple approach: rate limit by IP in the API route
   import { Ratelimit } from "@upstash/ratelimit";
   import { Redis } from "@upstash/redis";
   ```
   Alternatively, for a simpler setup without external dependencies, use Vercel KV or a lightweight approach.
2. **Add a honeypot field** -- a hidden form field that humans don't see but bots fill in. If it has a value, reject the submission. This catches most basic bots:
   ```tsx
   <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
   ```
3. **Server-side validation is mandatory.** Never trust client-side validation alone. Validate email format, phone format, string lengths, and sanitize all inputs on the server:
   ```typescript
   // In API route
   import { z } from 'zod';
   const contactSchema = z.object({
     name: z.string().min(1).max(200),
     email: z.string().email().max(300),
     phone: z.string().max(30).optional(),
     employees: z.enum(['1-50', '51-200', '201-500', '500+']),
     notes: z.string().max(2000).optional(),
   });
   ```
4. **Consider Cloudflare Turnstile** (free, privacy-friendly reCAPTCHA alternative) if honeypot alone isn't sufficient. Avoid Google reCAPTCHA -- it's heavy (adds ~300KB of JavaScript) and has privacy concerns that conflict with a premium brand.
5. **Sanitize before database insertion** to prevent SQL injection (use parameterized queries -- Vercel Postgres with `@vercel/postgres` does this by default with `sql` template literals).
6. **Add CSRF protection** -- Next.js API routes don't have built-in CSRF protection. Use a token-based approach or check the `Origin`/`Referer` header.

**Detection:**
- Sudden spike in database entries with gibberish or patterned data
- Resend/email service flagging the domain for high volume
- Form submissions from the same IP address in rapid succession

**Phase relevance:** The contact form phase. Security must be built into the form from the start, not bolted on after spam arrives.

**Confidence:** HIGH -- standard web security knowledge.

---

### Pitfall 7: Vercel Deployment Gotchas with Animation-Heavy Sites

**What goes wrong:** The site works perfectly in local development but exhibits issues on Vercel: images fail to load, environment variables are missing, the site feels slower due to serverless cold starts on API routes, or SSR behavior differs from local `next dev`.

**Prevention:**
1. **Environment variables:** Vercel requires variables to be set in the Vercel dashboard (Settings > Environment Variables), not just in `.env.local`. The contact form's database URL, Resend API key, etc. must all be configured in Vercel. Variables prefixed with `NEXT_PUBLIC_` are exposed to the client -- never prefix secret keys this way.
2. **Image optimization on Vercel:** Vercel has its own image optimization layer. Remote images are optimized on-demand, which means the first request for each image size is slow (100-300ms extra). Use `next/image` `priority` on LCP images to trigger preloading, and consider self-hosting critical images.
3. **Serverless function cold starts:** The contact form API route runs as a serverless function. First invocation after idle can take 1-3 seconds. For a contact form this is acceptable (users expect a brief delay on submit), but display a loading spinner during submission to avoid users double-clicking.
4. **Build output size:** GSAP is ~60KB gzipped. Including both GSAP (with ScrollTrigger) and Framer Motion (~30KB gzipped) adds ~90KB to the client bundle. Vercel Edge Functions have a 4MB size limit -- not an issue here, but standard serverless functions have a 50MB limit including node_modules. Keep API route dependencies minimal.
5. **Preview deployments with different URLs:** Vercel creates preview deploys for each push. If the contact form has hardcoded URLs or CORS settings, they may break on preview URLs. Use `process.env.VERCEL_URL` or relative URLs.
6. **`next.config.ts` differences:** Ensure `output` is not set to `'export'` (static export) -- this project needs serverless for the contact form API route. The default output mode is correct for Vercel.
7. **Font files:** `next/font/google` automatically self-hosts font files during build. On Vercel, these are served from the same domain, which is good for performance. No special configuration needed, but verify fonts work in a Vercel preview deploy.

**Detection:**
- Test the Vercel preview deploy thoroughly before going live
- Check Vercel function logs (Vercel dashboard > Deployments > Functions) for API route errors
- Run Lighthouse on the Vercel preview URL, not just localhost

**Phase relevance:** Applies to every phase. Set up Vercel project and do a test deploy in Phase 1 to catch configuration issues early.

**Confidence:** HIGH -- standard Vercel deployment knowledge.

---

### Pitfall 8: Responsive Animation Breakpoints Not Matching CSS Breakpoints

**What goes wrong:** GSAP `matchMedia` breakpoints use JavaScript pixel values while Tailwind CSS uses its own breakpoint system. If they don't match exactly, animations activate/deactivate at different widths than layout changes, causing visual mismatches. For example, a sidebar layout might switch to stacked at 768px (Tailwind `md:`), but the animation still expects side-by-side layout until 800px.

**Prevention:**
1. **Use Tailwind's exact breakpoint values in GSAP matchMedia:**
   ```typescript
   // Tailwind defaults: sm=640, md=768, lg=1024, xl=1280, 2xl=1536
   const mm = gsap.matchMedia();
   mm.add("(min-width: 768px)", () => {
     // Desktop/tablet animations matching Tailwind md:
   });
   mm.add("(max-width: 767px)", () => {
     // Mobile animations matching below Tailwind md:
   });
   ```
2. **Define breakpoint constants** shared between GSAP and CSS usage:
   ```typescript
   export const BREAKPOINTS = {
     sm: 640, md: 768, lg: 1024, xl: 1280
   } as const;
   ```
3. **Test at exact breakpoint boundaries** (767px, 768px, 769px) during development to catch mismatches.

**Detection:**
- Resize browser slowly across breakpoints and watch for layout/animation mismatches
- Elements animating to positions that don't match their CSS layout
- Animations triggering on mobile that are designed for desktop layout

**Phase relevance:** Every phase with animations. Establish the shared breakpoint pattern in Phase 1.

**Confidence:** HIGH -- common responsive animation mistake.

---

### Pitfall 9: Accessibility Violations with Heavy Animations

**What goes wrong:** Users with vestibular disorders, motion sensitivity, or epilepsy are harmed by animations that cannot be disabled. This is both a UX failure and, for B2B sites targeting HR teams, potentially a legal compliance issue (WCAG 2.1 Level AA requires respecting `prefers-reduced-motion`).

**Prevention:**
1. **Respect `prefers-reduced-motion` at the OS level.** Users who enable "Reduce Motion" in their OS settings must get a version of the site with minimal or no animation:
   ```typescript
   // GSAP approach
   const mm = gsap.matchMedia();
   mm.add("(prefers-reduced-motion: no-preference)", () => {
     // Full animations here
   });
   mm.add("(prefers-reduced-motion: reduce)", () => {
     // No animations, or very subtle opacity fades only
     // Elements should still appear (just without motion)
   });
   ```
2. **Framer Motion has built-in support** via the `useReducedMotion()` hook or the `layout` prop's automatic motion reduction. But if using GSAP for scroll animations, you must handle it manually as shown above.
3. **Ensure all scroll-triggered content is visible without animation.** If content relies on being "revealed" by a scroll animation, users with reduced motion must still see that content. Use `gsap.set()` to show elements immediately when reduced motion is preferred.
4. **No auto-playing video or rapidly flashing content.** The current design doesn't include this, but avoid adding it.
5. **Keyboard navigation must work.** Scroll-triggered sections that "pin" or hijack scroll can break keyboard navigation. Ensure Tab key still moves through interactive elements normally.
6. **Skip animation link:** Consider a small "Skip animations" toggle in the footer or nav for users who want to disable animations regardless of OS settings.

**Detection:**
- Enable "Reduce Motion" in macOS (System Settings > Accessibility > Display) and test the entire page
- Use Lighthouse accessibility audit
- Test keyboard navigation (Tab through all interactive elements)
- Check that all content is accessible without scrolling through animations

**Phase relevance:** Must be built into the animation foundation in Phase 1. Retrofitting `prefers-reduced-motion` support across all sections is much harder than building it in from the start.

**Confidence:** HIGH -- WCAG 2.1 requirements are well-established.

---

## Minor Pitfalls

### Pitfall 10: GSAP ScrollTrigger Cleanup on Route Navigation

**What goes wrong:** When navigating from the landing page to the /contact page (or back), GSAP ScrollTrigger instances from the previous page persist, causing memory leaks, console errors, and phantom scroll behaviors on the new page.

**Prevention:**
- Use `gsap.context()` with cleanup in every animated component:
  ```typescript
  useLayoutEffect(() => {
    const ctx = gsap.context(() => { /* animations */ }, containerRef);
    return () => ctx.revert();
  }, []);
  ```
- If using `@gsap/react`'s `useGSAP` hook, cleanup is automatic.
- Never create `ScrollTrigger` instances outside of a component lifecycle.

**Phase relevance:** Phase 1, when establishing the animation pattern.

**Confidence:** HIGH.

---

### Pitfall 11: Smooth Scroll Navigation Conflicts with ScrollTrigger

**What goes wrong:** The project requires "smooth scroll navigation between sections" (clicking nav links scrolls to sections). If smooth scrolling is implemented via CSS `scroll-behavior: smooth` or a library like Lenis/Locomotive, it can conflict with GSAP ScrollTrigger's scroll position calculations. ScrollTrigger expects native scroll behavior and can misfire when smooth scroll libraries intercept scroll events.

**Prevention:**
1. **Use GSAP's own scroll-to solution** instead of CSS smooth scroll or third-party libraries:
   ```typescript
   import { ScrollToPlugin } from "gsap/ScrollToPlugin";
   gsap.registerPlugin(ScrollToPlugin);

   const scrollToSection = (id: string) => {
     gsap.to(window, {
       duration: 1,
       scrollTo: { y: `#${id}`, offsetY: 80 }, // 80px for sticky nav
       ease: "power2.inOut"
     });
   };
   ```
2. **If using Lenis for buttery smooth scrolling**, integrate it with ScrollTrigger using the official Lenis-ScrollTrigger integration. Do not use both independently.
3. **Account for the sticky nav offset** (currently ~72px based on the nav padding) in all scroll-to targets, or content will be hidden behind the nav.

**Phase relevance:** Phase 1, when implementing navigation and scroll behavior.

**Confidence:** HIGH.

---

### Pitfall 12: Entire Page as "use client" Killing SSR Benefits

**What goes wrong:** The current `page.tsx` is marked `"use client"`, meaning the entire page is client-rendered. This eliminates Next.js's SSR benefits: worse SEO, slower First Contentful Paint, no static generation possible, and a larger JavaScript bundle since all components are hydrated.

**Prevention:**
1. **Split into server and client components.** The page itself (`page.tsx`) should be a Server Component that renders static HTML. Only individual animated sections need `"use client"`:
   ```
   page.tsx (Server Component - static HTML)
   +-- HeroSection.tsx ("use client" - GSAP animations)
   +-- StorySection.tsx ("use client" - scroll animations)
   +-- HowItWorks.tsx (Server Component - no animation needed)
   +-- PricingSection.tsx (Server Component - static content)
   +-- FAQSection.tsx ("use client" - accordion interaction)
   +-- ContactForm.tsx ("use client" - form state)
   ```
2. **Static content sections that only need CSS transitions** (hover effects, simple opacity) can remain as Server Components using Tailwind's built-in animation classes.
3. **This directly impacts Lighthouse scores.** Server-rendered HTML is available immediately, while client-rendered content requires JavaScript download + parse + execute before it appears.

**Phase relevance:** Phase 1 (component architecture). Must be decided before building sections.

**Confidence:** HIGH.

---

### Pitfall 13: Background Blur Performance Budget

**What goes wrong:** The current codebase has multiple large `blur()` CSS effects (`blur-[128px]`, `blur-[150px]`, `blur-[200px]`) on gradient orbs. These are extremely expensive to render, especially on mobile. Each blurred element creates a compositing layer that the GPU must process. With 5+ blur elements and scroll animations running simultaneously, frame rates drop below 30fps on mid-range phones.

**Prevention:**
1. **Use pre-rendered gradient images** instead of runtime CSS blur. Create PNG/WebP images of the blurred gradients and use them as static backgrounds. This costs zero GPU at runtime.
2. **If keeping CSS blur, reduce to maximum 2 blur elements visible in any viewport** at a time. Use `loading="lazy"` logic to only render blur elements when their section is near the viewport.
3. **Reduce blur radius on mobile** via media queries or remove blur entirely on mobile, replacing with solid gradient backgrounds.
4. **Never animate blurred elements.** If a background orb with `blur-[128px]` also has a GSAP animation moving it, the GPU must re-render the blur on every frame. Keep blurred elements static.

**Phase relevance:** Phase 1 (hero section already has 3 large blur elements). Fix before adding more.

**Confidence:** HIGH.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Foundation / Hero | GSAP hydration mismatch (#1), Blur performance (#13), Entire page as client component (#12) | Establish `gsap.context()` + `useGSAP` pattern, split into server/client components, pre-render gradients |
| Scroll Animations | Mobile jank (#3), Responsive breakpoints (#8), Smooth scroll conflicts (#11) | Use `ScrollTrigger.config({ ignoreMobileResize: true })`, match Tailwind breakpoints, use GSAP ScrollToPlugin |
| Story/Content Sections | Framer Motion + GSAP conflict (#2), Accessibility (#9) | Define library boundaries, implement `prefers-reduced-motion` from day one |
| Images / Visual Assets | Remote image loading (#4), CLS from images | Self-host critical images, configure `remotePatterns`, use `priority` and `sizes` props |
| Typography | Font layout shift (#5) | Minimize to 2 font families, limit weights, verify `next/font` optimization |
| Contact Form | Spam (#6), Missing validation, No CSRF | Honeypot + rate limiting + server-side Zod validation + CSRF token |
| Deployment | Vercel env vars (#7), Preview URL issues, Cold starts | Set up Vercel project early, test preview deploys, use relative API URLs |
| Cleanup / Polish | ScrollTrigger memory leaks (#10) | Audit all components for proper `gsap.context().revert()` cleanup |

---

## Sources

- GSAP official React documentation and `@gsap/react` package (gsap.com/react) -- HIGH confidence
- Next.js `next/font` and `next/image` documentation (nextjs.org/docs) -- HIGH confidence
- GSAP ScrollTrigger documentation on `ignoreMobileResize`, `normalizeScroll`, `matchMedia` -- HIGH confidence
- WCAG 2.1 `prefers-reduced-motion` media query specification -- HIGH confidence
- Vercel deployment documentation (vercel.com/docs) -- HIGH confidence
- Training data on web performance, CSS compositing, and contact form security -- MEDIUM confidence (standard practices, but not verified against latest versions for this write-up)

**Note:** WebSearch was unavailable during this research. All findings are based on training data and domain expertise. The pitfalls documented here are well-established patterns in the GSAP+React+Next.js ecosystem, but specific version behaviors (e.g., GSAP 3.13+ changes, Next.js 15 specifics) should be verified against current documentation during implementation.
