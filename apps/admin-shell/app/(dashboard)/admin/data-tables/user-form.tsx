import type { User } from '@repo/api-contracts';

import {
  USER_ROLES,
  userFormSchema,
  type UserFormValues,
  type UserRole,
} from './user-form.schema';

export function userToFormValue(user?: User | null): UserFormValues {
  if (!user) {
    return { name: '', email: '', role: 'viewer' };
  }

  return {
    name: user.name,
    email: user.email,
    role: USER_ROLES.includes(user.role as UserRole)
      ? (user.role as UserRole)
      : 'viewer',
  };
}

export function createUserFormSchema(users: User[], editingId?: string) {
  return userFormSchema.refine(
    (values) =>
      !users.some(
        (user) =>
          user.id !== editingId &&
          user.email.trim().toLowerCase() === values.email.toLowerCase(),
      ),
    {
      path: ['email'],
      message: 'A user with this email already exists.',
    },
  );
}
