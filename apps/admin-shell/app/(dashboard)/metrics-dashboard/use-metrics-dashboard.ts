'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  MetricsDashboardResponse,
  MetricsLogLevelFilter,
  MetricsLogsResponse,
  MetricsRange,
} from '@repo/api-contracts';

type DashboardStatus = 'loading' | 'ready' | 'error';
type LogsStatus = 'loading' | 'ready' | 'loading-more' | 'error';

interface LoadLogsOptions {
  level: MetricsLogLevelFilter;
  range: MetricsRange;
  cursor?: string;
  append?: boolean;
}

async function fetchJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(url, {
    signal,
    cache: 'no-store',
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;

    throw new Error(
      body?.error ?? `Request failed with status ${response.status}.`,
    );
  }

  return (await response.json()) as T;
}

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError';
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Something went wrong.';
}

export function useMetricsDashboard() {
  const [data, setData] = useState<MetricsDashboardResponse | null>(null);
  const [logs, setLogs] = useState<MetricsLogsResponse | null>(null);
  const [range, setRange] = useState<MetricsRange>('7d');
  const [logLevel, setLogLevel] = useState<MetricsLogLevelFilter>('all');
  const [status, setStatus] = useState<DashboardStatus>('loading');
  const [logsStatus, setLogsStatus] = useState<LogsStatus>('loading');
  const [error, setError] = useState<string | null>(null);
  const [logsError, setLogsError] = useState<string | null>(null);

  const dashboardAbort = useRef<AbortController | null>(null);
  const logsAbort = useRef<AbortController | null>(null);

  const loadDashboard = useCallback(async (nextRange: MetricsRange) => {
    dashboardAbort.current?.abort();

    const controller = new AbortController();
    dashboardAbort.current = controller;

    setStatus('loading');
    setError(null);

    try {
      const response = await fetchJson<MetricsDashboardResponse>(
        `/api/metrics-dashboard?range=${nextRange}`,
        controller.signal,
      );

      setData(response);
      setRange(response.range);
      setStatus('ready');
    } catch (requestError) {
      if (isAbortError(requestError)) return;

      setStatus('error');
      setError(getErrorMessage(requestError));
    }
  }, []);

  const loadLogs = useCallback(
    async ({
      level,
      range: nextRange,
      cursor,
      append = false,
    }: LoadLogsOptions) => {
      logsAbort.current?.abort();

      const controller = new AbortController();
      logsAbort.current = controller;

      setLogsStatus(append ? 'loading-more' : 'loading');
      setLogsError(null);

      const params = new URLSearchParams({
        range: nextRange,
        level,
        limit: '10',
      });

      if (cursor) {
        params.set('cursor', cursor);
      }

      try {
        const response = await fetchJson<MetricsLogsResponse>(
          `/api/metrics-dashboard/logs?${params.toString()}`,
          controller.signal,
        );

        setLogs((current) => {
          if (!append || !current) return response;

          return {
            ...response,
            entries: [...current.entries, ...response.entries],
          };
        });

        setLogsStatus('ready');
      } catch (requestError) {
        if (isAbortError(requestError)) return;

        setLogsStatus('error');
        setLogsError(getErrorMessage(requestError));
      }
    },
    [],
  );

  const changeRange = useCallback(
    (nextRange: MetricsRange) => {
      setRange(nextRange);
      setLogLevel('all');
      setLogs(null);
      void loadDashboard(nextRange);
      void loadLogs({ level: 'all', range: nextRange });
    },
    [loadDashboard, loadLogs],
  );

  const refresh = useCallback(() => {
    void loadDashboard(range);
    void loadLogs({ level: logLevel, range });
  }, [loadDashboard, loadLogs, logLevel, range]);

  const changeLogLevel = useCallback(
    (nextLevel: MetricsLogLevelFilter) => {
      setLogLevel(nextLevel);
      setLogs(null);
      void loadLogs({ level: nextLevel, range });
    },
    [loadLogs, range],
  );

  const loadMoreLogs = useCallback(() => {
    if (!logs?.nextCursor) return;

    void loadLogs({
      level: logLevel,
      range,
      cursor: logs.nextCursor,
      append: true,
    });
  }, [loadLogs, logLevel, logs?.nextCursor, range]);

  const retryLogs = useCallback(() => {
    void loadLogs({ level: logLevel, range });
  }, [loadLogs, logLevel, range]);

  useEffect(() => {
    void loadDashboard('7d');
    void loadLogs({ level: 'all', range: '7d' });

    return () => {
      dashboardAbort.current?.abort();
      logsAbort.current?.abort();
    };
  }, [loadDashboard, loadLogs]);

  return {
    data,
    logs,
    range,
    logLevel,
    status,
    logsStatus,
    error,
    logsError,
    changeRange,
    refresh,
    changeLogLevel,
    loadMoreLogs,
    retryLogs,
  };
}
