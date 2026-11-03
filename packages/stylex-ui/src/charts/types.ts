import type * as React from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

export type ChartValueFormat = 'number' | 'currency' | 'percent';

export type ChartType =
  | 'line'
  | 'area'
  | 'bar'
  | 'donut'
  | 'composed'
  | 'radar'
  | 'radial'
  | 'treemap'
  | 'funnel'
  | 'scatter'
  | 'sankey';

/**
 * Semantic color roles teams may assign to a series. Raw colors are
 * intentionally not accepted so brand and mode changes stay automatic.
 */
export type ChartColorRole =
  | 'brand'
  | 'accent'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'neutral'
  | 'series1'
  | 'series2'
  | 'series3'
  | 'series4'
  | 'series5'
  | 'series6'
  | 'series7'
  | 'series8';

export interface ChartSeries<TDatum extends object> {
  key: keyof TDatum & string;
  label: string;
  color?: ChartColorRole;
  format?: ChartValueFormat;
  currency?: string;
  stackId?: string;
}

export interface ChartTooltipSeries {
  key: string;
  label: string;
  color?: ChartColorRole;
  format?: ChartValueFormat;
  currency?: string;
}

export interface ChartTooltipEntry<TDatum extends object> {
  datum: TDatum;
  series: ChartTooltipSeries;
  value: number | null;
  formattedValue: string;
  color: string;
}

export interface ChartTooltipPayload<TDatum extends object> {
  label: string;
  entries: ChartTooltipEntry<TDatum>[];
}

export interface ChartChromeProps {
  /** Plot height in pixels. Defaults to 320. */
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Required accessible name for the chart figure. */
  ariaLabel: string;
  ariaDescription?: string;

  loading?: boolean;
  error?: React.ReactNode;
  emptyMessage?: React.ReactNode;

  showLegend?: boolean;
  /** Render an sr-only data table with the same values. Defaults to true. */
  showDataTable?: boolean;
  animate?: boolean;

  locale?: string;
  sx?: StyleXStyles;
}

export interface ChartBaseProps<TDatum extends object>
  extends ChartChromeProps {
  data: readonly TDatum[];
  xKey: keyof TDatum & string;
  /** Visible caption used to label the data table. */
  xLabel?: string;
  series: readonly ChartSeries<TDatum>[];
  showGrid?: boolean;

  renderTooltip?: (payload: ChartTooltipPayload<TDatum>) => React.ReactNode;
}

export interface LineChartProps<TDatum extends object>
  extends ChartBaseProps<TDatum> {
  curve?: 'linear' | 'monotone' | 'step';
  showDots?: boolean;
}

export interface AreaChartProps<TDatum extends object>
  extends ChartBaseProps<TDatum> {
  curve?: 'linear' | 'monotone' | 'step';
  stacked?: boolean;
  gradient?: boolean;
}

export interface BarChartProps<TDatum extends object>
  extends ChartBaseProps<TDatum> {
  stacked?: boolean;
  layout?: 'horizontal' | 'vertical';
  barSize?: number;
}

export type ComposedSeriesKind = 'line' | 'area' | 'bar';

export interface ComposedChartSeries<TDatum extends object>
  extends ChartSeries<TDatum> {
  /** How this series is drawn. Defaults to `line`. */
  kind?: ComposedSeriesKind;
}

export interface ComposedChartProps<TDatum extends object>
  extends ChartBaseProps<TDatum> {
  series: readonly ComposedChartSeries<TDatum>[];
  curve?: 'linear' | 'monotone' | 'step';
  stacked?: boolean;
  gradient?: boolean;
  barSize?: number;
}

export interface RadarChartProps<TDatum extends object>
  extends ChartBaseProps<TDatum> {
  /** Fixed outer domain for every radar axis. */
  maxValue?: number;
  showDots?: boolean;
  fillOpacity?: number;
}

/** Shared category/value contract for donut, radial, treemap, and funnel. */
export interface ChartCategoryProps<TDatum extends object>
  extends ChartChromeProps {
  data: readonly TDatum[];
  nameKey: keyof TDatum & string;
  valueKey: keyof TDatum & string;
  format?: ChartValueFormat;
  currency?: string;
  /** Optional semantic color roles applied to categories by index. */
  colors?: readonly ChartColorRole[];
  renderTooltip?: (payload: ChartTooltipPayload<TDatum>) => React.ReactNode;
}

export interface DonutChartProps<TDatum extends object>
  extends ChartCategoryProps<TDatum> {
  innerRadius?: number | string;
  outerRadius?: number | string;
  centerLabel?: React.ReactNode;
}

export interface RadialChartProps<TDatum extends object>
  extends ChartCategoryProps<TDatum> {
  /** Fixed outer domain for gauge-style charts. */
  maxValue?: number;
  innerRadius?: number | string;
  outerRadius?: number | string;
  barSize?: number;
  startAngle?: number;
  endAngle?: number;
  centerLabel?: React.ReactNode;
}

export interface TreemapChartProps<TDatum extends object>
  extends ChartCategoryProps<TDatum> {
  /** Preferred rectangle aspect ratio. Defaults to 1.618. */
  aspectRatio?: number;
}

export interface FunnelChartProps<TDatum extends object>
  extends ChartCategoryProps<TDatum> {
  showLabels?: boolean;
  reversed?: boolean;
}

export interface ScatterChartProps<TDatum extends object>
  extends ChartBaseProps<TDatum> {
  /** Optional numeric field mapped to bubble size. */
  sizeKey?: keyof TDatum & string;
  xFormat?: ChartValueFormat;
  minSize?: number;
  maxSize?: number;
}

export interface SankeyChartNode {
  name: string;
  color?: ChartColorRole;
}

export interface SankeyChartLink {
  /** Node name or index in `nodes`. */
  source: string | number;
  /** Node name or index in `nodes`. */
  target: string | number;
  value: number;
}

export interface SankeyChartProps extends ChartChromeProps {
  nodes: readonly SankeyChartNode[];
  links: readonly SankeyChartLink[];
  format?: ChartValueFormat;
  currency?: string;
  nodeWidth?: number;
  nodePadding?: number;
  renderTooltip?: (
    payload: ChartTooltipPayload<SankeyChartLink>,
  ) => React.ReactNode;
}

export type ChartProps<TDatum extends object> =
  | ({ type: 'line' } & LineChartProps<TDatum>)
  | ({ type: 'area' } & AreaChartProps<TDatum>)
  | ({ type: 'bar' } & BarChartProps<TDatum>)
  | ({ type: 'donut' } & DonutChartProps<TDatum>)
  | ({ type: 'composed' } & ComposedChartProps<TDatum>)
  | ({ type: 'radar' } & RadarChartProps<TDatum>)
  | ({ type: 'radial' } & RadialChartProps<TDatum>)
  | ({ type: 'treemap' } & TreemapChartProps<TDatum>)
  | ({ type: 'funnel' } & FunnelChartProps<TDatum>)
  | ({ type: 'scatter' } & ScatterChartProps<TDatum>)
  | ({ type: 'sankey' } & SankeyChartProps);

export interface ChartLegendItem {
  key: string;
  label: string;
  color?: ChartColorRole;
}

export interface ChartLegendProps {
  series: readonly ChartLegendItem[];
  hiddenSeries?: readonly string[];
  onToggleSeries?: (key: string) => void;
  colorForSeries?: (series: ChartLegendItem, index: number) => string;
  ariaLabel?: string;
  sx?: StyleXStyles;
}

export interface ChartDataTableProps<TDatum extends object> {
  data: readonly TDatum[];
  xKey: keyof TDatum & string;
  xLabel?: string;
  /** Formatting for a numeric x column, such as scatter plots. */
  xFormat?: ChartValueFormat;
  xCurrency?: string;
  series: readonly ChartSeries<TDatum>[];
  caption: string;
  locale?: string;
}

export interface ChartSkeletonProps {
  height?: number | string;
  sx?: StyleXStyles;
}

export interface ChartFrameProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  height?: number;
  ariaLabel: string;
  ariaDescription?: string;
  loading?: boolean;
  error?: React.ReactNode;
  isEmpty?: boolean;
  emptyMessage?: React.ReactNode;
  legend?: React.ReactNode;
  dataTable?: React.ReactNode;
  skeleton?: React.ReactNode;
  children?: React.ReactNode;
  sx?: StyleXStyles;
}
