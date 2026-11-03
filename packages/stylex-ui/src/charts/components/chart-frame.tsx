'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { globalTokens } from '../../tokens/global.stylex';
import { semanticTokens } from '../../tokens/semantic.stylex';
import { mergeStylexProps } from '../../lib/stylex-utils';
import { ChartSkeleton } from './chart-skeleton';
import type { ChartFrameProps } from '../types';

const styles = stylex.create({
  figure: {
    display: 'flex',
    flexDirection: 'column',
    gap: globalTokens.space3,
    width: '100%',
    minWidth: 0,
    margin: 0,
  },
  plot: {
    position: 'relative',
    width: '100%',
    minWidth: 0,
  },
  state: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    padding: globalTokens.space6,
    borderRadius: globalTokens.radiusMd,
    borderWidth: '1px',
    borderStyle: 'dashed',
    borderColor: semanticTokens.borderSubtle,
    backgroundColor: semanticTokens.bgSurfaceSubtle,
    textAlign: 'center',
    fontSize: globalTokens.fontSizeSm,
    color: semanticTokens.textMuted,
  },
  error: {
    borderColor: semanticTokens.statusErrorBorder,
    backgroundColor: semanticTokens.statusErrorBg,
    color: semanticTokens.statusErrorText,
  },
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
    borderWidth: 0,
  },
});

export function ChartFrame({
  height = 320,
  ariaLabel,
  ariaDescription,
  loading = false,
  error,
  isEmpty = false,
  emptyMessage = 'No chart data for this range.',
  legend,
  dataTable,
  skeleton,
  children,
  className,
  style,
  sx,
  ...props
}: ChartFrameProps) {
  const descriptionId = React.useId();
  const hasError = error !== null && error !== undefined && error !== false;

  return (
    <figure
      {...mergeStylexProps({ className, style, sx }, styles.figure)}
      aria-label={ariaLabel}
      aria-describedby={ariaDescription ? descriptionId : undefined}
      aria-busy={loading || undefined}
      {...props}
    >
      {ariaDescription ? (
        <span id={descriptionId} {...stylex.props(styles.srOnly)}>
          {ariaDescription}
        </span>
      ) : null}

      <div {...stylex.props(styles.plot)} style={{ height }}>
        {loading ? (
          (skeleton ?? <ChartSkeleton height={height} />)
        ) : hasError ? (
          <div role="alert" {...stylex.props(styles.state, styles.error)}>
            {error}
          </div>
        ) : isEmpty ? (
          <div {...stylex.props(styles.state)}>{emptyMessage}</div>
        ) : (
          children
        )}
      </div>

      {legend}
      {dataTable}
    </figure>
  );
}

ChartFrame.displayName = 'ChartFrame';
