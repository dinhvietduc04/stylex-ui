'use client';

import { CartesianGrid, XAxis, YAxis } from 'recharts';
import { formatCompactChartValue } from '../../../lib/format';
import { chartTheme } from '../../../theme/chart-theme';
import type { ChartSeries } from '../../../types';
import { toDataKey } from './data-key';

interface CartesianAxesProps<TDatum extends object> {
  xKey: keyof TDatum & string;
  series: readonly ChartSeries<TDatum>[];
  locale?: string;
  layout?: 'horizontal' | 'vertical';
}

function asNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

const tickStyle = {
  fill: chartTheme.axisLabel,
  fontSize: chartTheme.fontSize,
  fontFamily: chartTheme.fontFamily,
} as const;

export function CartesianAxes<TDatum extends object>({
  xKey,
  series,
  locale = 'en-US',
  layout = 'horizontal',
}: CartesianAxesProps<TDatum>) {
  const firstSeries = series[0];
  const tickFormatter = (value: unknown) =>
    formatCompactChartValue(asNumber(value), {
      format: firstSeries?.format,
      currency: firstSeries?.currency,
      locale,
    });

  if (layout === 'vertical') {
    return (
      <>
        <XAxis
          type="number"
          tickLine={false}
          axisLine={{ stroke: chartTheme.axis }}
          tick={tickStyle}
          tickMargin={10}
          tickFormatter={tickFormatter}
        />
        <YAxis
          type="category"
          dataKey={toDataKey<TDatum>(xKey)}
          width="auto"
          tickLine={false}
          axisLine={false}
          tick={tickStyle}
          tickMargin={8}
          interval="preserveStartEnd"
        />
      </>
    );
  }

  return (
    <>
      <XAxis
        dataKey={toDataKey<TDatum>(xKey)}
        tickLine={false}
        axisLine={{ stroke: chartTheme.axis }}
        tick={tickStyle}
        tickMargin={10}
        minTickGap={24}
        interval="preserveStartEnd"
      />
      <YAxis
        type="number"
        width="auto"
        tickLine={false}
        axisLine={false}
        tick={tickStyle}
        tickMargin={8}
        tickFormatter={tickFormatter}
      />
    </>
  );
}

interface ChartGridProps {
  layout?: 'horizontal' | 'vertical';
}

export function ChartGrid({ layout = 'horizontal' }: ChartGridProps) {
  return (
    <CartesianGrid
      stroke={chartTheme.grid}
      strokeDasharray="3 3"
      vertical={layout === 'vertical'}
      horizontal={layout !== 'vertical'}
    />
  );
}
