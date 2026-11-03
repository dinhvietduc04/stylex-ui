'use client';

import * as stylex from '@stylexjs/stylex';
import { globalTokens } from '../../tokens/global.stylex';
import { semanticTokens } from '../../tokens/semantic.stylex';
import { mergeStylexProps } from '../../lib/stylex-utils';
import { resolveChartSeriesColor } from '../theme/chart-theme';
import type { ChartLegendProps } from '../types';

const styles = stylex.create({
  legend: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: globalTokens.space3,
    minWidth: 0,
  },
  item: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: globalTokens.space2,
    margin: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
    fontFamily: globalTokens.fontSans,
    fontSize: globalTokens.fontSizeSm,
    color: semanticTokens.textSecondary,
    lineHeight: globalTokens.lineHeightSnug,
    textAlign: 'left',
  },
  interactive: {
    cursor: 'pointer',
    borderRadius: globalTokens.radiusXs,
    transitionProperty: 'color, opacity',
    transitionDuration: globalTokens.durationFast,
    ':hover': {
      color: semanticTokens.textPrimary,
    },
    ':focus-visible': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: semanticTokens.borderFocus,
      outlineOffset: '2px',
    },
  },
  hidden: {
    opacity: 0.45,
  },
  dot: {
    width: '0.5rem',
    height: '0.5rem',
    borderRadius: globalTokens.radiusFull,
    flexShrink: 0,
  },
});

export function ChartLegend({
  series,
  hiddenSeries = [],
  onToggleSeries,
  colorForSeries,
  ariaLabel = 'Chart legend',
  sx,
}: ChartLegendProps) {
  const hidden = new Set(hiddenSeries);

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      {...mergeStylexProps({ sx }, styles.legend)}
    >
      {series.map((item, index) => {
        const isHidden = hidden.has(item.key);
        const color = colorForSeries
          ? colorForSeries(item, index)
          : resolveChartSeriesColor(item, index);
        const content = (
          <>
            <span
              aria-hidden="true"
              {...stylex.props(styles.dot)}
              style={{ backgroundColor: color }}
            />
            <span>{item.label}</span>
          </>
        );

        if (!onToggleSeries) {
          return (
            <span
              key={item.key}
              {...stylex.props(styles.item, isHidden && styles.hidden)}
            >
              {content}
            </span>
          );
        }

        return (
          <button
            key={item.key}
            type="button"
            aria-pressed={!isHidden}
            onClick={() => onToggleSeries(item.key)}
            {...stylex.props(
              styles.item,
              styles.interactive,
              isHidden && styles.hidden,
            )}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}

ChartLegend.displayName = 'ChartLegend';
