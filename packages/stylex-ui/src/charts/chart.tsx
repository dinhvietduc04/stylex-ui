'use client';

import { AreaChart } from './area-chart';
import { BarChart } from './bar-chart';
import { ComposedChart } from './composed-chart';
import { DonutChart } from './donut-chart';
import { FunnelChart } from './funnel-chart';
import { LineChart } from './line-chart';
import { RadarChart } from './radar-chart';
import { RadialChart } from './radial-chart';
import { SankeyChart } from './sankey-chart';
import { ScatterChart } from './scatter-chart';
import { TreemapChart } from './treemap-chart';
import type { ChartProps } from './types';

export function Chart<TDatum extends object>(props: ChartProps<TDatum>) {
  switch (props.type) {
    case 'area':
      return <AreaChart {...props} />;
    case 'bar':
      return <BarChart {...props} />;
    case 'composed':
      return <ComposedChart {...props} />;
    case 'donut':
      return <DonutChart {...props} />;
    case 'funnel':
      return <FunnelChart {...props} />;
    case 'radar':
      return <RadarChart {...props} />;
    case 'radial':
      return <RadialChart {...props} />;
    case 'sankey':
      return <SankeyChart {...props} />;
    case 'scatter':
      return <ScatterChart {...props} />;
    case 'treemap':
      return <TreemapChart {...props} />;
    case 'line':
    default:
      return <LineChart {...props} />;
  }
}

Chart.displayName = 'Chart';
