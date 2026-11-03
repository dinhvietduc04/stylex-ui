# Charts

The chart layer lives behind a single public entry:

```ts
import { Chart, LineChart, preloadChart } from '@repo/stylex-ui/charts';
```

The root `@repo/stylex-ui` entry does **not** export charts. This keeps the
engine out of every consumer's initial bundle and makes the dependency boundary
explicit.

Charts are currently used only by `apps/admin-shell`. Do not add chart imports
to `web-shell`, `users-remote`, or other remotes unless the team explicitly asks
for them.

## Engine boundary

- The chart engine is Recharts 3.x.
- Recharts may only be imported from
  `packages/stylex-ui/src/charts/impl/recharts/**`.
- Public wrappers never expose Recharts types or props.
- The build script fails if Recharts is imported outside `src/charts/impl`, or
  if a chart wrapper statically imports an impl module. Implementations must stay
  in async chunks.

## Supported charts

| Component       | `type` for `Chart` | Best for                          |
| --------------- | ------------------ | --------------------------------- |
| `LineChart`     | `line`             | Trends over time                  |
| `AreaChart`     | `area`             | Volume/trend with emphasis        |
| `BarChart`      | `bar`              | Comparison across categories      |
| `DonutChart`    | `donut`            | Part-to-whole with a center value |
| `ComposedChart` | `composed`         | Mixed line, area, and bar series  |
| `RadarChart`    | `radar`            | Multi-axis comparison             |
| `RadialChart`   | `radial`           | Gauge-style progress rings        |
| `TreemapChart`  | `treemap`          | Weighted hierarchy/part-to-whole  |
| `FunnelChart`   | `funnel`           | Stage-by-stage conversion         |
| `ScatterChart`  | `scatter`          | Correlation and bubble plots      |
| `SankeyChart`   | `sankey`           | Flow between nodes                |

`Chart` is the data-driven dispatcher for `line`, `area`, `bar`, `donut`,
`composed`, `radar`, `radial`, `treemap`, `funnel`, `scatter`, and `sankey`.

## Shared props

Every chart accepts the shared chrome props:

| Prop                       | Type        | Notes                                                        |
| -------------------------- | ----------- | ------------------------------------------------------------ |
| `height`                   | `number`    | Plot height in pixels. Defaults to `320`.                    |
| `ariaLabel`                | `string`    | Required accessible name for the figure.                     |
| `ariaDescription`          | `string`    | Optional longer description, linked with `aria-describedby`. |
| `loading`                  | `boolean`   | Renders a skeleton and marks the figure `aria-busy`.         |
| `error`                    | `ReactNode` | Renders an alert state instead of the plot.                  |
| `emptyMessage`             | `ReactNode` | Copy for the empty state.                                    |
| `showLegend`               | `boolean`   | Defaults to on when there is more than one series/category.  |
| `showDataTable`            | `boolean`   | Defaults to `true`. Renders an sr-only data table.           |
| `animate`                  | `boolean`   | Defaults to `true`; respects `prefers-reduced-motion`.       |
| `locale`                   | `string`    | Number formatting locale. Defaults to `en-US`.               |
| `className`, `style`, `sx` | usual       | Styling hooks.                                               |

Series-based charts (`Line`, `Area`, `Bar`, `Composed`, `Radar`, `Scatter`)
also accept:

```ts
interface ChartBaseProps<TDatum extends object> {
  data: readonly TDatum[];
  xKey: keyof TDatum & string;
  xLabel?: string;
  series: readonly ChartSeries<TDatum>[];
  showGrid?: boolean;
  renderTooltip?: (payload: ChartTooltipPayload<TDatum>) => React.ReactNode;
}

interface ChartSeries<TDatum extends object> {
  key: keyof TDatum & string;
  label: string;
  color?: ChartColorRole;
  format?: 'number' | 'currency' | 'percent';
  currency?: string;
  stackId?: string;
}
```

Category-based charts (`Donut`, `Radial`, `Treemap`, `Funnel`) accept
`data`, `nameKey`, `valueKey`, optional `colors`, `format`, `currency`, and a
custom `renderTooltip`.

## Examples

### Trend chart

```tsx
<LineChart
  data={rows}
  xKey="label"
  xLabel="Period"
  series={[
    { key: 'revenue', label: 'Revenue', color: 'brand', format: 'currency' },
  ]}
  ariaLabel="Revenue over the selected range"
  height={260}
/>
```

### Mixed series

```tsx
<ComposedChart
  data={rows}
  xKey="month"
  series={[
    { key: 'orders', label: 'Orders', kind: 'bar', color: 'info' },
    { key: 'revenue', label: 'Revenue', kind: 'line', color: 'brand' },
    { key: 'forecast', label: 'Forecast', kind: 'area', color: 'accent' },
  ]}
  ariaLabel="Orders and revenue by month"
/>
```

### Gauge-style radial

```tsx
<RadialChart
  data={[{ name: 'Capacity', value: 72 }]}
  nameKey="name"
  valueKey="value"
  maxValue={100}
  format="percent"
  centerLabel="72%"
  ariaLabel="Capacity utilisation"
/>
```

### Funnel

```tsx
<FunnelChart
  data={[
    { stage: 'Visited', count: 1200 },
    { stage: 'Signed up', count: 420 },
    { stage: 'Activated', count: 180 },
  ]}
  nameKey="stage"
  valueKey="count"
  colors={['info', 'accent', 'success']}
  showLabels
  ariaLabel="Activation funnel"
/>
```

### Bubble scatter

```tsx
<ScatterChart
  data={rows}
  xKey="spend"
  xLabel="Spend"
  xFormat="currency"
  sizeKey="orders"
  series={[
    { key: 'revenue', label: 'Revenue', color: 'brand', format: 'currency' },
  ]}
  ariaLabel="Revenue compared with spend"
/>
```

### Sankey

```tsx
<SankeyChart
  nodes={[
    { name: 'Visit', color: 'info' },
    { name: 'Signup', color: 'accent' },
    { name: 'Purchase', color: 'success' },
  ]}
  links={[
    { source: 'Visit', target: 'Signup', value: 420 },
    { source: 'Signup', target: 'Purchase', value: 180 },
  ]}
  ariaLabel="Visit-to-purchase flow"
/>
```

## Theming

All chart colors are semantic roles resolved from chart tokens:

```ts
type ChartColorRole =
  | 'brand'
  | 'accent'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'neutral'
  | 'series1'
  | ...
  | 'series8';
```

- Tier 3 chart tokens live in
  `packages/stylex-ui/src/tokens/chart.stylex.ts`.
- `chartTokens` point at semantic tokens, so brand/mode switching is automatic.
- `StylexThemeProvider` applies the chart token scope.
- Donut, radial, treemap, and funnel accept `colors` to assign roles by
  category index. Unassigned categories fall back to `series1..series8`.
- Sankey nodes set their own `color` role; the chart falls back to the series
  palette when a node has no role.
- Never pass raw hex values through the public API. If a new role is needed, add
  it to the token layer and `ChartColorRole` first.

`chartTheme` and `resolveChartColor`, `resolveChartSeriesColor`,
`resolveChartCategoryColor`, and `resolveChartCategoryRole` are exported for
advanced callers that need the same resolved values.

## Lazy loading

Each implementation is its own async chunk:

- Wrappers use `React.lazy` over the shared loader map.
- `ChartViewport` defers the engine until after hydration.
- Empty, loading, and hidden-series states render without fetching a chunk.
- `preloadChart(type)` warms one chunk ahead of render:

```ts
import { preloadChart } from '@repo/stylex-ui/charts';

void preloadChart('funnel');
```

`ChartSuspense` is available when callers want to provide their own suspense
boundary around a chart subtree.

The implementation chunks are emitted separately from the rest of
`@repo/stylex-ui`; importing the root package or the chart entry alone does not
pull Recharts into the initial route.

## Accessibility

- `ariaLabel` is required. Use it to name the figure, not to duplicate the
  visible card title verbatim.
- `ariaDescription` is exposed through `aria-describedby`.
- Legends are real buttons when series visibility can be toggled, with
  `aria-pressed` and visible focus styles.
- Every chart renders an sr-only data table by default so screen readers can
  read the underlying values. Keep `showDataTable` on unless a parent already
  provides an equivalent table.
- Loading uses `aria-busy`; errors use `role="alert"`.
- Animation uses Recharts' `'auto'` mode, which disables motion when the user
  prefers reduced motion.
- The engine is mounted only after hydration, avoiding zero-width SSR renders
  and hydration mismatches.

## Formatting

- `format: 'currency'` uses `Intl.NumberFormat` with the provided `currency`
  (default `USD`).
- `format: 'percent'` expects percentage points (`12.4` renders as `12.4%`).
- `format: 'number'` uses locale-aware grouping and up to two decimals.
- Axis ticks use compact notation; tooltips and data tables use the full value.
- Pass `locale` when the surrounding app is not `en-US`.

## Verification

Run before shipping chart changes:

```sh
pnpm --filter @repo/stylex-ui typecheck
pnpm --filter @repo/stylex-ui build
pnpm --filter admin-shell typecheck
pnpm --filter admin-shell build
```

Stop any running dev server before a clean `next build` so `.next` does not
report stale `0 B` route sizes.
