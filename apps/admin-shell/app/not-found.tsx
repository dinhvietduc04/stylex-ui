import Link from 'next/link';
import { Compass, Home } from 'lucide-react';
import { Button } from '@repo/stylex-ui';

import { StatusPage } from '@/components/layout/status-page';

export default function NotFoundPage() {
  return (
    <StatusPage
      fullHeight
      code={404}
      title="Page not found"
      description="The page you're looking for doesn't exist or may have moved. Check the address, or head back to the dashboard."
      primaryAction={
        <Button asChild>
          <Link href="/admin">
            <Home size={16} aria-hidden="true" />
            Back to dashboard
          </Link>
        </Button>
      }
      secondaryAction={
        <Button asChild variant="ghost">
          <Link href="/admin/users">
            <Compass size={16} aria-hidden="true" />
            Browse users
          </Link>
        </Button>
      }
    />
  );
}
