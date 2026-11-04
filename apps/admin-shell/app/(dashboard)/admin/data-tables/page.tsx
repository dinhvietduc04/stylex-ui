import { redirect } from 'next/navigation';
import { auth } from '@repo/auth-next';
import { canWithPermissions } from '@repo/rbac';
import { DataTablesContent } from './data-tables-content';

export default async function DataTablesPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  if (!canWithPermissions('admin:access', session.user.permissions ?? [])) {
    redirect('/admin/unauthorized');
  }

  return (
    <DataTablesContent permissions={session.user.permissions ?? []} />
  );
}
