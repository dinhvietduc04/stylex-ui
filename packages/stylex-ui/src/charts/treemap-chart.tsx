'use client';

import * as React from 'react';
import { ChartDataTable } from './components/chart-data-table';
import { ChartLegend } from './components/chart-legend';
import { ChartSkeleton } from './components/chart-skeleton';
import { ChartViewport } from './components/chart-viewport';
import type { TreemapImplProps } from './impl/recharts/treemap-impl';
import {
  buildCategoryLegend,
  buildCategoryRows,
  buildCategorySeries,
} from './lib/category-data';
import { chartLoaders } from './lib/chart-loaders';
import type { TreemapChartProps } from './types';

const TreemapImpl = React.lazy(chartLoaders.treemap) as unknown as <
  TDatum extends object,
>(
  props: TreemapImplProps<TDatum>,
) => React.ReactElement;

export function TreemapChart<TDatum extends object>({
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
  aspectRatio,
  renderTooltip,
  className,
  style,
  sx,
}: TreemapChartProps<TDatum>) {
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
          <TreemapImpl
            data={data}
            nameKey={nameKey}
            valueKey={valueKey}
            format={format}
            currency={currency}
            colors={colors}
            aspectRatio={aspectRatio}
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

TreemapChart.displayName = 'TreemapChart';
