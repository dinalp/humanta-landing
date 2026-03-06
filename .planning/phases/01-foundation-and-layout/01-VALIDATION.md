---
phase: 1
slug: foundation-and-layout
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-07
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None (build verification only) |
| **Config file** | none — Wave 0 not needed |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run lint` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run lint`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | NAV-01 | smoke | `npm run build` | N/A | ⬜ pending |
| 01-01-02 | 01 | 1 | NAV-03 | manual | Manual browser test | N/A | ⬜ pending |
| 01-01-03 | 01 | 1 | NAV-05 | manual | Manual browser test | N/A | ⬜ pending |
| 01-01-04 | 01 | 1 | HERO-01 | smoke | `npm run build` | N/A | ⬜ pending |
| 01-02-01 | 02 | 1 | STORY-01 | smoke | `npm run build` | N/A | ⬜ pending |
| 01-02-02 | 02 | 1 | STORY-04 | smoke | `npm run build` | N/A | ⬜ pending |
| 01-02-03 | 02 | 1 | HIW-01 | smoke | `npm run build` | N/A | ⬜ pending |
| 01-02-04 | 02 | 1 | PRICE-01 | smoke | `npm run build` | N/A | ⬜ pending |
| 01-02-05 | 02 | 1 | PRICE-02 | smoke | `npm run build` | N/A | ⬜ pending |
| 01-03-01 | 03 | 1 | FAQ-01 | smoke | `npm run build` | N/A | ⬜ pending |
| 01-03-02 | 03 | 1 | CTA-01 | smoke | `npm run build` | N/A | ⬜ pending |
| 01-03-03 | 03 | 1 | FOOT-01 | smoke | `npm run build` | N/A | ⬜ pending |
| 01-03-04 | 03 | 1 | GLOBAL-06 | manual | Manual browser resize | N/A | ⬜ pending |
| 01-03-05 | 03 | 1 | GLOBAL-09 | smoke | `npm run build` | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. This is a static layout phase — `npm run build` provides compilation verification, and visual checks are manual.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Smooth scroll to sections | NAV-03 | CSS scroll-behavior, no JS to test | Click nav links, verify scroll to correct section |
| Nav transparent-to-solid | NAV-05 | Scroll-dependent visual state | Load page, scroll down, verify nav background changes |
| Responsive layouts | GLOBAL-06 | Visual layout verification | Resize browser to 375px, 768px, 1280px — check all sections |
| Visual design fidelity | All | Premium look requires human judgment | Compare rendered page against humanta.co |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
