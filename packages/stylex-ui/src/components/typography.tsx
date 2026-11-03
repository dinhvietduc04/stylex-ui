import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import { globalTokens } from '../tokens/global.stylex';
import { semanticTokens } from '../tokens/semantic.stylex';
import {
  stylexVariants,
  mergeStylexProps,
  type StylexVariantProps,
} from '../lib/stylex-utils';

const styles = stylex.create({
  base: {
    margin: 0,
    fontFamily: globalTokens.fontSans,
    color: semanticTokens.textPrimary,
  },
  // Variant scales (H1 - H4, Body, Caption, Overline, Code)
  h1: {
    fontFamily: globalTokens.fontDisplay,
    fontSize: globalTokens.fontSize4xl,
    lineHeight: globalTokens.lineHeightTight,
    fontWeight: globalTokens.fontWeightBold,
    letterSpacing: '-0.025em',
  },
  h2: {
    fontFamily: globalTokens.fontDisplay,
    fontSize: globalTokens.fontSize3xl,
    lineHeight: globalTokens.lineHeightTight,
    fontWeight: globalTokens.fontWeightBold,
    letterSpacing: '-0.02em',
  },
  h3: {
    fontFamily: globalTokens.fontDisplay,
    fontSize: globalTokens.fontSize2xl,
    lineHeight: globalTokens.lineHeightSnug,
    fontWeight: globalTokens.fontWeightSemibold,
    letterSpacing: '-0.015em',
  },
  h4: {
    fontFamily: globalTokens.fontDisplay,
    fontSize: globalTokens.fontSizeXl,
    lineHeight: globalTokens.lineHeightSnug,
    fontWeight: globalTokens.fontWeightSemibold,
    letterSpacing: '-0.01em',
  },
  bodyLg: {
    fontSize: globalTokens.fontSizeLg,
    lineHeight: globalTokens.lineHeightRelaxed,
    fontWeight: globalTokens.fontWeightRegular,
  },
  body: {
    fontSize: globalTokens.fontSizeMd,
    lineHeight: globalTokens.lineHeightNormal,
    fontWeight: globalTokens.fontWeightRegular,
  },
  bodySm: {
    fontSize: globalTokens.fontSizeSm,
    lineHeight: globalTokens.lineHeightNormal,
    fontWeight: globalTokens.fontWeightRegular,
  },
  caption: {
    fontSize: globalTokens.fontSizeXs,
    lineHeight: globalTokens.lineHeightNormal,
    fontWeight: globalTokens.fontWeightRegular,
    color: semanticTokens.textMuted,
  },
  overline: {
    fontSize: globalTokens.fontSizeXs,
    lineHeight: globalTokens.lineHeightTight,
    fontWeight: globalTokens.fontWeightSemibold,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: semanticTokens.textMuted,
  },
  code: {
    fontFamily: globalTokens.fontMono,
    fontSize: '0.85em',
    paddingTop: '0.15rem',
    paddingBottom: '0.15rem',
    paddingLeft: '0.375rem',
    paddingRight: '0.375rem',
    borderRadius: globalTokens.radiusXs,
    backgroundColor: semanticTokens.bgSurfaceMuted,
    color: semanticTokens.textPrimary,
  },

  // Tone overrides
  toneDefault: { color: semanticTokens.textPrimary },
  toneSecondary: { color: semanticTokens.textSecondary },
  toneMuted: { color: semanticTokens.textMuted },
  toneBrand: { color: semanticTokens.brandText },
  toneSuccess: { color: semanticTokens.statusSuccessText },
  toneWarning: { color: semanticTokens.statusWarningText },
  toneError: { color: semanticTokens.statusErrorText },
  toneInfo: { color: semanticTokens.statusInfoText },

  // Weight overrides
  weightRegular: { fontWeight: globalTokens.fontWeightRegular },
  weightMedium: { fontWeight: globalTokens.fontWeightMedium },
  weightSemibold: { fontWeight: globalTokens.fontWeightSemibold },
  weightBold: { fontWeight: globalTokens.fontWeightBold },

  // Align overrides
  alignLeft: { textAlign: 'left' },
  alignCenter: { textAlign: 'center' },
  alignRight: { textAlign: 'right' },

  // Truncation
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

export const typographyVariants = stylexVariants({
  base: styles.base,
  variants: {
    variant: {
      h1: styles.h1,
      h2: styles.h2,
      h3: styles.h3,
      h4: styles.h4,
      'body-lg': styles.bodyLg,
      body: styles.body,
      'body-sm': styles.bodySm,
      caption: styles.caption,
      overline: styles.overline,
      code: styles.code,
    },
    tone: {
      default: styles.toneDefault,
      secondary: styles.toneSecondary,
      muted: styles.toneMuted,
      brand: styles.toneBrand,
      success: styles.toneSuccess,
      warning: styles.toneWarning,
      error: styles.toneError,
      info: styles.toneInfo,
    },
    weight: {
      regular: styles.weightRegular,
      medium: styles.weightMedium,
      semibold: styles.weightSemibold,
      bold: styles.weightBold,
    },
    align: {
      left: styles.alignLeft,
      center: styles.alignCenter,
      right: styles.alignRight,
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

type TypographyElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p'
  | 'span'
  | 'div'
  | 'label'
  | 'code';

const defaultElementMap: Record<
  NonNullable<StylexVariantProps<typeof typographyVariants>['variant']>,
  TypographyElement
> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  'body-lg': 'p',
  body: 'p',
  'body-sm': 'p',
  caption: 'span',
  overline: 'span',
  code: 'code',
};

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    StylexVariantProps<typeof typographyVariants> {
  as?: TypographyElement;
  truncate?: boolean;
  sx?: StyleXStyles;
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      as,
      variant = 'body',
      tone,
      weight,
      align,
      truncate = false,
      sx: customSx,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const Component = (as ??
      defaultElementMap[variant ?? 'body']) as React.ElementType;
    const styleProps = mergeStylexProps(
      { className, style, sx: customSx },
      ...typographyVariants({ variant, tone, weight, align }),
      truncate && styles.truncate,
    );

    return (
      <Component ref={ref} {...styleProps} {...props}>
        {children}
      </Component>
    );
  },
);
Typography.displayName = 'Typography';

export interface HeadingProps extends Omit<TypographyProps, 'variant'> {
  level?: 1 | 2 | 3 | 4;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 2, ...props }, ref) => {
    const variantMap = { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4' } as const;
    return <Typography ref={ref} variant={variantMap[level]} {...props} />;
  },
);
Heading.displayName = 'Heading';

export interface TextProps extends Omit<TypographyProps, 'variant'> {
  size?: 'lg' | 'md' | 'sm';
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ size = 'md', ...props }, ref) => {
    const variantMap = {
      lg: 'body-lg',
      md: 'body',
      sm: 'body-sm',
    } as const;
    return <Typography ref={ref} variant={variantMap[size]} {...props} />;
  },
);
Text.displayName = 'Text';

export const Caption = React.forwardRef<
  HTMLElement,
  Omit<TypographyProps, 'variant'>
>((props, ref) => <Typography ref={ref} variant="caption" {...props} />);
Caption.displayName = 'Caption';

export const Code = React.forwardRef<
  HTMLElement,
  Omit<TypographyProps, 'variant'>
>((props, ref) => <Typography ref={ref} variant="code" {...props} />);
Code.displayName = 'Code';
