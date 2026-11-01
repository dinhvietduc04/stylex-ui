import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import { globalTokens } from '../tokens/global.stylex';
import { semanticTokens } from '../tokens/semantic.stylex';
import { componentTokens } from '../tokens/component.stylex';
import { mergeStylexProps } from '../lib/stylex-utils';

const styles = stylex.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: componentTokens.cardRadius,
    backgroundColor: componentTokens.cardBg,
    color: semanticTokens.textPrimary,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: componentTokens.cardBorder,
    boxShadow: componentTokens.cardShadow,
    transitionProperty: 'background-color, border-color, box-shadow',
    transitionDuration: globalTokens.durationNormal,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: globalTokens.space1,
    paddingTop: globalTokens.space5,
    paddingBottom: globalTokens.space4,
    paddingLeft: globalTokens.space6,
    paddingRight: globalTokens.space6,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: semanticTokens.borderSubtle,
  },
  title: {
    margin: 0,
    fontFamily: globalTokens.fontDisplay,
    fontSize: globalTokens.fontSizeLg,
    fontWeight: globalTokens.fontWeightSemibold,
    color: semanticTokens.textPrimary,
  },
  description: {
    margin: 0,
    fontSize: globalTokens.fontSizeSm,
    color: semanticTokens.textMuted,
  },
  content: {
    padding: globalTokens.space6,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: globalTokens.space3,
    paddingTop: globalTokens.space4,
    paddingBottom: globalTokens.space4,
    paddingLeft: globalTokens.space6,
    paddingRight: globalTokens.space6,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: semanticTokens.borderSubtle,
    backgroundColor: semanticTokens.bgSurfaceSubtle,
    borderBottomLeftRadius: componentTokens.cardRadius,
    borderBottomRightRadius: componentTokens.cardRadius,
  },
  divider: {
    width: '100%',
    height: '1px',
    borderWidth: 0,
    margin: 0,
    backgroundColor: semanticTokens.borderDefault,
  },
});

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  sx?: StyleXStyles;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ sx: customSx, className, style, ...props }, ref) => (
    <div
      ref={ref}
      {...mergeStylexProps({ className, style, sx: customSx }, styles.card)}
      {...props}
    />
  ),
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(
  ({ sx: customSx, className, style, ...props }, ref) => (
    <div
      ref={ref}
      {...mergeStylexProps({ className, style, sx: customSx }, styles.header)}
      {...props}
    />
  ),
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & { sx?: StyleXStyles }
>(({ sx: customSx, className, style, ...props }, ref) => (
  <h3
    ref={ref}
    {...mergeStylexProps({ className, style, sx: customSx }, styles.title)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { sx?: StyleXStyles }
>(({ sx: customSx, className, style, ...props }, ref) => (
  <p
    ref={ref}
    {...mergeStylexProps({ className, style, sx: customSx }, styles.description)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<HTMLDivElement, CardProps>(
  ({ sx: customSx, className, style, ...props }, ref) => (
    <div
      ref={ref}
      {...mergeStylexProps({ className, style, sx: customSx }, styles.content)}
      {...props}
    />
  ),
);
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, CardProps>(
  ({ sx: customSx, className, style, ...props }, ref) => (
    <div
      ref={ref}
      {...mergeStylexProps({ className, style, sx: customSx }, styles.footer)}
      {...props}
    />
  ),
);
CardFooter.displayName = 'CardFooter';

export const Divider = React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement> & { sx?: StyleXStyles }
>(({ sx: customSx, className, style, ...props }, ref) => (
  <hr
    ref={ref}
    {...mergeStylexProps({ className, style, sx: customSx }, styles.divider)}
    {...props}
  />
));
Divider.displayName = 'Divider';
