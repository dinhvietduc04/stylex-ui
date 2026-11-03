export const METRICS_RANGES = ['24h', '7d', '30d', '90d'] as const;
export const METRICS_LOG_LEVELS = ['debug', 'info', 'warn', 'error'] as const;

export type MetricsRange = (typeof METRICS_RANGES)[number];
export type MetricsLogLevel = (typeof METRICS_LOG_LEVELS)[number];
export type MetricsLogLevelFilter = MetricsLogLevel | 'all';
export type MetricsValueFormat = 'number' | 'currency' | 'percent';
export type MetricsTrend = 'up' | 'down' | 'flat';

export interface MetricsKpiDetail {
  label: string;
  value: number;
  format: MetricsValueFormat;
}

export interface MetricsKpi {
  id: string;
  label: string;
  value: number;
  format: MetricsValueFormat;
  currency?: string;
  change: number;
  trend: MetricsTrend;
  comparisonLabel: string;
  details?: MetricsKpiDetail[];
}

export interface MetricsChartPoint {
  timestamp: string;
  label: string;
  value: number;
}

export interface MetricsChartSeries {
  id: string;
  label: string;
  format: MetricsValueFormat;
  points: MetricsChartPoint[];
}

export interface MetricsChart {
  range: MetricsRange;
  kind: 'line' | 'area' | 'bar';
  series: MetricsChartSeries[];
}

export interface MetricsLogEntry {
  id: string;
  timestamp: string;
  level: MetricsLogLevel;
  message: string;
  source: string;
  actor?: string;
}

export interface MetricsKpisResponse {
  generatedAt: string;
  range: MetricsRange;
  kpis: MetricsKpi[];
}

export interface MetricsChartResponse {
  generatedAt: string;
  range: MetricsRange;
  chart: MetricsChart;
}

export interface MetricsLogsResponse {
  generatedAt: string;
  range: MetricsRange;
  entries: MetricsLogEntry[];
  total: number;
  nextCursor: string | null;
}

export interface MetricsDashboardResponse {
  generatedAt: string;
  range: MetricsRange;
  kpis: MetricsKpi[];
  chart: MetricsChart;
  logs: MetricsLogsResponse;
}

export interface MetricsLogsQuery {
  range?: MetricsRange;
  level?: MetricsLogLevelFilter;
  limit?: number;
  cursor?: string;
}
