'use client';

import { useMemo } from 'react';
import type { MetricsChart, MetricsChartSeries } from '@repo/api-contracts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  SimpleSelect,
  Text,
} from '@repo/stylex-ui';
import {
  Chart,
  type ChartColorRole,
  type ChartSeries,
} from '@repo/stylex-ui/charts';

const SERIES_COLORS: Record<string, ChartColorRole> = {
  users: 'success',
  orders: 'info',
  revenue: 'brand',
};

interface MetricsChartProps {
  chart: MetricsChart;
  seriesId: string;
  loading?: boolean;
  onSeriesChange: (seriesId: string) => void;
}

interface ChartRow {
  label: string;
  value: number;
  timestamp: string;
}

function getSelectedSeries(
  chart: MetricsChart,
  seriesId: string,
): MetricsChartSeries | undefined {
  return (
    chart.series.find((series) => series.id === seriesId) ?? chart.series[0]
  );
}

export function MetricsChart({
  chart,
  seriesId,
  loading = false,
  onSeriesChange,
}: MetricsChartProps) {
  const selectedSeries = getSelectedSeries(chart, seriesId);

  const seriesOptions = chart.series.map((series) => ({
    value: series.id,
    label: series.label,
  }));

  const rows = useMemo<ChartRow[]>(
    () =>
      selectedSeries?.points.map((point) => ({
        label: point.label,
        value: point.value,
        timestamp: point.timestamp,
      })) ?? [],
    [selectedSeries],
  );

  const chartSeries = useMemo<ChartSeries<ChartRow>[]>(
    () =>
      selectedSeries
        ? [
            {
              key: 'value',
              label: selectedSeries.label,
              color: SERIES_COLORS[selectedSeries.id] ?? 'brand',
              format: selectedSeries.format,
            },
          ]
        : [],
    [selectedSeries],
  );

  const chartType =
    chart.kind === 'bar' ? 'bar' : chart.kind === 'area' ? 'area' : 'line';

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <CardTitle>Trend</CardTitle>
            <CardDescription>
              Users, orders, and revenue over the selected range.
            </CardDescription>
          </div>

          <div className="w-full sm:w-40">
            <SimpleSelect
              aria-label="Select chart metric"
              options={seriesOptions}
              value={selectedSeries?.id ?? seriesId}
              onValueChange={onSeriesChange}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {selectedSeries ? (
          <Chart
            type={chartType}
            data={rows}
            xKey="label"
            xLabel="Period"
            series={chartSeries}
            height={260}
            loading={loading}
            ariaLabel={`${selectedSeries.label} over the selected range`}
            ariaDescription={`${selectedSeries.label} values from ${
              rows[0]?.label ?? 'the start'
            } to ${rows[rows.length - 1]?.label ?? 'the end'}.`}
            emptyMessage="No chart data for this range."
          />
        ) : (
          <Text tone="muted">No chart data for this range.</Text>
        )}
      </CardContent>
    </Card>
  );
}
