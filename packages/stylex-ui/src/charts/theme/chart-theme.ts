import { chartTokens } from '../../tokens/chart.stylex';
import { globalTokens } from '../../tokens/global.stylex';
import { semanticTokens } from '../../tokens/semantic.stylex';
import type { ChartColorRole } from '../types';

export const chartSeriesRoleOrder: ChartColorRole[] = [
  'series1',
  'series2',
  'series3',
  'series4',
  'series5',
  'series6',
  'series7',
  'series8',
];

const colors = {
  brand: chartTokens.series1,
  accent: chartTokens.accent,
  success: chartTokens.success,
  info: chartTokens.series2,
  warning: chartTokens.warning,
  danger: chartTokens.danger,
  neutral: chartTokens.neutral,
  series1: chartTokens.series1,
  series2: chartTokens.series2,
  series3: chartTokens.series3,
  series4: chartTokens.series4,
  series5: chartTokens.series5,
  series6: chartTokens.series6,
  series7: chartTokens.series7,
  series8: chartTokens.series8,
} satisfies Record<ChartColorRole, string>;

/**
 * Central chart theme. Every value is either a StyleX token reference or a
 * numeric layout constant that a chart engine can consume directly.
 */
export const chartTheme = {
  colors,
  grid: chartTokens.grid,
  axis: chartTokens.axis,
  axisLabel: chartTokens.axisLabel,
  cursor: chartTokens.cursor,
  surface: semanticTokens.bgSurface,
  tooltip: {
    background: chartTokens.tooltipBackground,
    border: chartTokens.tooltipBorder,
    text: chartTokens.tooltipText,
    label: chartTokens.tooltipLabel,
  },
  fontFamily: globalTokens.fontSans,
  fontSize: 11,
  tooltipFontSize: 12,
  strokeWidth: 2,
  dotRadius: 3,
  areaOpacity: 0.18,
  barRadius: 4,
  animationDuration: 300,
} as const;

export function resolveChartColor(role: ChartColorRole): string {
  return chartTheme.colors[role];
}

export function resolveChartCategoryRole(
  colors: readonly ChartColorRole[] | undefined,
  index: number,
): ChartColorRole {
  return (
    colors?.[index] ??
    chartSeriesRoleOrder[index % chartSeriesRoleOrder.length] ??
    'series1'
  );
}

export function resolveChartCategoryColor(
  colors: readonly ChartColorRole[] | undefined,
  index: number,
): string {
  return resolveChartColor(resolveChartCategoryRole(colors, index));
}

export function resolveChartSeriesColor(
  series: { color?: ChartColorRole },
  index: number,
): string {
  if (series.color) {
    return resolveChartColor(series.color);
  }

  const fallbackRole =
    chartSeriesRoleOrder[index % chartSeriesRoleOrder.length] ?? 'series1';

  return resolveChartColor(fallbackRole);
}
