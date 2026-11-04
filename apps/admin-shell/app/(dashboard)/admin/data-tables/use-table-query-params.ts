'use client';

import { useCallback, useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type TableDataset = 'users' | 'products';
export type ProductStatusFilter = 'all' | 'active' | 'archived';
export type UserRoleFilter = 'all' | 'admin' | 'manager' | 'viewer';
export type DateSort = 'asc' | 'desc';

type ParamPatch = Record<string, string | number | null>;

export const TABLE_PAGE_SIZES = [5, 10, 20] as const;
const DEFAULT_PAGE_SIZE = TABLE_PAGE_SIZES[0];
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Reads and writes the data-table query state from the URL.
 *
 * URL shape:
 *   ?dataset=products&q=keyboard&status=active
 *   &from=2026-03-01&to=2026-03-31&dateSort=asc&page=2&pageSize=10
 *
 * Defaults (`users`, empty `q`, `all`, empty dates, newest-first sort, page 1,
 * page size 5) are omitted so a clean table has a clean URL. Unrelated query
 * params are preserved.
 */
export function useTableQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Latest params, including writes that have not re-rendered yet. Reading
  // `searchParams` in `update` drops rapid successive changes (e.g. setting
  // both ends of a date range).
  const paramsRef = useRef(new URLSearchParams(searchParams.toString()));

  useEffect(() => {
    const syncFromLocation = () => {
      paramsRef.current = new URLSearchParams(window.location.search);
    };

    syncFromLocation();
    window.addEventListener('popstate', syncFromLocation);
    return () => window.removeEventListener('popstate', syncFromLocation);
  }, []);

  const dataset: TableDataset =
    searchParams.get('dataset') === 'products' ? 'products' : 'users';
  const q = searchParams.get('q') ?? '';

  const rawStatus = searchParams.get('status');
  const status: ProductStatusFilter =
    dataset === 'products' &&
    (rawStatus === 'active' || rawStatus === 'archived')
      ? rawStatus
      : 'all';

  const rawRole = searchParams.get('role');
  const role: UserRoleFilter =
    dataset === 'users' &&
    (rawRole === 'admin' || rawRole === 'manager' || rawRole === 'viewer')
      ? rawRole
      : 'all';

  const rawFrom = searchParams.get('from') ?? '';
  const from = DATE_PATTERN.test(rawFrom) ? rawFrom : '';
  const rawTo = searchParams.get('to') ?? '';
  const to = DATE_PATTERN.test(rawTo) ? rawTo : '';
  const dateSort: DateSort =
    searchParams.get('dateSort') === 'asc' ? 'asc' : 'desc';

  const parsedPage = Number.parseInt(searchParams.get('page') ?? '1', 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const parsedPageSize = Number.parseInt(
    searchParams.get('pageSize') ?? String(DEFAULT_PAGE_SIZE),
    10,
  );
  const pageSize = TABLE_PAGE_SIZES.some((size) => size === parsedPageSize)
    ? parsedPageSize
    : DEFAULT_PAGE_SIZE;

  const update = useCallback(
    (patch: ParamPatch, resetPage = false) => {
      const current = paramsRef.current.toString();
      const params = new URLSearchParams(current);

      for (const [key, value] of Object.entries(patch)) {
        const isDefault =
          value === null ||
          value === '' ||
          ((key === 'status' || key === 'role') && value === 'all') ||
          (key === 'dataset' && value === 'users') ||
          (key === 'page' && Number(value) === 1) ||
          (key === 'pageSize' && Number(value) === DEFAULT_PAGE_SIZE) ||
          (key === 'dateSort' && value === 'desc');

        if (isDefault) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      }

      if (resetPage) {
        params.delete('page');
      }

      const next = params.toString();
      if (next === current) return;

      paramsRef.current = params;
      router.replace(next ? `${pathname}?${next}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router],
  );

  const setSearch = useCallback(
    (value: string) => {
      const next = value.trim();
      update({ q: next || null }, true);
    },
    [update],
  );

  const setStatus = useCallback(
    (value: string) => {
      const next: ProductStatusFilter =
        value === 'active' || value === 'archived' ? value : 'all';

      update({ status: next === 'all' ? null : next }, true);
    },
    [update],
  );

  const setRole = useCallback(
    (value: string) => {
      const next: UserRoleFilter =
        value === 'admin' || value === 'manager' || value === 'viewer'
          ? value
          : 'all';

      update({ role: next === 'all' ? null : next }, true);
    },
    [update],
  );

  const setFrom = useCallback(
    (value: string) => {
      update({ from: DATE_PATTERN.test(value) ? value : null }, true);
    },
    [update],
  );

  const setTo = useCallback(
    (value: string) => {
      update({ to: DATE_PATTERN.test(value) ? value : null }, true);
    },
    [update],
  );

  const setDateSort = useCallback(
    (value: string) => {
      const next: DateSort = value === 'asc' ? 'asc' : 'desc';
      update({ dateSort: next === 'desc' ? null : next }, true);
    },
    [update],
  );

  const setPage = useCallback(
    (next: number) => {
      update({ page: next > 1 ? next : null });
    },
    [update],
  );

  const setPageSize = useCallback(
    (next: number) => {
      const value = TABLE_PAGE_SIZES.some((size) => size === next)
        ? next
        : DEFAULT_PAGE_SIZE;

      update({ pageSize: value === DEFAULT_PAGE_SIZE ? null : value }, true);
    },
    [update],
  );

  const setDataset = useCallback(
    (next: TableDataset) => {
      update(
        {
          dataset: next === 'users' ? null : next,
          q: null,
          status: null,
          role: null,
          from: null,
          to: null,
          dateSort: null,
        },
        true,
      );
    },
    [update],
  );

  const clearFilters = useCallback(() => {
    update(
      {
        q: null,
        status: null,
        role: null,
        from: null,
        to: null,
        dateSort: null,
      },
      true,
    );
  }, [update]);

  return {
    dataset,
    q,
    status,
    role,
    from,
    to,
    dateSort,
    page,
    pageSize,
    setSearch,
    setStatus,
    setRole,
    setFrom,
    setTo,
    setDateSort,
    setPage,
    setPageSize,
    setDataset,
    clearFilters,
  };
}
