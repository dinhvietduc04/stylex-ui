'use client';

import * as React from 'react';
import { ChartSkeleton } from '../components/chart-skeleton';

export interface ChartSuspenseProps {
  height?: number;
  children: React.ReactNode;
}

export function ChartSuspense({ height = 320, children }: ChartSuspenseProps) {
  return (
    <React.Suspense fallback={<ChartSkeleton height={height} />}>
      {children}
    </React.Suspense>
  );
}

export function preloadChartChunk(
  loader: () => Promise<unknown>,
): Promise<unknown> {
  return loader();
}

/**
 * Creates a public chart wrapper whose implementation is fetched only when the
 * chart actually renders. The loader must resolve to a default-exported client
 * component.
 */
export function createLazyChart<TProps extends { height?: number }>(
  loader: () => Promise<{ default: React.ComponentType<TProps> }>,
  displayName: string,
): React.ComponentType<TProps> {
  const LazyChart = React.lazy(loader);

  function LazyChartWrapper(props: TProps) {
    return (
      <React.Suspense fallback={<ChartSkeleton height={props.height ?? 320} />}>
        <LazyChart {...props} />
      </React.Suspense>
    );
  }

  LazyChartWrapper.displayName = displayName;

  return LazyChartWrapper;
}
