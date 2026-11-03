'use client';

import type * as React from 'react';
import {
  Scatter,
  ScatterChart as RechartsScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';
import { formatCompactChartValue } from '../../lib/format';
import { chartTheme, resolveChartSeriesColor } from '../../theme/chart-theme';
import type {
  ChartSeries,
  ChartTooltipPayload,
  ChartValueFormat,
} from '../../types';
import { ChartGrid } from './shared/axes';
import { ScatterTooltipContent } from './shared/tooltip-content';
import type { CartesianImplProps } from './shared/types';

const tickStyle = {
  fill: chartTheme.axisLabel,
  fontSize: chartTheme.fontSize,
  fontFamily: chartTheme.fontFamily,
} as const;

export interface ScatterImplProps<TDatum extends object>
  extends Omit<CartesianImplProps<TDatum>, 'series'> {
  series: readonly ChartSeries<TDatum>[];
  sizeKey?: keyof TDatum & string;
  xFormat?: ChartValueFormat;
  minSize?: number;
  maxSize?: number;
}

interface ScatterPoint<TDatum> {
  x: number;
  y: number;
  z?: number;
  datum: TDatum;
}

function toNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

export default function ScatterImpl<TDatum extends object>({
  data,
  xKey,
  series,
  sizeKey,
  xFormat,
  minSize = 64,
  maxSize = 400,
  ariaDescription,
  locale = 'en-US',
  animate = true,
  showGrid = true,
  renderTooltip,
}: ScatterImplProps<TDatum>) {
  const firstSeries = series[0];

  return (
    <RechartsScatterChart
      responsive
      width="100%"
      height="100%"
      margin={{ top: 8, right: 16, bottom: 8, left: 0 }}
      accessibilityLayer
      desc={ariaDescription}
      style={{ fontFamily: chartTheme.fontFamily }}
    >
      {showGrid ? <ChartGrid /> : null}
      <XAxis
        type="number"
        dataKey="x"
        tickLine={false}
        axisLine={{ stroke: chartTheme.axis }}
        tick={tickStyle}
        tickMargin={10}
        tickFormatter={(value) =>
          formatCompactChartValue(toNumber(value), {
            format: xFormat,
            locale,
          })
        }
      />
      <YAxis
        type="number"
        dataKey="y"
        width="auto"
        tickLine={false}
        axisLine={false}
        tick={tickStyle}
        tickMargin={8}
        tickFormatter={(value) =>
          formatCompactChartValue(toNumber(value), {
            format: firstSeries?.format,
            currency: firstSeries?.currency,
            locale,
          })
        }
      />
      {sizeKey ? (
        <ZAxis type="number" dataKey="z" range={[minSize, maxSize]} />
      ) : null}
      <Tooltip
        content={
          <ScatterTooltipContent
            series={series}
            locale={locale}
            renderTooltip={renderTooltip}
          />
        }
        cursor={{ stroke: chartTheme.cursor, strokeDasharray: '3 3' }}
        contentStyle={{
          background: 'transparent',
          border: 'none',
          padding: 0,
          boxShadow: 'none',
        }}
        isAnimationActive={false}
      />
      {series.map((item, index) => {
        const color = resolveChartSeriesColor(item, index);
        const points = data.flatMap<ScatterPoint<TDatum>>((datum) => {
          const x = toNumber(datum[xKey]);
          const y = toNumber(datum[item.key]);

          if (x === null || y === null) {
            return [];
          }

          const z = sizeKey ? toNumber(datum[sizeKey]) : null;

          return [
            {
              x,
              y,
              ...(z === null ? {} : { z }),
              datum,
            },
          ];
        });

        return (
          <Scatter
            key={item.key}
            data={points}
            name={item.label}
            fill={color}
            shape="circle"
            isAnimationActive={animate ? 'auto' : false}
            animationDuration={chartTheme.animationDuration}
          />
        );
      })}
    </RechartsScatterChart>
  );
}
