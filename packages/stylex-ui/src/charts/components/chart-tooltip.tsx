import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import { globalTokens } from '../../tokens/global.stylex';
import { chartTokens } from '../../tokens/chart.stylex';
import type { ChartTooltipPayload } from '../types';

const styles = stylex.create({
  container: {
    minWidth: '10rem',
    maxWidth: '18rem',
    paddingTop: globalTokens.space2,
    paddingBottom: globalTokens.space2,
    paddingLeft: globalTokens.space3,
    paddingRight: globalTokens.space3,
    borderRadius: globalTokens.radiusMd,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: chartTokens.tooltipBorder,
    backgroundColor: chartTokens.tooltipBackground,
    boxShadow: globalTokens.shadowMd,
    fontFamily: globalTokens.fontSans,
    color: chartTokens.tooltipText,
  },
  label: {
    marginBottom: globalTokens.space2,
    fontFamily: globalTokens.fontMono,
    fontSize: '0.6875rem',
    letterSpacing: '0.02em',
    color: chartTokens.tooltipLabel,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.375rem',
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: globalTokens.space2,
  },
  dot: {
    width: '0.5rem',
    height: '0.5rem',
    borderRadius: globalTokens.radiusFull,
    flexShrink: 0,
  },
  name: {
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '0.75rem',
    color: chartTokens.tooltipText,
  },
  value: {
    fontVariantNumeric: 'tabular-nums',
    fontSize: '0.75rem',
    fontWeight: globalTokens.fontWeightSemibold,
    color: chartTokens.tooltipText,
    whiteSpace: 'nowrap',
  },
});

export interface ChartTooltipProps<TDatum extends object> {
  payload: ChartTooltipPayload<TDatum>;
  sx?: StyleXStyles;
}

export function ChartTooltip<TDatum extends object>({
  payload,
  sx,
}: ChartTooltipProps<TDatum>) {
  return (
    <div aria-hidden="true" {...stylex.props(styles.container, sx)}>
      <div {...stylex.props(styles.label)}>{payload.label}</div>
      <ul {...stylex.props(styles.list)}>
        {payload.entries.map((entry) => (
          <li key={entry.series.key} {...stylex.props(styles.row)}>
            <span
              aria-hidden="true"
              {...stylex.props(styles.dot)}
              style={{ backgroundColor: entry.color }}
            />
            <span {...stylex.props(styles.name)}>{entry.series.label}</span>
            <span {...stylex.props(styles.value)}>{entry.formattedValue}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

ChartTooltip.displayName = 'ChartTooltip';
