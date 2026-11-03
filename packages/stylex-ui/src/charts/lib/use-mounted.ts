'use client';

import { useEffect, useState } from 'react';

/**
 * Charts mount after hydration so Recharts never measures a zero-width SSR
 * container or produces a hydration mismatch.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
