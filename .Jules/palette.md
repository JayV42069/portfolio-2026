## 2026-10-17 - Deriving State in High-Frequency Interactive Widgets
**Learning:** In React 19 / Next.js, syncing state inside `useEffect` triggers `react-hooks/set-state-in-effect` errors and causes cascading renders. For real-time financial/trading interfaces, deriving calculation values (such as PnL) directly during render eliminates extraneous render cycles and ensures instant, smooth keyboard & interactive UI feedback.
**Action:** Always derive calculated values directly on render instead of dispatching `setState` inside `useEffect`.
