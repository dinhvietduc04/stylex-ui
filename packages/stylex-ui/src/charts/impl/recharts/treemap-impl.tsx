'use client';

import type * as React from 'react';
import {
  ResponsiveContainer,
  Tooltip,
  Treemap,
  type TreemapNode,
} from 'recharts';
import { semanticTokens } from '../../../tokens/semantic.stylex';
import { chartTheme, resolveChartCategoryColor } from '../../theme/chart-theme';
import type {
  ChartColorRole,
  ChartTooltipPayload,
  ChartValueFormat,
} from '../../types';
import { CategoryTooltipContent } from './shared/tooltip-content';

export interface TreemapImplProps<TDatum extends object> {
  data: readonly TDatum[];
  nameKey: keyof TDatum & string;
  valueKey: keyof TDatum & string;
  format?: ChartValueFormat;
  currency?: string;
  colors?: readonly ChartColorRole[];
  aspectRatio?: number;
  ariaDescription?: string;
  locale?: string;
  animate?: boolean;
  renderTooltip?: (payload: ChartTooltipPayload<TDatum>) => React.ReactNode;
}

export default function TreemapImpl<TDatum extends object>({
  data,
  nameKey,
  valueKey,
  format,
  currency,
  colors,
  aspectRatio = 1.618,
  locale,
  animate = true,
  renderTooltip,
}: TreemapImplProps<TDatum>) {
  const renderNode = (node: TreemapNode): React.ReactElement => {
    const { x, y, width, height, index, name, depth } = node;

    // The synthetic root covers the whole plot. Painting it would hide the
    // leaves (especially during the entrance animation), so leave it empty.
    if (depth === 0) {
      return <g />;
    }

    const fill = resolveChartCategoryColor(colors, index);
    const estimatedLabelWidth = name.length * 7 + 16;
    const showLabel = width > 72 && height > 28 && estimatedLabelWidth <= width;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={chartTheme.barRadius}
          fill={fill}
          stroke={chartTheme.surface}
          strokeWidth={2}
        />
        {showLabel ? (
          <text
            x={x + 8}
            y={y + height / 2 + 4}
            fill={semanticTokens.textInverse}
            fontFamily={chartTheme.fontFamily}
            fontSize={12}
            fontWeight={600}
          >
            {name}
          </text>
        ) : null}
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <Treemap
        data={data as unknown as readonly Record<string, unknown>[]}
        dataKey={valueKey}
        nameKey={nameKey}
        aspectRatio={aspectRatio}
        nodeGap={2}
        isAnimationActive={animate ? 'auto' : false}
        animationDuration={chartTheme.animationDuration}
        style={{ fontFamily: chartTheme.fontFamily }}
        content={renderNode}
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
      </Treemap>
    </ResponsiveContainer>
  );
}
