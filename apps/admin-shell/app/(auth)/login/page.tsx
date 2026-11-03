import { LoginForm } from './login-form';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string | string[] }>;
}) {
  const { callbackUrl } = await searchParams;
  return (
    <LoginForm
      callbackUrl={typeof callbackUrl === 'string' ? callbackUrl : undefined}
    />
  );
}
