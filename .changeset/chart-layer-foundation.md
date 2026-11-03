---
'@repo/stylex-ui': minor
---

Add a Recharts-backed chart layer at `@repo/stylex-ui/charts` with
StyleX-token theming, lazy per-chart chunks, accessible chart chrome, and
line, area, bar, donut, composed, radar, radial, treemap, funnel, scatter, and
sankey wrappers. Also expose a typed `preloadChart(type)` loader for warming a
single chart chunk.

Document the public API, theming, lazy-loading, and accessibility contract in
`docs/CHARTS.md`.
