'use client';

import type { FormEventHandler, ReactNode } from 'react';
import { Button, Drawer, useConfirm } from '@repo/stylex-ui';

interface FormDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  formId: string;
  isDirty: boolean;
  isSubmitting: boolean;
  submitLabel: string;
  submitLoadingLabel?: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onDiscard: () => void;
  children: ReactNode;
}

/**
 * Shared shell for the data-table create/edit forms.
 *
 * Keeps the Drawer, footer, submit association, and discard confirmation in
 * one place so each entity form only owns its fields and schema.
 */
export function FormDrawer({
  open,
  onOpenChange,
  title,
  description,
  size = 'md',
  formId,
  isDirty,
  isSubmitting,
  submitLabel,
  submitLoadingLabel = 'Saving…',
  onSubmit,
  onDiscard,
  children,
}: FormDrawerProps) {
  const confirm = useConfirm();

  const requestClose = async () => {
    if (isSubmitting) return;

    if (isDirty) {
      const discard = await confirm({
        title: 'Discard changes?',
        description: 'Your unsaved changes will be lost.',
        confirmText: 'Discard',
        cancelText: 'Keep editing',
        variant: 'warning',
      });

      if (!discard) return;
    }

    onDiscard();
    onOpenChange(false);
  };

  return (
    <Drawer
      open={open}
      onOpenChange={(next) => {
        if (next) {
          onOpenChange(true);
        } else {
          void requestClose();
        }
      }}
      title={title}
      description={description}
      size={size}
      footer={
        <>
          <Button
            variant="outline"
            onClick={() => {
              void requestClose();
            }}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form={formId}
            isLoading={isSubmitting}
            loadingText={submitLoadingLabel}
          >
            {submitLabel}
          </Button>
        </>
      }
    >
      <form id={formId} onSubmit={onSubmit} noValidate>
        {children}
      </form>
    </Drawer>
  );
}
