import * as stylex from '@stylexjs/stylex';
import { formatChartValue } from '../lib/format';
import type { ChartDataTableProps, ChartValueFormat } from '../types';

const styles = stylex.create({
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
    borderWidth: 0,
  },
  table: {
    borderCollapse: 'collapse',
  },
});

function formatCellValue(
  value: unknown,
  format: ChartValueFormat | undefined,
  currency: string | undefined,
  locale: string,
): string {
  if (typeof value === 'number') {
    return formatChartValue(value, {
      format,
      currency,
      locale,
    });
  }

  if (typeof value === 'string') {
    return value;
  }

  return '—';
}

export function ChartDataTable<TDatum extends object>({
  data,
  xKey,
  xLabel = 'Category',
  xFormat,
  xCurrency,
  series,
  caption,
  locale = 'en-US',
}: ChartDataTableProps<TDatum>) {
  if (data.length === 0 || series.length === 0) {
    return null;
  }

  return (
    <table {...stylex.props(styles.table, styles.srOnly)}>
      <caption>{caption}</caption>
      <thead>
        <tr>
          <th scope="col">{xLabel}</th>
          {series.map((item) => (
            <th key={item.key} scope="col">
              {item.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((datum, index) => (
          <tr key={`${String(datum[xKey])}-${index}`}>
            <th scope="row">
              {formatCellValue(datum[xKey], xFormat, xCurrency, locale)}
            </th>
            {series.map((item) => (
              <td key={item.key}>
                {formatCellValue(
                  datum[item.key],
                  item.format,
                  item.currency,
                  locale,
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

ChartDataTable.displayName = 'ChartDataTable';
