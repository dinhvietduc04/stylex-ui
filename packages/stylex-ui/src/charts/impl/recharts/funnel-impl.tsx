'use client';

import type * as React from 'react';
import {
  Cell,
  Funnel,
  FunnelChart as RechartsFunnelChart,
  Tooltip,
} from 'recharts';
import { semanticTokens } from '../../../tokens/semantic.stylex';
import { chartTheme, resolveChartCategoryColor } from '../../theme/chart-theme';
import type {
  ChartColorRole,
  ChartTooltipPayload,
  ChartValueFormat,
} from '../../types';
import { toDataKey } from './shared/data-key';
import { CategoryTooltipContent } from './shared/tooltip-content';

export interface FunnelImplProps<TDatum extends object> {
  data: readonly TDatum[];
  nameKey: keyof TDatum & string;
  valueKey: keyof TDatum & string;
  format?: ChartValueFormat;
  currency?: string;
  colors?: readonly ChartColorRole[];
  showLabels?: boolean;
  reversed?: boolean;
  ariaDescription?: string;
  locale?: string;
  animate?: boolean;
  renderTooltip?: (payload: ChartTooltipPayload<TDatum>) => React.ReactNode;
}

export default function FunnelImpl<TDatum extends object>({
  data,
  nameKey,
  valueKey,
  format,
  currency,
  colors,
  showLabels = false,
  reversed = false,
  ariaDescription,
  locale,
  animate = true,
  renderTooltip,
}: FunnelImplProps<TDatum>) {
  return (
    <RechartsFunnelChart
      responsive
      width="100%"
      height="100%"
      margin={{ top: 8, right: 12, bottom: 8, left: 12 }}
      accessibilityLayer
      desc={ariaDescription}
      style={{ fontFamily: chartTheme.fontFamily }}
    >
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
      <Funnel
        data={[...data]}
        dataKey={toDataKey<TDatum>(valueKey)}
        nameKey={toDataKey<TDatum>(nameKey)}
        reversed={reversed}
        lastShapeType="rectangle"
        stroke={chartTheme.surface}
        strokeWidth={2}
        label={
          showLabels
            ? {
                fill: semanticTokens.textInverse,
                fontFamily: chartTheme.fontFamily,
                fontSize: 12,
                fontWeight: 600,
              }
            : false
        }
        isAnimationActive={animate ? 'auto' : false}
        animationDuration={chartTheme.animationDuration}
      >
        {data.map((datum, index) => (
          <Cell
            key={`${String(datum[nameKey])}-${index}`}
            fill={resolveChartCategoryColor(colors, index)}
          />
        ))}
      </Funnel>
    </RechartsFunnelChart>
  );
}
