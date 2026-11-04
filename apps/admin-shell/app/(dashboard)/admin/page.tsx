import { redirect } from 'next/navigation';
import { auth } from '@repo/auth-next';
import { DashboardContent } from './dashboard-content';

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return <DashboardContent session={session} />;
}
