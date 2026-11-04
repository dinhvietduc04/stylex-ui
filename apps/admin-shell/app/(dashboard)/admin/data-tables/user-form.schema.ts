import { z } from 'zod';

export const USER_ROLES = ['admin', 'manager', 'viewer'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const userFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Enter at least 2 characters.')
    .max(80, 'Name must be 80 characters or fewer.'),
  email: z
    .string()
    .trim()
    .min(1, 'Enter an email address.')
    .max(254, 'Email must be 254 characters or fewer.')
    .email('Enter a valid email address.'),
  role: z.enum(USER_ROLES, 'Choose a role.'),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
