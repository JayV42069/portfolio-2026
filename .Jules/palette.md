# Palette's Journal

Critical UX and accessibility learnings only.

## 2026-05-20 - High-Frequency Trading Desk Controls Accessibility
**Learning:** Real-time data visualization controls (pause/play, reset, slider) frequently lack accessible names and keyboard focus affordances, preventing screen reader users and keyboard navigators from understanding or managing dynamic feeds.
**Action:** Pair icon-only controls with descriptive dynamic `aria-label` and `title` attributes, associate range inputs with `<label htmlFor="...">` and `aria-label`, and add explicit `focus-visible:ring-2` styles.
