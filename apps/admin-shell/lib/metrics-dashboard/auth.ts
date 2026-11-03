import type { NextResponse } from 'next/server';
import type { Session } from 'next-auth';
import { auth } from '@repo/auth-next';
import { canWithPermissions } from '@repo/rbac';
import { metricsError } from './http';

export type MetricsAccessResult =
  | { ok: true; session: Session }
  | { ok: false; response: NextResponse<{ error: string }> };

/**
 * Guard used by every metrics route handler.
 *
 * Route handlers are excluded from the app middleware matcher, so they must
 * check the session and permission themselves.
 */
export async function requireMetricsAccess(): Promise<MetricsAccessResult> {
  const session = await auth();

  if (!session) {
    return {
      ok: false,
      response: metricsError('Authentication required.', 401),
    };
  }

  if (!canWithPermissions('admin:access', session.user.permissions ?? [])) {
    return {
      ok: false,
      response: metricsError(
        'You do not have permission to view metrics.',
        403,
      ),
    };
  }

  return { ok: true, session };
}
