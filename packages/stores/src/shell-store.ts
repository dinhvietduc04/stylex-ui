import { createStore } from 'zustand/vanilla';
import type { StoreApi } from 'zustand/vanilla';
import type {
  Notification,
  RemoteStatus,
  ShellAppState,
  ShellInitialState,
  ShellStore,
} from './shell-types';

const STORE_KEY = '__SHELL_STORE__';

// Global store will be attached to window/globalThis at runtime

function generateNotificationId(): string {
  return `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

const DEFAULT_REMOTE_STATUS: RemoteStatus = {
  loaded: false,
  loading: false,
  error: null,
};

const DEFAULT_STATE: ShellAppState = {
  auth: { session: null },
  tenant: { tenantId: null },
  ui: { notifications: [] },
  remotes: {
    users: { ...DEFAULT_REMOTE_STATUS },
  },
};

/**
 * Deep-merge a partial initial state into an existing app state. The store
 * state stays fully defined, so every remote entry always carries a complete
 * `RemoteStatus`.
 */
function mergeInitialState(
  state: ShellAppState,
  initialState?: ShellInitialState
): ShellAppState {
  return {
    auth: {
      ...state.auth,
      ...initialState?.auth,
    },
    tenant: {
      ...state.tenant,
      ...initialState?.tenant,
    },
    ui: {
      ...state.ui,
      ...initialState?.ui,
    },
    remotes: {
      ...state.remotes,
      users: {
        ...state.remotes.users,
        ...initialState?.remotes?.users,
      },
    },
  };
}

function createShellStore(initialState?: ShellInitialState): StoreApi<ShellStore> {
  return createStore<ShellStore>((set) => ({
    // Initial state
    ...mergeInitialState(DEFAULT_STATE, initialState),

    // Auth actions
    setSession: (session) => {
      set((state) => ({
        auth: {
          ...state.auth,
          session,
        },
      }));
    },

    // Tenant actions
    setTenantId: (tenantId) => {
      set((state) => ({
        tenant: {
          ...state.tenant,
          tenantId,
        },
      }));
    },

    // UI actions
    addNotification: (notification) => {
      const fullNotification: Notification = {
        id: generateNotificationId(),
        timestamp: Date.now(),
        ...notification,
      };

      set((state) => ({
        ui: {
          ...state.ui,
          notifications: [...state.ui.notifications, fullNotification],
        },
      }));
    },

    clearNotifications: () => {
      set((state) => ({
        ui: {
          ...state.ui,
          notifications: [],
        },
      }));
    },

    markNotificationRead: (notificationId) => {
      set((state) => ({
        ui: {
          ...state.ui,
          notifications: state.ui.notifications.map((notification) =>
            notification.id === notificationId
              ? { ...notification, read: true }
              : notification
          ),
        },
      }));
    },

    removeNotification: (notificationId) => {
      set((state) => ({
        ui: {
          ...state.ui,
          notifications: state.ui.notifications.filter(
            (notification) => notification.id !== notificationId
          ),
        },
      }));
    },

    // Remote actions
    setRemoteLoading: (remoteName, loading) => {
      set((state) => ({
        remotes: {
          ...state.remotes,
          [remoteName]: {
            ...state.remotes[remoteName],
            loading,
          },
        },
      }));
    },

    setRemoteLoaded: (remoteName, loaded) => {
      set((state) => ({
        remotes: {
          ...state.remotes,
          [remoteName]: {
            ...state.remotes[remoteName],
            loaded,
          },
        },
      }));
    },

    setRemoteError: (remoteName, error) => {
      set((state) => ({
        remotes: {
          ...state.remotes,
          [remoteName]: {
            ...state.remotes[remoteName],
            error,
          },
        },
      }));
    },
  }));
}

export function initShellStore(initialState?: ShellInitialState): StoreApi<ShellStore> {
  // Check if store already exists on globalThis/window
  const existingStore = (globalThis as any).__SHELL_STORE__ || (typeof window !== 'undefined' ? (window as any).__SHELL_STORE__ : undefined);

  if (existingStore) {
    // If store exists, deep-merge the provided initial state into the live state
    if (initialState) {
      existingStore.setState((state: ShellStore) =>
        mergeInitialState(state, initialState)
      );
    }
    return existingStore;
  }

  // Create new store
  const store = createShellStore(initialState);

  // Attach to global scope for singleton access
  if (typeof globalThis !== 'undefined') {
    (globalThis as any).__SHELL_STORE__ = store;
  }
  if (typeof window !== 'undefined') {
    (window as any).__SHELL_STORE__ = store;
  }

  return store;
}

export function getShellStore(): StoreApi<ShellStore> {
  const store = (globalThis as any).__SHELL_STORE__ || (typeof window !== 'undefined' ? (window as any).__SHELL_STORE__ : undefined);

  if (!store) {
    // Auto-initialize the store if it doesn't exist
    return initShellStore();
  }

  return store;
}
