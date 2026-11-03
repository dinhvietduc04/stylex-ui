'use client';

import type * as React from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';
import { useMounted } from '../lib/use-mounted';
import { ChartFrame } from './chart-frame';

export interface ChartViewportProps {
  height?: number;
  ariaLabel: string;
  ariaDescription?: string;
  loading?: boolean;
  error?: React.ReactNode;
  isEmpty?: boolean;
  emptyMessage?: React.ReactNode;
  legend?: React.ReactNode;
  dataTable?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  sx?: StyleXStyles;
  children: React.ReactNode;
}

/**
 * Shared client boundary for every chart: holds the fixed height, defers the
 * engine until after hydration, and renders loading/empty/error consistently.
 */
export function ChartViewport({
  height = 320,
  ariaLabel,
  ariaDescription,
  loading = false,
  error,
  isEmpty = false,
  emptyMessage,
  legend,
  dataTable,
  className,
  style,
  sx,
  children,
}: ChartViewportProps) {
  const mounted = useMounted();

  return (
    <ChartFrame
      height={height}
      ariaLabel={ariaLabel}
      ariaDescription={ariaDescription}
      loading={loading || !mounted}
      error={error}
      isEmpty={isEmpty}
      emptyMessage={emptyMessage}
      legend={legend}
      dataTable={dataTable}
      className={className}
      style={style}
      sx={sx}
    >
      {children}
    </ChartFrame>
  );
}

ChartViewport.displayName = 'ChartViewport';
