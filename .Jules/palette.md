## 2026-03-31 - Deterministic Initial State for Interactive Simulation Components
**Learning:** Initializing simulated feed state with `Math.random()` or `Date.now()` inside a component `useState` callback causes SSR hydration mismatch errors in Next.js App Router.
**Action:** Use a deterministic baseline calculation for initial component state, and update dynamic values via `useEffect` / interval callbacks after mount.
