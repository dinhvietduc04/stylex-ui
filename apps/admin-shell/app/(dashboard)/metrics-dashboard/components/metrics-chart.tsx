'use client';

import { useId, useMemo } from 'react';
import type { MetricsChart, MetricsChartSeries } from '@repo/api-contracts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  SimpleSelect,
  Text,
  semanticTokens,
} from '@repo/stylex-ui';
import { formatCompactValue, formatMetricValue } from '../format';

const CHART_WIDTH = 720;
const CHART_HEIGHT = 260;

const PADDING = {
  top: 16,
  right: 16,
  bottom: 36,
  left: 56,
};

const SERIES_COLORS: Record<string, string> = {
  users: semanticTokens.statusSuccess,
  orders: semanticTokens.statusInfo,
  revenue: semanticTokens.brandPrimary,
};

interface MetricsChartProps {
  chart: MetricsChart;
  seriesId: string;
  onSeriesChange: (seriesId: string) => void;
}

interface ChartGeometry {
  series: MetricsChartSeries;
  color: string;
  coords: Array<{
    x: number;
    y: number;
    label: string;
    value: number;
  }>;
  linePath: string;
  areaPath: string;
  gridLines: Array<{ y: number; value: number }>;
  xLabels: Array<{ x: number; label: string }>;
  barWidth: number;
}

export function MetricsChart({
  chart,
  seriesId,
  onSeriesChange,
}: MetricsChartProps) {
  const rawId = useId();
  const gradientId = `metrics-chart-${rawId.replace(/:/g, '')}`;

  const seriesOptions = chart.series.map((series) => ({
    value: series.id,
    label: series.label,
  }));

  const geometry = useMemo<ChartGeometry | null>(() => {
    const series =
      chart.series.find((item) => item.id === seriesId) ?? chart.series[0];

    if (!series || series.points.length === 0) {
      return null;
    }

    const values = series.points.map((point) => point.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const spread = maxValue - minValue || Math.max(1, maxValue * 0.1);
    const paddedMin = Math.max(0, minValue - spread * 0.1);
    const paddedMax = maxValue + spread * 0.1;

    const innerWidth = CHART_WIDTH - PADDING.left - PADDING.right;
    const innerHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;
    const count = series.points.length;

    const coords = series.points.map((point, index) => {
      const x =
        count === 1
          ? PADDING.left + innerWidth / 2
          : PADDING.left + (index / (count - 1)) * innerWidth;

      const y =
        PADDING.top +
        innerHeight -
        ((point.value - paddedMin) / (paddedMax - paddedMin)) * innerHeight;

      return {
        x,
        y,
        label: point.label,
        value: point.value,
      };
    });

    const first = coords[0]!;
    const last = coords[coords.length - 1]!;

    const linePath = coords
      .map(({ x, y }, index) => `${index === 0 ? 'M' : 'L'} ${x} ${y}`)
      .join(' ');

    const areaPath = [
      `M ${first.x} ${PADDING.top + innerHeight}`,
      ...coords.map(({ x, y }) => `L ${x} ${y}`),
      `L ${last.x} ${PADDING.top + innerHeight}`,
      'Z',
    ].join(' ');

    const gridLines = Array.from({ length: 5 }, (_, index) => {
      const ratio = index / 4;

      return {
        y: PADDING.top + innerHeight * ratio,
        value: paddedMax - (paddedMax - paddedMin) * ratio,
      };
    });

    const middle = coords[Math.floor(coords.length / 2)]!;
    const xLabels = [
      { x: first.x, label: first.label },
      { x: middle.x, label: middle.label },
      { x: last.x, label: last.label },
    ].filter(
      (item, index, items) =>
        items.findIndex((candidate) => candidate.x === item.x) === index,
    );

    return {
      series,
      color: SERIES_COLORS[series.id] ?? semanticTokens.brandPrimary,
      coords,
      linePath,
      areaPath,
      gridLines,
      xLabels,
      barWidth: Math.max(4, (innerWidth / count) * 0.6),
    };
  }, [chart, seriesId]);

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
              value={geometry?.series.id ?? seriesId}
              onValueChange={onSeriesChange}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {geometry ? (
          <>
            <svg
              role="img"
              aria-labelledby={`${gradientId}-title`}
              aria-describedby={`${gradientId}-desc`}
              viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
              width="100%"
              className="h-auto min-h-[240px] w-full"
            >
              <title id={`${gradientId}-title`}>
                {geometry.series.label} over the selected range
              </title>
              <desc id={`${gradientId}-desc`}>
                {geometry.series.label} values from {geometry.xLabels[0]?.label}{' '}
                to {geometry.xLabels[geometry.xLabels.length - 1]?.label}.
              </desc>

              <defs>
                <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={geometry.color}
                    stopOpacity="0.28"
                  />
                  <stop
                    offset="100%"
                    stopColor={geometry.color}
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>

              {geometry.gridLines.map((line) => (
                <g key={line.y}>
                  <line
                    x1={PADDING.left}
                    x2={CHART_WIDTH - PADDING.right}
                    y1={line.y}
                    y2={line.y}
                    stroke={semanticTokens.borderSubtle}
                    strokeWidth="1"
                  />
                  <text
                    x={PADDING.left - 10}
                    y={line.y + 4}
                    textAnchor="end"
                    fontSize="11"
                    fill={semanticTokens.textMuted}
                  >
                    {formatCompactValue(line.value, geometry.series.format)}
                  </text>
                </g>
              ))}

              {chart.kind === 'bar' ? (
                geometry.coords.map(({ x, y, label, value }) => {
                  const baseline = CHART_HEIGHT - PADDING.bottom;
                  const height = baseline - y;

                  return (
                    <rect
                      key={`${label}-${x}`}
                      x={x - geometry.barWidth / 2}
                      y={y}
                      width={geometry.barWidth}
                      height={Math.max(0, height)}
                      rx="3"
                      fill={geometry.color}
                      opacity="0.85"
                    >
                      <title>
                        {label}:{' '}
                        {formatMetricValue(value, geometry.series.format)}
                      </title>
                    </rect>
                  );
                })
              ) : (
                <>
                  {chart.kind === 'area' ? (
                    <path d={geometry.areaPath} fill={`url(#${gradientId})`} />
                  ) : null}

                  <path
                    d={geometry.linePath}
                    fill="none"
                    stroke={geometry.color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </>
              )}

              {geometry.coords.map(({ x, y, label, value }) => (
                <circle
                  key={`${label}-${x}`}
                  cx={x}
                  cy={y}
                  r="3"
                  fill={geometry.color}
                  stroke={semanticTokens.bgSurface}
                  strokeWidth="1.5"
                >
                  <title>
                    {label}: {formatMetricValue(value, geometry.series.format)}
                  </title>
                </circle>
              ))}

              {geometry.xLabels.map(({ x, label }) => (
                <text
                  key={`${label}-${x}`}
                  x={x}
                  y={CHART_HEIGHT - 10}
                  textAnchor="middle"
                  fontSize="11"
                  fill={semanticTokens.textMuted}
                >
                  {label}
                </text>
              ))}
            </svg>

            <table className="sr-only">
              <caption>{geometry.series.label} data</caption>
              <thead>
                <tr>
                  <th scope="col">Period</th>
                  <th scope="col">Value</th>
                </tr>
              </thead>
              <tbody>
                {geometry.series.points.map((point) => (
                  <tr key={`${point.timestamp}-${point.label}`}>
                    <th scope="row">{point.label}</th>
                    <td>
                      {formatMetricValue(point.value, geometry.series.format)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <Text tone="muted">No chart data for this range.</Text>
        )}
      </CardContent>
    </Card>
  );
}
