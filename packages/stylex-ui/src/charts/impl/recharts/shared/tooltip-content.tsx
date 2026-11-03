'use client';

import type * as React from 'react';
import type { TooltipContentProps } from 'recharts';
import { ChartTooltip } from '../../../components/chart-tooltip';
import { formatChartValue } from '../../../lib/format';
import {
  resolveChartCategoryRole,
  resolveChartSeriesColor,
} from '../../../theme/chart-theme';
import type {
  ChartColorRole,
  ChartSeries,
  ChartTooltipEntry,
  ChartTooltipPayload,
  ChartTooltipSeries,
  ChartValueFormat,
  SankeyChartLink,
  SankeyChartNode,
} from '../../../types';

type RechartsTooltipPayload = TooltipContentProps<number, string>['payload'];

interface CartesianTooltipContentProps<TDatum extends object> {
  active?: boolean;
  payload?: RechartsTooltipPayload;
  label?: string | number;
  series: readonly ChartSeries<TDatum>[];
  locale?: string;
  renderTooltip?: (payload: ChartTooltipPayload<TDatum>) => React.ReactNode;
}

function toNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

export function CartesianTooltipContent<TDatum extends object>({
  active,
  payload,
  label,
  series,
  locale = 'en-US',
  renderTooltip,
}: CartesianTooltipContentProps<TDatum>) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const seriesByKey = new Map<
    string,
    { item: ChartSeries<TDatum>; index: number }
  >(series.map((item, index) => [item.key, { item, index }]));

  const entries = payload.flatMap<ChartTooltipEntry<TDatum>>((entry) => {
    const key = typeof entry.dataKey === 'string' ? entry.dataKey : undefined;
    const match = key ? seriesByKey.get(key) : undefined;
    const value = toNumber(entry.value);

    if (!match || value === null) {
      return [];
    }

    return [
      {
        datum: entry.payload as TDatum,
        series: match.item,
        value,
        formattedValue: formatChartValue(value, {
          format: match.item.format,
          currency: match.item.currency,
          locale,
        }),
        color: resolveChartSeriesColor(match.item, match.index),
      },
    ];
  });

  if (entries.length === 0) {
    return null;
  }

  entries.sort((a, b) => {
    const aIndex = series.findIndex((item) => item.key === a.series.key);
    const bIndex = series.findIndex((item) => item.key === b.series.key);
    return aIndex - bIndex;
  });

  const tooltipPayload: ChartTooltipPayload<TDatum> = {
    label: label === undefined ? '' : String(label),
    entries,
  };

  if (renderTooltip) {
    return <>{renderTooltip(tooltipPayload)}</>;
  }

  return <ChartTooltip payload={tooltipPayload} />;
}

interface CategoryTooltipContentProps<TDatum extends object> {
  active?: boolean;
  payload?: RechartsTooltipPayload;
  label?: string | number;
  data: readonly TDatum[];
  nameKey: keyof TDatum & string;
  valueKey: keyof TDatum & string;
  colors?: readonly ChartColorRole[];
  format?: ChartValueFormat;
  currency?: string;
  locale?: string;
  renderTooltip?: (payload: ChartTooltipPayload<TDatum>) => React.ReactNode;
}

export function CategoryTooltipContent<TDatum extends object>({
  active,
  payload,
  label,
  data,
  nameKey,
  valueKey,
  colors,
  format,
  currency,
  locale = 'en-US',
  renderTooltip,
}: CategoryTooltipContentProps<TDatum>) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const entries = payload.flatMap<ChartTooltipEntry<TDatum>>(
    (entry, entryIndex) => {
      const datum = entry.payload as TDatum;
      const name = String(datum?.[nameKey] ?? entry.name ?? '');
      const value = toNumber(datum?.[valueKey] ?? entry.value);

      if (value === null) {
        return [];
      }

      const dataIndex = data.findIndex(
        (item) =>
          item === datum ||
          String(item[nameKey] ?? '') === String(datum?.[nameKey] ?? ''),
      );
      const index = dataIndex >= 0 ? dataIndex : entryIndex;
      const role = resolveChartCategoryRole(colors, index);
      const series: ChartTooltipSeries = {
        key: `${name}-${index}`,
        label: name,
        color: role,
        format,
        currency,
      };

      return [
        {
          datum,
          series,
          value,
          formattedValue: formatChartValue(value, {
            format,
            currency,
            locale,
          }),
          color: resolveChartSeriesColor(series, index),
        },
      ];
    },
  );

  if (entries.length === 0) {
    return null;
  }

  const tooltipPayload: ChartTooltipPayload<TDatum> = {
    label:
      label === undefined ? (entries[0]?.series.label ?? '') : String(label),
    entries,
  };

  if (renderTooltip) {
    return <>{renderTooltip(tooltipPayload)}</>;
  }

  return <ChartTooltip payload={tooltipPayload} />;
}

interface ScatterTooltipContentProps<TDatum extends object> {
  active?: boolean;
  payload?: RechartsTooltipPayload;
  label?: string | number;
  series: readonly ChartSeries<TDatum>[];
  locale?: string;
  renderTooltip?: (payload: ChartTooltipPayload<TDatum>) => React.ReactNode;
}

interface ScatterPayload<TDatum> {
  datum?: TDatum;
  y?: unknown;
}

export function ScatterTooltipContent<TDatum extends object>({
  active,
  payload,
  label,
  series,
  locale = 'en-US',
  renderTooltip,
}: ScatterTooltipContentProps<TDatum>) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const entries = payload.flatMap<ChartTooltipEntry<TDatum>>(
    (entry, entryIndex) => {
      const point = entry.payload as ScatterPayload<TDatum> | undefined;
      const datum = point?.datum ?? (entry.payload as TDatum);
      const matched = series.find(
        (item) =>
          item.key === entry.dataKey ||
          item.label === entry.name ||
          item.key === entry.name,
      );
      const index = matched
        ? series.findIndex((item) => item.key === matched.key)
        : entryIndex;
      const item = matched ?? series[index];
      const value = toNumber(entry.value ?? point?.y);

      if (!item || value === null) {
        return [];
      }

      return [
        {
          datum,
          series: item,
          value,
          formattedValue: formatChartValue(value, {
            format: item.format,
            currency: item.currency,
            locale,
          }),
          color: resolveChartSeriesColor(item, index),
        },
      ];
    },
  );

  if (entries.length === 0) {
    return null;
  }

  const tooltipPayload: ChartTooltipPayload<TDatum> = {
    label:
      label === undefined ? (entries[0]?.series.label ?? '') : String(label),
    entries,
  };

  if (renderTooltip) {
    return <>{renderTooltip(tooltipPayload)}</>;
  }

  return <ChartTooltip payload={tooltipPayload} />;
}

interface SankeyTooltipContentProps {
  active?: boolean;
  payload?: RechartsTooltipPayload;
  label?: string | number;
  nodes: readonly SankeyChartNode[];
  format?: ChartValueFormat;
  currency?: string;
  locale?: string;
  renderTooltip?: (
    payload: ChartTooltipPayload<SankeyChartLink>,
  ) => React.ReactNode;
}

interface SankeyPayload {
  source?: { name?: string };
  target?: { name?: string };
  value?: unknown;
}

export function SankeyTooltipContent({
  active,
  payload,
  label,
  nodes,
  format,
  currency,
  locale = 'en-US',
  renderTooltip,
}: SankeyTooltipContentProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const entries = payload.flatMap<ChartTooltipEntry<SankeyChartLink>>(
    (entry, index) => {
      const raw = entry.payload as SankeyPayload | undefined;
      const value = toNumber(entry.value ?? raw?.value);
      const name = String(entry.name ?? '');

      if (value === null || name === '') {
        return [];
      }

      const source = String(raw?.source?.name ?? '');
      const target = String(raw?.target?.name ?? '');
      const node = nodes.find((item) => item.name === source);
      const series: ChartTooltipSeries = {
        key: `${name}-${index}`,
        label: 'Value',
        color: node?.color,
        format,
        currency,
      };
      const datum: SankeyChartLink = {
        source,
        target,
        value,
      };

      return [
        {
          datum,
          series,
          value,
          formattedValue: formatChartValue(value, {
            format,
            currency,
            locale,
          }),
          color: resolveChartSeriesColor(series, index),
        },
      ];
    },
  );

  if (entries.length === 0) {
    return null;
  }

  const tooltipPayload: ChartTooltipPayload<SankeyChartLink> = {
    label:
      label === undefined
        ? String(payload[0]?.name ?? entries[0]?.datum.source ?? '')
        : String(label),
    entries,
  };

  if (renderTooltip) {
    return <>{renderTooltip(tooltipPayload)}</>;
  }

  return <ChartTooltip payload={tooltipPayload} />;
}
