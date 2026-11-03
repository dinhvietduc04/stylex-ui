'use client';

import {
  Bar as RechartsBar,
  BarChart as RechartsBarChart,
  Tooltip,
} from 'recharts';
import { chartTheme, resolveChartSeriesColor } from '../../theme/chart-theme';
import { CartesianAxes, ChartGrid } from './shared/axes';
import { toDataKey } from './shared/data-key';
import { CartesianTooltipContent } from './shared/tooltip-content';
import type { CartesianImplProps } from './shared/types';

export interface BarImplProps<TDatum extends object>
  extends CartesianImplProps<TDatum> {
  stacked?: boolean;
  layout?: 'horizontal' | 'vertical';
  barSize?: number;
}

export default function BarImpl<TDatum extends object>({
  data,
  xKey,
  series,
  ariaDescription,
  locale,
  animate = true,
  showGrid = true,
  renderTooltip,
  stacked = false,
  layout = 'horizontal',
  barSize,
}: BarImplProps<TDatum>) {
  const radius: [number, number, number, number] =
    layout === 'vertical'
      ? [0, chartTheme.barRadius, chartTheme.barRadius, 0]
      : [chartTheme.barRadius, chartTheme.barRadius, 0, 0];

  return (
    <RechartsBarChart
      responsive
      width="100%"
      height="100%"
      data={data}
      layout={layout}
      margin={{ top: 8, right: 12, bottom: 0, left: 0 }}
      accessibilityLayer
      desc={ariaDescription}
      style={{ fontFamily: chartTheme.fontFamily }}
    >
      {showGrid ? <ChartGrid layout={layout} /> : null}
      <CartesianAxes
        xKey={xKey}
        series={series}
        locale={locale}
        layout={layout}
      />
      <Tooltip
        content={
          <CartesianTooltipContent
            series={series}
            locale={locale}
            renderTooltip={renderTooltip}
          />
        }
        cursor={{
          fill: chartTheme.cursor,
          fillOpacity: 0.08,
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
          <RechartsBar
            key={item.key}
            dataKey={toDataKey<TDatum>(item.key)}
            name={item.label}
            stackId={stacked ? 'chart-stack' : item.stackId}
            fill={color}
            radius={radius}
            barSize={barSize}
            isAnimationActive={animate ? 'auto' : false}
            animationDuration={chartTheme.animationDuration}
          />
        );
      })}
    </RechartsBarChart>
  );
}
