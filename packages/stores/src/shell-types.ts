import type { Session } from '@repo/auth-core';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  timestamp: number;
  read?: boolean;
}

/** Load state tracked for each federated remote exposed to the shell. */
export interface RemoteStatus {
  loaded: boolean;
  loading: boolean;
  error: string | null;
}

export interface ShellAppState {
  auth: {
    session: Session | null;
  };
  tenant: {
    tenantId: string | null;
  };
  ui: {
    notifications: Notification[];
  };
  remotes: {
    users: RemoteStatus;
  };
}

/**
 * Shape accepted by `initShellStore`. Every level is optional so callers can
 * hydrate just the slice they know about, while the store state itself stays
 * fully defined.
 */
export interface ShellInitialState {
  auth?: Partial<ShellAppState['auth']>;
  tenant?: Partial<ShellAppState['tenant']>;
  ui?: Partial<ShellAppState['ui']>;
  remotes?: {
    users?: Partial<RemoteStatus>;
  };
}

export interface ShellAppActions {
  // Auth actions
  setSession: (session: Session | null) => void;

  // Tenant actions
  setTenantId: (tenantId: string | null) => void;

  // UI actions
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  clearNotifications: () => void;
  markNotificationRead: (notificationId: string) => void;
  removeNotification: (notificationId: string) => void;

  // Remote actions
  setRemoteLoading: (remoteName: 'users', loading: boolean) => void;
  setRemoteLoaded: (remoteName: 'users', loaded: boolean) => void;
  setRemoteError: (remoteName: 'users', error: string | null) => void;
}

export type ShellStore = ShellAppState & ShellAppActions;
