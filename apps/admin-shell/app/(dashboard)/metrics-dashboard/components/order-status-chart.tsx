'use client';

import type { MetricsKpi } from '@repo/api-contracts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Text,
} from '@repo/stylex-ui';
import {
  DonutChart,
  type ChartColorRole,
} from '@repo/stylex-ui/charts';
import { formatCompactValue } from '../format';

interface OrderStatusChartProps {
  kpis: readonly MetricsKpi[];
  loading?: boolean;
}

interface OrderStatusRow {
  name: string;
  value: number;
  color: ChartColorRole;
}

const ORDER_STATUS_COLORS: Record<string, ChartColorRole> = {
  Pending: 'warning',
  Completed: 'success',
};

export function OrderStatusChart({
  kpis,
  loading = false,
}: OrderStatusChartProps) {
  const ordersKpi = kpis.find((kpi) => kpi.id === 'orders');
  const rows: OrderStatusRow[] =
    ordersKpi?.details
      ?.filter((detail) => detail.value > 0)
      .map((detail) => ({
        name: detail.label,
        value: detail.value,
        color: ORDER_STATUS_COLORS[detail.label] ?? 'neutral',
      })) ?? [];
  const colors = rows.map((row) => row.color);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order status</CardTitle>
        <CardDescription>
          Completed and pending orders for the selected range.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {ordersKpi && rows.length > 0 ? (
          <DonutChart
            data={rows}
            nameKey="name"
            valueKey="value"
            height={224}
            format="number"
            colors={colors}
            centerLabel={formatCompactValue(ordersKpi.value, 'number')}
            loading={loading}
            ariaLabel="Order status breakdown"
            ariaDescription="Completed and pending orders for the selected range."
            emptyMessage="No order data for this range."
          />
        ) : (
          <Text tone="muted">No order data for this range.</Text>
        )}
      </CardContent>
    </Card>
  );
}
