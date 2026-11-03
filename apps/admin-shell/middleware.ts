import type { NextRequest } from 'next/server';
import { canWithPermissions, type Permission } from '@repo/rbac';
import {
  getMiddlewareAuth,
  nextWithCleanSession,
  redirectWithCleanSession,
} from '@repo/auth-next/middleware';

export async function middleware(request: NextRequest) {
  const auth = await getMiddlewareAuth(request);
  const path = request.nextUrl.pathname;

  // Redirect to login if not authenticated
  if (!auth.token) {
    if (path.startsWith('/admin')) {
      return redirectWithCleanSession(request, auth, '/login');
    }
    return nextWithCleanSession(request, auth);
  }

  // Map routes to required permissions
  const routePermissions: Array<{
    prefix: string;
    permission: Permission;
  }> = [{
    prefix: '/admin/users', permission: 'user:read'},
  ];

  const requiredPermission = routePermissions.find(({ prefix }) => path === prefix || path.startsWith(`${prefix}/`));

  if (requiredPermission) {
    const permissions = auth.token.permissions || [];
    if (!canWithPermissions(requiredPermission.permission, permissions)) {
      return redirectWithCleanSession(request, auth, '/admin/unauthorized');
    }
  }

  return nextWithCleanSession(request, auth);
}

export const config = {
  // Run on pages so a stale session cookie is cleared before it is rendered.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
