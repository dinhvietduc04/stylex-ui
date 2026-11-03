'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseSidebarCollapsedOptions {
  storageKey?: string;
  defaultCollapsed?: boolean;
}

export function useSidebarCollapsed({
  storageKey = 'ui:sidebar-collapsed',
  defaultCollapsed = true,
}: UseSidebarCollapsedOptions = {}) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored === 'true') setCollapsed(true);
      if (stored === 'false') setCollapsed(false);
    } catch {
      // storage can be unavailable
    }
    setHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(storageKey, String(collapsed));
    } catch {
      // ignore write failures
    }
  }, [collapsed, hydrated, storageKey]);

  const toggle = useCallback(() => setCollapsed((value) => !value), []);

  return { collapsed, setCollapsed, toggle, hydrated };
}
