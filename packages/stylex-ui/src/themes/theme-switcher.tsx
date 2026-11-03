'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { Sun, Moon } from 'lucide-react';
import { globalTokens } from '../tokens/global.stylex';
import { semanticTokens } from '../tokens/semantic.stylex';
import {
  useStylexTheme,
  BRAND_PRESETS,
  type BrandPreset,
} from './theme-provider';

const styles = stylex.create({
  wrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  group: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.125rem',
    padding: '0.1875rem',
    borderRadius: '9999px',
    backgroundColor: semanticTokens.bgSurfaceSubtle,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: semanticTokens.borderDefault,
  },
  iconBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.75rem',
    height: '1.75rem',
    borderRadius: '9999px',
    borderWidth: 0,
    padding: 0,
    backgroundColor: 'transparent',
    color: semanticTokens.textMuted,
    cursor: 'pointer',
    transitionProperty: 'background-color, color',
    transitionDuration: globalTokens.durationFast,
    transitionTimingFunction: globalTokens.easeStandard,
    ':hover': {
      color: semanticTokens.textPrimary,
    },
    ':focus-visible': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: semanticTokens.borderFocus,
      outlineOffset: '2px',
    },
  },
  iconBtnActive: {
    backgroundColor: semanticTokens.bgSurface,
    color: semanticTokens.textPrimary,
    boxShadow: globalTokens.shadowXs,
  },
  brandBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4375rem',
    height: '1.75rem',
    paddingLeft: '0.5rem',
    paddingRight: '0.6875rem',
    borderRadius: '9999px',
    borderWidth: 0,
    backgroundColor: 'transparent',
    color: semanticTokens.textMuted,
    fontFamily: globalTokens.fontSans,
    fontSize: '0.75rem',
    fontWeight: globalTokens.fontWeightMedium,
    letterSpacing: '0.01em',
    cursor: 'pointer',
    transitionProperty: 'background-color, color',
    transitionDuration: globalTokens.durationFast,
    transitionTimingFunction: globalTokens.easeStandard,
    ':hover': {
      color: semanticTokens.textPrimary,
    },
    ':focus-visible': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: semanticTokens.borderFocus,
      outlineOffset: '2px',
    },
  },
  brandBtnActive: {
    backgroundColor: semanticTokens.bgSurface,
    color: semanticTokens.textPrimary,
    boxShadow: globalTokens.shadowXs,
  },
  swatch: {
    width: '0.5625rem',
    height: '0.5625rem',
    borderRadius: '9999px',
    flexShrink: 0,
    boxShadow: 'inset 0 0 0 1px oklch(0 0 0 / 0.14)',
  },
  brandLabel: {
    '@media (max-width: 430px)': {
      display: 'none',
    },
  },
});

export interface ThemeSwitcherProps {
  showBrandSelector?: boolean;
  showModeLabels?: boolean;
}

export function ThemeSwitcher({
  showBrandSelector = true,
}: ThemeSwitcherProps) {
  const { resolvedMode, setMode, brand, setBrand } = useStylexTheme();
  const brands = Object.keys(BRAND_PRESETS) as BrandPreset[];

  return (
    <div
      {...stylex.props(styles.wrapper)}
      role="group"
      aria-label="Theme controls"
    >
      <div
        {...stylex.props(styles.group)}
        role="radiogroup"
        aria-label="Color mode"
      >
        <button
          type="button"
          role="radio"
          aria-checked={resolvedMode === 'light'}
          aria-label="Light mode"
          title="Light mode"
          onClick={() => setMode('light')}
          {...stylex.props(
            styles.iconBtn,
            resolvedMode === 'light' && styles.iconBtnActive,
          )}
        >
          <Sun size={14} aria-hidden="true" />
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={resolvedMode === 'dark'}
          aria-label="Dark mode"
          title="Dark mode"
          onClick={() => setMode('dark')}
          {...stylex.props(
            styles.iconBtn,
            resolvedMode === 'dark' && styles.iconBtnActive,
          )}
        >
          <Moon size={14} aria-hidden="true" />
        </button>
      </div>

      {showBrandSelector ? (
        <div
          {...stylex.props(styles.group)}
          role="radiogroup"
          aria-label="Brand preset"
        >
          {brands.map((key) => {
            const preset = BRAND_PRESETS[key];
            const isActive = brand === key;
            return (
              <button
                key={key}
                type="button"
                role="radio"
                aria-checked={isActive}
                title={preset.tagline}
                onClick={() => setBrand(key)}
                {...stylex.props(
                  styles.brandBtn,
                  isActive && styles.brandBtnActive,
                )}
              >
                <span
                  aria-hidden="true"
                  {...stylex.props(styles.swatch)}
                  style={{ backgroundColor: preset.swatchColor }}
                />
                <span {...stylex.props(styles.brandLabel)}>{preset.name}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
