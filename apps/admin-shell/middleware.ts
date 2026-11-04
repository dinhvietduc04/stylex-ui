import type { NextRequest } from 'next/server';
import { canWithPermissions, type Permission } from '@repo/rbac';
import {
  getMiddlewareAuth,
  nextWithCleanSession,
  redirectWithCleanSession,
} from '@repo/auth-next/middleware';

const UNAUTHORIZED_PATH = '/admin/unauthorized';

function isUserAccessibleAdminRoute(path: string): boolean {
  return (
    path === '/admin' ||
    path === '/admin/' ||
    path === '/admin/users' ||
    path.startsWith('/admin/users/')
  );
}

const routePermissions: Array<{
  prefix: string;
  permission: Permission;
}> = [
  {
    prefix: '/admin/users',
    permission: 'user:read',
  },
];

function loginPathWithCallback(request: NextRequest): string {
  const callbackUrl = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  return `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`;
}

export async function middleware(request: NextRequest) {
  const auth = await getMiddlewareAuth(request);
  const path = request.nextUrl.pathname;
  const isAdminRoute = path === '/admin' || path.startsWith('/admin/');
  const isMetricsRoute =
    path === '/metrics-dashboard' || path.startsWith('/metrics-dashboard/');
  const isProtectedRoute = isAdminRoute || isMetricsRoute;

  // Redirect to login if not authenticated
  if (!auth.token) {
    if (isProtectedRoute) {
      return redirectWithCleanSession(
        request,
        auth,
        loginPathWithCallback(request),
      );
    }
    return nextWithCleanSession(request, auth);
  }

  const permissions = auth.token.permissions ?? [];
  const isUnauthorizedRoute =
    path === UNAUTHORIZED_PATH || path === `${UNAUTHORIZED_PATH}/`;

  if (
    isProtectedRoute &&
    !isUnauthorizedRoute &&
    !isUserAccessibleAdminRoute(path) &&
    !canWithPermissions('admin:access', permissions)
  ) {
    return redirectWithCleanSession(request, auth, UNAUTHORIZED_PATH);
  }

  const requiredPermission = routePermissions.find(
    ({ prefix }) => path === prefix || path.startsWith(`${prefix}/`),
  );

  if (
    requiredPermission &&
    !canWithPermissions(requiredPermission.permission, permissions)
  ) {
    return redirectWithCleanSession(request, auth, UNAUTHORIZED_PATH);
  }

  return nextWithCleanSession(request, auth);
}

export const config = {
  // Run on pages so a stale session cookie is cleared before it is rendered.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
