import { z } from 'zod';

export const PRODUCT_STATUSES = ['active', 'archived'] as const;
export type ProductStatus = (typeof PRODUCT_STATUSES)[number];

export const productFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Enter at least 2 characters.')
    .max(120, 'Name must be 120 characters or fewer.'),
  description: z
    .string()
    .trim()
    .min(10, 'Enter at least 10 characters.')
    .max(500, 'Description must be 500 characters or fewer.'),
  price: z
    .number('Enter a valid price.')
    .positive('Enter a price greater than 0.')
    .max(100000, 'Price must be $100,000 or less.'),
  status: z.enum(PRODUCT_STATUSES, 'Choose a status.'),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
