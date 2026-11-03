import { redirect } from 'next/navigation';
import { auth, toCoreSession } from '@repo/auth-next';
import { canWithPermissions } from '@repo/rbac';
import { UsersRemote } from '@/components/remotes/UsersRemote';

export default async function UsersCatchAllPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const session = await auth();
  const { slug } = await params;

  if (!session) {
    redirect('/login');
  }

  const permissions = session.user.permissions ?? [];

  // Server-side permission check
  if (!canWithPermissions('user:read', permissions || [])) {
    redirect('/admin/unauthorized');
  }

  // Convert next-auth session to core session for remote
  const coreSession = toCoreSession(session);

  return <UsersRemote session={coreSession} />;
}
