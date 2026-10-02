## 2026-10-02 - Interactive Financial Charts A11y
**Learning:** High-frequency canvas or SVG charts with icon-only controls need explicit `role="img"` with dynamic `aria-label` updates on price changes, alongside `title` and `aria-label` on playback buttons and explicit label associations (`htmlFor`/`id`) for range sliders.
**Action:** Always verify icon-only playback buttons and slider controls in dashboard widgets have explicit ARIA labels and focus-visible rings for keyboard users.
