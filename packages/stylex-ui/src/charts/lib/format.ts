import type { ChartValueFormat } from '../types';

export interface ChartValueFormatOptions {
  format?: ChartValueFormat;
  currency?: string;
  locale?: string;
  compact?: boolean;
}

const formatterCache = new Map<string, Intl.NumberFormat>();

function getFormatter(
  locale: string,
  format: ChartValueFormat,
  currency: string,
  compact: boolean,
): Intl.NumberFormat {
  const cacheKey = `${locale}|${format}|${currency}|${compact}`;
  const cached = formatterCache.get(cacheKey);
  if (cached) return cached;

  let formatter: Intl.NumberFormat;

  if (format === 'currency') {
    formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: compact ? 1 : 0,
      ...(compact ? { notation: 'compact' } : {}),
    });
  } else if (format === 'percent') {
    // Chart data stores percentage points (12.4), not fractions (0.124).
    formatter = new Intl.NumberFormat(locale, {
      maximumFractionDigits: 1,
    });
  } else {
    formatter = new Intl.NumberFormat(locale, {
      maximumFractionDigits: compact ? 1 : 2,
      ...(compact ? { notation: 'compact' } : {}),
    });
  }

  formatterCache.set(cacheKey, formatter);
  return formatter;
}

export function formatChartValue(
  value: number | null | undefined,
  options: ChartValueFormatOptions = {},
): string {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return '—';
  }

  const {
    format = 'number',
    currency = 'USD',
    locale = 'en-US',
    compact = false,
  } = options;

  if (format === 'percent') {
    return `${value.toFixed(1)}%`;
  }

  return getFormatter(locale, format, currency, compact).format(value);
}

export function formatCompactChartValue(
  value: number | null | undefined,
  options: Omit<ChartValueFormatOptions, 'compact'> = {},
): string {
  return formatChartValue(value, { ...options, compact: true });
}
