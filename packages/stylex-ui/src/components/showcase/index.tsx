'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  Activity,
  ArrowDown,
  ArrowRight,
  CircleDot,
  Layers,
  MousePointerClick,
  PanelsTopLeft,
  Sparkles,
  TextCursorInput,
  Type,
  Table2,
  type LucideIcon,
} from 'lucide-react';
import { globalTokens } from '../../tokens/global.stylex';
import { semanticTokens } from '../../tokens/semantic.stylex';
import {
  StylexThemeProvider,
  ThemeSwitcher,
  useStylexTheme,
  BRAND_PRESETS,
} from '../../themes';
import { ConfirmProvider, Toaster } from '../feedback';
import { Badge, StatusDot } from '../badge';
import { Button } from '../button';
import { Icon } from '../icon';
import { FoundationsSection } from './foundations';
import { TypographySection, ActionsSection } from './content';
import { FormsSection, SelectionSection } from './forms';
import { StatusSection } from './status';
import { OverlaysSection } from './overlays';
import { LoadingSection } from './loading';
import { DataSection } from './data';

interface SectionLink {
  id: string;
  label: string;
  group: 'Foundations' | 'Components';
  meta: string;
  blurb: string;
  icon: LucideIcon;
}

const sections: SectionLink[] = [
  {
    id: 'foundations',
    label: 'Tokens',
    group: 'Foundations',
    meta: '3 tiers',
    blurb: 'Brand scales, semantic surfaces, spacing, radius, and elevation.',
    icon: Layers,
  },
  {
    id: 'typography',
    label: 'Typography',
    group: 'Foundations',
    meta: '10 styles',
    blurb: 'Headings, body copy, captions, overline, and inline code.',
    icon: Type,
  },
  {
    id: 'actions',
    label: 'Actions',
    group: 'Components',
    meta: 'Buttons & icons',
    blurb: 'Button variants and sizes, icon buttons, and the icon system.',
    icon: MousePointerClick,
  },
  {
    id: 'forms',
    label: 'Forms',
    group: 'Components',
    meta: 'Input & pickers',
    blurb: 'Inputs, textareas, selects, comboboxes, and a bound form.',
    icon: TextCursorInput,
  },
  {
    id: 'selection',
    label: 'Selection',
    group: 'Components',
    meta: '3 controls',
    blurb: 'Checkboxes, radio groups, and switches with shared focus rings.',
    icon: CircleDot,
  },
  {
    id: 'status',
    label: 'Status & data',
    group: 'Components',
    meta: 'Badge & tag',
    blurb: 'Badges, removable tags, and live status indicators.',
    icon: Activity,
  },
  {
    id: 'overlays',
    label: 'Overlays',
    group: 'Components',
    meta: 'Modal & drawer',
    blurb: 'Modal, drawer, confirm dialog, and toast notifications.',
    icon: PanelsTopLeft,
  },
  {
    id: 'loading',
    label: 'Loading',
    group: 'Components',
    meta: 'Skeletons',
    blurb: 'Shape-matching placeholders for text, media, and cards.',
    icon: Sparkles,
  },
  {
    id: 'data',
    label: 'Data',
    group: 'Components',
    meta: 'Table & pagination',
    blurb: 'Table primitives, empty states, and a controlled pagination bar.',
    icon: Table2,
  },
];

const GROUPS = ['Foundations', 'Components'] as const;

const OBSERVED_IDS = ['overview', ...sections.map((section) => section.id)];

const previewTokens = [
  { name: 'brand.primary', role: 'accent', value: semanticTokens.brandPrimary },
  { name: 'surface.default', role: 'surface', value: semanticTokens.bgSurface },
  { name: 'text.primary', role: 'ink', value: semanticTokens.textPrimary },
  {
    name: 'status.success',
    role: 'status',
    value: semanticTokens.statusSuccess,
  },
];

const setupSteps = [
  {
    title: 'Load the stylesheet',
    body: 'Import the compiled CSS once in your root layout, after Tailwind. StyleX ships as static CSS, so nothing is injected at runtime.',
    file: 'app/globals.css',
    code: "@import 'tailwindcss';\n@import '@repo/stylex-ui/styles.css';",
  },
  {
    title: 'Add the theme provider',
    body: 'The provider owns light or dark mode and the brand preset. Both are persisted for the visitor.',
    file: 'app/layout.tsx',
    code: '<StylexThemeProvider\n  defaultMode="light"\n  defaultBrand="ember"\n>\n  {children}\n</StylexThemeProvider>',
  },
  {
    title: 'Render a component',
    body: 'Import from the package root. Variants, sizes, and states are typed props — never ad-hoc class names.',
    file: 'any component',
    code: 'import { Button } from \'@repo/stylex-ui\';\n\n<Button variant="primary">Deploy</Button>',
  },
];

const styles = stylex.create({
  page: {
    minHeight: '100vh',
    backgroundColor: semanticTokens.bgCanvas,
    color: semanticTokens.textPrimary,
    fontFamily: globalTokens.fontSans,
    paddingBottom: '4rem',
  },
  skip: {
    position: 'absolute',
    left: '-9999px',
    top: 0,
    zIndex: 9999,
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    paddingLeft: '0.875rem',
    paddingRight: '0.875rem',
    backgroundColor: semanticTokens.brandPrimary,
    color: semanticTokens.textOnPrimary,
    fontSize: '0.8125rem',
    fontWeight: globalTokens.fontWeightSemibold,
    borderRadius: '0 0 0.5rem 0',
    ':focus': {
      left: 0,
    },
  },

  topbar: {
    position: 'sticky',
    top: 0,
    zIndex: globalTokens.zSticky,
    backgroundColor: semanticTokens.bgCanvas,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: semanticTokens.borderDefault,
  },
  topbarInner: {
    maxWidth: '78rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    minHeight: '3.75rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '0.625rem',
  },
  brandLockup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.625rem',
    minWidth: 0,
  },
  mark: {
    display: 'grid',
    placeItems: 'center',
    width: '1.75rem',
    height: '1.75rem',
    borderRadius: '0.5rem',
    backgroundColor: semanticTokens.brandPrimary,
    color: semanticTokens.textOnPrimary,
    flexShrink: 0,
  },
  brandText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.0625rem',
    minWidth: 0,
  },
  brandName: {
    fontFamily: globalTokens.fontDisplay,
    fontSize: '0.875rem',
    fontWeight: globalTokens.fontWeightSemibold,
    letterSpacing: '-0.012em',
    color: semanticTokens.textPrimary,
    whiteSpace: 'nowrap',
  },
  brandMeta: {
    fontFamily: globalTokens.fontMono,
    fontSize: '0.625rem',
    letterSpacing: '0.05em',
    color: semanticTokens.textMuted,
    whiteSpace: 'nowrap',
    '@media (max-width: 560px)': {
      display: 'none',
    },
  },

  layout: {
    maxWidth: '78rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    display: 'grid',
    gridTemplateColumns: '11rem minmax(0, 1fr)',
    columnGap: '3.5rem',
    '@media (max-width: 900px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
      paddingLeft: '1.25rem',
      paddingRight: '1.25rem',
    },
  },
  nav: {
    position: 'sticky',
    top: '4.5rem',
    alignSelf: 'start',
    paddingTop: '2.75rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    '@media (max-width: 900px)': {
      position: 'static',
      paddingTop: '1.25rem',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '0.5rem',
      overflowX: 'auto',
      paddingBottom: '1.25rem',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: semanticTokens.borderSubtle,
    },
  },
  navGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.0625rem',
    '@media (max-width: 900px)': {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '0.375rem',
    },
  },
  navGroupLabel: {
    paddingBottom: '0.375rem',
    fontFamily: globalTokens.fontMono,
    fontSize: '0.625rem',
    fontWeight: globalTokens.fontWeightMedium,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: semanticTokens.textMuted,
    '@media (max-width: 900px)': {
      display: 'none',
    },
  },
  navItem: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    paddingTop: '0.375rem',
    paddingBottom: '0.375rem',
    paddingLeft: 0,
    paddingRight: '0.5rem',
    borderWidth: 0,
    backgroundColor: 'transparent',
    fontFamily: globalTokens.fontSans,
    fontSize: '0.8125rem',
    fontWeight: globalTokens.fontWeightRegular,
    color: semanticTokens.textMuted,
    cursor: 'pointer',
    textAlign: 'left',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transitionProperty: 'color',
    transitionDuration: globalTokens.durationFast,
    ':hover': {
      color: semanticTokens.textPrimary,
    },
    ':focus-visible': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: semanticTokens.borderFocus,
      outlineOffset: '2px',
      borderRadius: '0.25rem',
    },
    '@media (max-width: 900px)': {
      paddingLeft: '0.5rem',
      paddingRight: '0.625rem',
      borderRadius: '9999px',
      backgroundColor: semanticTokens.bgSurfaceSubtle,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: semanticTokens.borderSubtle,
      fontSize: '0.75rem',
    },
  },
  navItemActive: {
    color: semanticTokens.brandText,
    fontWeight: globalTokens.fontWeightSemibold,
  },
  navDot: {
    width: '0.3125rem',
    height: '0.3125rem',
    borderRadius: '9999px',
    backgroundColor: semanticTokens.brandPrimary,
    flexShrink: 0,
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: globalTokens.durationFast,
  },
  navDotActive: {
    opacity: 1,
  },
  navFoot: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.125rem',
    paddingTop: '0.75rem',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: semanticTokens.borderSubtle,
    fontFamily: globalTokens.fontMono,
    fontSize: '0.625rem',
    lineHeight: 1.5,
    color: semanticTokens.textMuted,
    '@media (max-width: 900px)': {
      display: 'none',
    },
  },

  main: {
    minWidth: 0,
    paddingTop: '2.75rem',
    '@media (max-width: 900px)': {
      paddingTop: '2rem',
    },
  },

  overview: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.04fr) minmax(0, 0.96fr)',
    gap: '3.5rem',
    alignItems: 'center',
    scrollMarginTop: '4.5rem',
    '@media (max-width: 980px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
      gap: '2.25rem',
    },
  },
  overviewCopy: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1.125rem',
    minWidth: 0,
  },
  eyebrow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontFamily: globalTokens.fontMono,
    fontSize: '0.6875rem',
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    color: semanticTokens.brandText,
  },
  title: {
    margin: 0,
    fontFamily: globalTokens.fontDisplay,
    fontSize: 'clamp(2.25rem, 4.4vw, 3.25rem)',
    lineHeight: 1.03,
    letterSpacing: '-0.038em',
    fontWeight: globalTokens.fontWeightBold,
    color: semanticTokens.textPrimary,
    textWrap: 'balance',
    animationName: 'dfw-rise',
    animationDuration: '620ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    animationFillMode: 'both',
  },
  lead: {
    margin: 0,
    maxWidth: '46ch',
    fontSize: '1.0625rem',
    lineHeight: 1.62,
    color: semanticTokens.textSecondary,
    textWrap: 'pretty',
    animationName: 'dfw-rise',
    animationDuration: '620ms',
    animationDelay: '70ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    animationFillMode: 'both',
  },
  ctas: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '0.625rem',
    animationName: 'dfw-rise',
    animationDuration: '620ms',
    animationDelay: '130ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    animationFillMode: 'both',
  },
  facts: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '0.5rem',
    fontFamily: globalTokens.fontMono,
    fontSize: '0.6875rem',
    letterSpacing: '0.02em',
    color: semanticTokens.textMuted,
    animationName: 'dfw-rise',
    animationDuration: '620ms',
    animationDelay: '190ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    animationFillMode: 'both',
  },
  factSep: {
    opacity: 0.5,
  },

  preview: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.125rem',
    padding: '1.375rem',
    borderRadius: '1rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: semanticTokens.borderDefault,
    backgroundColor: semanticTokens.bgSurface,
    boxShadow: globalTokens.shadowLg,
    animationName: 'dfw-rise',
    animationDuration: '720ms',
    animationDelay: '90ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    animationFillMode: 'both',
  },
  previewHead: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '1rem',
  },
  previewHeadText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    minWidth: 0,
  },
  previewEyebrow: {
    fontFamily: globalTokens.fontMono,
    fontSize: '0.625rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: semanticTokens.textMuted,
  },
  previewTitle: {
    margin: 0,
    fontFamily: globalTokens.fontDisplay,
    fontSize: '1.125rem',
    fontWeight: globalTokens.fontWeightSemibold,
    letterSpacing: '-0.018em',
    color: semanticTokens.textPrimary,
  },
  previewText: {
    margin: 0,
    fontSize: '0.8125rem',
    lineHeight: 1.6,
    color: semanticTokens.textSecondary,
    textWrap: 'pretty',
  },
  tokenList: {
    display: 'flex',
    flexDirection: 'column',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: semanticTokens.borderSubtle,
  },
  tokenRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.625rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: semanticTokens.borderSubtle,
  },
  tokenChipFrame: {
    display: 'grid',
    placeItems: 'center',
    width: '1.75rem',
    height: '1.75rem',
    borderRadius: '0.5rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    // Fixed neutral frame, independent of the theme, so near-white and
    // near-black token chips always have a visible edge to sit against.
    borderColor: 'oklch(0.58 0.006 70)',
    backgroundColor: 'oklch(0.74 0.006 70)',
    flexShrink: 0,
  },
  tokenChip: {
    width: '1.125rem',
    height: '1.125rem',
    borderRadius: '0.25rem',
    boxShadow: 'inset 0 0 0 1px oklch(0 0 0 / 0.18)',
  },
  tokenName: {
    flex: 1,
    minWidth: 0,
    fontFamily: globalTokens.fontMono,
    fontSize: '0.6875rem',
    color: semanticTokens.textSecondary,
  },
  tokenRole: {
    fontFamily: globalTokens.fontMono,
    fontSize: '0.625rem',
    color: semanticTokens.textMuted,
  },
  previewFoot: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.75rem',
  },
  previewButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  previewCode: {
    fontFamily: globalTokens.fontMono,
    fontSize: '0.625rem',
    letterSpacing: '0.03em',
    color: semanticTokens.textMuted,
  },

  block: {
    marginTop: '4rem',
    scrollMarginTop: '4.5rem',
  },
  blockHead: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    paddingBottom: '1rem',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: semanticTokens.textPrimary,
  },
  blockTitle: {
    margin: 0,
    fontFamily: globalTokens.fontDisplay,
    fontSize: '1.625rem',
    lineHeight: 1.15,
    fontWeight: globalTokens.fontWeightSemibold,
    letterSpacing: '-0.028em',
    color: semanticTokens.textPrimary,
    textWrap: 'balance',
  },
  blockLead: {
    margin: 0,
    maxWidth: '62ch',
    fontSize: '0.9375rem',
    lineHeight: 1.65,
    color: semanticTokens.textSecondary,
    textWrap: 'pretty',
  },

  setupSteps: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '0.5rem',
  },
  setupStep: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr)',
    gap: '1rem',
    paddingTop: '1.5rem',
    paddingBottom: '1.5rem',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: semanticTokens.borderSubtle,
    '@media (min-width: 760px)': {
      gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
      gap: '2.5rem',
      alignItems: 'start',
    },
  },
  setupStepLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  stepCopy: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4375rem',
    minWidth: 0,
  },
  stepKicker: {
    fontFamily: globalTokens.fontMono,
    fontSize: '0.625rem',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: semanticTokens.brandText,
  },
  stepTitle: {
    margin: 0,
    fontSize: '0.9375rem',
    fontWeight: globalTokens.fontWeightSemibold,
    letterSpacing: '-0.006em',
    color: semanticTokens.textPrimary,
  },
  stepBody: {
    margin: 0,
    fontSize: '0.8125rem',
    lineHeight: 1.55,
    color: semanticTokens.textMuted,
    textWrap: 'pretty',
  },
  codeCard: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    borderRadius: '0.625rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: semanticTokens.borderSubtle,
    backgroundColor: semanticTokens.bgSurface,
    overflow: 'hidden',
  },
  codeLabel: {
    paddingTop: '0.375rem',
    paddingBottom: '0.375rem',
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: semanticTokens.borderSubtle,
    backgroundColor: semanticTokens.bgSurfaceSubtle,
    fontFamily: globalTokens.fontMono,
    fontSize: '0.625rem',
    letterSpacing: '0.03em',
    color: semanticTokens.textMuted,
  },
  code: {
    margin: 0,
    padding: '0.75rem',
    overflowX: 'auto',
    fontFamily: globalTokens.fontMono,
    fontSize: '0.75rem',
    lineHeight: 1.65,
    color: semanticTokens.textPrimary,
    whiteSpace: 'pre',
  },

  indexGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))',
    gap: '0.875rem',
    marginTop: '1.5rem',
  },
  indexCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5625rem',
    padding: '1.125rem',
    borderRadius: '0.75rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: semanticTokens.borderSubtle,
    backgroundColor: semanticTokens.bgSurface,
    textDecoration: 'none',
    color: 'inherit',
    transitionProperty: 'border-color, box-shadow, transform',
    transitionDuration: globalTokens.durationFast,
    ':hover': {
      borderColor: semanticTokens.borderStrong,
      boxShadow: globalTokens.shadowSm,
      transform: 'translateY(-1px)',
    },
    ':focus-visible': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: semanticTokens.borderFocus,
      outlineOffset: '2px',
    },
  },
  indexTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.75rem',
  },
  indexIcon: {
    display: 'grid',
    placeItems: 'center',
    width: '1.875rem',
    height: '1.875rem',
    borderRadius: '0.5rem',
    backgroundColor: semanticTokens.bgSurfaceSubtle,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: semanticTokens.borderSubtle,
  },
  indexMeta: {
    fontFamily: globalTokens.fontMono,
    fontSize: '0.625rem',
    letterSpacing: '0.02em',
    color: semanticTokens.textMuted,
    textAlign: 'right',
  },
  indexTitle: {
    fontSize: '0.875rem',
    fontWeight: globalTokens.fontWeightSemibold,
    letterSpacing: '-0.008em',
    color: semanticTokens.textPrimary,
  },
  indexBlurb: {
    fontSize: '0.8125rem',
    lineHeight: 1.5,
    color: semanticTokens.textSecondary,
    textWrap: 'pretty',
  },
  indexMore: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3125rem',
    marginTop: 'auto',
    paddingTop: '0.25rem',
    fontFamily: globalTokens.fontMono,
    fontSize: '0.625rem',
    letterSpacing: '0.02em',
    color: semanticTokens.brandText,
  },

  footer: {
    maxWidth: '78rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '4.5rem',
    paddingTop: '1.5rem',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: semanticTokens.borderDefault,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.75rem',
    fontFamily: globalTokens.fontMono,
    fontSize: '0.6875rem',
    letterSpacing: '0.02em',
    color: semanticTokens.textMuted,
  },
});

function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = React.useState<string>(ids[0] ?? '');

  React.useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: '-88px 0px -55% 0px', threshold: [0, 0.15] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function Shell() {
  const { resolvedMode, brand } = useStylexTheme();
  const activeId = useScrollSpy(OBSERVED_IDS);
  const preset = BRAND_PRESETS[brand];

  const goTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div {...stylex.props(styles.page)}>
      <a href="#main" {...stylex.props(styles.skip)}>
        Skip to content
      </a>

      <header {...stylex.props(styles.topbar)}>
        <div {...stylex.props(styles.topbarInner)}>
          <div {...stylex.props(styles.brandLockup)}>
            <span {...stylex.props(styles.mark)} aria-hidden="true">
              <Layers size={15} />
            </span>
            <span {...stylex.props(styles.brandText)}>
              <span {...stylex.props(styles.brandName)}>Stylex UI</span>
              <span {...stylex.props(styles.brandMeta)}>
                @repo/stylex-ui · v1.0.0
              </span>
            </span>
          </div>
          <ThemeSwitcher />
        </div>
      </header>

      <div {...stylex.props(styles.layout)}>
        <nav {...stylex.props(styles.nav)} aria-label="Design system sections">
          <div {...stylex.props(styles.navGroup)}>
            <a
              href="#overview"
              aria-current={activeId === 'overview' ? 'true' : undefined}
              {...stylex.props(
                styles.navItem,
                activeId === 'overview' && styles.navItemActive,
              )}
            >
              <span
                aria-hidden="true"
                {...stylex.props(
                  styles.navDot,
                  activeId === 'overview' && styles.navDotActive,
                )}
              />
              Overview
            </a>
          </div>

          {GROUPS.map((group) => (
            <div key={group} {...stylex.props(styles.navGroup)}>
              <span {...stylex.props(styles.navGroupLabel)}>{group}</span>
              {sections
                .filter((section) => section.group === group)
                .map((section) => {
                  const isActive = activeId === section.id;
                  return (
                    <a
                      key={section.id}
                      href={'#' + section.id}
                      aria-current={isActive ? 'true' : undefined}
                      {...stylex.props(
                        styles.navItem,
                        isActive && styles.navItemActive,
                      )}
                    >
                      <span
                        aria-hidden="true"
                        {...stylex.props(
                          styles.navDot,
                          isActive && styles.navDotActive,
                        )}
                      />
                      {section.label}
                    </a>
                  );
                })}
            </div>
          ))}

          <div {...stylex.props(styles.navFoot)}>
            <span>9 component groups</span>
            <span>2 brand presets</span>
            <span>Zero-runtime CSS</span>
          </div>
        </nav>

        <main id="main" tabIndex={-1} {...stylex.props(styles.main)}>
          <header id="overview" {...stylex.props(styles.overview)}>
            <div {...stylex.props(styles.overviewCopy)}>
              <span {...stylex.props(styles.eyebrow)}>
                <span {...stylex.props(styles.navDot, styles.navDotActive)} />
                Design system · v1.0.0
              </span>
              <h1 {...stylex.props(styles.title)}>Stylex UI</h1>
              <p {...stylex.props(styles.lead)}>
                The shared design system behind every shell: three token tiers,
                two brand presets, and accessible React components that compile
                to static CSS. This page is the reference — every example below
                is the real component.
              </p>
              <div {...stylex.props(styles.ctas)}>
                <Button
                  variant="primary"
                  rightIcon={<ArrowDown size={15} />}
                  onClick={() => goTo('components')}
                >
                  Browse components
                </Button>
                <Button variant="ghost" onClick={() => goTo('getting-started')}>
                  How to use it
                </Button>
              </div>
              <div {...stylex.props(styles.facts)}>
                <span>3 token tiers</span>
                <span {...stylex.props(styles.factSep)}>·</span>
                <span>2 brand presets</span>
                <span {...stylex.props(styles.factSep)}>·</span>
                <span>WCAG AA</span>
              </div>
            </div>

            <aside
              aria-label="Live theme preview"
              {...stylex.props(styles.preview)}
            >
              <div {...stylex.props(styles.previewHead)}>
                <div {...stylex.props(styles.previewHeadText)}>
                  <span {...stylex.props(styles.previewEyebrow)}>
                    Theme preview
                  </span>
                  <h2 {...stylex.props(styles.previewTitle)}>
                    {preset.name} · {resolvedMode}
                  </h2>
                </div>
                <Badge variant="success" size="sm" dot pulse>
                  Live
                </Badge>
              </div>

              <p {...stylex.props(styles.previewText)}>
                {preset.tagline}. Switch brand or mode in the header and every
                surface here repaints from the same semantic tokens.
              </p>

              <div {...stylex.props(styles.tokenList)}>
                {previewTokens.map((token) => (
                  <div key={token.name} {...stylex.props(styles.tokenRow)}>
                    <span {...stylex.props(styles.tokenChipFrame)}>
                      <span
                        aria-hidden="true"
                        {...stylex.props(styles.tokenChip)}
                        style={{ backgroundColor: token.value }}
                      />
                    </span>
                    <span {...stylex.props(styles.tokenName)}>
                      {token.name}
                    </span>
                    <span {...stylex.props(styles.tokenRole)}>
                      {token.role}
                    </span>
                  </div>
                ))}
              </div>

              <div {...stylex.props(styles.previewFoot)}>
                <div {...stylex.props(styles.previewButtons)}>
                  <Button variant="primary" size="xs">
                    Primary
                  </Button>
                  <Button variant="outline" size="xs">
                    Secondary
                  </Button>
                  <StatusDot variant="success" pulse label="Healthy" />
                </div>
                <span {...stylex.props(styles.previewCode)}>
                  {brand} / {resolvedMode}
                </span>
              </div>
            </aside>
          </header>

          <section
            id="getting-started"
            aria-labelledby="getting-started-title"
            {...stylex.props(styles.block)}
          >
            <div {...stylex.props(styles.blockHead)}>
              <span {...stylex.props(styles.eyebrow)}>Getting started</span>
              <h2
                id="getting-started-title"
                {...stylex.props(styles.blockTitle)}
              >
                Three steps into an app
              </h2>
              <p {...stylex.props(styles.blockLead)}>
                The package ships compiled CSS and TypeScript declarations. Add
                the stylesheet, wrap the app in the theme provider, and import
                components from the package root.
              </p>
            </div>

            <div {...stylex.props(styles.setupSteps)}>
              {setupSteps.map((step, index) => (
                <div
                  key={step.title}
                  {...stylex.props(
                    styles.setupStep,
                    index === setupSteps.length - 1 && styles.setupStepLast,
                  )}
                >
                  <div {...stylex.props(styles.stepCopy)}>
                    <span {...stylex.props(styles.stepKicker)}>
                      Step {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 {...stylex.props(styles.stepTitle)}>{step.title}</h3>
                    <p {...stylex.props(styles.stepBody)}>{step.body}</p>
                  </div>
                  <div {...stylex.props(styles.codeCard)}>
                    <span {...stylex.props(styles.codeLabel)}>{step.file}</span>
                    <pre {...stylex.props(styles.code)}>
                      <code>{step.code}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            id="components"
            aria-labelledby="components-title"
            {...stylex.props(styles.block)}
          >
            <div {...stylex.props(styles.blockHead)}>
              <span {...stylex.props(styles.eyebrow)}>Reference</span>
              <h2 id="components-title" {...stylex.props(styles.blockTitle)}>
                What is in the system
              </h2>
              <p {...stylex.props(styles.blockLead)}>
                Jump straight to a group. Each section below shows the live
                component, its variants, and the states worth copying.
              </p>
            </div>

            <div {...stylex.props(styles.indexGrid)}>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={'#' + section.id}
                  {...stylex.props(styles.indexCard)}
                >
                  <span {...stylex.props(styles.indexTop)}>
                    <span {...stylex.props(styles.indexIcon)}>
                      <Icon icon={section.icon} size="sm" tone="brand" />
                    </span>
                    <span {...stylex.props(styles.indexMeta)}>
                      {section.meta}
                    </span>
                  </span>
                  <span {...stylex.props(styles.indexTitle)}>
                    {section.label}
                  </span>
                  <span {...stylex.props(styles.indexBlurb)}>
                    {section.blurb}
                  </span>
                  <span {...stylex.props(styles.indexMore)}>
                    Jump to section <ArrowRight size={12} />
                  </span>
                </a>
              ))}
            </div>
          </section>

          <FoundationsSection />
          <TypographySection />
          <ActionsSection />
          <FormsSection />
          <SelectionSection />
          <StatusSection />
          <OverlaysSection />
          <LoadingSection />
          <DataSection />
        </main>
      </div>

      <footer {...stylex.props(styles.footer)}>
        <span>@repo/stylex-ui · StyleX compiler · zero-runtime CSS</span>
        <span>
          {preset.name} · {resolvedMode} · {preset.tagline}
        </span>
      </footer>
    </div>
  );
}

export function DesignSystemShowcase() {
  return (
    <StylexThemeProvider defaultMode="light" defaultBrand="ember">
      <ConfirmProvider>
        <Shell />
        <Toaster />
      </ConfirmProvider>
    </StylexThemeProvider>
  );
}
