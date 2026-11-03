'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { loginSchema, type LoginCredentials } from '@repo/auth-core';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FormField,
  Input,
  PasswordInput,
  Text,
  toast,
  useZodForm,
} from '@repo/stylex-ui';

const INVALID_CREDENTIALS_MESSAGE =
  'The email or password is incorrect. Please try again.';
const UNEXPECTED_ERROR_MESSAGE =
  'We could not sign you in. Please try again in a moment.';

interface LoginFormProps {
  callbackUrl?: string;
}

export function LoginForm({ callbackUrl }: LoginFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useZodForm(loginSchema, {
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginCredentials) => {
    clearErrors('root');

    try {
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.ok) {
        toast.success('Signed in successfully', {
          description: 'Taking you to your dashboard…',
        });
        router.replace(resolveCallbackUrl(callbackUrl));
        router.refresh();
        return;
      }

      const message = result?.error
        ? INVALID_CREDENTIALS_MESSAGE
        : UNEXPECTED_ERROR_MESSAGE;

      setError('root.server', { type: 'server', message });
      toast.error('Sign-in failed', { description: message });
    } catch {
      setError('root.server', {
        type: 'server',
        message: UNEXPECTED_ERROR_MESSAGE,
      });
      toast.error('Sign-in failed', {
        description: UNEXPECTED_ERROR_MESSAGE,
      });
    }
  };

  function resolveCallbackUrl(callbackUrl?: string): string {
    if (!callbackUrl) return 'admin';

    try {
      const target = new URL(callbackUrl, window.location.origin);

      if (target.origin !== window.location.origin) return '/admin';

      if (
        target.pathname === '/login' ||
        target.pathname.startsWith('/login/')
      ) {
        return '/admin';
      }

      return `${target.pathname}${target.search}${target.hash}`;
    } catch {
      return '/admin';
    }
  }

  const serverError = errors.root?.server?.message;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle as="h1">Admin Login</CardTitle>
        <CardDescription>
          Enter your credentials to access the admin portal
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          <FormField
            label="Email"
            htmlFor="login-email"
            required
            error={errors.email?.message}
          >
            <Input
              id="login-email"
              type="email"
              size="lg"
              autoComplete="email"
              inputMode="email"
              placeholder="admin@example.com"
              error={Boolean(errors.email)}
              disabled={isSubmitting}
              {...register('email', {
                onChange: () => clearErrors('root'),
              })}
            />
          </FormField>

          <FormField
            label="Password"
            htmlFor="login-password"
            required
            error={errors.password?.message}
          >
            <PasswordInput
              id="login-password"
              size="lg"
              autoComplete="current-password"
              placeholder="Enter your password"
              error={Boolean(errors.password)}
              disabled={isSubmitting}
              {...register('password', {
                onChange: () => clearErrors('root'),
              })}
            />
          </FormField>

          {serverError ? (
            <Text role="alert" tone="error" size="sm">
              {serverError}
            </Text>
          ) : null}

          <Text size="sm" tone="muted">
            Demo access: admin@example.com, manager@example.com, or
            viewer@example.com. Any password works.
          </Text>

          <Button
            type="submit"
            size="lg"
            fullWidth
            isLoading={isSubmitting}
            loadingText="Signing in…"
          >
            Sign in
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
