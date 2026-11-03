'use client';

import type {
  MetricsLogLevelFilter,
  MetricsLogsResponse,
} from '@repo/api-contracts';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  SimpleSelect,
  Skeleton,
  Text,
  semanticTokens,
} from '@repo/stylex-ui';
import { formatLogTime, logLevelVariant } from '../format';

const LEVEL_OPTIONS = [
  { value: 'all', label: 'All levels' },
  { value: 'info', label: 'Info' },
  { value: 'warn', label: 'Warning' },
  { value: 'error', label: 'Error' },
  { value: 'debug', label: 'Debug' },
];

const COLUMN_WIDTHS = {
  time: 170,
  level: 140,
  source: 170,
} as const;

function columnClassName(label: string): string {
  if (label === 'Level') {
    return 'pb-2 text-center text-xs font-semibold uppercase tracking-wide';
  }

  if (label === 'Source') {
    return 'pb-2 pl-4 pr-4 text-xs font-semibold uppercase tracking-wide';
  }

  return 'pb-2 pr-4 text-xs font-semibold uppercase tracking-wide';
}

interface ActivityLogProps {
  logs: MetricsLogsResponse | null;
  level: MetricsLogLevelFilter;
  status: 'loading' | 'ready' | 'loading-more' | 'error';
  error: string | null;
  onLevelChange: (level: MetricsLogLevelFilter) => void;
  onLoadMore: () => void;
  onRetry: () => void;
}

export function ActivityLog({
  logs,
  level,
  status,
  error,
  onLevelChange,
  onLoadMore,
  onRetry,
}: ActivityLogProps) {
  const isLoading = status === 'loading';

  return (
    <Card aria-busy={isLoading || undefined}>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <CardTitle>Activity log</CardTitle>
            <CardDescription>
              Recent events across the admin platform.
            </CardDescription>
          </div>

          <div className="w-full sm:w-40">
            <SimpleSelect
              aria-label="Filter activity log by level"
              options={LEVEL_OPTIONS}
              value={level}
              onValueChange={(value) =>
                onLevelChange(value as MetricsLogLevelFilter)
              }
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {error ? (
          <div
            role="alert"
            className="mb-4 flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
            style={{
              borderColor: semanticTokens.statusErrorBorder,
              backgroundColor: semanticTokens.statusErrorBg,
            }}
          >
            <Text as="span" size="sm" tone="error">
              {error}
            </Text>
            <Button variant="outline" size="sm" onClick={onRetry}>
              Retry
            </Button>
          </div>
        ) : null}

        {isLoading && !logs ? (
          <ActivityLogTableSkeleton />
        ) : logs && logs.entries.length > 0 ? (
          <div className="overflow-x-auto">
            <table
              className="w-full min-w-[640px] border-collapse text-left"
              style={{ tableLayout: 'fixed' }}
            >
              <caption className="sr-only">
                Recent activity for the selected range
              </caption>

              <colgroup>
                <col style={{ width: COLUMN_WIDTHS.time }} />
                <col style={{ width: COLUMN_WIDTHS.level }} />
                <col style={{ width: COLUMN_WIDTHS.source }} />
              </colgroup>

              <thead>
                <tr
                  style={{
                    borderBottom: `1px solid ${semanticTokens.borderSubtle}`,
                  }}
                >
                  {['Time', 'Level', 'Source', 'Message'].map((label) => (
                    <th
                      key={label}
                      scope="col"
                      className={columnClassName(label)}
                      style={{ color: semanticTokens.textMuted }}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {logs.entries.map((entry) => (
                  <tr
                    key={entry.id}
                    style={{
                      borderBottom: `1px solid ${semanticTokens.borderSubtle}`,
                    }}
                  >
                    <td className="py-3 pr-4 whitespace-nowrap">
                      <Text as="span" size="sm" tone="muted">
                        {formatLogTime(entry.timestamp)}
                      </Text>
                    </td>

                    <td className="py-3 text-center whitespace-nowrap">
                      <Badge variant={logLevelVariant(entry.level)} size="sm">
                        {entry.level}
                      </Badge>
                    </td>

                    <td className="py-3 pl-4 pr-4 whitespace-nowrap">
                      <Text as="span" size="sm">
                        {entry.source}
                      </Text>
                    </td>

                    <td className="py-3">
                      <Text as="span" size="sm">
                        {entry.message}
                      </Text>
                      {entry.actor ? (
                        <Text as="span" size="sm" tone="muted">
                          {' '}
                          · {entry.actor}
                        </Text>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : !error ? (
          <Text tone="muted">No activity for this range and level.</Text>
        ) : null}
      </CardContent>

      {isLoading && !logs ? (
        <CardFooter aria-hidden="true">
          <Skeleton variant="text" width={160} height={12} />
          <Skeleton variant="rounded" width={88} height={32} />
        </CardFooter>
      ) : logs?.nextCursor || status === 'loading-more' ? (
        <CardFooter>
          <Text size="sm" tone="muted">
            Showing {logs?.entries.length ?? 0} of {logs?.total ?? 0} events
          </Text>

          <Button
            variant="outline"
            size="sm"
            onClick={onLoadMore}
            isLoading={status === 'loading-more'}
            disabled={!logs?.nextCursor}
          >
            Load more
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  );
}

function ActivityLogTableSkeleton() {
  return (
    <div className="overflow-x-auto" aria-hidden="true">
      <table
        className="w-full min-w-[640px] border-collapse text-left"
        style={{ tableLayout: 'fixed' }}
      >
        <colgroup>
          <col style={{ width: COLUMN_WIDTHS.time }} />
          <col style={{ width: COLUMN_WIDTHS.level }} />
          <col style={{ width: COLUMN_WIDTHS.source }} />
        </colgroup>

        <thead>
          <tr
            style={{
              borderBottom: `1px solid ${semanticTokens.borderSubtle}`,
            }}
          >
            {['Time', 'Level', 'Source', 'Message'].map((label) => (
              <th key={label} scope="col" className={columnClassName(label)}>
                <Skeleton
                  variant="text"
                  width={label === 'Message' ? 64 : 48}
                  height={9}
                />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 10 }).map((_, row) => (
            <tr
              key={row}
              style={{
                borderBottom: `1px solid ${semanticTokens.borderSubtle}`,
              }}
            >
              <td className="py-3 pr-4">
                <Skeleton variant="text" width="72%" height={13} />
              </td>

              <td className="py-3">
                <div className="flex justify-center">
                  <Skeleton variant="rounded" width={48} height={20} />
                </div>
              </td>

              <td className="py-3 pl-4 pr-4">
                <Skeleton variant="text" width="58%" height={13} />
              </td>

              <td className="py-3">
                <Skeleton
                  variant="text"
                  width={`${52 + ((row * 11) % 34)}%`}
                  height={13}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
