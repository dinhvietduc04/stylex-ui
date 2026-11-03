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
    <Card>
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
          <Skeleton variant="text" lines={6} />
        ) : logs && logs.entries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">
                Recent activity for the selected range
              </caption>

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
                      className="pb-2 pr-4 text-xs font-semibold uppercase tracking-wide"
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
                    <td className="py-3 pr-4">
                      <Text as="span" size="sm" tone="muted">
                        {formatLogTime(entry.timestamp)}
                      </Text>
                    </td>

                    <td className="py-3 pr-4">
                      <Badge variant={logLevelVariant(entry.level)} size="sm">
                        {entry.level}
                      </Badge>
                    </td>

                    <td className="py-3 pr-4">
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

      {logs?.nextCursor || status === 'loading-more' ? (
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
