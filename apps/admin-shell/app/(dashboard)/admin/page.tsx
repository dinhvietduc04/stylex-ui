import { redirect } from 'next/navigation';
import { auth } from '@repo/auth-next';
import { canWithPermissions } from '@repo/rbac';
import { DashboardContent } from './dashboard-content';

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  if (!canWithPermissions('admin:access', session.user.permissions ?? [])) {
    redirect('/admin/unauthorized');
  }

  return <DashboardContent session={session} />;
}
