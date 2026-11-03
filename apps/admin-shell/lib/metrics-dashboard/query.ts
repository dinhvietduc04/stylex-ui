import {
  METRICS_LOG_LEVELS,
  METRICS_RANGES,
  type MetricsLogLevel,
  type MetricsLogLevelFilter,
  type MetricsLogsQuery,
  type MetricsRange,
} from '@repo/api-contracts';

export const DEFAULT_METRICS_RANGE: MetricsRange = '7d';
export const DEFAULT_METRICS_LOG_LIMIT = 10;
export const MAX_METRICS_LOG_LIMIT = 50;

export type MetricsQueryResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

export function isMetricsRange(value: string): value is MetricsRange {
  return (METRICS_RANGES as readonly string[]).includes(value);
}

export function isMetricsLogLevel(value: string): value is MetricsLogLevel {
  return (METRICS_LOG_LEVELS as readonly string[]).includes(value);
}

function parseRange(value: string | null): MetricsRange | null {
  if (value === null || value === '') {
    return DEFAULT_METRICS_RANGE;
  }

  return isMetricsRange(value) ? value : null;
}

function parseLogLevel(value: string | null): MetricsLogLevelFilter | null {
  if (value === null || value === '' || value === 'all') {
    return 'all';
  }

  return isMetricsLogLevel(value) ? value : null;
}

function parseLimit(value: string | null): number | null {
  if (value === null || value === '') {
    return DEFAULT_METRICS_LOG_LIMIT;
  }

  const parsed = Number(value);

  if (
    !Number.isInteger(parsed) ||
    parsed < 1 ||
    parsed > MAX_METRICS_LOG_LIMIT
  ) {
    return null;
  }

  return parsed;
}

function parseCursor(value: string | null): string | undefined | null {
  if (value === null || value === '') {
    return undefined;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 0) {
    return null;
  }

  return String(parsed);
}

export function parseMetricsRangeQuery(
  searchParams: URLSearchParams,
): MetricsQueryResult<{ range: MetricsRange }> {
  const range = parseRange(searchParams.get('range'));

  if (!range) {
    return {
      ok: false,
      error: `Invalid "range" value. Expected one of: ${METRICS_RANGES.join(', ')}.`,
    };
  }

  return { ok: true, value: { range } };
}

export function parseMetricsLogsQuery(
  searchParams: URLSearchParams,
): MetricsQueryResult<MetricsLogsQuery> {
  const rangeResult = parseMetricsRangeQuery(searchParams);

  if (!rangeResult.ok) {
    return rangeResult;
  }

  const level = parseLogLevel(searchParams.get('level'));

  if (!level) {
    return {
      ok: false,
      error: `Invalid "level" value. Expected one of: all, ${METRICS_LOG_LEVELS.join(', ')}.`,
    };
  }

  const limit = parseLimit(searchParams.get('limit'));

  if (limit === null) {
    return {
      ok: false,
      error: `Invalid "limit" value. Expected an integer between 1 and ${MAX_METRICS_LOG_LIMIT}.`,
    };
  }

  const cursor = parseCursor(searchParams.get('cursor'));

  if (cursor === null) {
    return {
      ok: false,
      error: 'Invalid "cursor" value. Expected a non-negative integer offset.',
    };
  }

  return {
    ok: true,
    value: {
      range: rangeResult.value.range,
      level,
      limit,
      ...(cursor === undefined ? {} : { cursor }),
    },
  };
}
