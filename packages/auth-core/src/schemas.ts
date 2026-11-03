import { z } from 'zod';

/**
 * Shared credentials schema for sign-in forms. Keep this app-agnostic so every
 * shell in the monorepo validates the same way before calling its auth client.
 */
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Enter your email address.')
    .max(254, 'Email must be 254 characters or fewer.')
    .email('Enter a valid email address.'),
  password: z
    .string()
    .min(1, 'Enter your password.')
    .max(128, 'Password must be 128 characters or fewer.'),
});

export type LoginCredentials = z.infer<typeof loginSchema>;
