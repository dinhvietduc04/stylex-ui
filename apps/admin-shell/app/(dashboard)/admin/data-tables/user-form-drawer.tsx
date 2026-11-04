'use client';

import { useEffect, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import type { User } from '@repo/api-contracts';
import {
  FormField,
  Input,
  SimpleSelect,
  Text,
  useZodForm,
  type SelectOption,
} from '@repo/stylex-ui';

import { FormDrawer } from './form-drawer';
import { createUserFormSchema, userToFormValue } from './user-form';
import type { UserFormValues } from './user-form.schema';

const ROLE_OPTIONS: SelectOption[] = [
  { value: 'admin', label: 'Admin' },
  { value: 'manager', label: 'Manager' },
  { value: 'viewer', label: 'Viewer' },
];

interface UserFormDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User | null;
  users: User[];
  onSave: (values: UserFormValues) => Promise<void> | void;
}

export function UserFormDrawer({
  open,
  onOpenChange,
  user,
  users,
  onSave,
}: UserFormDrawerProps) {
  const isEdit = Boolean(user);
  const schema = useMemo(
    () => createUserFormSchema(users, user?.id),
    [users, user?.id],
  );

  const {
    register,
    control,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useZodForm(schema, {
    defaultValues: userToFormValue(user),
  });

  useEffect(() => {
    if (!open) return;
    reset(userToFormValue(user));
    clearErrors();
  }, [open, user, reset, clearErrors]);

  const handleSubmitForm = handleSubmit(async (values) => {
    try {
      await onSave(values);
      onOpenChange(false);
    } catch (error) {
      setError('root.server', {
        type: 'server',
        message:
          error instanceof Error
            ? error.message
            : 'Could not save the user. Try again.',
      });
    }
  });

  const handleDiscard = () => {
    reset(userToFormValue(user));
    clearErrors();
  };

  return (
    <FormDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={isEdit ? 'Edit user' : 'Add user'}
      description={
        isEdit
          ? `Update ${user?.name ?? 'this user'}'s details.`
          : 'Add a new person to the demo directory.'
      }
      formId="user-form"
      isDirty={isDirty}
      isSubmitting={isSubmitting}
      submitLabel={isEdit ? 'Save changes' : 'Add user'}
      onSubmit={handleSubmitForm}
      onDiscard={handleDiscard}
    >
      <div className="space-y-5">
        <FormField
          label="Full name"
          htmlFor="user-name"
          required
          error={errors.name?.message}
        >
          <Input
            id="user-name"
            autoComplete="name"
            required
            error={Boolean(errors.name)}
            disabled={isSubmitting}
            {...register('name')}
          />
        </FormField>

        <FormField
          label="Email"
          htmlFor="user-email"
          required
          error={errors.email?.message}
        >
          <Input
            id="user-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            error={Boolean(errors.email)}
            disabled={isSubmitting}
            {...register('email')}
          />
        </FormField>

        <FormField
          label="Role"
          htmlFor="user-role"
          required
          error={errors.role?.message}
        >
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <SimpleSelect
                id="user-role"
                options={ROLE_OPTIONS}
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  field.onBlur();
                }}
                error={Boolean(errors.role)}
                disabled={isSubmitting}
              />
            )}
          />
        </FormField>

        {errors.root?.server?.message ? (
          <Text role="alert" tone="error" size="sm">
            {errors.root.server.message}
          </Text>
        ) : null}
      </div>
    </FormDrawer>
  );
}
