'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForm,
  type FieldValues,
  type Resolver,
  type UseFormProps,
  type UseFormReturn,
} from 'react-hook-form';
import type { z } from 'zod';

/** Raw values accepted by the schema (the shape stored in the form). */
export type ZodFormInput<TSchema extends z.ZodType> = z.input<TSchema> &
  FieldValues;
/** Parsed values passed to `handleSubmit` after defaults and transforms. */
export type ZodFormOutput<TSchema extends z.ZodType> = z.output<TSchema>;

export type UseZodFormProps<TSchema extends z.ZodType> = Omit<
  UseFormProps<ZodFormInput<TSchema>, unknown, ZodFormOutput<TSchema>>,
  'resolver'
>;

/**
 * React Hook Form with a Zod resolver and the framework's default validation
 * timing. Field values are typed from the schema, and `handleSubmit` receives
 * the parsed output (after defaults and transforms).
 */
export function useZodForm<TSchema extends z.ZodType<FieldValues, FieldValues>>(
  schema: TSchema,
  options?: UseZodFormProps<TSchema>,
): UseFormReturn<ZodFormInput<TSchema>, unknown, ZodFormOutput<TSchema>> {
  return useForm<ZodFormInput<TSchema>, unknown, ZodFormOutput<TSchema>>({
    mode: 'onTouched',
    ...options,
    resolver: zodResolver(schema) as unknown as Resolver<
      ZodFormInput<TSchema>,
      unknown,
      ZodFormOutput<TSchema>
    >,
  });
}
