## 2026-09-22 - SSR Hydration Consistency for Interactive State
**Learning:** Initializing client state with non-deterministic values like `Math.random()` or `Date.now()` causes Next.js React hydration mismatches between SSR output and initial client render.
**Action:** Always use deterministic static baseline data for initial state in client components, and update values dynamically in `useEffect` or user interactions.
