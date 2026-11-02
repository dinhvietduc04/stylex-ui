const isProduction = process.env.NODE_ENV === 'production';
const DEV_FALLBACK_SECRET = 'fallback-secret-for-development';

/**
 * Resolve the secret used to encrypt session cookies.
 *
 * Auth.js v5 reads `AUTH_SECRET`, but this project historically used
 * `NEXTAUTH_SECRET`. Both are supported so existing deployments keep working.
 *
 * IMPORTANT: every app that shares the `authjs.session-token` cookie on the
 * same host (web-shell :3000 and admin-shell :3001 in development) must use
 * the same secret. Otherwise a cookie created by one app cannot be decrypted
 * by the other and Auth.js throws `JWTSessionError`.
 */
export function getAuthSecret(): string | undefined {
  return (
    process.env.AUTH_SECRET ??
    process.env.NEXTAUTH_SECRET ??
    (isProduction ? undefined : DEV_FALLBACK_SECRET)
  );
}

export const authSecret = getAuthSecret();
export const useSecureCookies = isProduction;

// Validate required environment variables
if (!process.env.AUTH_SECRET && !process.env.NEXTAUTH_SECRET) {
  if (isProduction) {
    console.error(
      '❌ AUTH_SECRET is not set. Authentication will fail in production.',
    );
  } else {
    console.warn(
      '⚠️  AUTH_SECRET is not set. Using a development-only fallback secret. Set AUTH_SECRET to the same value in every app so sessions can be shared.',
    );
  }
}
if (!process.env.NEXTAUTH_URL && !process.env.AUTH_URL) {
  console.warn(
    '⚠️  NEXTAUTH_URL is not set. Using http://localhost:3000 as default.',
  );
}
