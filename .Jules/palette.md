## 2026-03-30 - Live Data Calculations & Dynamic Component Accessibility
**Learning:** In interactive Next.js client components featuring live charts or grid tools, updating state inside `useEffect` causes ESLint cascading render errors. Additionally, screen readers need descriptive dynamic labels for state-dependent grid slots and live log containers (`role="log"`, `aria-live="polite"`).
**Action:** Use `useMemo` for derived states like PnL, set deterministic baseline state initializers for live components, and apply detailed dynamic `aria-label`s to interactive slots.
