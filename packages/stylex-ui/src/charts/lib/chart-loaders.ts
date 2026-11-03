import type { ChartType } from '../types';

/**
 * Single source of truth for per-chart async chunks. Wrappers and
 * `preloadChart` both point at the same dynamic imports so the bundler emits
 * one chunk per implementation.
 */
export const chartLoaders = {
  line: () => import('../impl/recharts/line-impl'),
  area: () => import('../impl/recharts/area-impl'),
  bar: () => import('../impl/recharts/bar-impl'),
  donut: () => import('../impl/recharts/donut-impl'),
  composed: () => import('../impl/recharts/composed-impl'),
  radar: () => import('../impl/recharts/radar-impl'),
  radial: () => import('../impl/recharts/radial-impl'),
  treemap: () => import('../impl/recharts/treemap-impl'),
  funnel: () => import('../impl/recharts/funnel-impl'),
  scatter: () => import('../impl/recharts/scatter-impl'),
  sankey: () => import('../impl/recharts/sankey-impl'),
} as const;

/**
 * Warm a chart chunk before render. The promise resolves once the module (and
 * therefore the engine code it needs) has been fetched.
 */
export function preloadChart(type: ChartType): Promise<unknown> {
  return chartLoaders[type]();
}
