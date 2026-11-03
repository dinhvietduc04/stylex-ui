import type { MetricsLogsResponse } from '@repo/api-contracts';
import { requireMetricsAccess } from '@/lib/metrics-dashboard/auth';
import { metricsError, metricsJson } from '@/lib/metrics-dashboard/http';
import { getMetricsLogs } from '@/lib/metrics-dashboard/mock-data';
import { parseMetricsLogsQuery } from '@/lib/metrics-dashboard/query';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const access = await requireMetricsAccess();

  if (!access.ok) {
    return access.response;
  }

  const { searchParams } = new URL(request.url);
  const parsed = parseMetricsLogsQuery(searchParams);

  if (!parsed.ok) {
    return metricsError(parsed.error, 400);
  }

  const response: MetricsLogsResponse = getMetricsLogs(parsed.value);

  return metricsJson(response);
}
