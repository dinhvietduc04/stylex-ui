import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import { globalTokens } from '../tokens/global.stylex';
import { semanticTokens } from '../tokens/semantic.stylex';
import { mergeStylexProps } from '../lib/stylex-utils';

const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: globalTokens.space12,
    paddingBottom: globalTokens.space12,
    paddingLeft: globalTokens.space6,
    paddingRight: globalTokens.space6,
    textAlign: 'center',
  },
  rootSm: {
    paddingTop: globalTokens.space8,
    paddingBottom: globalTokens.space8,
    paddingLeft: globalTokens.space4,
    paddingRight: globalTokens.space4,
  },
  iconFrame: {
    display: 'grid',
    placeItems: 'center',
    width: globalTokens.space16,
    height: globalTokens.space16,
    marginBottom: globalTokens.space4,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: semanticTokens.borderSubtle,
    borderRadius: globalTokens.radiusLg,
    backgroundColor: semanticTokens.bgSurfaceSubtle,
    color: semanticTokens.brandText,
    flexShrink: 0,
  },
  iconFrameSm: {
    width: globalTokens.space10,
    height: globalTokens.space10,
    marginBottom: globalTokens.space3,
    borderRadius: globalTokens.radiusMd,
  },
  title: {
    margin: 0,
    fontFamily: globalTokens.fontDisplay,
    fontSize: globalTokens.fontSizeLg,
    fontWeight: globalTokens.fontWeightSemibold,
    letterSpacing: '-0.015em',
    color: semanticTokens.textPrimary,
  },
  titleSm: {
    fontSize: globalTokens.fontSizeMd,
  },
  description: {
    maxWidth: '46ch',
    margin: 0,
    marginTop: globalTokens.space2,
    fontSize: globalTokens.fontSizeSm,
    lineHeight: globalTokens.lineHeightNormal,
    color: semanticTokens.textMuted,
    textWrap: 'pretty',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: globalTokens.space2,
    marginTop: globalTokens.space5,
  },
});

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  size?: 'sm' | 'md';
  sx?: StyleXStyles;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      icon,
      title,
      description,
      primaryAction,
      secondaryAction,
      size,
      sx: customSx,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const isSm = size === 'sm';

    return (
      <div
        ref={ref}
        {...mergeStylexProps(
          { className, style, sx: customSx },
          styles.root,
          isSm && styles.rootSm,
        )}
        {...props}
      >
        {icon ? (
          <span
            aria-hidden="true"
            {...stylex.props(styles.iconFrame, isSm && styles.iconFrameSm)}
          >
            {icon}
          </span>
        ) : null}
        <p {...stylex.props(styles.title, isSm && styles.titleSm)}>{title}</p>

        {description ? (
          <p {...stylex.props(styles.description)}>{description}</p>
        ) : null}

        {primaryAction || secondaryAction ? (
          <div {...stylex.props(styles.actions)}>
            {primaryAction}
            {secondaryAction}
          </div>
        ) : null}
      </div>
    );
  },
);
EmptyState.displayName = 'EmptyState';
