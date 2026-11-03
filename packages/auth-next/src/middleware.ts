import { NextResponse, type NextRequest } from 'next/server';
import { getToken, type JWT } from 'next-auth/jwt';
import { getAuthSecret, useSecureCookies } from './secret';

const SESSION_COOKIE = 'authjs.session-token';
const SECURE_SESSION_COOKIE = '__Secure-authjs.session-token';

export interface MiddlewareAuth {
  /** Decoded session token, or null when there is no usable session. */
  token: JWT | null;
  /** Name of the session cookie for the current protocol. */
  cookieName: string;
  /**
   * True when a session cookie is present but cannot be decrypted (for
   * example because it was issued by another app with a different secret,
   * or because the secret changed). Such cookies are cleared automatically.
   */
  invalidCookie: boolean;
}

/**
 * Read and validate the Auth.js session cookie inside middleware.
 *
 * `auth()` cannot delete cookies when called from a Server Component, so a
 * stale cookie would otherwise keep producing `JWTSessionError` on every
 * render. Validating it here lets us clear it before the page renders.
 */
export async function getMiddlewareAuth(
  request: NextRequest,
): Promise<MiddlewareAuth> {
  const secureCookie = useSecureCookies;
  const cookieName = secureCookie ? SECURE_SESSION_COOKIE : SESSION_COOKIE;
  const hasCookie = request.cookies.has(cookieName);
  const secret = getAuthSecret();

  // Without a secret we cannot validate the cookie, so leave it untouched.
  if (!hasCookie || !secret) {
    return { token: null, cookieName, invalidCookie: false };
  }

  try {
    const token = await getToken({ req: request, secret, secureCookie });
    return { token, cookieName, invalidCookie: token === null };
  } catch {
    return { token: null, cookieName, invalidCookie: true };
  }
}

/**
 * Return a copy of the request headers without the given cookie, so the
 * current Server Component render does not try to decrypt it again.
 */
export function withoutCookie(headers: Headers, cookieName: string): Headers {
  const nextHeaders = new Headers(headers);
  const cookieHeader = nextHeaders.get('cookie');

  if (!cookieHeader) return nextHeaders;

  const remaining = cookieHeader
    .split(';')
    .map((part) => part.trim())
    .filter((part) => part.length > 0 && !part.startsWith(`${cookieName}=`))
    .join('; ');

  if (remaining) {
    nextHeaders.set('cookie', remaining);
  } else {
    nextHeaders.delete('cookie');
  }

  return nextHeaders;
}

/** Continue the request, clearing an invalid session cookie if present. */
export function nextWithCleanSession(
  request: NextRequest,
  auth: MiddlewareAuth,
): NextResponse {
  const response = auth.invalidCookie
    ? NextResponse.next({
        request: { headers: withoutCookie(request.headers, auth.cookieName) },
      })
    : NextResponse.next();

  if (auth.invalidCookie) {
    response.cookies.delete(auth.cookieName);
  }

  return response;
}

/** Redirect the request, clearing an invalid session cookie if present. */
export function redirectWithCleanSession(
  request: NextRequest,
  auth: MiddlewareAuth,
  pathname: string,
): NextResponse {
  const response = NextResponse.redirect(new URL(pathname, request.url));

  if (auth.invalidCookie) {
    response.cookies.delete(auth.cookieName);
  }

  return response;
}
