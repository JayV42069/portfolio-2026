## 2025-05-18 - Interactive Terminal Click-to-Focus & Live Screen Reader Region
**Learning:** Terminal emulator components feel broken on web if clicking empty log areas doesn't focus the CLI prompt input. Furthermore, simulated terminal output requires `role="log"` with `aria-live="polite"` and an accessible input label so screen reader users receive dynamic feedback on command outputs.
**Action:** When creating CLI/console widgets, attach a ref to the prompt input, add a container click-to-focus handler with `cursor-text`, and wrap history outputs in an accessible live region.
