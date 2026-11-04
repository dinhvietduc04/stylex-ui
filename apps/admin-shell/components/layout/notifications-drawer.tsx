'use client';

import { Bell, X } from 'lucide-react';
import type { Notification } from '@repo/stores';
import {
  useNotifications,
  useShellActions,
  useUnreadNotificationsCount,
} from '@repo/stores';
import {
  Badge,
  Button,
  Drawer,
  Icon,
  IconButton,
  StatusDot,
  Text,
  globalTokens,
  semanticTokens,
  useConfirm,
} from '@repo/stylex-ui';

const notificationBadgeVariant: Record<
  Notification['type'],
  'success' | 'error' | 'warning' | 'info'
> = {
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
};

export interface NotificationsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NotificationsDrawer({
  open,
  onOpenChange,
}: NotificationsDrawerProps) {
  const notifications = useNotifications();
  const unreadCount = useUnreadNotificationsCount();
  const { markNotificationRead, removeNotification, clearNotifications } =
    useShellActions();
  const confirm = useConfirm();

  const handleClearAll = async () => {
    const confirmed = await confirm({
      title: 'Clear all notifications?',
      description: 'This removes every notification from the list',
      confirmText: 'Clear all',
      variant: 'danger',
    });

    if (confirmed) {
      clearNotifications();
    }
  };

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      title="Notifications"
      description={unreadCount > 0 ? `${unreadCount} unread` : undefined}
      side="right"
      size="md"
      footer={
        notifications.length > 0 ? (
          <Button variant="outline" size="sm" onClick={handleClearAll}>
            Clear All
          </Button>
        ) : undefined
      }
    >
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Icon icon={Bell} size="xl" tone="muted" />
          <Text
            tone="muted"
            weight="medium"
            style={{ marginTop: globalTokens.space3 }}
          >
            No new notifications
          </Text>
          <Text size="sm" tone="muted">
            You are all caught up!
          </Text>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.slice(0, 10).map((notification) => (
            <div
              key={notification.id}
              style={{
                backgroundColor: notification.read
                  ? semanticTokens.bgSurface
                  : semanticTokens.bgSurfaceSubtle,
                border: `1px solid ${semanticTokens.borderSubtle}`,
                borderLeft: `4px solid ${
                  notification.read
                    ? semanticTokens.borderSubtle
                    : semanticTokens.brandPrimary
                }`,
                borderRadius: globalTokens.radiusLg,
                padding: globalTokens.space3,
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <button
                  type="button"
                  className="flex min-w-0 flex-1 cursor-pointer flex-col gap-1 border-0 bg-transparent p-0 text-left"
                  onClick={() => markNotificationRead(notification.id)}
                >
                  <span className="flex items-center gap-2">
                    <Badge
                      variant={notificationBadgeVariant[notification.type]}
                      size="sm"
                    >
                      {notification.type}
                    </Badge>

                    {!notification.read ? (
                      <StatusDot variant="primary" size="sm" pulse />
                    ) : null}
                  </span>

                  <Text
                    as="span"
                    size="sm"
                    weight={notification.read ? 'medium' : 'semibold'}
                  >
                    {notification.title}
                  </Text>

                  {notification.message ? (
                    <Text as="span" size="sm" tone="muted">
                      {notification.message}
                    </Text>
                  ) : null}
                </button>

                <IconButton
                  aria-label="Remove notification"
                  variant="ghost"
                  size="sm"
                  icon={<X size={14} />}
                  onClick={() => removeNotification(notification.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </Drawer>
  );
}
