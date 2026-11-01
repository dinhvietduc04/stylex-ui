'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import { Slot } from '@radix-ui/react-slot';
import { Loader2 } from 'lucide-react';
import { globalTokens } from '../tokens/global.stylex';
import { semanticTokens } from '../tokens/semantic.stylex';
import { componentTokens } from '../tokens/component.stylex';
import {
  stylexVariants,
  mergeStylexProps,
  type StylexVariantProps,
} from '../lib/stylex-utils';

const styles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: globalTokens.space2,
    whiteSpace: 'nowrap',
    borderRadius: componentTokens.buttonRadius,
    fontFamily: globalTokens.fontSans,
    fontWeight: componentTokens.buttonFontWeight,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    cursor: 'pointer',
    textDecoration: 'none',
    userSelect: 'none',
    outline: 'none',
    transitionProperty:
      'background-color, color, border-color, box-shadow, transform, opacity',
    transitionDuration: globalTokens.durationFast,
    transitionTimingFunction: globalTokens.easeStandard,
    ':focus-visible': {
      boxShadow: `0 0 0 3px ${semanticTokens.ringColor}`,
      borderColor: semanticTokens.borderFocus,
    },
    ':disabled': {
      opacity: 0.55,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
    ':active': {
      transform: 'translateY(0.5px)',
    },
  },

  // Variants
  primary: {
    backgroundColor: componentTokens.buttonPrimaryBg,
    color: componentTokens.buttonPrimaryText,
    boxShadow: globalTokens.shadowXs,
    ':hover': {
      backgroundColor: componentTokens.buttonPrimaryHoverBg,
    },
  },
  secondary: {
    backgroundColor: semanticTokens.brandSecondary,
    color: semanticTokens.brandSecondaryText,
    borderColor: semanticTokens.borderSubtle,
    ':hover': {
      backgroundColor: semanticTokens.brandSecondaryHover,
    },
  },
  outline: {
    backgroundColor: semanticTokens.bgSurface,
    color: semanticTokens.textPrimary,
    borderColor: semanticTokens.borderStrong,
    ':hover': {
      backgroundColor: semanticTokens.bgSurfaceHover,
      borderColor: semanticTokens.brandPrimary,
    },
  },
  ghost: {
    backgroundColor: 'transparent',
    color: semanticTokens.textSecondary,
    ':hover': {
      backgroundColor: semanticTokens.bgSurfaceHover,
      color: semanticTokens.textPrimary,
    },
  },
  destructive: {
    backgroundColor: semanticTokens.statusError,
    color: semanticTokens.textOnPrimary,
    boxShadow: globalTokens.shadowXs,
    ':hover': {
      backgroundColor: semanticTokens.statusErrorHover,
    },
  },
  success: {
    backgroundColor: semanticTokens.statusSuccess,
    color: semanticTokens.textOnPrimary,
    boxShadow: globalTokens.shadowXs,
    ':hover': {
      opacity: 0.92,
    },
  },
  link: {
    backgroundColor: 'transparent',
    color: semanticTokens.textLink,
    paddingLeft: globalTokens.space1,
    paddingRight: globalTokens.space1,
    height: 'auto',
    ':hover': {
      textDecoration: 'underline',
    },
  },

  // Sizes
  sizeXs: {
    height: componentTokens.buttonHeightXs,
    paddingLeft: globalTokens.space2,
    paddingRight: globalTokens.space2,
    fontSize: globalTokens.fontSizeXs,
  },
  sizeSm: {
    height: componentTokens.buttonHeightSm,
    paddingLeft: globalTokens.space3,
    paddingRight: globalTokens.space3,
    fontSize: globalTokens.fontSizeSm,
  },
  sizeMd: {
    height: componentTokens.buttonHeightMd,
    paddingLeft: globalTokens.space4,
    paddingRight: globalTokens.space4,
    fontSize: globalTokens.fontSizeSm,
  },
  sizeLg: {
    height: componentTokens.buttonHeightLg,
    paddingLeft: globalTokens.space6,
    paddingRight: globalTokens.space6,
    fontSize: globalTokens.fontSizeMd,
  },
  sizeIcon: {
    height: componentTokens.buttonHeightMd,
    width: componentTokens.buttonHeightMd,
    padding: 0,
  },

  // Modifiers
  fullWidth: {
    width: '100%',
  },
  circle: {
    borderRadius: globalTokens.radiusFull,
  },
  iconButtonXs: {
    height: componentTokens.buttonHeightXs,
    width: componentTokens.buttonHeightXs,
    padding: 0,
  },
  iconButtonSm: {
    height: componentTokens.buttonHeightSm,
    width: componentTokens.buttonHeightSm,
    padding: 0,
  },
  iconButtonMd: {
    height: componentTokens.buttonHeightMd,
    width: componentTokens.buttonHeightMd,
    padding: 0,
  },
  iconButtonLg: {
    height: componentTokens.buttonHeightLg,
    width: componentTokens.buttonHeightLg,
    padding: 0,
  },
  spinner: {
    animationName: 'dfw-spin',
    animationDuration: '0.85s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    flexShrink: 0,
  },
});

export const buttonVariants = stylexVariants({
  base: styles.base,
  variants: {
    variant: {
      primary: styles.primary,
      default: styles.primary,
      secondary: styles.secondary,
      outline: styles.outline,
      ghost: styles.ghost,
      destructive: styles.destructive,
      danger: styles.destructive,
      success: styles.success,
      link: styles.link,
    },
    size: {
      xs: styles.sizeXs,
      sm: styles.sizeSm,
      md: styles.sizeMd,
      default: styles.sizeMd,
      lg: styles.sizeLg,
      icon: styles.sizeIcon,
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    StylexVariantProps<typeof buttonVariants> {
  /** Render as child element via Radix Slot */
  asChild?: boolean;
  /** Show loading spinner and disable interaction */
  isLoading?: boolean;
  /** Optional text shown while loading */
  loadingText?: string;
  /** Leading icon element */
  leftIcon?: React.ReactNode;
  /** Trailing icon element */
  rightIcon?: React.ReactNode;
  /** Stretch button to 100% width */
  fullWidth?: boolean;
  /** Custom StyleX override */
  sx?: StyleXStyles;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      asChild = false,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      sx: customSx,
      className,
      style,
      children,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isDisabled = Boolean(disabled || isLoading);

    const styleProps = mergeStylexProps(
      { className, style, sx: customSx },
      ...buttonVariants({ variant, size }),
      fullWidth && styles.fullWidth,
    );

    if (asChild) {
      return (
        <Comp
          ref={ref}
          aria-busy={isLoading || undefined}
          {...styleProps}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        {...styleProps}
        {...props}
      >
        {isLoading ? (
          <Loader2
            size={16}
            aria-hidden="true"
            {...stylex.props(styles.spinner)}
          />
        ) : (
          leftIcon
        )}
        {isLoading && loadingText ? loadingText : children}
        {!isLoading ? rightIcon : null}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export interface IconButtonProps
  extends Omit<
    ButtonProps,
    'leftIcon' | 'rightIcon' | 'loadingText' | 'fullWidth' | 'size'
  > {
  /** Mandatory accessible label for screen readers */
  'aria-label': string;
  /** Button size */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Button shape */
  shape?: 'square' | 'circle';
  /** Icon element to render inside the button */
  icon?: React.ReactNode;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = 'ghost',
      size = 'md',
      shape = 'square',
      isLoading = false,
      icon,
      children,
      sx: customSx,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const sizeStyleMap = {
      xs: styles.iconButtonXs,
      sm: styles.iconButtonSm,
      md: styles.iconButtonMd,
      lg: styles.iconButtonLg,
    } as const;

    const styleProps = mergeStylexProps(
      { className, style, sx: customSx },
      ...buttonVariants({ variant }),
      sizeStyleMap[size],
      shape === 'circle' && styles.circle,
    );

    return (
      <button
        ref={ref}
        type="button"
        disabled={Boolean(props.disabled || isLoading)}
        aria-busy={isLoading || undefined}
        {...styleProps}
        {...props}
      >
        {isLoading ? (
          <Loader2
            size={16}
            aria-hidden="true"
            {...stylex.props(styles.spinner)}
          />
        ) : (
          (icon ?? children)
        )}
      </button>
    );
  },
);
IconButton.displayName = 'IconButton';
