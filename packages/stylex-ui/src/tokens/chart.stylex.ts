import * as stylex from '@stylexjs/stylex';
import { semanticTokens } from './semantic.stylex';

/**
 * Chart-specific roles that resolve to semantic tokens. Keeping these aliases
 * separate means chart internals never reach for raw colors, and a future
 * chart engine can map one stable vocabulary onto its own theme object.
 */
export const chartTokenValues = {
  // Categorical series palette
  series1: semanticTokens.chartSeries1,
  series2: semanticTokens.chartSeries2,
  series3: semanticTokens.chartSeries3,
  series4: semanticTokens.chartSeries4,
  series5: semanticTokens.chartSeries5,
  series6: semanticTokens.chartSeries6,
  series7: semanticTokens.chartSeries7,
  series8: semanticTokens.chartSeries8,

  // Chart chrome
  grid: semanticTokens.borderSubtle,
  axis: semanticTokens.borderDefault,
  axisLabel: semanticTokens.textMuted,
  cursor: semanticTokens.borderStrong,
  tooltipBackground: semanticTokens.bgSurfaceElevated,
  tooltipBorder: semanticTokens.borderDefault,
  tooltipText: semanticTokens.textPrimary,
  tooltipLabel: semanticTokens.textMuted,

  // Semantic data states
  accent: semanticTokens.brandAccent,
  success: semanticTokens.statusSuccess,
  warning: semanticTokens.statusWarning,
  danger: semanticTokens.statusError,
  neutral: semanticTokens.statusNeutral,
  positive: semanticTokens.statusSuccess,
  negative: semanticTokens.statusError,
} as const;

/**
 * TIER 3: CHART COMPONENT TOKENS
 */
export const chartTokens = stylex.defineVars(chartTokenValues);
