import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
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
    display: 'block',
    backgroundColor: componentTokens.skeletonBaseBg,
    animationName: 'dfw-skeleton-shimmer',
    animationDuration: '1.6s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
  },
  text: {
    height: '0.875rem',
    width: '100%',
    borderRadius: globalTokens.radiusSm,
  },
  circular: {
    width: '2.75rem',
    height: '2.75rem',
    borderRadius: globalTokens.radiusFull,
    flexShrink: 0,
  },
  rectangular: {
    width: '100%',
    height: '6rem',
    borderRadius: globalTokens.radiusNone,
  },
  rounded: {
    width: '100%',
    height: '6rem',
    borderRadius: componentTokens.skeletonRadius,
  },
  linesStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: globalTokens.space2,
    width: '100%',
  },
  cardSkeleton: {
    display: 'flex',
    flexDirection: 'column',
    gap: globalTokens.space4,
    padding: globalTokens.space5,
    borderRadius: componentTokens.cardRadius,
    backgroundColor: componentTokens.cardBg,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: semanticTokens.borderDefault,
  },
  cardSkeletonHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: globalTokens.space3,
  },
  cardSkeletonMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: globalTokens.space2,
    flex: 1,
  },
});

export const skeletonVariants = stylexVariants({
  base: styles.base,
  variants: {
    variant: {
      text: styles.text,
      circular: styles.circular,
      rectangular: styles.rectangular,
      rounded: styles.rounded,
    },
  },
  defaultVariants: {
    variant: 'rounded',
  },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    StylexVariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
  /** Render multiple stacked lines when variant="text" */
  lines?: number;
  sx?: StyleXStyles;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'rounded',
      width,
      height,
      lines = 1,
      sx: customSx,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const dimensionStyle: React.CSSProperties = {
      ...(width !== undefined
        ? { width: typeof width === 'number' ? `${width}px` : width }
        : {}),
      ...(height !== undefined
        ? { height: typeof height === 'number' ? `${height}px` : height }
        : {}),
      ...style,
    };

    if (variant === 'text' && lines > 1) {
      return (
        <div
          ref={ref}
          aria-busy="true"
          aria-live="polite"
          {...stylex.props(styles.linesStack, customSx)}
          {...props}
        >
          {Array.from({ length: lines }).map((_, idx) => (
            <div
              key={idx}
              {...mergeStylexProps(
                {
                  style: idx === lines - 1 ? { width: '68%' } : dimensionStyle,
                },
                ...skeletonVariants({ variant: 'text' }),
              )}
            />
          ))}
        </div>
      );
    }

    const styleProps = mergeStylexProps(
      { className, style: dimensionStyle, sx: customSx },
      ...skeletonVariants({ variant }),
    );

    return (
      <div
        ref={ref}
        aria-busy="true"
        aria-live="polite"
        {...styleProps}
        {...props}
      />
    );
  },
);
Skeleton.displayName = 'Skeleton';

export function SkeletonCard() {
  return (
    <div {...stylex.props(styles.cardSkeleton)} aria-busy="true">
      <div {...stylex.props(styles.cardSkeletonHeader)}>
        <Skeleton variant="circular" width={42} height={42} />
        <div {...stylex.props(styles.cardSkeletonMeta)}>
          <Skeleton variant="text" width="55%" height={14} />
          <Skeleton variant="text" width="35%" height={11} />
        </div>
      </div>
      <Skeleton variant="rounded" height={88} />
      <Skeleton variant="text" lines={2} />
    </div>
  );
}
