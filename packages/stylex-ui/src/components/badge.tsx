'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import { X } from 'lucide-react';
import { globalTokens } from '../tokens/global.stylex';
import { semanticTokens } from '../tokens/semantic.stylex';
import { componentTokens } from '../tokens/component.stylex';
import {
  stylexVariants,
  mergeStylexProps,
  type StylexVariantProps,
} from '../lib/stylex-utils';

const styles = stylex.create({
  // StatusDot
  dotWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: globalTokens.space2,
  },
  dotContainer: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  dotCore: {
    borderRadius: globalTokens.radiusFull,
  },
  dotPulseRing: {
    position: 'absolute',
    inset: 0,
    borderRadius: globalTokens.radiusFull,
    animationName: 'dfw-pulse-dot',
    animationDuration: '1.8s',
    animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
    animationIterationCount: 'infinite',
  },
  dotSizeSm: {
    width: componentTokens.statusDotSm,
    height: componentTokens.statusDotSm,
  },
  dotSizeMd: {
    width: componentTokens.statusDotMd,
    height: componentTokens.statusDotMd,
  },
  dotSizeLg: {
    width: componentTokens.statusDotLg,
    height: componentTokens.statusDotLg,
  },
  dotSuccess: { backgroundColor: semanticTokens.statusSuccess },
  dotWarning: { backgroundColor: semanticTokens.statusWarning },
  dotError: { backgroundColor: semanticTokens.statusError },
  dotInfo: { backgroundColor: semanticTokens.statusInfo },
  dotNeutral: { backgroundColor: semanticTokens.statusNeutral },
  dotPrimary: { backgroundColor: semanticTokens.brandText },
  dotLabel: {
    fontSize: globalTokens.fontSizeSm,
    fontWeight: globalTokens.fontWeightMedium,
    color: semanticTokens.textPrimary,
  },

  // Badge
  badgeBase: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
    borderRadius: componentTokens.badgeRadius,
    fontFamily: globalTokens.fontSans,
    fontWeight: globalTokens.fontWeightMedium,
    borderWidth: '1px',
    borderStyle: 'solid',
    whiteSpace: 'nowrap',
    lineHeight: 1.2,
    transitionProperty: 'background-color, color, border-color',
    transitionDuration: globalTokens.durationFast,
  },
  badgeSizeSm: {
    paddingTop: '0.15rem',
    paddingBottom: '0.15rem',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    fontSize: globalTokens.fontSizeXs,
  },
  badgeSizeMd: {
    paddingTop: '0.25rem',
    paddingBottom: '0.25rem',
    paddingLeft: '0.65rem',
    paddingRight: '0.65rem',
    fontSize: globalTokens.fontSizeXs,
  },
  badgeSizeLg: {
    paddingTop: '0.35rem',
    paddingBottom: '0.35rem',
    paddingLeft: '0.85rem',
    paddingRight: '0.85rem',
    fontSize: globalTokens.fontSizeSm,
  },

  // Subtle semantic variants (using OKLCH alpha tokens)
  subtleSuccess: {
    backgroundColor: semanticTokens.statusSuccessBg,
    borderColor: semanticTokens.statusSuccessBorder,
    color: semanticTokens.statusSuccessText,
  },
  subtleWarning: {
    backgroundColor: semanticTokens.statusWarningBg,
    borderColor: semanticTokens.statusWarningBorder,
    color: semanticTokens.statusWarningText,
  },
  subtleError: {
    backgroundColor: semanticTokens.statusErrorBg,
    borderColor: semanticTokens.statusErrorBorder,
    color: semanticTokens.statusErrorText,
  },
  subtleInfo: {
    backgroundColor: semanticTokens.statusInfoBg,
    borderColor: semanticTokens.statusInfoBorder,
    color: semanticTokens.statusInfoText,
  },
  subtleNeutral: {
    backgroundColor: semanticTokens.statusNeutralBg,
    borderColor: semanticTokens.statusNeutralBorder,
    color: semanticTokens.statusNeutralText,
  },
  subtlePrimary: {
    backgroundColor: semanticTokens.brandPrimarySubtle,
    borderColor: semanticTokens.brandPrimaryBorder,
    color: semanticTokens.brandText,
  },

  // Solid semantic variants
  solidSuccess: {
    backgroundColor: semanticTokens.statusSuccess,
    borderColor: semanticTokens.statusSuccess,
    color: semanticTokens.textOnPrimary,
  },
  solidWarning: {
    backgroundColor: semanticTokens.statusWarning,
    borderColor: semanticTokens.statusWarning,
    color: semanticTokens.textOnPrimary,
  },
  solidError: {
    backgroundColor: semanticTokens.statusError,
    borderColor: semanticTokens.statusError,
    color: semanticTokens.textOnPrimary,
  },
  solidInfo: {
    backgroundColor: semanticTokens.statusInfo,
    borderColor: semanticTokens.statusInfo,
    color: semanticTokens.textOnPrimary,
  },
  solidNeutral: {
    backgroundColor: semanticTokens.statusNeutral,
    borderColor: semanticTokens.statusNeutral,
    color: semanticTokens.textOnPrimary,
  },
  solidPrimary: {
    backgroundColor: semanticTokens.brandPrimary,
    borderColor: semanticTokens.brandPrimary,
    color: semanticTokens.textOnPrimary,
  },

  // Tag
  tagShape: {
    borderRadius: componentTokens.tagRadius,
  },
  tagRemoveBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1rem',
    height: '1rem',
    marginLeft: '0.1rem',
    borderRadius: globalTokens.radiusXs,
    borderWidth: 0,
    padding: 0,
    backgroundColor: 'transparent',
    color: 'currentColor',
    opacity: 0.7,
    cursor: 'pointer',
    ':hover': {
      opacity: 1,
      backgroundColor: 'oklch(0.145 0 0 / 0.1)',
    },
  },
});

export type StatusVariant =
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral'
  | 'primary';

export interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: StatusVariant;
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
  label?: React.ReactNode;
  sx?: StyleXStyles;
}

export const StatusDot = React.forwardRef<HTMLSpanElement, StatusDotProps>(
  (
    {
      variant = 'neutral',
      size = 'md',
      pulse = false,
      label,
      sx: customSx,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const colorMap = {
      success: styles.dotSuccess,
      warning: styles.dotWarning,
      error: styles.dotError,
      info: styles.dotInfo,
      neutral: styles.dotNeutral,
      primary: styles.dotPrimary,
    } as const;

    const sizeMap = {
      sm: styles.dotSizeSm,
      md: styles.dotSizeMd,
      lg: styles.dotSizeLg,
    } as const;

    const dotElement = (
      <span
        {...stylex.props(styles.dotContainer, sizeMap[size])}
        aria-hidden={label ? 'true' : undefined}
      >
        {pulse ? (
          <span {...stylex.props(styles.dotPulseRing, colorMap[variant])} />
        ) : null}
        <span
          {...stylex.props(styles.dotCore, sizeMap[size], colorMap[variant])}
        />
      </span>
    );

    if (!label) {
      return (
        <span
          ref={ref}
          {...mergeStylexProps({ className, style, sx: customSx })}
          {...props}
        >
          {dotElement}
        </span>
      );
    }

    return (
      <span
        ref={ref}
        {...mergeStylexProps(
          { className, style, sx: customSx },
          styles.dotWrapper,
        )}
        {...props}
      >
        {dotElement}
        <span {...stylex.props(styles.dotLabel)}>{label}</span>
      </span>
    );
  },
);
StatusDot.displayName = 'StatusDot';

export const badgeVariants = stylexVariants({
  base: styles.badgeBase,
  variants: {
    variant: {
      success: styles.subtleSuccess,
      warning: styles.subtleWarning,
      error: styles.subtleError,
      info: styles.subtleInfo,
      neutral: styles.subtleNeutral,
      primary: styles.subtlePrimary,
    },
    size: {
      sm: styles.badgeSizeSm,
      md: styles.badgeSizeMd,
      lg: styles.badgeSizeLg,
    },
  },
  defaultVariants: {
    variant: 'neutral',
    size: 'md',
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    StylexVariantProps<typeof badgeVariants> {
  /** Visual fill style */
  appearance?: 'subtle' | 'solid';
  /** Render a status dot inside the badge */
  dot?: boolean;
  /** Enable pulsing animation on the status dot */
  pulse?: boolean;
  sx?: StyleXStyles;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'neutral',
      size = 'md',
      appearance = 'subtle',
      dot = false,
      pulse = false,
      sx: customSx,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const solidMap = {
      success: styles.solidSuccess,
      warning: styles.solidWarning,
      error: styles.solidError,
      info: styles.solidInfo,
      neutral: styles.solidNeutral,
      primary: styles.solidPrimary,
    } as const;

    const resolvedVariant = variant ?? 'neutral';

    const styleProps = mergeStylexProps(
      { className, style, sx: customSx },
      ...badgeVariants({ variant: resolvedVariant, size }),
      appearance === 'solid' && solidMap[resolvedVariant],
    );

    return (
      <span ref={ref} {...styleProps} {...props}>
        {dot || pulse ? (
          <StatusDot variant={resolvedVariant} size="sm" pulse={pulse} />
        ) : null}
        {children}
      </span>
    );
  },
);
Badge.displayName = 'Badge';

export interface TagProps extends BadgeProps {
  /** Show remove button */
  removable?: boolean;
  /** Callback when remove button is clicked */
  onRemove?: () => void;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      variant = 'neutral',
      size = 'md',
      removable = false,
      onRemove,
      sx: customSx,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Badge
        ref={ref}
        variant={variant}
        size={size}
        sx={[styles.tagShape, customSx]}
        {...props}
      >
        <span>{children}</span>
        {removable || onRemove ? (
          <button
            type="button"
            aria-label="Remove tag"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            {...stylex.props(styles.tagRemoveBtn)}
          >
            <X size={11} aria-hidden="true" />
          </button>
        ) : null}
      </Badge>
    );
  },
);
Tag.displayName = 'Tag';
