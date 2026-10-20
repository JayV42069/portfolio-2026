## 2026-10-20 - Dark Theme Console Control Accessibility
**Learning:** Terminal and live trading chart controls using custom dark theme styling require explicit `focus-visible:ring-2` focus rings and screen-reader accessible form labels to remain navigable without compromising the sleek cyberpunk visual style.
**Action:** Always pair `focus-visible:ring-2 focus-visible:ring-emerald-500/50` with `aria-label` / `<label htmlFor="...">` for icon-only buttons and range sliders in dark terminal/dashboard UIs.
