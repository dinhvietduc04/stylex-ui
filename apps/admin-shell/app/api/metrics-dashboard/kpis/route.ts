import type { MetricsKpisResponse } from '@repo/api-contracts';
import { requireMetricsAccess } from '@/lib/metrics-dashboard/auth';
import { metricsError, metricsJson } from '@/lib/metrics-dashboard/http';
import { getMetricsKpis } from '@/lib/metrics-dashboard/mock-data';
import { parseMetricsRangeQuery } from '@/lib/metrics-dashboard/query';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const access = await requireMetricsAccess();

  if (!access.ok) {
    return access.response;
  }

  const { searchParams } = new URL(request.url);
  const parsed = parseMetricsRangeQuery(searchParams);

  if (!parsed.ok) {
    return metricsError(parsed.error, 400);
  }

  const response: MetricsKpisResponse = {
    generatedAt: new Date().toISOString(),
    range: parsed.value.range,
    kpis: getMetricsKpis(parsed.value.range),
  };

  return metricsJson(response);
}
