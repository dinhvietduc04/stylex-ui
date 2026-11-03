import * as stylex from '@stylexjs/stylex';

/**
 * TIER 2: SEMANTIC TOKENS
 * Purpose-driven tokens mapped from Global Tokens.
 * Defaults below match the Ember light preset; the active brand × mode pair
 * replaces every value at runtime through `stylex.createTheme`.
 */
export const semanticTokens = stylex.defineVars({
  // Canvas & surfaces
  bgCanvas: 'oklch(0.982 0.006 72)',
  bgSurface: 'oklch(1 0 0)',
  bgSurfaceElevated: 'oklch(1 0 0)',
  bgSurfaceSubtle: 'oklch(0.962 0.008 72)',
  bgSurfaceMuted: 'oklch(0.928 0.012 72)',
  bgSurfaceHover: 'oklch(0.952 0.012 72)',
  bgOverlay: 'oklch(0.22 0.03 45 / 0.55)',
  bgGlass: 'color-mix(in oklch, oklch(1 0 0) 84%, transparent)',

  // Foreground
  textPrimary: 'oklch(0.245 0.028 45)',
  textSecondary: 'oklch(0.42 0.025 48)',
  textMuted: 'oklch(0.485 0.022 50)',
  textDisabled: 'oklch(0.66 0.015 60)',
  textInverse: 'oklch(0.982 0.006 72)',
  textOnPrimary: 'oklch(0.235 0.05 45)',
  textLink: 'oklch(0.5 0.14 38)',

  // Brand
  brandPrimary: 'oklch(0.78 0.155 52)',
  brandPrimaryHover: 'oklch(0.835 0.145 58)',
  brandPrimaryActive: 'oklch(0.72 0.165 48)',
  brandText: 'oklch(0.48 0.13 40)',
  brandPrimarySubtle:
    'color-mix(in oklch, oklch(0.78 0.155 52) 16%, transparent)',
  brandPrimaryBorder:
    'color-mix(in oklch, oklch(0.78 0.155 52) 44%, transparent)',

  brandSecondary: 'oklch(0.955 0.012 70)',
  brandSecondaryHover: 'oklch(0.925 0.018 70)',
  brandSecondaryText: 'oklch(0.3 0.03 48)',

  brandAccent: 'oklch(0.52 0.09 205)',
  brandAccentSubtle:
    'color-mix(in oklch, oklch(0.52 0.09 205) 14%, transparent)',

  // Borders & focus
  borderDefault: 'oklch(0.9 0.012 70)',
  borderSubtle: 'oklch(0.945 0.008 70)',
  borderStrong: 'oklch(0.82 0.018 68)',
  borderControl: 'oklch(0.6 0.02 55)',
  borderFocus: 'oklch(0.62 0.15 45)',
  ringColor: 'color-mix(in oklch, oklch(0.78 0.155 52) 34%, transparent)',

  // Status
  statusSuccess: 'oklch(0.55 0.13 162)',
  statusSuccessBg: 'color-mix(in oklch, oklch(0.55 0.13 162) 14%, transparent)',
  statusSuccessBorder:
    'color-mix(in oklch, oklch(0.55 0.13 162) 34%, transparent)',
  statusSuccessText: 'oklch(0.4 0.09 166)',

  statusWarning: 'oklch(0.66 0.16 62)',
  statusWarningBg: 'color-mix(in oklch, oklch(0.66 0.16 62) 16%, transparent)',
  statusWarningBorder:
    'color-mix(in oklch, oklch(0.66 0.16 62) 36%, transparent)',
  statusWarningText: 'oklch(0.42 0.11 45)',

  statusError: 'oklch(0.55 0.19 25)',
  statusErrorHover: 'oklch(0.49 0.19 25)',
  statusErrorBg: 'color-mix(in oklch, oklch(0.55 0.19 25) 13%, transparent)',
  statusErrorBorder:
    'color-mix(in oklch, oklch(0.55 0.19 25) 36%, transparent)',
  statusErrorText: 'oklch(0.46 0.17 26)',

  statusInfo: 'oklch(0.53 0.11 240)',
  statusInfoBg: 'color-mix(in oklch, oklch(0.53 0.11 240) 14%, transparent)',
  statusInfoBorder:
    'color-mix(in oklch, oklch(0.53 0.11 240) 34%, transparent)',
  statusInfoText: 'oklch(0.4 0.09 242)',

  statusNeutral: 'oklch(0.5 0.02 60)',
  statusNeutralBg: 'color-mix(in oklch, oklch(0.5 0.02 60) 12%, transparent)',
  statusNeutralBorder:
    'color-mix(in oklch, oklch(0.5 0.02 60) 28%, transparent)',
  statusNeutralText: 'oklch(0.38 0.02 55)',
});
