'use client';

import * as React from 'react';
import { ChartDataTable } from './components/chart-data-table';
import { ChartLegend } from './components/chart-legend';
import { ChartSkeleton } from './components/chart-skeleton';
import { ChartViewport } from './components/chart-viewport';
import type { RadarImplProps } from './impl/recharts/radar-impl';
import { chartLoaders } from './lib/chart-loaders';
import { useChartVisibility } from './lib/use-chart-visibility';
import type { RadarChartProps } from './types';

const RadarImpl = React.lazy(chartLoaders.radar) as unknown as <
  TDatum extends object,
>(
  props: RadarImplProps<TDatum>,
) => React.ReactElement;

export function RadarChart<TDatum extends object>({
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
  maxValue,
  showDots = false,
  fillOpacity,
  className,
  style,
  sx,
}: RadarChartProps<TDatum>) {
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
          <RadarImpl
            data={data}
            xKey={xKey}
            series={visibleSeries}
            ariaDescription={ariaDescription}
            locale={locale}
            animate={animate}
            showGrid={showGrid}
            renderTooltip={renderTooltip}
            maxValue={maxValue}
            showDots={showDots}
            fillOpacity={fillOpacity}
          />
        </React.Suspense>
      ) : null}
    </ChartViewport>
  );
}

RadarChart.displayName = 'RadarChart';
