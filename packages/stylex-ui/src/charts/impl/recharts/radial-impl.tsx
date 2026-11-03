'use client';

import type * as React from 'react';
import {
  Cell,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart as RechartsRadialBarChart,
  Tooltip,
} from 'recharts';
import { chartTheme, resolveChartCategoryColor } from '../../theme/chart-theme';
import type {
  ChartColorRole,
  ChartTooltipPayload,
  ChartValueFormat,
} from '../../types';
import { toDataKey } from './shared/data-key';
import { CategoryTooltipContent } from './shared/tooltip-content';

export interface RadialImplProps<TDatum extends object> {
  data: readonly TDatum[];
  nameKey: keyof TDatum & string;
  valueKey: keyof TDatum & string;
  format?: ChartValueFormat;
  currency?: string;
  colors?: readonly ChartColorRole[];
  maxValue?: number;
  innerRadius?: number | string;
  outerRadius?: number | string;
  barSize?: number;
  startAngle?: number;
  endAngle?: number;
  centerLabel?: React.ReactNode;
  ariaDescription?: string;
  locale?: string;
  animate?: boolean;
  renderTooltip?: (payload: ChartTooltipPayload<TDatum>) => React.ReactNode;
}

export default function RadialImpl<TDatum extends object>({
  data,
  nameKey,
  valueKey,
  format,
  currency,
  colors,
  maxValue,
  innerRadius = '42%',
  outerRadius = '92%',
  barSize = 14,
  startAngle = 90,
  endAngle = -270,
  centerLabel,
  ariaDescription,
  locale,
  animate = true,
  renderTooltip,
}: RadialImplProps<TDatum>) {
  return (
    <RechartsRadialBarChart
      responsive
      width="100%"
      height="100%"
      data={[...data]}
      startAngle={startAngle}
      endAngle={endAngle}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      barSize={barSize}
      accessibilityLayer
      desc={ariaDescription}
      style={{ fontFamily: chartTheme.fontFamily }}
    >
      <PolarAngleAxis
        type="number"
        domain={[0, maxValue ?? 'dataMax']}
        tick={false}
        axisLine={false}
      />
      <Tooltip
        content={
          <CategoryTooltipContent
            data={data}
            nameKey={nameKey}
            valueKey={valueKey}
            colors={colors}
            format={format}
            currency={currency}
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
      <RadialBar
        dataKey={toDataKey<TDatum>(valueKey)}
        background={{ fill: chartTheme.grid }}
        cornerRadius={chartTheme.barRadius}
        isAnimationActive={animate ? 'auto' : false}
        animationDuration={chartTheme.animationDuration}
      >
        {data.map((datum, index) => (
          <Cell
            key={`${String(datum[nameKey])}-${index}`}
            fill={resolveChartCategoryColor(colors, index)}
          />
        ))}
      </RadialBar>
      {centerLabel !== null && centerLabel !== undefined ? (
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          fill={chartTheme.tooltip.text}
          fontFamily={chartTheme.fontFamily}
          fontSize={18}
          fontWeight={600}
          aria-hidden="true"
          pointerEvents="none"
        >
          {centerLabel}
        </text>
      ) : null}
    </RechartsRadialBarChart>
  );
}
