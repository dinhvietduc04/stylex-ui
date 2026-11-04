import * as stylex from '@stylexjs/stylex';

/**
 * TIER 1: GLOBAL PRIMITIVE TOKENS
 * Raw OKLCH & HSL color palettes, spacing, typography, radii, shadows, and motion scales.
 * Supports alpha transparency via CSS `color-mix(in oklch, ...)` and OKLCH/HSL channels.
 */
export const globalTokens = stylex.defineVars({
  // Primitive Color Palette - Ember (warm amber-coral, brand preset 1)
  ember50: 'oklch(0.985 0.014 70)',
  ember100: 'oklch(0.955 0.035 68)',
  ember200: 'oklch(0.91 0.065 66)',
  ember300: 'oklch(0.86 0.1 62)',
  ember400: 'oklch(0.82 0.13 58)',
  ember500: 'oklch(0.78 0.155 52)',
  ember600: 'oklch(0.7 0.17 48)',
  ember700: 'oklch(0.6 0.17 44)',
  ember800: 'oklch(0.5 0.14 42)',
  ember900: 'oklch(0.42 0.11 42)',
  ember950: 'oklch(0.29 0.075 42)',

  // Primitive Color Palette - Ocean Blue (OKLCH)
  blue50: 'oklch(0.97 0.014 254.6)',
  blue100: 'oklch(0.932 0.032 255.58)',
  blue200: 'oklch(0.882 0.059 254.13)',
  blue400: 'oklch(0.707 0.165 254.62)',
  blue500: 'oklch(0.623 0.214 259.81)',
  blue600: 'oklch(0.546 0.245 262.88)',
  blue700: 'oklch(0.488 0.243 264.38)',
  blue800: 'oklch(0.424 0.199 265.64)',
  blue900: 'oklch(0.379 0.146 265.52)',
  blue950: 'oklch(0.282 0.091 267.93)',

  // Primitive Color Palette - Emerald (OKLCH)
  emerald50: 'oklch(0.979 0.021 166.11)',
  emerald100: 'oklch(0.95 0.052 163.05)',
  emerald200: 'oklch(0.905 0.093 164.15)',
  emerald400: 'oklch(0.765 0.177 163.22)',
  emerald500: 'oklch(0.696 0.17 162.48)',
  emerald600: 'oklch(0.596 0.145 163.23)',
  emerald700: 'oklch(0.508 0.118 165.61)',
  emerald800: 'oklch(0.432 0.095 166.91)',
  emerald900: 'oklch(0.378 0.077 168.94)',
  emerald950: 'oklch(0.262 0.051 172.55)',

  // Primitive Color Palette - Violet (OKLCH)
  violet50: 'oklch(0.969 0.016 293.75)',
  violet100: 'oklch(0.943 0.029 294.58)',
  violet500: 'oklch(0.606 0.25 292.71)',
  violet600: 'oklch(0.541 0.281 293.01)',
  violet700: 'oklch(0.491 0.27 292.58)',

  // Primitive Color Palette - Neutral Slate (OKLCH + HSL compatible)
  white: 'oklch(1 0 0)',
  black: 'oklch(0.145 0 0)',
  slate50: 'oklch(0.984 0.003 247.86)',
  slate100: 'oklch(0.968 0.007 247.89)',
  slate200: 'oklch(0.929 0.013 255.51)',
  slate300: 'oklch(0.869 0.022 252.89)',
  slate400: 'oklch(0.704 0.04 256.79)',
  slate500: 'oklch(0.554 0.046 257.42)',
  slate600: 'oklch(0.446 0.043 257.28)',
  slate700: 'oklch(0.372 0.044 257.29)',
  slate800: 'oklch(0.279 0.041 260.03)',
  slate900: 'oklch(0.208 0.042 265.75)',
  slate950: 'oklch(0.129 0.042 264.69)',

  // Status Primitives - Amber (Warning), Rose (Error), Sky (Info)
  amber50: 'oklch(0.987 0.022 95.27)',
  amber100: 'oklch(0.962 0.059 95.61)',
  amber500: 'oklch(0.769 0.188 70.08)',
  amber600: 'oklch(0.666 0.179 58.31)',
  amber700: 'oklch(0.555 0.163 48.99)',
  amber900: 'oklch(0.414 0.112 45.9)',

  rose50: 'oklch(0.969 0.015 12.42)',
  rose100: 'oklch(0.941 0.03 12.58)',
  rose500: 'oklch(0.645 0.246 16.43)',
  rose600: 'oklch(0.586 0.253 17.58)',
  rose700: 'oklch(0.514 0.222 16.93)',
  rose900: 'oklch(0.41 0.159 10.27)',

  sky50: 'oklch(0.977 0.013 236.62)',
  sky100: 'oklch(0.951 0.026 236.82)',
  sky500: 'oklch(0.685 0.169 237.32)',
  sky600: 'oklch(0.588 0.158 241.96)',
  sky700: 'oklch(0.5 0.134 242.74)',
  sky900: 'oklch(0.391 0.09 240.87)',

  // Spacing Scale
  space0: '0px',
  space1: '0.25rem',
  space2: '0.5rem',
  space3: '0.75rem',
  space4: '1rem',
  space5: '1.25rem',
  space6: '1.5rem',
  space8: '2rem',
  space10: '2.5rem',
  space12: '3rem',
  space16: '4rem',
  space20: '5rem',
  space24: '6rem',

  // Typography Families
  fontSans:
    "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontMono:
    "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  fontDisplay:
    "'Plus Jakarta Sans', Inter, -apple-system, BlinkMacSystemFont, sans-serif",

  // Font Sizes
  fontSizeXs: '0.75rem',
  fontSizeSm: '0.875rem',
  fontSizeMd: '1rem',
  fontSizeLg: '1.125rem',
  fontSizeXl: '1.25rem',
  fontSize2xl: '1.5rem',
  fontSize3xl: '1.875rem',
  fontSize4xl: '2.25rem',

  // Line Heights
  lineHeightTight: 1.25,
  lineHeightSnug: 1.375,
  lineHeightNormal: 1.5,
  lineHeightRelaxed: 1.625,

  // Font Weights
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemibold: 600,
  fontWeightBold: 700,

  // Border Radii
  radiusNone: '0px',
  radiusXs: '0.25rem',
  radiusSm: '0.375rem',
  radiusMd: '0.5rem',
  radiusLg: '0.75rem',
  radiusXl: '1rem',
  radius2xl: '1.5rem',
  radiusFull: '9999px',

  // Elevations & Shadows (with alpha transparency)
  shadowXs: '0 1px 2px 0 oklch(0.145 0 0 / 0.05)',
  shadowSm:
    '0 1px 3px 0 oklch(0.145 0 0 / 0.08), 0 1px 2px -1px oklch(0.145 0 0 / 0.08)',
  shadowMd:
    '0 4px 6px -1px oklch(0.145 0 0 / 0.1), 0 2px 4px -2px oklch(0.145 0 0 / 0.08)',
  shadowLg:
    '0 10px 15px -3px oklch(0.145 0 0 / 0.12), 0 4px 6px -4px oklch(0.145 0 0 / 0.08)',
  shadowXl:
    '0 20px 25px -5px oklch(0.145 0 0 / 0.16), 0 8px 10px -6px oklch(0.145 0 0 / 0.1)',

  // Z-Index Layers
  zDropdown: 1000,
  zSticky: 1020,
  zOverlay: 1040,
  zModal: 1050,
  zDrawer: 1060,
  zConfirm: 1065,
  zPopover: 1070,
  zToast: 1080,
  zTooltip: 1090,

  // Motion & Transitions
  durationFast: '150ms',
  durationNormal: '220ms',
  durationSlow: '320ms',
  easeStandard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeSpring: 'cubic-bezier(0.16, 1, 0.3, 1)',
});
