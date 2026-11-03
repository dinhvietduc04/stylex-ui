'use client';

import { useId } from 'react';
import {
  Area as RechartsArea,
  AreaChart as RechartsAreaChart,
  Tooltip,
} from 'recharts';
import { chartTheme, resolveChartSeriesColor } from '../../theme/chart-theme';
import { CartesianAxes, ChartGrid } from './shared/axes';
import { toDataKey } from './shared/data-key';
import { CartesianTooltipContent } from './shared/tooltip-content';
import type { CartesianImplProps } from './shared/types';

export interface AreaImplProps<TDatum extends object>
  extends CartesianImplProps<TDatum> {
  curve?: 'linear' | 'monotone' | 'step';
  stacked?: boolean;
  gradient?: boolean;
}

export default function AreaImpl<TDatum extends object>({
  data,
  xKey,
  series,
  ariaDescription,
  locale,
  animate = true,
  showGrid = true,
  renderTooltip,
  curve = 'monotone',
  stacked = false,
  gradient = true,
}: AreaImplProps<TDatum>) {
  const rawId = useId();
  const gradientId = `dfw-chart-${rawId.replace(/:/g, '')}`;

  return (
    <RechartsAreaChart
      responsive
      width="100%"
      height="100%"
      data={data}
      margin={{ top: 8, right: 12, bottom: 0, left: 0 }}
      accessibilityLayer
      desc={ariaDescription}
      style={{ fontFamily: chartTheme.fontFamily }}
    >
      {gradient ? (
        <defs>
          {series.map((item, index) => (
            <linearGradient
              key={item.key}
              id={`${gradientId}-${index}`}
              x1="0"
              x2="0"
              y1="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={resolveChartSeriesColor(item, index)}
                stopOpacity={chartTheme.areaOpacity}
              />
              <stop
                offset="100%"
                stopColor={resolveChartSeriesColor(item, index)}
                stopOpacity={0.02}
              />
            </linearGradient>
          ))}
        </defs>
      ) : null}

      {showGrid ? <ChartGrid /> : null}
      <CartesianAxes xKey={xKey} series={series} locale={locale} />
      <Tooltip
        content={
          <CartesianTooltipContent
            series={series}
            locale={locale}
            renderTooltip={renderTooltip}
          />
        }
        cursor={{
          stroke: chartTheme.cursor,
          strokeDasharray: '3 3',
        }}
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
          <RechartsArea
            key={item.key}
            type={curve}
            dataKey={toDataKey<TDatum>(item.key)}
            name={item.label}
            stackId={stacked ? 'chart-stack' : item.stackId}
            stroke={color}
            strokeWidth={chartTheme.strokeWidth}
            fill={gradient ? `url(#${gradientId}-${index})` : color}
            fillOpacity={gradient ? 1 : chartTheme.areaOpacity}
            dot={false}
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
    </RechartsAreaChart>
  );
}
