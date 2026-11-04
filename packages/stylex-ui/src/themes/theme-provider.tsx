'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
} from 'next-themes';
import { semanticTokens } from '../tokens/semantic.stylex';
import { globalTokens } from '../tokens/global.stylex';
import {
  emberLightTheme,
  emberDarkTheme,
  emeraldLightTheme,
  emeraldDarkTheme,
  emeraldComponentTheme,
  emberComponentTheme,
  chartThemeScope,
} from './themes.stylex';

export type BrandPreset = 'ember' | 'emerald';
export type ColorMode = 'light' | 'dark' | 'system';

export interface BrandPresetMeta {
  id: BrandPreset;
  name: string;
  tagline: string;
  swatchColor: string;
}

export const BRAND_PRESETS: Record<BrandPreset, BrandPresetMeta> = {
  ember: {
    id: 'ember',
    name: 'Ember',
    tagline: 'Warm paper and amber for consumer-facing surfaces',
    swatchColor: 'oklch(0.78 0.155 52)',
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald',
    tagline: 'Deep green and indigo for financial and admin products',
    swatchColor: 'oklch(0.455 0.108 166)',
  },
};

interface StylexThemeContextValue {
  mode: ColorMode;
  resolvedMode: 'light' | 'dark';
  setMode: (mode: ColorMode) => void;
  toggleMode: () => void;
  brand: BrandPreset;
  setBrand: (brand: BrandPreset) => void;
  toggleBrand: () => void;
  presets: typeof BRAND_PRESETS;
}

const StylexThemeContext = React.createContext<
  StylexThemeContextValue | undefined
>(undefined);

const styles = stylex.create({
  themeRoot: {
    minHeight: '100%',
    backgroundColor: semanticTokens.bgCanvas,
    color: semanticTokens.textPrimary,
    fontFamily: globalTokens.fontSans,
    transitionProperty: 'background-color, color, border-color',
    transitionDuration: globalTokens.durationNormal,
    transitionTimingFunction: globalTokens.easeStandard,
  },
});

const BRAND_STORAGE_KEY = 'dfw-stylex-brand-preset';

export function getActiveThemes(
  brand: BrandPreset,
  resolvedMode: 'light' | 'dark',
) {
  if (brand === 'emerald') {
    return [
      resolvedMode === 'dark' ? emeraldDarkTheme : emeraldLightTheme,
      emeraldComponentTheme,
      chartThemeScope,
    ] as const;
  }
  return [
    resolvedMode === 'dark' ? emberDarkTheme : emberLightTheme,
    emberComponentTheme,
    chartThemeScope,
  ] as const;
}

function InnerThemeBoundary({
  children,
  defaultBrand = 'ember',
}: {
  children: React.ReactNode;
  defaultBrand?: BrandPreset;
}) {
  const { theme, resolvedTheme, setTheme } = useNextTheme();
  const [brand, setBrandState] = React.useState<BrandPreset>(defaultBrand);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    try {
      const saved = window.localStorage.getItem(
        BRAND_STORAGE_KEY,
      ) as BrandPreset | null;
      if (saved === 'ember' || saved === 'emerald') {
        setBrandState(saved);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-brand', brand);
    try {
      window.localStorage.setItem(BRAND_STORAGE_KEY, brand);
    } catch {
      // ignore storage errors
    }
  }, [brand, mounted]);

  const resolvedMode: 'light' | 'dark' =
    mounted && resolvedTheme === 'dark' ? 'dark' : 'light';
  const mode = ((mounted ? theme : 'light') ?? 'light') as ColorMode;

  const setMode = React.useCallback(
    (nextMode: ColorMode) => {
      setTheme(nextMode);
    },
    [setTheme],
  );

  const toggleMode = React.useCallback(() => {
    setTheme(resolvedMode === 'dark' ? 'light' : 'dark');
  }, [resolvedMode, setTheme]);

  const setBrand = React.useCallback((nextBrand: BrandPreset) => {
    setBrandState(nextBrand);
  }, []);

  const toggleBrand = React.useCallback(() => {
    setBrandState((prev) => (prev === 'ember' ? 'emerald' : 'ember'));
  }, []);

  const activeThemes = React.useMemo(
    () => getActiveThemes(brand, resolvedMode),
    [brand, resolvedMode],
  );

  // Sync active theme classes onto document.body so Radix Portals (Modals, Drawers, Select, Popover, Toast)
  // rendered at the end of document.body inherit the exact StyleX theme variables!
  React.useEffect(() => {
    if (!mounted) return;
    const themeProps = stylex.props(...activeThemes);
    const classNames = (themeProps.className ?? '')
      .split(/\s+/)
      .filter(Boolean);
    if (classNames.length > 0) {
      document.body.classList.add(...classNames);
    }
    return () => {
      if (classNames.length > 0) {
        document.body.classList.remove(...classNames);
      }
    };
  }, [activeThemes, mounted]);

  const contextValue = React.useMemo<StylexThemeContextValue>(
    () => ({
      mode,
      resolvedMode,
      setMode,
      toggleMode,
      brand,
      setBrand,
      toggleBrand,
      presets: BRAND_PRESETS,
    }),
    [mode, resolvedMode, setMode, toggleMode, brand, setBrand, toggleBrand],
  );

  return (
    <StylexThemeContext.Provider value={contextValue}>
      <div {...stylex.props(styles.themeRoot, ...activeThemes)}>{children}</div>
    </StylexThemeContext.Provider>
  );
}

export interface StylexThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ColorMode;
  defaultBrand?: BrandPreset;
}

export function StylexThemeProvider({
  children,
  defaultMode = 'light',
  defaultBrand = 'ember',
}: StylexThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultMode}
      enableSystem
      disableTransitionOnChange={false}
    >
      <InnerThemeBoundary defaultBrand={defaultBrand}>
        {children}
      </InnerThemeBoundary>
    </NextThemesProvider>
  );
}

export function useStylexTheme(): StylexThemeContextValue {
  const ctx = React.useContext(StylexThemeContext);
  if (!ctx) {
    return {
      mode: 'light',
      resolvedMode: 'light',
      setMode: () => undefined,
      toggleMode: () => undefined,
      brand: 'ember',
      setBrand: () => undefined,
      toggleBrand: () => undefined,
      presets: BRAND_PRESETS,
    };
  }
  return ctx;
}
