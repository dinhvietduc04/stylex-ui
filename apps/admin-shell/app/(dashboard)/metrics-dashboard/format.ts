import type {
  MetricsLogLevel,
  MetricsTrend,
  MetricsValueFormat,
} from '@repo/api-contracts';

const numberFormatter = new Intl.NumberFormat('en-US');

const compactNumberFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

const currencyFormatters = new Map<string, Intl.NumberFormat>();
const compactCurrencyFormatters = new Map<string, Intl.NumberFormat>();

const logTimeFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'UTC',
});

function getCurrencyFormatter(
  currency: string,
  compact = false,
): Intl.NumberFormat {
  const cache = compact ? compactCurrencyFormatters : currencyFormatters;
  const existing = cache.get(currency);

  if (existing) return existing;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: compact ? 1 : 0,
    ...(compact ? { notation: 'compact' } : {}),
  });

  cache.set(currency, formatter);
  return formatter;
}

export function formatMetricValue(
  value: number,
  format: MetricsValueFormat,
  currency = 'USD',
): string {
  if (format === 'currency') {
    return getCurrencyFormatter(currency).format(value);
  }

  if (format === 'percent') {
    return `${value.toFixed(1)}%`;
  }

  return numberFormatter.format(value);
}

export function formatCompactValue(
  value: number,
  format: MetricsValueFormat,
  currency = 'USD',
): string {
  if (format === 'currency') {
    return getCurrencyFormatter(currency, true).format(value);
  }

  if (format === 'percent') {
    return `${value.toFixed(1)}%`;
  }

  return compactNumberFormatter.format(value);
}

export function formatChange(change: number): string {
  const sign = change > 0 ? '+' : '';
  return `${sign}${change.toFixed(1)}%`;
}

export function formatLogTime(timestamp: string): string {
  return logTimeFormatter.format(new Date(timestamp));
}

export function trendVariant(
  trend: MetricsTrend,
): 'success' | 'error' | 'neutral' {
  if (trend === 'up') return 'success';
  if (trend === 'down') return 'error';
  return 'neutral';
}

export function logLevelVariant(
  level: MetricsLogLevel,
): 'neutral' | 'info' | 'warning' | 'error' {
  switch (level) {
    case 'info':
      return 'info';
    case 'warn':
      return 'warning';
    case 'error':
      return 'error';
    case 'debug':
    default:
      return 'neutral';
  }
}
