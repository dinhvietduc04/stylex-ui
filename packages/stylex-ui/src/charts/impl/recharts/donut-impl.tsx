'use client';

import { Cell, Pie, PieChart as RechartsPieChart, Tooltip } from 'recharts';
import { chartTheme, resolveChartCategoryColor } from '../../theme/chart-theme';
import { toDataKey } from './shared/data-key';
import { CategoryTooltipContent } from './shared/tooltip-content';
import type { DonutImplProps } from './shared/types';

export default function DonutImpl<TDatum extends object>({
  data,
  nameKey,
  valueKey,
  format,
  currency,
  colors,
  innerRadius = '58%',
  outerRadius = '82%',
  centerLabel,
  ariaDescription,
  locale,
  animate = true,
  renderTooltip,
}: DonutImplProps<TDatum>) {
  return (
    <RechartsPieChart
      responsive
      width="100%"
      height="100%"
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
      <Pie
        data={[...data]}
        dataKey={toDataKey<TDatum>(valueKey)}
        nameKey={toDataKey<TDatum>(nameKey)}
        cx="50%"
        cy="50%"
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        paddingAngle={2}
        cornerRadius={chartTheme.barRadius}
        stroke={chartTheme.surface}
        strokeWidth={2}
        label={false}
        isAnimationActive={animate ? 'auto' : false}
        animationDuration={chartTheme.animationDuration}
      >
        {data.map((datum, index) => (
          <Cell
            key={`${String(datum[nameKey])}-${index}`}
            fill={resolveChartCategoryColor(colors, index)}
          />
        ))}
      </Pie>
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
    </RechartsPieChart>
  );
}
