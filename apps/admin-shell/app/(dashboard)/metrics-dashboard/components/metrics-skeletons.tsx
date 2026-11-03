import {
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  semanticTokens,
} from '@repo/stylex-ui';

/**
 * Skeletons for the metrics dashboard. Each one mirrors the final card
 * structure so the page does not jump when live data arrives.
 */

export function KpiCardSkeleton() {
  return (
    <Card aria-hidden="true">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="w-full space-y-2">
            <Skeleton variant="text" width="55%" height={14} />
            <Skeleton variant="text" width="78%" height={11} />
          </div>
          <Skeleton variant="circular" width={24} height={24} />
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
          <Skeleton variant="text" width={120} height={28} />
          <Skeleton variant="rounded" width={64} height={22} />
        </div>

        <div
          className="mt-4 grid grid-cols-2 gap-3 border-t pt-4"
          style={{ borderColor: semanticTokens.borderSubtle }}
        >
          {[0, 1].map((index) => (
            <div key={index} className="space-y-1.5">
              <Skeleton variant="text" width="60%" height={11} />
              <Skeleton variant="text" width="45%" height={13} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function MetricsChartSkeleton() {
  return (
    <Card aria-hidden="true">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="w-full space-y-2">
            <Skeleton variant="text" width={72} height={18} />
            <Skeleton variant="text" width="70%" height={12} />
          </div>
          <Skeleton variant="rounded" width={160} height={36} />
        </div>
      </CardHeader>

      <CardContent>
        <Skeleton variant="rounded" height={260} />
      </CardContent>
    </Card>
  );
}

export function OrderStatusChartSkeleton() {
  return (
    <Card aria-hidden="true">
      <CardHeader>
        <div className="space-y-2">
          <Skeleton variant="text" width={110} height={18} />
          <Skeleton variant="text" lines={2} height={12} />
        </div>
      </CardHeader>

      <CardContent>
        <div
          className="flex items-center justify-center"
          style={{ height: 224 }}
        >
          <Skeleton variant="circular" width={168} height={168} />
        </div>

        <div className="mt-3 flex items-center justify-center gap-4">
          <Skeleton variant="text" width={64} height={12} />
          <Skeleton variant="text" width={72} height={12} />
        </div>
      </CardContent>
    </Card>
  );
}
