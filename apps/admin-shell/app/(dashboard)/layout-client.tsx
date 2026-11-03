'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import type { Session } from 'next-auth';
import { Bell } from 'lucide-react';
import {
  AppHeader,
  AppShell,
  Badge,
  Icon,
  IconButton,
  Sidebar,
  ThemeSwitcher,
  UserMenu,
  buildBreadcrumbs,
  semanticTokens,
  useSidebarCollapsed,
  type NavigationItem,
} from '@repo/stylex-ui';
import { initShellStore, useUnreadNotificationsCount } from '@repo/stores';
import { toCoreSession } from '@repo/auth-next';
import { preloadRemote } from '@/lib/module-federation-loader';
import { AdminBrand, AdminBrandMark } from '@/components/layout/admin-brand';
import { NotificationsDrawer } from '@/components/layout/notifications-drawer';
import {
  ADMIN_BREADCRUMB_ROOT,
  adminRemoteByHref,
  getVisibleAdminNavigation,
  resolveAdminSegment,
} from '@/lib/navigation';

interface AdminLayoutClientProps {
  children: React.ReactNode;
  session: Session;
}

export function AdminLayoutClient({
  children,
  session,
}: AdminLayoutClientProps) {
  const pathname = usePathname();
  const unreadCount = useUnreadNotificationsCount();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { collapsed, setCollapsed } = useSidebarCollapsed({
    storageKey: 'admin:sidebar-collapsed',
    defaultCollapsed: true,
  });

  const visibleNavigation = useMemo(
    () => getVisibleAdminNavigation(session.user.permissions),
    [session.user.permissions],
  );

  const breadcrumbs = useMemo(
    () =>
      buildBreadcrumbs({
        pathname,
        sections: visibleNavigation,
        root: ADMIN_BREADCRUMB_ROOT,
        resolveSegment: resolveAdminSegment,
      }),
    [pathname, visibleNavigation],
  );

  useEffect(() => {
    initShellStore({
      auth: {
        session: toCoreSession(session),
      },
    });
  }, [session]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'b') {
        event.preventDefault();
        setCollapsed((value) => !value);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setCollapsed]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  const handleItemIntent = useCallback((item: NavigationItem) => {
    const remote = item.href ? adminRemoteByHref[item.href] : undefined;

    if (remote) {
      preloadRemote(remote);
    }
  }, []);

  const headerActions = (
    <>
      <ThemeSwitcher showBrandSelector={false} />
      <span
        aria-hidden="true"
        style={{
          width: '1px',
          height: '1.5rem',
          backgroundColor: semanticTokens.borderDefault,
        }}
      />
      <IconButton
        aria-label={
          unreadCount > 0
            ? `Notifications, ${unreadCount} unread`
            : 'Notifications'
        }
        variant="ghost"
        size="md"
        onClick={() => setNotificationsOpen(true)}
        icon={
          <span
            style={{
              position: 'relative',
              display: 'inline-flex',
            }}
          >
            <Icon icon={Bell} size="md" tone="current" />
            {unreadCount > 0 ? (
              <Badge
                variant="error"
                appearance="solid"
                size="sm"
                style={{
                  position: 'absolute',
                  top: '-0.5rem',
                  right: '-0.5rem',
                }}
              >
                {unreadCount > 99 ? '99+' : unreadCount}
              </Badge>
            ) : null}
          </span>
        }
      />
      <UserMenu
        user={{
          name: session.user.name,
          email: session.user.email,
          roles: session.user.roles,
        }}
        onSignOut={handleLogout}
      />
    </>
  );

  return (
    <>
      <AppShell
        sidebar={
          <Sidebar
            sections={visibleNavigation}
            pathname={pathname}
            collapsed={collapsed}
            onCollapsedChange={setCollapsed}
            mobileOpen={mobileOpen}
            onMobileOpenChange={setMobileOpen}
            linkComponent={Link}
            onItemIntent={handleItemIntent}
            brand={<AdminBrand />}
            brandCollapsed={<AdminBrandMark />}
            ariaLabel="Admin navigation"
          />
        }
        header={
          <AppHeader
            breadcrumbs={breadcrumbs}
            actions={headerActions}
            onMenuClick={() => setMobileOpen(true)}
            linkComponent={Link}
          />
        }
      >
        {children}
      </AppShell>

      <NotificationsDrawer
        open={notificationsOpen}
        onOpenChange={setNotificationsOpen}
      />
    </>
  );
}
