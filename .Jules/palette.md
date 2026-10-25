## 2026-03-31 - Icon-Only Controls Accessibility in High-Density Dashboards
**Learning:** Compact icon-only controls (e.g. simulation play/pause, refresh, leverage sliders) in dark-mode financial dashboards lack accessible names and focus rings by default, making them invisible to screen readers and keyboard navigation.
**Action:** Always provide explicit `aria-label`, tooltip `title` attributes, proper `label` associations, and `focus-visible:ring-2` styling on custom dashboard triggers.
