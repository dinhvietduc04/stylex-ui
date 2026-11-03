'use client';

import type * as React from 'react';
import {
  ResponsiveContainer,
  Sankey,
  Tooltip,
  useChartWidth,
  type SankeyNodeProps,
} from 'recharts';
import {
  chartSeriesRoleOrder,
  chartTheme,
  resolveChartCategoryColor,
} from '../../theme/chart-theme';
import type {
  ChartColorRole,
  ChartTooltipPayload,
  ChartValueFormat,
  SankeyChartLink,
  SankeyChartNode,
} from '../../types';
import { SankeyTooltipContent } from './shared/tooltip-content';

export interface SankeyImplProps {
  nodes: readonly SankeyChartNode[];
  links: readonly SankeyChartLink[];
  format?: ChartValueFormat;
  currency?: string;
  nodeWidth?: number;
  nodePadding?: number;
  ariaDescription?: string;
  locale?: string;
  animate?: boolean;
  renderTooltip?: (
    payload: ChartTooltipPayload<SankeyChartLink>,
  ) => React.ReactNode;
}

interface SankeyDataLink {
  source: number;
  target: number;
  value: number;
}

interface SankeyNodeShapeProps extends SankeyNodeProps {
  nodes: readonly SankeyChartNode[];
  colorByName: ReadonlyMap<string, string>;
}

function SankeyNodeShape({
  x,
  y,
  width,
  height,
  index,
  payload,
  nodes,
  colorByName,
}: SankeyNodeShapeProps) {
  const chartWidth = useChartWidth() ?? 0;
  const name = String(payload?.name ?? nodes[index]?.name ?? '');
  const fill =
    colorByName.get(name) ?? resolveChartCategoryColor(undefined, index);
  const anchor =
    chartWidth > 0 && x + width / 2 > chartWidth / 2 ? 'end' : 'start';
  const textX = anchor === 'end' ? x - 6 : x + width + 6;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={chartTheme.barRadius}
        fill={fill}
      />
      {name ? (
        <text
          x={textX}
          y={y + height / 2}
          textAnchor={anchor}
          dominantBaseline="central"
          fill={chartTheme.axisLabel}
          fontFamily={chartTheme.fontFamily}
          fontSize={chartTheme.fontSize}
        >
          {name}
        </text>
      ) : null}
    </g>
  );
}

function resolveNodeIndex(
  reference: string | number,
  indexByName: ReadonlyMap<string, number>,
  nodeCount: number,
): number | undefined {
  if (typeof reference === 'number') {
    return Number.isInteger(reference) &&
      reference >= 0 &&
      reference < nodeCount
      ? reference
      : undefined;
  }

  return indexByName.get(reference);
}

export default function SankeyImpl({
  nodes,
  links,
  format,
  currency,
  nodeWidth = 12,
  nodePadding = 12,
  ariaDescription,
  locale,
  renderTooltip,
}: SankeyImplProps) {
  const indexByName = new Map(nodes.map((node, index) => [node.name, index]));
  const nodeColors: ChartColorRole[] = nodes.map(
    (node, index) =>
      node.color ??
      chartSeriesRoleOrder[index % chartSeriesRoleOrder.length] ??
      'series1',
  );
  const colorByName = new Map(
    nodes.map((node, index) => [
      node.name,
      resolveChartCategoryColor(nodeColors, index),
    ]),
  );
  const resolvedLinks = links.flatMap<SankeyDataLink>((link) => {
    const source = resolveNodeIndex(link.source, indexByName, nodes.length);
    const target = resolveNodeIndex(link.target, indexByName, nodes.length);

    if (
      source === undefined ||
      target === undefined ||
      source === target ||
      !Number.isFinite(link.value)
    ) {
      return [];
    }

    return [{ source, target, value: link.value }];
  });

  const renderNode = (props: SankeyNodeProps): React.ReactElement => (
    <SankeyNodeShape {...props} nodes={nodes} colorByName={colorByName} />
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <Sankey
        data={{
          nodes: nodes.map((node) => ({ name: node.name })),
          links: resolvedLinks,
        }}
        nameKey="name"
        dataKey="value"
        node={renderNode}
        link={{
          fill: chartTheme.cursor,
          fillOpacity: 0.18,
        }}
        nodeWidth={nodeWidth}
        nodePadding={nodePadding}
        linkCurvature={0.5}
        accessibilityLayer
        desc={ariaDescription}
        style={{ fontFamily: chartTheme.fontFamily }}
      >
        <Tooltip
          content={
            <SankeyTooltipContent
              nodes={nodes}
              format={format}
              currency={currency}
              locale={locale}
              renderTooltip={renderTooltip}
            />
          }
          cursor={false}
          contentStyle={{
            background: 'transparent',
            border: 'none',
            padding: 0,
            boxShadow: 'none',
          }}
          isAnimationActive={false}
        />
      </Sankey>
    </ResponsiveContainer>
  );
}
