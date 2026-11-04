'use client';

import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import type { Product } from '@repo/api-contracts';
import {
  FormField,
  Input,
  SimpleSelect,
  Text,
  Textarea,
  useZodForm,
  type SelectOption,
} from '@repo/stylex-ui';

import { FormDrawer } from './form-drawer';
import { productToFormValue } from './product-form';
import { productFormSchema } from './product-form.schema';
import type { ProductFormValues } from './product-form.schema';

const STATUS_OPTIONS: SelectOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'archived', label: 'Archived' },
];

interface ProductFormDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  onSave: (values: ProductFormValues) => Promise<void> | void;
}

export function ProductFormDrawer({
  open,
  onOpenChange,
  product,
  onSave,
}: ProductFormDrawerProps) {
  const isEdit = Boolean(product);

  const {
    register,
    control,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useZodForm(productFormSchema, {
    defaultValues: productToFormValue(product),
  });

  useEffect(() => {
    if (!open) return;
    reset(productToFormValue(product));
    clearErrors();
  }, [open, product, reset, clearErrors]);

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
            : 'Could not save the product. Try again.',
      });
    }
  });

  const handleDiscard = () => {
    reset(productToFormValue(product));
    clearErrors();
  };

  return (
    <FormDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={isEdit ? 'Edit product' : 'Add product'}
      description={
        isEdit
          ? `Update ${product?.name ?? 'this product'}'s details.`
          : 'Add a new product to the demo catalogue.'
      }
      size="lg"
      formId="product-form"
      isDirty={isDirty}
      isSubmitting={isSubmitting}
      submitLabel={isEdit ? 'Save changes' : 'Add product'}
      onSubmit={handleSubmitForm}
      onDiscard={handleDiscard}
    >
      <div className="space-y-5">
        <FormField
          label="Product name"
          htmlFor="product-name"
          required
          error={errors.name?.message}
        >
          <Input
            id="product-name"
            autoComplete="off"
            required
            error={Boolean(errors.name)}
            disabled={isSubmitting}
            {...register('name')}
          />
        </FormField>

        <FormField
          label="Description"
          htmlFor="product-description"
          required
          error={errors.description?.message}
        >
          <Textarea
            id="product-description"
            rows={4}
            maxLength={500}
            showCount
            required
            error={Boolean(errors.description)}
            disabled={isSubmitting}
            {...register('description')}
          />
        </FormField>

        <FormField
          label="Price"
          htmlFor="product-price"
          required
          error={errors.price?.message}
        >
          <Input
            id="product-price"
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            required
            error={Boolean(errors.price)}
            disabled={isSubmitting}
            {...register('price', { valueAsNumber: true })}
          />
        </FormField>

        <FormField
          label="Status"
          htmlFor="product-status"
          required
          error={errors.status?.message}
        >
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <SimpleSelect
                id="product-status"
                options={STATUS_OPTIONS}
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  field.onBlur();
                }}
                error={Boolean(errors.status)}
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
