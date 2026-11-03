'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import { globalTokens } from '../tokens/global.stylex';
import { semanticTokens } from '../tokens/semantic.stylex';
import { StatusDot, type StatusVariant } from './badge';

const styles = stylex.create({
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'visible',
    borderRadius: globalTokens.radiusFull,
    backgroundColor: semanticTokens.brandPrimary,
    color: semanticTokens.textOnPrimary,
    fontFamily: globalTokens.fontSans,
    fontWeight: globalTokens.fontWeightSemibold,
    userSelect: 'none',
  },
  sizeSm: {
    width: '1.75rem',
    height: '1.75rem',
    fontSize: globalTokens.fontSizeXs,
  },
  sizeMd: {
    width: '2.25rem',
    height: '2.25rem',
    fontSize: globalTokens.fontSizeSm,
  },
  sizeLg: {
    width: '3rem',
    height: '3rem',
    fontSize: globalTokens.fontSizeLg,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: globalTokens.radiusFull,
  },
  status: {
    position: 'absolute',
    right: '-0.125rem',
    bottom: '-0.125rem',
    boxShadow: `0 0 0 2px ${semanticTokens.bgSurface}`,
    borderRadius: globalTokens.radiusFull,
  },
});

const sizeStyles = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const;

export interface AvatarProps {
  src?: string | null;
  name?: string | null;
  size?: 'sm' | 'md' | 'lg';
  status?: StatusVariant;
  ariaLabel?: string;
  sx?: StyleXStyles;
}

function getInitials(name?: string | null): string {
  const parts = name?.trim().split(/\s+/).filter(Boolean) ?? [];

  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();

  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
}

export function Avatar({
  src,
  name,
  size = 'md',
  status,
  ariaLabel,
  sx: customSx,
}: AvatarProps) {
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    setFailed(false);
  }, [src]);

  const showImage = Boolean(src) && !failed;

  return (
    <span
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
      {...stylex.props(styles.base, sizeStyles[size], customSx)}
    >
      {showImage ? (
        <img
          src={src ?? undefined}
          alt=""
          onError={() => setFailed(true)}
          {...stylex.props(styles.image)}
        />
      ) : (
        <span aria-hidden="true">{getInitials(name)}</span>
      )}
      {status ? (
        <StatusDot variant={status} size="sm" sx={styles.status} />
      ) : null}
    </span>
  );
}

Avatar.displayName = 'Avatar';
