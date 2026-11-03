'use client';

import * as React from 'react';
import { ChartDataTable } from './components/chart-data-table';
import { ChartLegend } from './components/chart-legend';
import { ChartSkeleton } from './components/chart-skeleton';
import { ChartViewport } from './components/chart-viewport';
import type { LineImplProps } from './impl/recharts/line-impl';
import { chartLoaders } from './lib/chart-loaders';
import { useChartVisibility } from './lib/use-chart-visibility';
import type { LineChartProps } from './types';

const LineImpl = React.lazy(chartLoaders.line) as unknown as <
  TDatum extends object,
>(
  props: LineImplProps<TDatum>,
) => React.ReactElement;

export function LineChart<TDatum extends object>({
  data,
  xKey,
  xLabel,
  series,
  height = 320,
  ariaLabel,
  ariaDescription,
  loading = false,
  error,
  emptyMessage,
  showLegend,
  showGrid = true,
  showDataTable = true,
  animate = true,
  locale = 'en-US',
  renderTooltip,
  curve = 'monotone',
  showDots = false,
  className,
  style,
  sx,
}: LineChartProps<TDatum>) {
  const { hiddenSeries, visibleSeries, toggleSeries } =
    useChartVisibility(series);

  const hasData = data.length > 0;
  const hasVisibleSeries = visibleSeries.length > 0;
  const legendVisible = showLegend ?? series.length > 1;
  const resolvedEmptyMessage =
    hasData && !hasVisibleSeries ? 'No series selected.' : emptyMessage;

  return (
    <ChartViewport
      height={height}
      ariaLabel={ariaLabel}
      ariaDescription={ariaDescription}
      loading={loading}
      error={error}
      isEmpty={!hasData || !hasVisibleSeries}
      emptyMessage={resolvedEmptyMessage}
      legend={
        legendVisible ? (
          <ChartLegend
            series={series}
            hiddenSeries={[...hiddenSeries]}
            onToggleSeries={toggleSeries}
          />
        ) : null
      }
      dataTable={
        showDataTable ? (
          <ChartDataTable
            data={data}
            xKey={xKey}
            xLabel={xLabel}
            series={series}
            caption={ariaLabel}
            locale={locale}
          />
        ) : null
      }
      className={className}
      style={style}
      sx={sx}
    >
      {hasData && hasVisibleSeries ? (
        <React.Suspense fallback={<ChartSkeleton height="100%" />}>
          <LineImpl
            data={data}
            xKey={xKey}
            series={visibleSeries}
            ariaDescription={ariaDescription}
            locale={locale}
            animate={animate}
            showGrid={showGrid}
            renderTooltip={renderTooltip}
            curve={curve}
            showDots={showDots}
          />
        </React.Suspense>
      ) : null}
    </ChartViewport>
  );
}

LineChart.displayName = 'LineChart';
