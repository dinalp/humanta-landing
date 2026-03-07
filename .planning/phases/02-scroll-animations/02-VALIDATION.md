---
phase: 2
slug: scroll-animations
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-07
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual visual testing + build verification |
| **Config file** | none — no automated test framework needed |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run dev` (visual check) |
| **Estimated runtime** | ~15 seconds (build) |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build` + manual visual check on `npm run dev`
- **Before `/gsd:verify-work`:** Full visual walkthrough on desktop + mobile viewport
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | GLOBAL-03 | build | `npm run build` | N/A | ⬜ pending |
| 02-01-02 | 01 | 1 | HERO-02 | manual-only | Visual: scroll hero on desktop, verify BG moves slower | N/A | ⬜ pending |
| 02-01-03 | 01 | 1 | HERO-03 | manual-only | Visual: page load, verify word-by-word stagger | N/A | ⬜ pending |
| 02-02-01 | 02 | 1 | STORY-02 | manual-only | Visual: scroll through story section on desktop | N/A | ⬜ pending |
| 02-02-02 | 02 | 1 | STORY-03 | manual-only | Visual: verify images reveal with clip-path during scroll | N/A | ⬜ pending |
| 02-02-03 | 02 | 1 | GLOBAL-02 | manual-only | Visual: scroll page, verify sections fade/slide in | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. Animation testing is manual/visual; `npm run build` validates TypeScript correctness and import resolution.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Parallax on hero background (desktop) | HERO-02 | Visual/perceptual scroll animation | Scroll hero on desktop, verify BG moves slower than content |
| Staggered text reveal on headline | HERO-03 | Visual/perceptual page load animation | Reload page, verify word-by-word stagger then subtext then CTA |
| Scroll-pinned panel transitions | STORY-02 | Complex scroll-linked pin behavior | Scroll through story section on desktop, verify section pins and panels cross-fade |
| Clip-path image reveals | STORY-03 | Visual clip-path animation | Verify images reveal with expanding clip-path during story scroll |
| Scroll-triggered section reveals | GLOBAL-02 | Visual scroll-triggered entrances | Scroll page, verify sections fade/slide in at ~80% viewport |
| Smooth scroll momentum (Lenis) | GLOBAL-03 | Perceptual scroll feel | Scroll page, verify buttery-smooth momentum without jank |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
