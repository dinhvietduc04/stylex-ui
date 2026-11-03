'use client';

import {
  Line as RechartsLine,
  LineChart as RechartsLineChart,
  Tooltip,
} from 'recharts';
import { chartTheme, resolveChartSeriesColor } from '../../theme/chart-theme';
import { CartesianAxes, ChartGrid } from './shared/axes';
import { toDataKey } from './shared/data-key';
import { CartesianTooltipContent } from './shared/tooltip-content';
import type { CartesianImplProps } from './shared/types';

export interface LineImplProps<TDatum extends object>
  extends CartesianImplProps<TDatum> {
  curve?: 'linear' | 'monotone' | 'step';
  showDots?: boolean;
}

export default function LineImpl<TDatum extends object>({
  data,
  xKey,
  series,
  ariaDescription,
  locale,
  animate = true,
  showGrid = true,
  renderTooltip,
  curve = 'monotone',
  showDots = false,
}: LineImplProps<TDatum>) {
  return (
    <RechartsLineChart
      responsive
      width="100%"
      height="100%"
      data={data}
      margin={{ top: 8, right: 12, bottom: 0, left: 0 }}
      accessibilityLayer
      desc={ariaDescription}
      style={{ fontFamily: chartTheme.fontFamily }}
    >
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
          <RechartsLine
            key={item.key}
            type={curve}
            dataKey={toDataKey<TDatum>(item.key)}
            name={item.label}
            stroke={color}
            strokeWidth={chartTheme.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
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
    </RechartsLineChart>
  );
}
