'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import { ModuleFederationRemote } from './ModuleFederationRemote';
import type { Session as CoreSession } from '@repo/auth-core';
import { SkeletonCard } from '@repo/stylex-ui';

const BASE_PATH = '/admin/users';

function normalizeForCompare(path: string): string {
  return path === BASE_PATH ? BASE_PATH : path.replace(/\/$/, '');
}

interface UsersRemoteProps {
  session: CoreSession | null;
}

export function UsersRemote({ session }: UsersRemoteProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const lastNavigatedPath = useRef<string | null>(null);

  // Normalize pathname: remove the base path and ensure it starts with /
  const pathWithoutBase = pathname.replace(BASE_PATH, '');
  const subPath =
    pathWithoutBase === ''
      ? '/'
      : pathWithoutBase.startsWith('/')
        ? pathWithoutBase
        : '/' + pathWithoutBase;
  const search = searchParams.toString();

  const handleNavigate = useCallback(
    (to: string) => {
      // Normalize the 'to' path
      const normalizedTo = to.startsWith('/') ? to : '/' + to;
      const newPath = BASE_PATH + normalizedTo;

      // Normalize paths for comparison (remove trailing slashes except for root)
      const normalizedNewPath = normalizeForCompare(newPath);
      const normalizedCurrentPath = normalizeForCompare(pathname);

      // Prevent navigation loops:
      // 1. Don't navigate if it's the same path
      // 2. Don't navigate if we just navigated to this path
      if (
        normalizedNewPath !== normalizedCurrentPath &&
        normalizedNewPath !== lastNavigatedPath.current
      ) {
        lastNavigatedPath.current = normalizedNewPath;
        router.push(newPath);
      }
    },
    [pathname, router],
  );

  // Once the shell commits a pathname, the previous request is complete, so a
  // later navigation to that same path must not be suppressed.
  useEffect(() => {
    lastNavigatedPath.current = null;
  }, [pathname]);

  const routingProps = {
    mode: 'hosted' as const,
    basePath: BASE_PATH,
    pathname: subPath,
    search,
    onNavigate: handleNavigate,
  };

  return (
    <div className="w-full">
      <ModuleFederationRemote
        remoteName="users"
        session={session}
        routingProps={routingProps}
        fallback={<SkeletonCard />}
      />
    </div>
  );
}
