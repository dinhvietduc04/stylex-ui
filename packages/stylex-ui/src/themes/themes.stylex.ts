import * as stylex from '@stylexjs/stylex';
import { semanticTokens } from '../tokens/semantic.stylex';
import { componentTokens } from '../tokens/component.stylex';

/**
 * BRAND PRESET 1 — EMBER (light)
 * Warm paper, espresso ink, amber-coral accent. Deliberately warm so it can
 * never be mistaken for the cool neutral dark mode.
 */
export const emberLightTheme = stylex.createTheme(semanticTokens, {
  bgCanvas: 'oklch(0.982 0.006 72)',
  bgSurface: 'oklch(1 0 0)',
  bgSurfaceElevated: 'oklch(1 0 0)',
  bgSurfaceSubtle: 'oklch(0.962 0.008 72)',
  bgSurfaceMuted: 'oklch(0.928 0.012 72)',
  bgSurfaceHover: 'oklch(0.952 0.012 72)',
  bgOverlay: 'oklch(0.22 0.03 45 / 0.55)',
  bgGlass: 'color-mix(in oklch, oklch(1 0 0) 84%, transparent)',

  textPrimary: 'oklch(0.245 0.028 45)',
  textSecondary: 'oklch(0.42 0.025 48)',
  textMuted: 'oklch(0.485 0.022 50)',
  textDisabled: 'oklch(0.66 0.015 60)',
  textInverse: 'oklch(0.982 0.006 72)',
  textOnPrimary: 'oklch(0.235 0.05 45)',
  textLink: 'oklch(0.5 0.14 38)',

  brandPrimary: 'oklch(0.78 0.155 52)',
  brandPrimaryHover: 'oklch(0.835 0.145 58)',
  brandPrimaryActive: 'oklch(0.72 0.165 48)',
  brandPrimarySubtle:
    'color-mix(in oklch, oklch(0.78 0.155 52) 16%, transparent)',
  brandPrimaryBorder:
    'color-mix(in oklch, oklch(0.78 0.155 52) 44%, transparent)',
  brandText: 'oklch(0.48 0.13 40)',

  brandSecondary: 'oklch(0.955 0.012 70)',
  brandSecondaryHover: 'oklch(0.925 0.018 70)',
  brandSecondaryText: 'oklch(0.3 0.03 48)',

  brandAccent: 'oklch(0.52 0.09 205)',
  brandAccentSubtle:
    'color-mix(in oklch, oklch(0.52 0.09 205) 14%, transparent)',

  borderDefault: 'oklch(0.9 0.012 70)',
  borderSubtle: 'oklch(0.945 0.008 70)',
  borderStrong: 'oklch(0.82 0.018 68)',
  borderControl: 'oklch(0.6 0.02 55)',
  borderFocus: 'oklch(0.52 0.14 42)',
  ringColor: 'color-mix(in oklch, oklch(0.48 0.13 40) 40%, transparent)',

  statusSuccess: 'oklch(0.55 0.13 162)',
  statusSuccessBg:
    'color-mix(in oklch, oklch(0.55 0.13 162) 14%, transparent)',
  statusSuccessBorder:
    'color-mix(in oklch, oklch(0.55 0.13 162) 34%, transparent)',
  statusSuccessText: 'oklch(0.4 0.09 166)',

  statusWarning: 'oklch(0.66 0.16 62)',
  statusWarningBg:
    'color-mix(in oklch, oklch(0.66 0.16 62) 16%, transparent)',
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

/**
 * BRAND PRESET 1 — EMBER (dark)
 * Warm charcoal with the same amber accent.
 */
export const emberDarkTheme = stylex.createTheme(semanticTokens, {
  bgCanvas: 'oklch(0.165 0.012 48)',
  bgSurface: 'oklch(0.212 0.014 48)',
  bgSurfaceElevated: 'oklch(0.252 0.016 46)',
  bgSurfaceSubtle: 'oklch(0.19 0.012 48)',
  bgSurfaceMuted: 'oklch(0.285 0.018 48)',
  bgSurfaceHover: 'oklch(0.268 0.018 48)',
  bgOverlay: 'oklch(0.1 0.01 48 / 0.72)',
  bgGlass:
    'color-mix(in oklch, oklch(0.212 0.014 48) 82%, transparent)',

  textPrimary: 'oklch(0.955 0.008 72)',
  textSecondary: 'oklch(0.775 0.015 65)',
  textMuted: 'oklch(0.665 0.016 62)',
  textDisabled: 'oklch(0.47 0.014 55)',
  textInverse: 'oklch(0.165 0.012 48)',
  textOnPrimary: 'oklch(0.19 0.04 45)',
  textLink: 'oklch(0.82 0.14 58)',

  brandPrimary: 'oklch(0.815 0.15 58)',
  brandPrimaryHover: 'oklch(0.86 0.14 62)',
  brandPrimaryActive: 'oklch(0.74 0.16 52)',
  brandPrimarySubtle:
    'color-mix(in oklch, oklch(0.815 0.15 58) 20%, transparent)',
  brandPrimaryBorder:
    'color-mix(in oklch, oklch(0.815 0.15 58) 46%, transparent)',
  brandText: 'oklch(0.86 0.12 62)',

  brandSecondary: 'oklch(0.275 0.018 48)',
  brandSecondaryHover: 'oklch(0.325 0.02 48)',
  brandSecondaryText: 'oklch(0.93 0.015 70)',

  brandAccent: 'oklch(0.68 0.1 205)',
  brandAccentSubtle:
    'color-mix(in oklch, oklch(0.68 0.1 205) 20%, transparent)',

  borderDefault: 'oklch(0.31 0.016 48)',
  borderSubtle: 'oklch(0.25 0.014 48)',
  borderStrong: 'oklch(0.415 0.02 48)',
  borderControl: 'oklch(0.52 0.02 55)',
  borderFocus: 'oklch(0.82 0.14 58)',
  ringColor: 'color-mix(in oklch, oklch(0.86 0.12 62) 45%, transparent)',

  statusSuccess: 'oklch(0.72 0.14 162)',
  statusSuccessBg:
    'color-mix(in oklch, oklch(0.72 0.14 162) 18%, transparent)',
  statusSuccessBorder:
    'color-mix(in oklch, oklch(0.72 0.14 162) 40%, transparent)',
  statusSuccessText: 'oklch(0.86 0.1 165)',

  statusWarning: 'oklch(0.79 0.15 68)',
  statusWarningBg:
    'color-mix(in oklch, oklch(0.79 0.15 68) 18%, transparent)',
  statusWarningBorder:
    'color-mix(in oklch, oklch(0.79 0.15 68) 40%, transparent)',
  statusWarningText: 'oklch(0.9 0.1 78)',

  statusError: 'oklch(0.66 0.19 25)',
  statusErrorHover: 'oklch(0.72 0.18 25)',
  statusErrorBg: 'color-mix(in oklch, oklch(0.66 0.19 25) 20%, transparent)',
  statusErrorBorder:
    'color-mix(in oklch, oklch(0.66 0.19 25) 44%, transparent)',
  statusErrorText: 'oklch(0.87 0.1 22)',

  statusInfo: 'oklch(0.72 0.11 235)',
  statusInfoBg: 'color-mix(in oklch, oklch(0.72 0.11 235) 18%, transparent)',
  statusInfoBorder:
    'color-mix(in oklch, oklch(0.72 0.11 235) 40%, transparent)',
  statusInfoText: 'oklch(0.87 0.07 232)',

  statusNeutral: 'oklch(0.68 0.015 60)',
  statusNeutralBg: 'color-mix(in oklch, oklch(0.68 0.015 60) 18%, transparent)',
  statusNeutralBorder:
    'color-mix(in oklch, oklch(0.68 0.015 60) 36%, transparent)',
  statusNeutralText: 'oklch(0.87 0.01 60)',
});

/**
 * BRAND PRESET 2 — EMERALD (light)
 * Cool, quiet, financial. Deep green on white with an indigo accent.
 */
export const emeraldLightTheme = stylex.createTheme(semanticTokens, {
  bgCanvas: 'oklch(0.984 0.005 168)',
  bgSurface: 'oklch(1 0 0)',
  bgSurfaceElevated: 'oklch(1 0 0)',
  bgSurfaceSubtle: 'oklch(0.964 0.008 168)',
  bgSurfaceMuted: 'oklch(0.93 0.012 168)',
  bgSurfaceHover: 'oklch(0.955 0.01 168)',
  bgOverlay: 'oklch(0.2 0.024 172 / 0.55)',
  bgGlass: 'color-mix(in oklch, oklch(1 0 0) 84%, transparent)',

  textPrimary: 'oklch(0.205 0.028 172)',
  textSecondary: 'oklch(0.4 0.022 170)',
  textMuted: 'oklch(0.478 0.02 168)',
  textDisabled: 'oklch(0.65 0.014 170)',
  textInverse: 'oklch(0.984 0.005 168)',
  textOnPrimary: 'oklch(1 0 0)',
  textLink: 'oklch(0.44 0.1 166)',

  brandPrimary: 'oklch(0.455 0.108 166)',
  brandPrimaryHover: 'oklch(0.415 0.105 167)',
  brandPrimaryActive: 'oklch(0.372 0.09 168)',
  brandPrimarySubtle:
    'color-mix(in oklch, oklch(0.455 0.108 166) 12%, transparent)',
  brandPrimaryBorder:
    'color-mix(in oklch, oklch(0.455 0.108 166) 34%, transparent)',
  brandText: 'oklch(0.42 0.1 166)',

  brandSecondary: 'oklch(0.952 0.012 168)',
  brandSecondaryHover: 'oklch(0.918 0.02 168)',
  brandSecondaryText: 'oklch(0.25 0.04 170)',

  brandAccent: 'oklch(0.52 0.13 258)',
  brandAccentSubtle:
    'color-mix(in oklch, oklch(0.52 0.13 258) 13%, transparent)',

  borderDefault: 'oklch(0.902 0.012 168)',
  borderSubtle: 'oklch(0.946 0.008 168)',
  borderStrong: 'oklch(0.82 0.018 168)',
  borderControl: 'oklch(0.6 0.018 168)',
  borderFocus: 'oklch(0.42 0.1 166)',
  ringColor: 'color-mix(in oklch, oklch(0.42 0.1 166) 34%, transparent)',

  statusSuccess: 'oklch(0.55 0.13 162)',
  statusSuccessBg:
    'color-mix(in oklch, oklch(0.55 0.13 162) 14%, transparent)',
  statusSuccessBorder:
    'color-mix(in oklch, oklch(0.55 0.13 162) 34%, transparent)',
  statusSuccessText: 'oklch(0.4 0.09 166)',

  statusWarning: 'oklch(0.66 0.16 62)',
  statusWarningBg:
    'color-mix(in oklch, oklch(0.66 0.16 62) 16%, transparent)',
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

  statusNeutral: 'oklch(0.48 0.018 168)',
  statusNeutralBg:
    'color-mix(in oklch, oklch(0.48 0.018 168) 12%, transparent)',
  statusNeutralBorder:
    'color-mix(in oklch, oklch(0.48 0.018 168) 28%, transparent)',
  statusNeutralText: 'oklch(0.36 0.018 168)',
});

/**
 * BRAND PRESET 2 — EMERALD (dark)
 * Deep forest surface, mint accent, dark ink on the accent.
 */
export const emeraldDarkTheme = stylex.createTheme(semanticTokens, {
  bgCanvas: 'oklch(0.152 0.018 170)',
  bgSurface: 'oklch(0.202 0.024 170)',
  bgSurfaceElevated: 'oklch(0.242 0.026 170)',
  bgSurfaceSubtle: 'oklch(0.178 0.02 170)',
  bgSurfaceMuted: 'oklch(0.28 0.028 170)',
  bgSurfaceHover: 'oklch(0.262 0.026 170)',
  bgOverlay: 'oklch(0.09 0.012 170 / 0.72)',
  bgGlass:
    'color-mix(in oklch, oklch(0.202 0.024 170) 82%, transparent)',

  textPrimary: 'oklch(0.958 0.008 168)',
  textSecondary: 'oklch(0.78 0.02 168)',
  textMuted: 'oklch(0.67 0.02 168)',
  textDisabled: 'oklch(0.47 0.018 170)',
  textInverse: 'oklch(0.152 0.018 170)',
  textOnPrimary: 'oklch(0.165 0.03 172)',
  textLink: 'oklch(0.76 0.14 164)',

  brandPrimary: 'oklch(0.7 0.14 164)',
  brandPrimaryHover: 'oklch(0.76 0.14 164)',
  brandPrimaryActive: 'oklch(0.62 0.13 165)',
  brandPrimarySubtle:
    'color-mix(in oklch, oklch(0.7 0.14 164) 18%, transparent)',
  brandPrimaryBorder:
    'color-mix(in oklch, oklch(0.7 0.14 164) 42%, transparent)',
  brandText: 'oklch(0.8 0.13 164)',

  brandSecondary: 'oklch(0.265 0.024 170)',
  brandSecondaryHover: 'oklch(0.32 0.026 170)',
  brandSecondaryText: 'oklch(0.93 0.02 168)',

  brandAccent: 'oklch(0.66 0.12 258)',
  brandAccentSubtle:
    'color-mix(in oklch, oklch(0.66 0.12 258) 20%, transparent)',

  borderDefault: 'oklch(0.305 0.024 170)',
  borderSubtle: 'oklch(0.245 0.02 170)',
  borderStrong: 'oklch(0.41 0.028 170)',
  borderControl: 'oklch(0.52 0.02 168)',
  borderFocus: 'oklch(0.72 0.14 164)',
  ringColor: 'color-mix(in oklch, oklch(0.8 0.13 164) 45%, transparent)',

  statusSuccess: 'oklch(0.72 0.14 162)',
  statusSuccessBg:
    'color-mix(in oklch, oklch(0.72 0.14 162) 18%, transparent)',
  statusSuccessBorder:
    'color-mix(in oklch, oklch(0.72 0.14 162) 40%, transparent)',
  statusSuccessText: 'oklch(0.86 0.1 165)',

  statusWarning: 'oklch(0.79 0.15 68)',
  statusWarningBg:
    'color-mix(in oklch, oklch(0.79 0.15 68) 18%, transparent)',
  statusWarningBorder:
    'color-mix(in oklch, oklch(0.79 0.15 68) 40%, transparent)',
  statusWarningText: 'oklch(0.9 0.1 78)',

  statusError: 'oklch(0.66 0.19 25)',
  statusErrorHover: 'oklch(0.72 0.18 25)',
  statusErrorBg: 'color-mix(in oklch, oklch(0.66 0.19 25) 20%, transparent)',
  statusErrorBorder:
    'color-mix(in oklch, oklch(0.66 0.19 25) 44%, transparent)',
  statusErrorText: 'oklch(0.87 0.1 22)',

  statusInfo: 'oklch(0.72 0.11 235)',
  statusInfoBg: 'color-mix(in oklch, oklch(0.72 0.11 235) 18%, transparent)',
  statusInfoBorder:
    'color-mix(in oklch, oklch(0.72 0.11 235) 40%, transparent)',
  statusInfoText: 'oklch(0.87 0.07 232)',

  statusNeutral: 'oklch(0.7 0.015 168)',
  statusNeutralBg: 'color-mix(in oklch, oklch(0.7 0.015 168) 18%, transparent)',
  statusNeutralBorder:
    'color-mix(in oklch, oklch(0.7 0.015 168) 36%, transparent)',
  statusNeutralText: 'oklch(0.87 0.012 168)',
});

/**
 * Emerald keeps a sharper set of component radii so the two presets differ in
 * shape as well as hue.
 */
export const emeraldComponentTheme = stylex.createTheme(componentTokens, {
  buttonRadius: '0.375rem',
  inputRadius: '0.375rem',
  cardRadius: '0.5rem',
  modalRadius: '0.75rem',
});

/**
 * Ember leans rounder and softer, reading as a consumer-facing surface.
 */
export const emberComponentTheme = stylex.createTheme(componentTokens, {
  buttonRadius: '0.625rem',
  inputRadius: '0.625rem',
  cardRadius: '0.875rem',
  modalRadius: '1.125rem',
});
