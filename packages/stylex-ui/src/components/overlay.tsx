'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { globalTokens } from '../tokens/global.stylex';
import { semanticTokens } from '../tokens/semantic.stylex';
import { componentTokens } from '../tokens/component.stylex';
import { mergeStylexProps } from '../lib/stylex-utils';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const styles = stylex.create({
  backdrop: {
    position: 'fixed',
    inset: 0,
    zIndex: globalTokens.zOverlay,
    backgroundColor: componentTokens.overlayBackdrop,
    backdropFilter: 'blur(4px)',
    animationName: 'dfw-fade-in',
    animationDuration: globalTokens.durationNormal,
    animationTimingFunction: globalTokens.easeStandard,
  },

  // Modal Content
  modalContent: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: globalTokens.zModal,
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100vw - 2rem)',
    maxHeight: 'calc(100vh - 3rem)',
    borderRadius: componentTokens.modalRadius,
    backgroundColor: componentTokens.modalBg,
    color: semanticTokens.textPrimary,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: componentTokens.modalBorder,
    boxShadow: componentTokens.modalShadow,
    outline: 'none',
    overflow: 'hidden',
    animationName: 'dfw-scale-in',
    animationDuration: globalTokens.durationNormal,
    animationTimingFunction: globalTokens.easeSpring,
  },
  modalSm: { maxWidth: '25rem' },
  modalMd: { maxWidth: '32rem' },
  modalLg: { maxWidth: '42rem' },
  modalXl: { maxWidth: '54rem' },

  // Slide-over Drawer Content
  drawerContent: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    zIndex: globalTokens.zDrawer,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
    backgroundColor: componentTokens.modalBg,
    color: semanticTokens.textPrimary,
    boxShadow: componentTokens.modalShadow,
    outline: 'none',
    overflow: 'hidden',
    animationDuration: globalTokens.durationSlow,
    animationTimingFunction: globalTokens.easeSpring,
  },
  drawerRight: {
    right: 0,
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: componentTokens.modalBorder,
    animationName: 'dfw-slide-in-right',
  },
  drawerLeft: {
    left: 0,
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: componentTokens.modalBorder,
    animationName: 'dfw-slide-in-left',
  },
  drawerSm: { maxWidth: componentTokens.drawerWidthSm },
  drawerMd: { maxWidth: componentTokens.drawerWidthMd },
  drawerLg: { maxWidth: componentTokens.drawerWidthLg },

  // Shared Header / Body / Footer
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: globalTokens.space4,
    paddingTop: globalTokens.space5,
    paddingBottom: globalTokens.space4,
    paddingLeft: globalTokens.space6,
    paddingRight: globalTokens.space6,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: semanticTokens.borderSubtle,
  },
  headerTitles: {
    display: 'flex',
    flexDirection: 'column',
    gap: globalTokens.space1,
  },
  title: {
    margin: 0,
    fontFamily: globalTokens.fontDisplay,
    fontSize: globalTokens.fontSizeLg,
    fontWeight: globalTokens.fontWeightSemibold,
    color: semanticTokens.textPrimary,
    lineHeight: globalTokens.lineHeightSnug,
  },
  description: {
    margin: 0,
    fontSize: globalTokens.fontSizeSm,
    color: semanticTokens.textMuted,
    lineHeight: globalTokens.lineHeightNormal,
  },
  closeButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2rem',
    height: '2rem',
    flexShrink: 0,
    borderRadius: globalTokens.radiusMd,
    borderWidth: 0,
    backgroundColor: 'transparent',
    color: semanticTokens.textMuted,
    cursor: 'pointer',
    transitionProperty: 'background-color, color',
    transitionDuration: globalTokens.durationFast,
    ':hover': {
      backgroundColor: semanticTokens.bgSurfaceHover,
      color: semanticTokens.textPrimary,
    },
    ':focus-visible': {
      outline: `2px solid ${semanticTokens.borderFocus}`,
    },
  },
  body: {
    flex: 1,
    overflowY: 'auto',
    paddingTop: globalTokens.space5,
    paddingBottom: globalTokens.space5,
    paddingLeft: globalTokens.space6,
    paddingRight: globalTokens.space6,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: globalTokens.space3,
    paddingTop: globalTokens.space4,
    paddingBottom: globalTokens.space4,
    paddingLeft: globalTokens.space6,
    paddingRight: globalTokens.space6,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: semanticTokens.borderSubtle,
    backgroundColor: semanticTokens.bgSurfaceSubtle,
  },
});

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogPortal = DialogPrimitive.Portal;

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
    sx?: StyleXStyles;
  }
>(({ sx: customSx, className, style, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    {...mergeStylexProps({ className, style, sx: customSx }, styles.backdrop)}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: ModalSize;
  hideCloseButton?: boolean;
  sx?: StyleXStyles;
  hideTitle?: boolean;
}

export function Modal({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  size = 'md',
  hideCloseButton = false,
  hideTitle = false,
  sx: customSx,
}: ModalProps) {
  const sizeMap = {
    sm: styles.modalSm,
    md: styles.modalMd,
    lg: styles.modalLg,
    xl: styles.modalXl,
  } as const;

  return (
    <DialogPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {trigger ? (
        <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      ) : null}
      <DialogPrimitive.Portal>
        <DialogOverlay />
        <DialogPrimitive.Content
          {...stylex.props(styles.modalContent, sizeMap[size], customSx)}
        >
          {title || description || !hideCloseButton ? (
            <div {...stylex.props(styles.header)}>
              <div {...stylex.props(styles.headerTitles)}>
                {title ? (
                  hideTitle ? (
                    <VisuallyHidden>
                      <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
                    </VisuallyHidden>
                  ) : (
                    <DialogPrimitive.Title {...stylex.props(styles.title)}>
                      {title}
                    </DialogPrimitive.Title>
                  )
                ) : (
                  <DialogPrimitive.Title>Dialog</DialogPrimitive.Title>
                )}
                {description ? (
                  <DialogPrimitive.Description
                    {...stylex.props(styles.description)}
                  >
                    {description}
                  </DialogPrimitive.Description>
                ) : null}
              </div>
              {!hideCloseButton ? (
                <DialogPrimitive.Close
                  aria-label="Close modal"
                  {...stylex.props(styles.closeButton)}
                >
                  <X size={18} aria-hidden="true" />
                </DialogPrimitive.Close>
              ) : null}
            </div>
          ) : null}

          <div {...stylex.props(styles.body)}>{children}</div>

          {footer ? <div {...stylex.props(styles.footer)}>{footer}</div> : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export type DrawerSize = 'sm' | 'md' | 'lg';
export type DrawerSide = 'right' | 'left';

export interface DrawerProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: DrawerSize;
  side?: DrawerSide;
  hideCloseButton?: boolean;
  sx?: StyleXStyles;
  headerSx?: StyleXStyles;
  bodySx?: StyleXStyles;
  hideHeader?: boolean;
}

export function Drawer({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  size = 'md',
  side = 'right',
  hideCloseButton = false,
  sx: customSx,
  headerSx,
  bodySx,
  hideHeader = false,
}: DrawerProps) {
  const sizeMap = {
    sm: styles.drawerSm,
    md: styles.drawerMd,
    lg: styles.drawerLg,
  } as const;

  return (
    <DialogPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {trigger ? (
        <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      ) : null}
      <DialogPrimitive.Portal>
        <DialogOverlay />
        <DialogPrimitive.Content
          {...stylex.props(
            styles.drawerContent,
            side === 'right' ? styles.drawerRight : styles.drawerLeft,
            sizeMap[size],
            customSx,
          )}
        >
          {hideHeader ? (
            <>
              {title ? (
                <VisuallyHidden>
                  <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
                </VisuallyHidden>
              ) : null}
              {description ? (
                <VisuallyHidden>
                  <DialogPrimitive.Description>
                    {description}
                  </DialogPrimitive.Description>
                </VisuallyHidden>
              ) : null}
            </>
          ) : (
            <div {...stylex.props(styles.header, headerSx)}>
              <div {...stylex.props(styles.headerTitles)}>
                {title ? (
                  <DialogPrimitive.Title {...stylex.props(styles.title)}>
                    {title}
                  </DialogPrimitive.Title>
                ) : null}
                {description ? (
                  <DialogPrimitive.Description
                    {...stylex.props(styles.description)}
                  >
                    {description}
                  </DialogPrimitive.Description>
                ) : null}
              </div>
              {!hideCloseButton ? (
                <DialogPrimitive.Close
                  aria-label="Close drawer"
                  {...stylex.props(styles.closeButton)}
                >
                  <X size={18} aria-hidden="true" />
                </DialogPrimitive.Close>
              ) : null}
            </div>
          )}

          <div {...stylex.props(styles.body, bodySx)}>{children}</div>

          {footer ? <div {...stylex.props(styles.footer)}>{footer}</div> : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
