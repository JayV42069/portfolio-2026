## 2026-10-26 - Accessible Dynamic Socket & Feed Controls
**Learning:** High-density dark interactive grids and chart controls need `focus-visible` ring indicators and dynamic screen reader ARIA labels (`aria-pressed`, socket contents) so keyboard and assistive device users can easily navigate component states.
**Action:** Always provide dynamic `aria-label` text for slot/grid buttons indicating current content + target action, and add `focus-visible:ring-2` to custom control buttons.
