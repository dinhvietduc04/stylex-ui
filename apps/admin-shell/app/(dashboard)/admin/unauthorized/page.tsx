import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from '@repo/stylex-ui';

import { StatusPage } from '@/components/layout/status-page';

export default function UnauthorizedPage() {
  return (
    <StatusPage
      code={403}
      title="Access denied"
      description="Your account doesn't have permission to view this page. If you believe you should have access, contact an administrator."
      primaryAction={
        <Button asChild>
          <Link href="/admin">
            <Home size={16} aria-hidden="true" />
            Go to dashboard
          </Link>
        </Button>
      }
    />
  );
}
