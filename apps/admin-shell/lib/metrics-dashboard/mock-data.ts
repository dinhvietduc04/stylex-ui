import type {
  MetricsChart,
  MetricsChartPoint,
  MetricsChartSeries,
  MetricsDashboardResponse,
  MetricsKpi,
  MetricsLogEntry,
  MetricsLogLevel,
  MetricsLogsQuery,
  MetricsLogsResponse,
  MetricsRange,
  MetricsTrend,
} from '@repo/api-contracts';

/**
 * Deterministic mock data for the metrics dashboard.
 *
 * Values are generated from a fixed anchor plus seeded noise, so repeated
 * requests for the same range return the same numbers. Replace this module
 * with real data access when a backend is available.
 */

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

/** Anchor timestamps to the current hour so bucket labels stay stable. */
const MOCK_NOW = Math.floor(Date.now() / HOUR_MS) * HOUR_MS;

interface RangeConfig {
  points: number;
  bucketMs: number;
  comparisonLabel: string;
}

const RANGE_CONFIG: Record<MetricsRange, RangeConfig> = {
  '24h': {
    points: 24,
    bucketMs: HOUR_MS,
    comparisonLabel: 'vs previous 24 hours',
  },
  '7d': {
    points: 7,
    bucketMs: DAY_MS,
    comparisonLabel: 'vs previous 7 days',
  },
  '30d': {
    points: 30,
    bucketMs: DAY_MS,
    comparisonLabel: 'vs previous 30 days',
  },
  '90d': {
    points: 13,
    bucketMs: 7 * DAY_MS,
    comparisonLabel: 'vs previous 90 days',
  },
};

const USER_BASE: Record<MetricsRange, number> = {
  '24h': 12_400,
  '7d': 11_800,
  '30d': 10_400,
  '90d': 8_600,
};

const USER_GROWTH: Record<MetricsRange, number> = {
  '24h': 0.0025,
  '7d': 0.012,
  '30d': 0.006,
  '90d': 0.018,
};

const ORDER_BASE: Record<MetricsRange, number> = {
  '24h': 18,
  '7d': 180,
  '30d': 190,
  '90d': 1_200,
};

const REVENUE_BASE: Record<MetricsRange, number> = {
  '24h': 2_400,
  '7d': 26_000,
  '30d': 27_000,
  '90d': 175_000,
};

const hourFormatter = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

const dayFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
});

interface MetricsBucket {
  timestamp: string;
  label: string;
}

interface SeriesData {
  buckets: MetricsBucket[];
  users: number[];
  orders: number[];
  revenue: number[];
}

interface LogTemplate {
  level: MetricsLogLevel;
  message: string;
  source: string;
  actor?: string;
}

const LOG_TEMPLATES: LogTemplate[] = [
  {
    level: 'info',
    message: 'User invitation accepted',
    source: 'users-remote',
    actor: 'jane@example.com',
  },
  {
    level: 'info',
    message: 'New order created',
    source: 'orders-service',
    actor: 'john@example.com',
  },
  {
    level: 'warn',
    message: 'Payment retry scheduled',
    source: 'billing-service',
    actor: 'system',
  },
  {
    level: 'error',
    message: 'Webhook delivery failed',
    source: 'integrations',
    actor: 'system',
  },
  {
    level: 'debug',
    message: 'Cache refreshed for tenant',
    source: 'admin-shell',
  },
  {
    level: 'info',
    message: 'Role updated for user',
    source: 'rbac',
    actor: 'admin@example.com',
  },
  {
    level: 'warn',
    message: 'Rate limit approaching for API key',
    source: 'api-gateway',
  },
  {
    level: 'error',
    message: 'Order export timed out',
    source: 'reports',
  },
  {
    level: 'info',
    message: 'Revenue report generated',
    source: 'reports',
    actor: 'manager@example.com',
  },
  {
    level: 'debug',
    message: 'Session token refreshed',
    source: 'auth-next',
  },
];

const LOG_COUNT = 60;
const LOG_SPAN_MS = 7 * DAY_MS;

const MOCK_LOGS: MetricsLogEntry[] = Array.from(
  { length: LOG_COUNT },
  (_, index) => {
    const template = LOG_TEMPLATES[index % LOG_TEMPLATES.length]!;
    const progress = index / LOG_COUNT;
    const offsetMs = progress * LOG_SPAN_MS + noise(index + 71) * 2 * HOUR_MS;
    const timestamp = new Date(MOCK_NOW - offsetMs).toISOString();

    return {
      id: `log-${String(index + 1).padStart(3, '0')}`,
      timestamp,
      level: template.level,
      message: template.message,
      source: template.source,
      ...(template.actor ? { actor: template.actor } : {}),
    };
  },
);

/**
 * Small deterministic PRNG. Returns a value between 0 and 1.
 */
function noise(seed: number): number {
  const value = Math.sin(seed * 12.9898) * 43_758.5453;
  return value - Math.floor(value);
}

function formatBucketLabel(date: Date, range: MetricsRange): string {
  return range === '24h'
    ? hourFormatter.format(date)
    : dayFormatter.format(date);
}

function buildBuckets(range: MetricsRange): MetricsBucket[] {
  const { points, bucketMs } = RANGE_CONFIG[range];
  const start = MOCK_NOW - (points - 1) * bucketMs;

  return Array.from({ length: points }, (_, index) => {
    const date = new Date(start + index * bucketMs);

    return {
      timestamp: date.toISOString(),
      label: formatBucketLabel(date, range),
    };
  });
}

function buildSeriesData(range: MetricsRange): SeriesData {
  const config = RANGE_CONFIG[range];
  const buckets = buildBuckets(range);
  const userBase = USER_BASE[range];
  const userGrowth = USER_GROWTH[range];
  const orderBase = ORDER_BASE[range];
  const revenueBase = REVENUE_BASE[range];

  const progressFor = (index: number): number =>
    config.points <= 1 ? 0 : index / (config.points - 1);

  let previousUsers = 0;

  const users = buckets.map((_, index) => {
    const progress = progressFor(index);
    const trend = userBase * (1 + userGrowth * index);
    const wave = userBase * 0.006 * Math.sin(progress * Math.PI * 2);
    const jitter = userBase * 0.004 * (noise(index + 11) - 0.5);

    previousUsers = Math.max(previousUsers, Math.round(trend + wave + jitter));

    return previousUsers;
  });

  const orders = buckets.map((_, index) => {
    const progress = progressFor(index);
    const wave = 0.16 * Math.sin(progress * Math.PI * 2 + 0.6);
    const jitter = 0.1 * (noise(index + 23) - 0.5);

    return Math.max(0, Math.round(orderBase * (1 + wave + jitter)));
  });

  const revenue = buckets.map((_, index) => {
    const progress = progressFor(index);
    const wave = 0.14 * Math.sin(progress * Math.PI * 2 + 1.1);
    const jitter = 0.08 * (noise(index + 37) - 0.5);

    return Math.max(0, Math.round(revenueBase * (1 + wave + jitter)));
  });

  return { buckets, users, orders, revenue };
}

function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

function calculateChange(previous: number, current: number): number {
  if (previous === 0) {
    return current === 0 ? 0 : 100;
  }

  return Math.round(((current - previous) / previous) * 1_000) / 10;
}

function trendFromChange(change: number): MetricsTrend {
  if (change > 0.5) return 'up';
  if (change < -0.5) return 'down';
  return 'flat';
}

function toPoints(
  buckets: MetricsBucket[],
  values: number[],
): MetricsChartPoint[] {
  return buckets.map((bucket, index) => ({
    timestamp: bucket.timestamp,
    label: bucket.label,
    value: values[index] ?? 0,
  }));
}

export function getMetricsKpis(range: MetricsRange): MetricsKpi[] {
  const { users, orders, revenue } = buildSeriesData(range);
  const comparisonLabel = RANGE_CONFIG[range].comparisonLabel;

  const firstUsers = users[0] ?? 0;
  const totalUsers = users[users.length - 1] ?? 0;
  const activeUsers = Math.round(totalUsers * 0.68);
  const newUsers = Math.max(0, totalUsers - firstUsers);

  const totalOrders = sum(orders);
  const pendingOrders = Math.round(totalOrders * 0.14);
  const completedOrders = Math.max(0, totalOrders - pendingOrders);

  const totalRevenue = sum(revenue);
  const averageOrderValue =
    totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const refunds = Math.round(totalRevenue * 0.012);

  const usersChange = calculateChange(firstUsers, totalUsers);
  const ordersChange = calculateChange(
    orders[0] ?? 0,
    orders[orders.length - 1] ?? 0,
  );
  const revenueChange = calculateChange(
    revenue[0] ?? 0,
    revenue[revenue.length - 1] ?? 0,
  );

  return [
    {
      id: 'users',
      label: 'Users',
      value: totalUsers,
      format: 'number',
      change: usersChange,
      trend: trendFromChange(usersChange),
      comparisonLabel,
      details: [
        { label: 'Active', value: activeUsers, format: 'number' },
        { label: 'New', value: newUsers, format: 'number' },
      ],
    },
    {
      id: 'active-users',
      label: 'Active users',
      value: activeUsers,
      format: 'number',
      change: usersChange,
      trend: trendFromChange(usersChange),
      comparisonLabel,
      details: [
        {
          label: 'Returning',
          value: Math.round(activeUsers * 0.74),
          format: 'number',
        },
        { label: 'New', value: newUsers, format: 'number' },
      ],
    },
    {
      id: 'orders',
      label: 'Orders',
      value: totalOrders,
      format: 'number',
      change: ordersChange,
      trend: trendFromChange(ordersChange),
      comparisonLabel,
      details: [
        { label: 'Pending', value: pendingOrders, format: 'number' },
        { label: 'Completed', value: completedOrders, format: 'number' },
      ],
    },
    {
      id: 'revenue',
      label: 'Revenue',
      value: totalRevenue,
      format: 'currency',
      currency: 'USD',
      change: revenueChange,
      trend: trendFromChange(revenueChange),
      comparisonLabel,
      details: [
        {
          label: 'Avg. order',
          value: averageOrderValue,
          format: 'currency',
        },
        { label: 'Refunds', value: refunds, format: 'currency' },
      ],
    },
  ];
}

export function getMetricsChart(range: MetricsRange): MetricsChart {
  const { buckets, users, orders, revenue } = buildSeriesData(range);

  const series: MetricsChartSeries[] = [
    {
      id: 'users',
      label: 'Users',
      format: 'number',
      points: toPoints(buckets, users),
    },
    {
      id: 'orders',
      label: 'Orders',
      format: 'number',
      points: toPoints(buckets, orders),
    },
    {
      id: 'revenue',
      label: 'Revenue',
      format: 'currency',
      points: toPoints(buckets, revenue),
    },
  ];

  return {
    range,
    kind: 'area',
    series,
  };
}

export function getMetricsLogs({
  range = '7d',
  level = 'all',
  limit = 10,
  cursor,
}: MetricsLogsQuery = {}): MetricsLogsResponse {
  const config = RANGE_CONFIG[range];
  const rangeStart = MOCK_NOW - config.points * config.bucketMs;

  const filtered = MOCK_LOGS.filter((entry) => {
    const timestamp = Date.parse(entry.timestamp);
    const inRange = Number.isFinite(timestamp) && timestamp >= rangeStart;
    const matchesLevel = level === 'all' || entry.level === level;

    return inRange && matchesLevel;
  });

  const requestedLimit = Number.isFinite(limit) ? Math.trunc(limit) : 10;
  const safeLimit = Math.min(Math.max(requestedLimit, 1), 50);

  const parsedCursor = cursor ? Number.parseInt(cursor, 10) : 0;
  const offset =
    Number.isFinite(parsedCursor) && parsedCursor > 0 ? parsedCursor : 0;

  const entries = filtered.slice(offset, offset + safeLimit);
  const nextOffset = offset + entries.length;

  return {
    generatedAt: new Date(MOCK_NOW).toISOString(),
    range,
    entries,
    total: filtered.length,
    nextCursor: nextOffset < filtered.length ? String(nextOffset) : null,
  };
}

export function getMetricsDashboard(
  range: MetricsRange = '7d',
): MetricsDashboardResponse {
  return {
    generatedAt: new Date(MOCK_NOW).toISOString(),
    range,
    kpis: getMetricsKpis(range),
    chart: getMetricsChart(range),
    logs: getMetricsLogs({ range, limit: 10 }),
  };
}
