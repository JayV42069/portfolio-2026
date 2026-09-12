## 2026-02-23 - Dynamic Action Labels for Modular Grid Sockets
**Learning:** Icon-only grid sockets in interactive simulation tools lack context for screen readers and keyboard users unless dynamic action states (install, replace, remove) are included in the socket's `aria-label`.
**Action:** Always compute descriptive `aria-label` text indicating current socket state and expected click outcome, along with `aria-pressed` and `focus-visible` ring indicators.
