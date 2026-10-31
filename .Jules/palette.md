# Palette's Journal

## 2025-05-18 - Accessible State and Dynamic Actions in Interactive Grids
**Learning:** In interactive simulation grids (e.g. socket grids or modular assemblers), icon-only slot buttons leave screen reader users completely unaware of which slot is selected, what is currently slotted, or what clicking a slot will do. By generating dynamic accessible labels indicating slot number, current occupancy, and intended action (`Slot X: [Item] installed. Press to remove.` vs. `Slot X: Empty. Press to install [Selected].`), combined with `aria-pressed` on the tool selector, the entire simulation becomes intuitive and navigable via keyboard and assistive technology.
**Action:** Always provide contextual action labels on slot/matrix buttons that describe both current state and the side effect of activation, paired with visible `focus-visible` ring indicators.
