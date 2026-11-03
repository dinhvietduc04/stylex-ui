'use client';

import * as React from 'react';
import { ChartDataTable } from './components/chart-data-table';
import { ChartLegend } from './components/chart-legend';
import { ChartSkeleton } from './components/chart-skeleton';
import { ChartViewport } from './components/chart-viewport';
import type { DonutImplProps } from './impl/recharts/shared/types';
import {
  buildCategoryLegend,
  buildCategoryRows,
  buildCategorySeries,
} from './lib/category-data';
import { chartLoaders } from './lib/chart-loaders';
import type { DonutChartProps } from './types';

const DonutImpl = React.lazy(chartLoaders.donut) as unknown as <
  TDatum extends object,
>(
  props: DonutImplProps<TDatum>,
) => React.ReactElement;

export function DonutChart<TDatum extends object>({
  data,
  nameKey,
  valueKey,
  height = 320,
  ariaLabel,
  ariaDescription,
  loading = false,
  error,
  emptyMessage,
  showLegend,
  showDataTable = true,
  animate = true,
  locale = 'en-US',
  format,
  currency,
  colors,
  innerRadius,
  outerRadius,
  centerLabel,
  renderTooltip,
  className,
  style,
  sx,
}: DonutChartProps<TDatum>) {
  const legendSeries = buildCategoryLegend(data, nameKey, colors);
  const tableData = buildCategoryRows(data, nameKey, valueKey);
  const tableSeries = buildCategorySeries(format, currency);
  const legendVisible = showLegend ?? data.length > 1;

  return (
    <ChartViewport
      height={height}
      ariaLabel={ariaLabel}
      ariaDescription={ariaDescription}
      loading={loading}
      error={error}
      isEmpty={data.length === 0}
      emptyMessage={emptyMessage}
      legend={legendVisible ? <ChartLegend series={legendSeries} /> : null}
      dataTable={
        showDataTable ? (
          <ChartDataTable
            data={tableData}
            xKey="label"
            xLabel="Category"
            series={tableSeries}
            caption={ariaLabel}
            locale={locale}
          />
        ) : null
      }
      className={className}
      style={style}
      sx={sx}
    >
      {data.length > 0 ? (
        <React.Suspense fallback={<ChartSkeleton height="100%" />}>
          <DonutImpl
            data={data}
            nameKey={nameKey}
            valueKey={valueKey}
            format={format}
            currency={currency}
            colors={colors}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            centerLabel={centerLabel}
            ariaDescription={ariaDescription}
            locale={locale}
            animate={animate}
            renderTooltip={renderTooltip}
          />
        </React.Suspense>
      ) : null}
    </ChartViewport>
  );
}

DonutChart.displayName = 'DonutChart';
