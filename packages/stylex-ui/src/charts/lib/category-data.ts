import { chartSeriesRoleOrder } from '../theme/chart-theme';
import type {
  ChartColorRole,
  ChartLegendItem,
  ChartSeries,
  ChartValueFormat,
} from '../types';

export interface CategoryRow {
  label: string;
  value: number;
}

export function buildCategoryRows<TDatum extends object>(
  data: readonly TDatum[],
  nameKey: keyof TDatum & string,
  valueKey: keyof TDatum & string,
): CategoryRow[] {
  return data.map((datum, index) => ({
    label: String(datum[nameKey] ?? index),
    value: Number(datum[valueKey]),
  }));
}

export function buildCategorySeries(
  format?: ChartValueFormat,
  currency?: string,
): ChartSeries<CategoryRow>[] {
  return [{ key: 'value', label: 'Value', format, currency }];
}

export function buildCategoryLegend<TDatum extends object>(
  data: readonly TDatum[],
  nameKey: keyof TDatum & string,
  colors?: readonly ChartColorRole[],
): ChartLegendItem[] {
  return data.map((datum, index) => ({
    key: `${String(datum[nameKey] ?? index)}-${index}`,
    label: String(datum[nameKey] ?? ''),
    color:
      colors?.[index] ??
      chartSeriesRoleOrder[index % chartSeriesRoleOrder.length] ??
      'series1',
  }));
}
