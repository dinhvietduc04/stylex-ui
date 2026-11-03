import { NextResponse } from 'next/server';

/**
 * JSON response helper for metrics route handlers.
 *
 * Metrics responses are always request-specific, so they must not be cached
 * by the browser or any intermediate proxy.
 */
export function metricsJson<T>(data: T, status = 200): NextResponse<T> {
  return NextResponse.json(data, {
    status,
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}

export function metricsError(
  message: string,
  status: number,
): NextResponse<{ error: string }> {
  return metricsJson({ error: message }, status);
}
