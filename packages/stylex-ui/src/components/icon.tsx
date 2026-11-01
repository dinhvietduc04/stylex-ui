import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import type { LucideIcon, LucideProps } from 'lucide-react';
import { semanticTokens } from '../tokens/semantic.stylex';
import {
  stylexVariants,
  mergeStylexProps,
  type StylexVariantProps,
} from '../lib/stylex-utils';

const styles = stylex.create({
  base: {
    display: 'inline-flex',
    flexShrink: 0,
    verticalAlign: 'middle',
    userSelect: 'none',
  },
  toneCurrent: { color: 'currentColor' },
  tonePrimary: { color: semanticTokens.textPrimary },
  toneSecondary: { color: semanticTokens.textSecondary },
  toneMuted: { color: semanticTokens.textMuted },
  toneBrand: { color: semanticTokens.brandText },
  toneSuccess: { color: semanticTokens.statusSuccess },
  toneWarning: { color: semanticTokens.statusWarning },
  toneError: { color: semanticTokens.statusError },
  toneInfo: { color: semanticTokens.statusInfo },
  spin: {
    animationName: 'dfw-spin',
    animationDuration: '1s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },
});

export const iconVariants = stylexVariants({
  base: styles.base,
  variants: {
    tone: {
      current: styles.toneCurrent,
      primary: styles.tonePrimary,
      secondary: styles.toneSecondary,
      muted: styles.toneMuted,
      brand: styles.toneBrand,
      success: styles.toneSuccess,
      warning: styles.toneWarning,
      error: styles.toneError,
      info: styles.toneInfo,
    },
  },
  defaultVariants: {
    tone: 'current',
  },
});

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const ICON_SIZE_MAP: Record<IconSize, number> = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

export interface IconProps
  extends Omit<LucideProps, 'size' | 'ref'>,
    StylexVariantProps<typeof iconVariants> {
  /** Lucide icon component */
  icon: LucideIcon;
  /** Standardized icon size token */
  size?: IconSize | number;
  /** Accessible label. If omitted, icon is treated as decorative (`aria-hidden="true"`). */
  label?: string;
  /** Spin animation for loading states */
  spin?: boolean;
  sx?: StyleXStyles;
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      icon: LucideComponent,
      size = 'md',
      tone = 'current',
      strokeWidth = 2,
      label,
      spin = false,
      sx: customSx,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const pixelSize = typeof size === 'number' ? size : ICON_SIZE_MAP[size];
    const isDecorative = !label;

    const styleProps = mergeStylexProps(
      { className, style, sx: customSx },
      ...iconVariants({ tone }),
      spin && styles.spin,
    );

    return (
      <LucideComponent
        ref={ref}
        size={pixelSize}
        strokeWidth={strokeWidth}
        role={isDecorative ? undefined : 'img'}
        aria-label={label}
        aria-hidden={isDecorative ? 'true' : undefined}
        focusable="false"
        {...styleProps}
        {...props}
      />
    );
  },
);
Icon.displayName = 'Icon';
