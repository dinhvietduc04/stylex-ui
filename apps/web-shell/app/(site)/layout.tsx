import { auth } from '@repo/auth-next';
import { WebLayoutClient } from './layout-client';

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return <WebLayoutClient session={session}>{children}</WebLayoutClient>;
}
