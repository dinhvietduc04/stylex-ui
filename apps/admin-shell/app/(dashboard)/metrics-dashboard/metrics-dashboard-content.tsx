'use client';

import { useState } from 'react';
import type { MetricsRange } from '@repo/api-contracts';
import {
  Button,
  Card,
  CardContent,
  Heading,
  Icon,
  SimpleSelect,
  Text,
} from '@repo/stylex-ui';
import { RefreshCw } from 'lucide-react';
import { ActivityLog } from './components/activity-log';
import { KpiCard } from './components/kpi-card';
import { MetricsChart } from './components/metrics-chart';
import {
  KpiCardSkeleton,
  MetricsChartSkeleton,
  OrderStatusChartSkeleton,
} from './components/metrics-skeletons';
import { OrderStatusChart } from './components/order-status-chart';
import { useMetricsDashboard } from './use-metrics-dashboard';

const RANGE_OPTIONS = [
  { value: '24h', label: 'Last 24 hours' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
];

export function MetricsDashboardContent() {
  const {
    data,
    logs,
    range,
    logLevel,
    status,
    logsStatus,
    error,
    logsError,
    changeRange,
    refresh,
    changeLogLevel,
    loadMoreLogs,
    retryLogs,
  } = useMetricsDashboard();

  const [chartSeriesId, setChartSeriesId] = useState('revenue');
  const [isTestingSkeleton, setIsTestingSkeleton] = useState(true);
  
  return (
    <div className="space-y-6" aria-busy={status === 'loading'}>
      <p className="sr-only" role="status">
        {status === 'loading'
          ? data
            ? 'Updating metrics dashboard.'
            : 'Loading metrics dashboard.'
          : ''}
      </p>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Heading level={1}>Metrics dashboard</Heading>
          <Text tone="secondary">
            Users, orders, revenue, and recent activity at a glance.
          </Text>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="w-full sm:w-48">
            <SimpleSelect
              aria-label="Metrics range"
              options={RANGE_OPTIONS}
              value={range}
              onValueChange={(value) => changeRange(value as MetricsRange)}
            />
          </div>

          <Button
            variant="outline"
            onClick={refresh}
            isLoading={status === 'loading'}
            leftIcon={<Icon icon={RefreshCw} size="sm" />}
          >
            Refresh
          </Button>
        </div>
      </div>

      {error ? (
        <Card>
          <CardContent>
            <div
              role="alert"
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <Text tone="error">{error}</Text>
              <Button variant="outline" size="sm" onClick={refresh}>
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {!data && status === 'error' ? null : (
        <>
          <section
            aria-label="Key metrics"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {data
              ? data.kpis.map((kpi) => <KpiCard key={kpi.id} kpi={kpi} />)
              : Array.from({ length: 4 }).map((_, index) => (
                  <KpiCardSkeleton key={index} />
                ))}
          </section>

          <div className="grid gap-6 xl:grid-cols-3 xl:items-start">
            <div className="xl:col-span-2">
              {data ? (
                <MetricsChart
                  chart={data.chart}
                  seriesId={chartSeriesId}
                  loading={status === 'loading'}
                  onSeriesChange={setChartSeriesId}
                />
              ) : (
                <MetricsChartSkeleton />
              )}
            </div>

            {data ? (
              <OrderStatusChart
                kpis={data.kpis}
                loading={status === 'loading'}
              />
            ) : (
              <OrderStatusChartSkeleton />
            )}
          </div>

          <ActivityLog
            logs={logs}
            level={logLevel}
            status={logsStatus}
            error={logsError}
            onLevelChange={changeLogLevel}
            onLoadMore={loadMoreLogs}
            onRetry={retryLogs}
          />
        </>
      )}
    </div>
  );
}
