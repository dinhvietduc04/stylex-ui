'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';
import { Button, Icon } from '@repo/stylex-ui';

import { StatusPage } from '@/components/layout/status-page';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('[admin-shell] Unhandled application error', error);
  }, [error]);

  return (
    <StatusPage
      fullHeight
      icon={<Icon icon={AlertTriangle} size="lg" tone="error" />}
      title="Something went wrong"
      description={
        <>
          An unexpected error interrupted this page. Try again, or return to the
          dashboard if the problem continues.
          {error.digest ? (
            <>
              {' '}
              <span style={{ wordBreak: 'break-word' }}>
                Reference: {error.digest}
              </span>
            </>
          ) : null}
        </>
      }
      primaryAction={
        <Button onClick={reset} leftIcon={<RotateCcw size={16} />}>
          Try again
        </Button>
      }
      secondaryAction={
        <Button asChild variant="outline">
          <Link href="/admin">
            <Home size={16} aria-hidden="true" />
            Back to dashboard
          </Link>
        </Button>
      }
    />
  );
}
