import {
  BarChart3,
  LayoutDashboard,
  ShieldCheck,
  Users,
  Table2,
} from 'lucide-react';
import type {
  BreadcrumbItem,
  NavigationItem,
  NavigationSection,
} from '@repo/stylex-ui';
import { canWithPermissions, type Permission } from '@repo/rbac';

export interface AdminNavigationItem extends NavigationItem {
  permission?: Permission;
  remote?: 'users';
  children?: AdminNavigationItem[];
}

export type AdminNavigationSection = NavigationSection<AdminNavigationItem>;

export const adminNavigation: AdminNavigationSection[] = [
  {
    id: 'overview',
    label: 'Overview',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        href: '/admin',
        icon: LayoutDashboard,
        exact: true,
      },
      {
        id: 'metrics-dashboard',
        label: 'Metrics',
        href: '/metrics-dashboard',
        icon: BarChart3,
        exact: true,
        permission: 'admin:access',
      },
    ],
  },
  {
    id: 'management',
    label: 'Management',
    items: [
      {
        id: 'access-control',
        label: 'Access control',
        icon: ShieldCheck,
        children: [
          {
            id: 'users',
            label: 'Users',
            href: '/admin/users',
            icon: Users,
            permission: 'user:read',
            remote: 'users',
          },
        ],
      },
      {
        id: 'data-tables',
        label: 'Data tables',
        href: '/admin/data-tables',
        icon: Table2,
        permission: 'admin:access',
      },
    ],
  },
];

export const ADMIN_BREADCRUMB_ROOT: BreadcrumbItem = {
  label: 'Dashboard',
  href: '/admin',
  icon: LayoutDashboard,
};

export const adminRemoteByHref: Partial<Record<string, 'users'>> = {
  '/admin/users': 'users',
};

export function resolveAdminSegment(
  segment: string,
  { parentPath }: { index: number; parentPath: string },
): string | undefined {
  if (parentPath === '/admin/users') {
    let decoded = segment;

    try {
      decoded = decodeURIComponent(segment);
    } catch {
      // keep the raw segment
    }

    return `User ${decoded}`;
  }

  return undefined;
}

function filterItems(
  items: AdminNavigationItem[],
  can: (permission: Permission) => boolean,
): AdminNavigationItem[] {
  return items.flatMap((item) => {
    if (item.permission && !can(item.permission)) {
      return [];
    }

    const children = item.children
      ? filterItems(item.children, can)
      : undefined;

    if (
      !item.href &&
      item.children?.length &&
      (!children || children.length === 0)
    ) {
      return [];
    }

    return [
      {
        ...item,
        ...(children ? { children } : {}),
      },
    ];
  });
}

export function getVisibleAdminNavigation(
  permissions: Permission[] | null | undefined,
): AdminNavigationSection[] {
  const can = (permission: Permission) =>
    canWithPermissions(permission, permissions);

  return adminNavigation.flatMap((section) => {
    const items = filterItems(section.items, can);

    return items.length > 0 ? [{ ...section, items }] : [];
  });
}
