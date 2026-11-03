'use client';

import { useCallback, useMemo, useState } from 'react';
import type { ChartSeries } from '../types';

export interface ChartVisibility<TDatum extends object> {
  hiddenSeries: ReadonlySet<string>;
  visibleSeries: readonly ChartSeries<TDatum>[];
  toggleSeries: (key: string) => void;
}

export function useChartVisibility<TDatum extends object>(
  series: readonly ChartSeries<TDatum>[],
): ChartVisibility<TDatum> {
  const [hiddenSeries, setHiddenSeries] = useState<ReadonlySet<string>>(
    () => new Set(),
  );

  const visibleSeries = useMemo(
    () => series.filter((item) => !hiddenSeries.has(item.key)),
    [series, hiddenSeries],
  );

  const toggleSeries = useCallback((key: string) => {
    setHiddenSeries((current) => {
      const next = new Set(current);

      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }

      return next;
    });
  }, []);

  return { hiddenSeries, visibleSeries, toggleSeries };
}
