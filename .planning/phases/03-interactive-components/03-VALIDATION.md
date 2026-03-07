---
phase: 3
slug: interactive-components
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-07
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — all requirements are visual/interaction-based |
| **Config file** | none |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build` + manual browser verification
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | NAV-02 | manual | `npm run build` | N/A | ⬜ pending |
| 03-01-02 | 01 | 1 | NAV-04 | manual | `npm run build` | N/A | ⬜ pending |
| 03-01-03 | 01 | 1 | FAQ-02 | manual | `npm run build` | N/A | ⬜ pending |
| 03-02-01 | 02 | 2 | HIW-02 | manual | `npm run build` | N/A | ⬜ pending |
| 03-02-02 | 02 | 2 | GLOBAL-01 | manual | `npm run build` | N/A | ⬜ pending |
| 03-02-03 | 02 | 2 | GLOBAL-04 | manual | `npm run build` | N/A | ⬜ pending |
| 03-02-04 | 02 | 2 | GLOBAL-05 | manual | `npm run build` | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements. `npm run build` serves as automated smoke test. All 7 requirements are visual/interaction-based and require manual browser verification.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Mobile menu opens/closes with animation | NAV-02 | Visual interaction — animation quality requires human judgment | Open mobile viewport (375px), tap hamburger, verify slide-in animation |
| Active nav link updates on scroll | NAV-04 | Scroll-triggered DOM update — needs real browser scroll events | Scroll through sections, verify active link highlights correctly |
| Tab stepper switches content with animation | HIW-02 | Animated tab transitions — visual quality check | Click each step tab, verify content switches with animation |
| Accordion expands/collapses smoothly | FAQ-02 | Height animation — smoothness requires visual verification | Click FAQ items, verify smooth expand/collapse |
| Floating CTA visible on all pages | GLOBAL-01 | Fixed positioning — needs viewport scroll verification | Scroll entire page, verify button stays bottom-right |
| Hover micro-interactions on buttons | GLOBAL-04 | Hover states — requires mouse interaction | Hover over buttons/links, verify scale/glow effects |
| Reduced motion disables animations | GLOBAL-05 | Accessibility — requires OS/browser setting toggle | Enable reduced-motion in DevTools, verify animations disabled |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
