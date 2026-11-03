'use client';

import type * as React from 'react';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar as RechartsRadar,
  RadarChart as RechartsRadarChart,
  Tooltip,
} from 'recharts';
import { chartTheme, resolveChartSeriesColor } from '../../theme/chart-theme';
import type { ChartSeries, ChartTooltipPayload } from '../../types';
import { toDataKey } from './shared/data-key';
import { CartesianTooltipContent } from './shared/tooltip-content';

const tickStyle = {
  fill: chartTheme.axisLabel,
  fontSize: chartTheme.fontSize,
  fontFamily: chartTheme.fontFamily,
} as const;

export interface RadarImplProps<TDatum extends object> {
  data: readonly TDatum[];
  xKey: keyof TDatum & string;
  series: readonly ChartSeries<TDatum>[];
  ariaDescription?: string;
  locale?: string;
  animate?: boolean;
  showGrid?: boolean;
  maxValue?: number;
  showDots?: boolean;
  fillOpacity?: number;
  renderTooltip?: (payload: ChartTooltipPayload<TDatum>) => React.ReactNode;
}

export default function RadarImpl<TDatum extends object>({
  data,
  xKey,
  series,
  ariaDescription,
  locale,
  animate = true,
  showGrid = true,
  maxValue,
  showDots = false,
  fillOpacity = chartTheme.areaOpacity,
  renderTooltip,
}: RadarImplProps<TDatum>) {
  return (
    <RechartsRadarChart
      responsive
      width="100%"
      height="100%"
      data={data}
      accessibilityLayer
      desc={ariaDescription}
      style={{ fontFamily: chartTheme.fontFamily }}
    >
      {showGrid ? (
        <PolarGrid stroke={chartTheme.grid} strokeDasharray="3 3" />
      ) : null}
      <PolarAngleAxis
        dataKey={toDataKey<TDatum>(xKey)}
        tickLine={false}
        tick={tickStyle}
      />
      <PolarRadiusAxis
        angle={90}
        domain={maxValue === undefined ? undefined : [0, maxValue]}
        tick={false}
        axisLine={false}
      />
      <Tooltip
        content={
          <CartesianTooltipContent
            series={series}
            locale={locale}
            renderTooltip={renderTooltip}
          />
        }
        cursor={false}
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

        return (
          <RechartsRadar
            key={item.key}
            dataKey={toDataKey<TDatum>(item.key)}
            name={item.label}
            stroke={color}
            strokeWidth={chartTheme.strokeWidth}
            fill={color}
            fillOpacity={fillOpacity}
            dot={
              showDots
                ? {
                    r: chartTheme.dotRadius,
                    fill: color,
                    stroke: chartTheme.surface,
                    strokeWidth: 2,
                  }
                : false
            }
            activeDot={{
              r: chartTheme.dotRadius + 2,
              fill: color,
              stroke: chartTheme.surface,
              strokeWidth: 2,
            }}
            isAnimationActive={animate ? 'auto' : false}
            animationDuration={chartTheme.animationDuration}
          />
        );
      })}
    </RechartsRadarChart>
  );
}
