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
    logsAbort.current?.abort();

    const controller = new AbortController();
    dashboardAbort.current = controller;

    setStatus('loading');
    setLogsStatus('loading');
    setLogs(null);
    setLogsError(null);
    setError(null);

    try {
      const response = await fetchJson<MetricsDashboardResponse>(
        `/api/metrics-dashboard?range=${nextRange}`,
        controller.signal,
      );

      setData(response);
      setLogs(response.logs);
      setRange(response.range);
      setLogLevel('all');
      setLogsStatus('ready');
      setStatus('ready');
    } catch (requestError) {
      if (isAbortError(requestError)) return;

      setStatus('error');
      setLogsStatus('error');
      setError(getErrorMessage(requestError));
    }
  }, []);

  const loadLogs = useCallback(
    async ({
      nextLevel = logLevel,
      cursor,
      append = false,
    }: {
      nextLevel?: MetricsLogLevelFilter;
      cursor?: string;
      append?: boolean;
    } = {}) => {
      logsAbort.current?.abort();

      const controller = new AbortController();
      logsAbort.current = controller;

      setLogsStatus(append ? 'loading-more' : 'loading');
      setLogsError(null);

      const params = new URLSearchParams({
        range,
        level: nextLevel,
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
    [logLevel, range],
  );

  const changeRange = useCallback(
    (nextRange: MetricsRange) => {
      setRange(nextRange);
      setLogLevel('all');
      void loadDashboard(nextRange);
    },
    [loadDashboard],
  );

  const refresh = useCallback(() => {
    void loadDashboard(range);
  }, [loadDashboard, range]);

  const changeLogLevel = useCallback(
    (nextLevel: MetricsLogLevelFilter) => {
      setLogLevel(nextLevel);
      void loadLogs({ nextLevel });
    },
    [loadLogs],
  );

  const loadMoreLogs = useCallback(() => {
    if (!logs?.nextCursor) return;

    void loadLogs({
      cursor: logs.nextCursor,
      append: true,
    });
  }, [loadLogs, logs?.nextCursor]);

  const retryLogs = useCallback(() => {
    void loadLogs({ nextLevel: logLevel });
  }, [loadLogs, logLevel]);

  useEffect(() => {
    void loadDashboard('7d');

    return () => {
      dashboardAbort.current?.abort();
      logsAbort.current?.abort();
    };
  }, [loadDashboard]);

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
