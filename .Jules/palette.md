## 2026-03-31 - Terminal Console Accessibility & ARIA Output Stream
**Learning:** Simulated terminal components need `role="region"` and `aria-live="polite"` on output logs so screen reader users receive output when commands run without losing input focus.
**Action:** Always wrap dynamic CLI output lists in `aria-live="polite"` and pair command input fields with explicit accessible labels and placeholders.
