import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@repo/auth-next';
import { canWithPermissions } from '@repo/rbac';
import { MetricsDashboardContent } from './metrics-dashboard-content';

export const metadata: Metadata = {
  title: 'Metrics dashboard | Admin Portal',
};

export default async function MetricsDashboardPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  if (!canWithPermissions('admin:access', session.user.permissions ?? [])) {
    redirect('/admin/unauthorized');
  }

  return <MetricsDashboardContent />;
}
