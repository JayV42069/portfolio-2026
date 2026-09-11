## 2026-09-11 - Interactive Simulation Accessibility Controls
**Learning:** Real-time canvas/SVG simulation components with custom buttons (e.g. play/pause stream, reset data) and sliders often omit ARIA labels and focus states. Providing dynamic aria-labels (`aria-label={isPlaying ? ... : ...}`) along with `role="img"` for SVG data feeds guarantees screen reader parity without altering visual aesthetics.
**Action:** Always include explicit `aria-label`s on icon-only control toggles and label SVGs in interactive widget modules.
