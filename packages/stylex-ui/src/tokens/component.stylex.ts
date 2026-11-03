import * as stylex from '@stylexjs/stylex';
import { globalTokens } from './global.stylex';
import { semanticTokens } from './semantic.stylex';

/**
 * TIER 3: COMPONENT TOKENS
 * Component-scoped design tokens referencing Semantic & Global tokens.
 */
export const componentTokens = stylex.defineVars({
  // Button Component Tokens
  buttonRadius: globalTokens.radiusMd,
  buttonFontWeight: globalTokens.fontWeightMedium,
  buttonHeightXs: '1.75rem',
  buttonHeightSm: '2.125rem',
  buttonHeightMd: '2.5rem',
  buttonHeightLg: '2.875rem',
  buttonPrimaryBg: semanticTokens.brandPrimary,
  buttonPrimaryHoverBg: semanticTokens.brandPrimaryHover,
  buttonPrimaryText: semanticTokens.textOnPrimary,

  // Form Controls (Input / Textarea / Select / Combobox)
  inputHeightSm: '2.125rem',
  inputHeightMd: '2.5rem',
  inputHeightLg: '2.875rem',
  inputRadius: globalTokens.radiusMd,
  inputBg: semanticTokens.bgSurface,
  inputDisabledBg: semanticTokens.bgSurfaceSubtle,
  inputBorder: semanticTokens.borderControl,
  inputFocusBorder: semanticTokens.borderFocus,
  inputFocusRing: semanticTokens.ringColor,
  inputErrorBorder: semanticTokens.statusError,
  inputErrorRing: semanticTokens.statusErrorBg,

  // Selection Controls (Checkbox / Radio / Switch)
  controlSizeSm: '1rem',
  controlSizeMd: '1.125rem',
  controlSizeLg: '1.375rem',
  controlRadius: globalTokens.radiusXs,
  controlBg: semanticTokens.bgSurface,
  controlBorder: semanticTokens.borderControl,
  controlCheckedBg: semanticTokens.brandPrimary,
  controlCheckedText: semanticTokens.textOnPrimary,

  // Badge & Status Indicator Tokens
  badgeRadius: globalTokens.radiusFull,
  tagRadius: globalTokens.radiusSm,
  statusDotSm: '0.5rem',
  statusDotMd: '0.625rem',
  statusDotLg: '0.75rem',

  // Overlay Containers (Modal & Slide-over Drawer)
  modalRadius: globalTokens.radiusXl,
  modalBg: semanticTokens.bgSurfaceElevated,
  modalBorder: semanticTokens.borderDefault,
  modalShadow: globalTokens.shadowXl,
  drawerWidthSm: '22rem',
  drawerWidthMd: '28rem',
  drawerWidthLg: '36rem',
  overlayBackdrop: semanticTokens.bgOverlay,

  // Card & Surface Containers
  cardRadius: globalTokens.radiusLg,
  cardBg: semanticTokens.bgSurface,
  cardBorder: semanticTokens.borderDefault,
  cardShadow: globalTokens.shadowSm,

  // Skeleton Loader Tokens
  skeletonBaseBg: semanticTokens.bgSurfaceMuted,
  skeletonHighlightBg: semanticTokens.bgSurfaceSubtle,
  skeletonRadius: globalTokens.radiusMd,

  // Navigation & App Shell
  sidebarWidthExpanded: '17rem',
  sidebarWidthCollapsed: '4.5rem',
  sidebarBg: semanticTokens.bgSurface,
  sidebarBorder: semanticTokens.borderDefault,
  sidebarItemHeight: '2.25rem',
  sidebarItemRadius: globalTokens.radiusMd,
  sidebarItemActiveBg: semanticTokens.brandPrimarySubtle,
  sidebarItemHoverBg: semanticTokens.bgSurfaceHover,
  sidebarItemActiveText: semanticTokens.brandText,
  sidebarSectionLabel: semanticTokens.textMuted,
  headerHeight: '3.75rem',
  headerBg: semanticTokens.bgSurface,
  headerBorder: semanticTokens.borderDefault,
});
