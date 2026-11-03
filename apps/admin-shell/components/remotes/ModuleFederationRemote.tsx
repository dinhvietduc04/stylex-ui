'use client';

import { useEffect, useState, Suspense } from 'react';
import { Skeleton, SkeletonCard, Text } from '@repo/stylex-ui';
import { loadRemoteComponent } from '../../lib/module-federation-loader';
import type { Session as CoreSession } from '@repo/auth-core';

import type { RoutingProps } from '@repo/api-contracts';

interface ModuleFederationRemoteProps {
  remoteName: 'users';
  session: CoreSession | null;
  routingProps?: RoutingProps;
  fallback?: React.ReactNode;
}

// Skeleton loading component for remotes
function RemoteSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton variant="text" width={128} height={32} />
          <Skeleton variant="text" width={256} height={16} />
        </div>
        <Skeleton variant="rounded" width={96} height={40} />
      </div>
      <SkeletonCard />
    </div>
  );
}

/**
 * Component that loads a remote module via Module Federation at runtime
 */
export function ModuleFederationRemote({
  remoteName,
  session,
  routingProps,
  fallback = <RemoteSkeleton />,
}: ModuleFederationRemoteProps) {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let retryTimeoutId: NodeJS.Timeout | null = null;

    const loadComponent = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const RemoteComponent = await loadRemoteComponent(remoteName);

        if (mounted) {
          setComponent(() => RemoteComponent);
          setIsLoading(false);
        }
      } catch (err) {
        console.error(`Failed to load remote ${remoteName}:`, err);

        // Extract a more helpful error message
        let errorMessage = 'Failed to load remote';
        if (err instanceof Error) {
          errorMessage = err.message;
          // Check for common connection errors
          if (
            err.message.includes('Failed to fetch') ||
            err.message.includes('NetworkError') ||
            err.message.includes('Failed to connect')
          ) {
            errorMessage = `Cannot connect to ${remoteName} remote server. Make sure the remote dev server is running.`;
          } else if (err.message.includes('Unknown remote')) {
            errorMessage = `Remote configuration not found for ${remoteName}. Check remote-configs.json.`;
          }
        }

        if (mounted) {
          setError(errorMessage);
          setIsLoading(false);
        }

        // Implement retry logic with exponential backoff (only if error is retryable)
        const isRetryable =
          err instanceof Error &&
          !err.message.includes('Unknown remote') &&
          !err.message.includes('not available');

        if (isRetryable) {
          const maxRetries = 2; // Reduced retries since loader already has extensive retry logic
          const baseDelay = 2000; // 2 seconds

          for (let attempt = 0; attempt < maxRetries; attempt++) {
            if (!mounted) break;

            const delay = baseDelay * Math.pow(2, attempt); // Exponential backoff
            console.warn(
              `[MF] Attempt ${attempt + 1} of ${maxRetries}: Retrying to load remote ${remoteName} in ${delay}ms...`,
              err,
            );

            await new Promise((r) => setTimeout(r, delay));

            if (!mounted) break;

            try {
              const RemoteComponent = await loadRemoteComponent(remoteName);
              if (mounted) {
                setComponent(() => RemoteComponent);
                setIsLoading(false);
                setError(null);
                return; // Success, exit retry loop
              }
            } catch (retryErr) {
              if (attempt === maxRetries - 1) {
                console.error(
                  `[MF] Failed to load remote ${remoteName} after ${maxRetries} retry attempts.`,
                  retryErr,
                );
                if (mounted) {
                  const retryErrorMessage =
                    retryErr instanceof Error
                      ? retryErr.message
                      : 'Failed to load remote after retries';
                  setError(retryErrorMessage);
                }
              }
            }
          }
        }
      }
    };

    loadComponent();

    return () => {
      mounted = false;
      if (retryTimeoutId) {
        clearTimeout(retryTimeoutId);
      }
    };
  }, [remoteName]);

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Text weight="semibold" tone="error">
          Failed to load {remoteName} remote
        </Text>
        <Text size="sm" tone="muted">
          {error}
        </Text>
      </div>
    );
  }

  if (isLoading || !Component) {
    return <>{fallback}</>;
  }

  if (!session) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Text tone="muted">Not authenticated</Text>
      </div>
    );
  }

  return (
    <Suspense fallback={fallback}>
      <Component session={session} routingProps={routingProps} />
    </Suspense>
  );
}
