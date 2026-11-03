'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  Toaster as SonnerToaster,
  toast as sonnerToast,
  type ExternalToast,
} from 'sonner';
import {
  AlertTriangle,
  Trash2,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { globalTokens } from '../tokens/global.stylex';
import { semanticTokens } from '../tokens/semantic.stylex';
import { useStylexTheme } from '../themes/theme-provider';
import { Modal } from './overlay';
import { Button } from './button';

const styles = stylex.create({
  confirmBody: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: globalTokens.space4,
  },
  iconCircle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2.75rem',
    height: '2.75rem',
    borderRadius: globalTokens.radiusFull,
    flexShrink: 0,
  },
  iconDanger: {
    backgroundColor: semanticTokens.statusErrorBg,
    color: semanticTokens.statusError,
  },
  iconWarning: {
    backgroundColor: semanticTokens.statusWarningBg,
    color: semanticTokens.statusWarning,
  },
  iconInfo: {
    backgroundColor: semanticTokens.statusInfoBg,
    color: semanticTokens.statusInfo,
  },
  iconPrimary: {
    backgroundColor: semanticTokens.brandPrimarySubtle,
    color: semanticTokens.brandPrimary,
  },
  contentCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: globalTokens.space1,
    flex: 1,
  },
  confirmTitle: {
    margin: 0,
    fontFamily: globalTokens.fontDisplay,
    fontSize: globalTokens.fontSizeMd,
    fontWeight: globalTokens.fontWeightSemibold,
    color: semanticTokens.textPrimary,
  },
  confirmDesc: {
    margin: 0,
    fontSize: globalTokens.fontSizeSm,
    color: semanticTokens.textSecondary,
    lineHeight: globalTokens.lineHeightNormal,
  },
});

export type ConfirmVariant = 'danger' | 'warning' | 'info' | 'primary';

export interface ConfirmOptions {
  title: React.ReactNode;
  description?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmVariant;
}

export interface ConfirmDialogProps extends ConfirmOptions {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmDialogProps) {
  const [internalLoading, setInternalLoading] = React.useState(false);
  const busy = isLoading || internalLoading;

  const handleConfirm = async () => {
    try {
      setInternalLoading(true);
      await onConfirm();
      onOpenChange(false);
    } finally {
      setInternalLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const iconStyleMap = {
    danger: styles.iconDanger,
    warning: styles.iconWarning,
    info: styles.iconInfo,
    primary: styles.iconPrimary,
  } as const;

  const renderVariantIcon = () => {
    switch (variant) {
      case 'danger':
        return <Trash2 size={20} aria-hidden="true" />;
      case 'warning':
        return <AlertTriangle size={20} aria-hidden="true" />;
      case 'info':
        return <Info size={20} aria-hidden="true" />;
      default:
        return <CheckCircle2 size={20} aria-hidden="true" />;
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      hideCloseButton
      footer={
        <>
          <Button
            variant="outline"
            size="sm"
            disabled={busy}
            onClick={handleCancel}
          >
            {cancelText}
          </Button>
          <Button
            variant={variant === 'danger' ? 'destructive' : 'primary'}
            size="sm"
            isLoading={busy}
            onClick={() => {
              void handleConfirm();
            }}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <div {...stylex.props(styles.confirmBody)}>
        <div {...stylex.props(styles.iconCircle, iconStyleMap[variant])}>
          {renderVariantIcon()}
        </div>
        <div {...stylex.props(styles.contentCol)}>
          <h3 {...stylex.props(styles.confirmTitle)}>{title}</h3>
          {description ? (
            <p {...stylex.props(styles.confirmDesc)}>{description}</p>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = React.createContext<ConfirmFn | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<{
    open: boolean;
    options: ConfirmOptions;
    resolve?: (value: boolean) => void;
  }>({
    open: false,
    options: { title: '' },
  });

  const confirm = React.useCallback<ConfirmFn>((options) => {
    return new Promise<boolean>((resolve) => {
      setState({
        open: true,
        options,
        resolve,
      });
    });
  }, []);

  const handleConfirm = () => {
    state.resolve?.(true);
    setState((prev) => ({ ...prev, open: false }));
  };

  const handleCancel = () => {
    state.resolve?.(false);
    setState((prev) => ({ ...prev, open: false }));
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <ConfirmDialog
        open={state.open}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            handleCancel();
          }
        }}
        title={state.options.title}
        description={state.options.description}
        confirmText={state.options.confirmText}
        cancelText={state.options.cancelText}
        variant={state.options.variant}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmContext.Provider>
  );
}

/**
 * Imperative hook to trigger a reusable ConfirmDialog from anywhere.
 */
export function useConfirm(): ConfirmFn {
  const ctx = React.useContext(ConfirmContext);
  if (!ctx) {
    throw new Error('useConfirm must be used within a <ConfirmProvider />');
  }
  return ctx;
}

export interface ToasterProps {
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  richColors?: boolean;
  closeButton?: boolean;
}

/**
 * Semantic Design Token-mapped Sonner Toaster Wrapper
 */
export function Toaster({
  position = 'bottom-right',
  richColors = true,
  closeButton = true,
}: ToasterProps) {
  const { resolvedMode } = useStylexTheme();

  return (
    <SonnerToaster
      theme={resolvedMode}
      position={position}
      richColors={richColors}
      closeButton={closeButton}
      toastOptions={{
        style: {
          background: semanticTokens.bgSurfaceElevated,
          color: semanticTokens.textPrimary,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: semanticTokens.borderDefault,
          borderRadius: globalTokens.radiusLg,
          boxShadow: globalTokens.shadowLg,
          fontFamily: globalTokens.fontSans,
        },
      }}
    />
  );
}

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

/**
 * Border colors per toast type, mapped to the same status tokens as badges.
 * Applied per-toast so the type stays visible even without relying on the icon.
 */
const toastVariantBorderColor: Record<ToastVariant, string> = {
  success: semanticTokens.statusSuccess,
  error: semanticTokens.statusError,
  warning: semanticTokens.statusWarning,
  info: semanticTokens.statusInfo,
};

function withToastVariantBorder(
  variant: ToastVariant,
  data?: ExternalToast,
): ExternalToast {
  return {
    ...data,
    style: {
      borderColor: toastVariantBorderColor[variant],
      ...data?.style,
    },
  };
}

export interface ToastApi {
  success: (message: React.ReactNode, data?: ExternalToast) => string | number;
  error: (message: React.ReactNode, data?: ExternalToast) => string | number;
  warning: (message: React.ReactNode, data?: ExternalToast) => string | number;
  info: (message: React.ReactNode, data?: ExternalToast) => string | number;
  message: (message: React.ReactNode, data?: ExternalToast) => string | number;
  dismiss: (id?: number | string) => string | number;
}

export const toast: ToastApi = {
  success: (message: React.ReactNode, data?: ExternalToast) =>
    sonnerToast.success(message, withToastVariantBorder('success', data)),
  error: (message: React.ReactNode, data?: ExternalToast) =>
    sonnerToast.error(message, withToastVariantBorder('error', data)),
  warning: (message: React.ReactNode, data?: ExternalToast) =>
    sonnerToast.warning(message, withToastVariantBorder('warning', data)),
  info: (message: React.ReactNode, data?: ExternalToast) =>
    sonnerToast.info(message, withToastVariantBorder('info', data)),
  message: (message: React.ReactNode, data?: ExternalToast) =>
    sonnerToast.message(message, data),
  dismiss: (id?: number | string) => sonnerToast.dismiss(id),
};
