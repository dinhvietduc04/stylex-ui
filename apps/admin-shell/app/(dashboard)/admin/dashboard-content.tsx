'use client';

import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
  Text,
} from '@repo/stylex-ui';
import type { Session } from 'next-auth';
import { canWithPermissions, type Permission } from '@repo/rbac';

interface DashboardContentProps {
  session: Session;
}

export function DashboardContent({ session }: DashboardContentProps) {
  const permissions = session.user.permissions ?? [];

  const can = (permission: Permission) =>
    canWithPermissions(permission, permissions);

  const stats = [
    {
      title: 'Users',
      value: '0',
      description: 'Total users',
      permission: 'user:read' as const,
    },
    {
      title: 'Permissions',
      value: String(permissions.length),
      description: 'Active permissions',
    },
  ].filter((stat) => !stat.permission || can(stat.permission));

  return (
    <div className="space-y-6">
      <div>
        <Heading level={1}>Dashboard</Heading>
        <Text tone="secondary">
          Welcome back, {session.user.name || 'Admin'}
        </Text>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader>
              <CardTitle>{stat.title}</CardTitle>
            </CardHeader>

            <CardContent>
              <Heading level={3}>{stat.value}</Heading>
              <Text size="sm" tone="muted">
                {stat.description}
              </Text>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Permissions</CardTitle>
          <CardDescription>
            Current roles and permissions assigned to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {permissions.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {permissions.map((permission) => (
                <Badge key={permission} variant="primary">
                  {permission}
                </Badge>
              ))}
            </div>
          ) : (
            <Text size="sm" tone="muted">
              No permissions assigned.
            </Text>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
