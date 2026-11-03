import type { MetricsKpi } from '@repo/api-contracts';
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Heading,
  Icon,
  Text,
  semanticTokens,
} from '@repo/stylex-ui';
import {
  Activity,
  DollarSign,
  Minus,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  UserCheck,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { formatChange, formatMetricValue, trendVariant } from '../format';

const KPI_ICONS: Record<string, LucideIcon> = {
  users: Users,
  'active-users': UserCheck,
  orders: ShoppingCart,
  revenue: DollarSign,
};

const TREND_ICONS = {
  up: TrendingUp,
  down: TrendingDown,
  flat: Minus,
} as const;

interface KpiCardProps {
  kpi: MetricsKpi;
}

export function KpiCard({ kpi }: KpiCardProps) {
  const KpiIcon = KPI_ICONS[kpi.id] ?? Activity;
  const TrendIcon = TREND_ICONS[kpi.trend];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <CardTitle>{kpi.label}</CardTitle>
            <Text size="sm" tone="muted">
              {kpi.comparisonLabel}
            </Text>
          </div>
          <Icon icon={KpiIcon} size="lg" tone="muted" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
          <Heading level={2}>
            {formatMetricValue(kpi.value, kpi.format, kpi.currency)}
          </Heading>

          <Badge variant={trendVariant(kpi.trend)} size="sm">
            <Icon icon={TrendIcon} size="xs" />
            {formatChange(kpi.change)}
          </Badge>
        </div>

        {kpi.details?.length ? (
          <dl
            className="mt-4 grid grid-cols-2 gap-3 border-t pt-4"
            style={{ borderColor: semanticTokens.borderSubtle }}
          >
            {kpi.details.map((detail) => (
              <div key={detail.label}>
                <dt>
                  <Text as="span" size="sm" tone="muted">
                    {detail.label}
                  </Text>
                </dt>
                <dd>
                  <Text as="span" size="sm" weight="semibold">
                    {formatMetricValue(
                      detail.value,
                      detail.format,
                      kpi.currency,
                    )}
                  </Text>
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </CardContent>
    </Card>
  );
}
