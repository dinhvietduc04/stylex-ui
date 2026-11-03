'use client';

import * as React from 'react';
import { ChartDataTable } from './components/chart-data-table';
import { ChartLegend } from './components/chart-legend';
import { ChartSkeleton } from './components/chart-skeleton';
import { ChartViewport } from './components/chart-viewport';
import type { SankeyImplProps } from './impl/recharts/sankey-impl';
import { chartLoaders } from './lib/chart-loaders';
import { chartSeriesRoleOrder } from './theme/chart-theme';
import type { ChartLegendItem, ChartSeries, SankeyChartProps } from './types';

const SankeyImpl = React.lazy(chartLoaders.sankey) as unknown as (
  props: SankeyImplProps,
) => React.ReactElement;

interface SankeyTableRow {
  path: string;
  value: number;
}

export function SankeyChart({
  nodes,
  links,
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
  nodeWidth,
  nodePadding,
  renderTooltip,
  className,
  style,
  sx,
}: SankeyChartProps) {
  const nodeName = (reference: string | number): string =>
    typeof reference === 'number'
      ? (nodes[reference]?.name ?? String(reference))
      : reference;

  const legendSeries: ChartLegendItem[] = nodes.map((node, index) => ({
    key: `${node.name}-${index}`,
    label: node.name,
    color:
      node.color ??
      chartSeriesRoleOrder[index % chartSeriesRoleOrder.length] ??
      'series1',
  }));

  const tableData: SankeyTableRow[] = links.map((link) => ({
    path: `${nodeName(link.source)} → ${nodeName(link.target)}`,
    value: link.value,
  }));

  const tableSeries: ChartSeries<SankeyTableRow>[] = [
    { key: 'value', label: 'Value', format, currency },
  ];

  const legendVisible = showLegend ?? nodes.length > 1;
  const isEmpty = nodes.length === 0 || links.length === 0;

  return (
    <ChartViewport
      height={height}
      ariaLabel={ariaLabel}
      ariaDescription={ariaDescription}
      loading={loading}
      error={error}
      isEmpty={isEmpty}
      emptyMessage={emptyMessage}
      legend={legendVisible ? <ChartLegend series={legendSeries} /> : null}
      dataTable={
        showDataTable ? (
          <ChartDataTable
            data={tableData}
            xKey="path"
            xLabel="Path"
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
      {isEmpty ? null : (
        <React.Suspense fallback={<ChartSkeleton height="100%" />}>
          <SankeyImpl
            nodes={nodes}
            links={links}
            format={format}
            currency={currency}
            nodeWidth={nodeWidth}
            nodePadding={nodePadding}
            ariaDescription={ariaDescription}
            locale={locale}
            animate={animate}
            renderTooltip={renderTooltip}
          />
        </React.Suspense>
      )}
    </ChartViewport>
  );
}

SankeyChart.displayName = 'SankeyChart';
