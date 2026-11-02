import type { NextRequest } from 'next/server';
import {
  getMiddlewareAuth,
  nextWithCleanSession,
  redirectWithCleanSession,
} from '@repo/auth-next/middleware';

export async function middleware(request: NextRequest) {
  const auth = await getMiddlewareAuth(request);
  const path = request.nextUrl.pathname;

  // Protect /account routes
  if (path.startsWith('/account') && !auth.token) {
    return redirectWithCleanSession(request, auth, '/login');
  }

  return nextWithCleanSession(request, auth);
}

export const config = {
  // Run on pages so a stale session cookie is cleared before it is rendered.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
