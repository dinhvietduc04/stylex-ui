import type * as React from 'react';
import type {
  ChartColorRole,
  ChartSeries,
  ChartTooltipPayload,
  ChartValueFormat,
} from '../../../types';

export interface CartesianImplProps<TDatum extends object> {
  data: readonly TDatum[];
  xKey: keyof TDatum & string;
  /** Only visible series; legend filtering happens above the engine. */
  series: readonly ChartSeries<TDatum>[];
  ariaDescription?: string;
  locale?: string;
  animate?: boolean;
  showGrid?: boolean;
  renderTooltip?: (payload: ChartTooltipPayload<TDatum>) => React.ReactNode;
}

export interface DonutImplProps<TDatum extends object> {
  data: readonly TDatum[];
  nameKey: keyof TDatum & string;
  valueKey: keyof TDatum & string;
  format?: ChartValueFormat;
  currency?: string;
  colors?: readonly ChartColorRole[];
  innerRadius?: number | string;
  outerRadius?: number | string;
  centerLabel?: React.ReactNode;
  ariaDescription?: string;
  locale?: string;
  animate?: boolean;
  renderTooltip?: (payload: ChartTooltipPayload<TDatum>) => React.ReactNode;
}
