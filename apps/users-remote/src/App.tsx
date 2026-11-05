import { useCallback, useEffect, useState } from 'react';
import './globals.css';
import {
  BrowserRouter,
  MemoryRouter,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
} from '@repo/api-contracts';
import { mockUserApi } from './data/mock-users';
import type { Session as CoreSession } from '@repo/auth-core';
import { getShellStore } from '@repo/stores';
import { useUsersUIStore } from './state/users-ui-store';
import type { RoutingProps } from '@repo/api-contracts';
import { useStandaloneAuth, RouterSync } from '@repo/remote-utils';
import {
  Button,
  ConfirmProvider,
  EmptyState,
  Toaster,
  toast,
  useConfirm,
} from '@repo/stylex-ui';
import { UserDetails } from './components/UserDetails/UserDetails';
import { UserList } from './components/UserList/UserList';
import { UserListSkeleton } from './components/UserList/UserListSkeleton';
import { UserFormDialog } from './components/UserFormDialog/UserFormDialog';

interface UsersAppProps {
  session: CoreSession | null;
  routingProps?: RoutingProps;
}

function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error && error.message ? error.message : fallback;
}

function UsersNotFound() {
  const navigate = useNavigate();

  return (
    <EmptyState
      size="lg"
      titleAs="h1"
      icon={
        <span style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1 }}>
          404
        </span>
      }
      title="Page not found"
      description="This users page doesn't exist or may have moved."
      primaryAction={
        <Button onClick={() => navigate('/')}>Back to users</Button>
      }
    />
  );
}

export default function UsersApp(props: UsersAppProps) {
  return (
    <ConfirmProvider>
      <UsersAppContent {...props} />
      <Toaster position="bottom-right" />
    </ConfirmProvider>
  );
}

function UsersAppContent({
  session: propSession,
  routingProps,
}: UsersAppProps) {
  // Try to get standalone session (will be null if not in provider)
  const standaloneSession = useStandaloneAuth();

  // Use standalone session if available, otherwise use prop session
  // In standalone mode, standaloneSession will be available
  // In hosted mode, propSession will be provided by shell
  const session = standaloneSession ?? propSession;

  // Use Zustand store for UI state
  const {
    users,
    loading,
    dialogOpen,
    editingUser,
    formData,
    setUsers,
    setLoading,
    addUser,
    updateUser,
    removeUser,
    openDialog,
    closeDialog,
    setEditingUser,
    setFormData,
    resetForm,
  } = useUsersUIStore();

  // Local state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const confirm = useConfirm();

  // Permission check based on session
  const canWrite = session?.user?.permissions?.includes('user:write') || false;

  // Form validation
  const isFormValid = Boolean(
    formData.name.trim() && formData.email.trim() && formData.role.trim(),
  );

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await mockUserApi.list();
      setUsers(data);
    } catch (error) {
      toast.error('Could not load users', {
        description: getErrorMessage(error, 'Refresh the page to try again.'),
      });
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setUsers]);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  const handleCreate = () => {
    setEditingUser(null);
    resetForm();
    openDialog();
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      name: user.name,
      role: user.role,
    });
    openDialog();
  };

  const handleDelete = async (id: string): Promise<boolean> => {
    const userToDelete = users.find((candidate) => candidate.id === id);

    if (!userToDelete) return false;

    const confirmed = await confirm({
      title: 'Delete user?',
      description: (
        <>
          This permanently removes <strong>{userToDelete.name}</strong> from the
          directory. This can&apos;t be undone.
        </>
      ),
      confirmText: 'Delete user',
      cancelText: 'Cancel',
      variant: 'danger',
    });

    if (!confirmed) return false;

    // Optimistic update: remove the row immediately instead of refetching the
    // whole list and flashing the loading skeleton again.
    const previousUsers = users;
    removeUser(id);

    try {
      await mockUserApi.delete(id);

      toast.warning('User deleted', {
        description: `${userToDelete.name} has been removed from the system.`,
      });

      getShellStore()
        .getState()
        .addNotification({
          type: 'warning',
          title: 'User Deleted',
          message: `${userToDelete.name} has been removed from the system.`,
        });

      return true;
    } catch (error) {
      setUsers(previousUsers);
      toast.error('Could not delete user', {
        description: getErrorMessage(
          error,
          'The user was restored. Please try again.',
        ),
      });
      console.error('Failed to delete user:', error);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setIsSubmitting(true);
    try {
      if (editingUser) {
        const updated = await mockUserApi.update(
          editingUser.id,
          formData as UpdateUserRequest,
        );

        updateUser(updated);
        toast.success('User updated', {
          description: `${updated.name}'s profile has been updated successfully.`,
        });

        getShellStore()
          .getState()
          .addNotification({
            type: 'success',
            title: 'User Updated',
            message: `${updated.name}'s profile has been updated successfully.`,
          });
      } else {
        const created = await mockUserApi.create(formData);

        addUser(created);
        toast.success('User created', {
          description: `${created.name} has been added to the system.`,
        });

        getShellStore()
          .getState()
          .addNotification({
            type: 'success',
            title: 'User Created',
            message: `${created.name} has been added to the system.`,
          });
      }

      closeDialog();
    } catch (error) {
      toast.error('Could not save user', {
        description: getErrorMessage(
          error,
          'Your changes were not saved. Please try again.',
        ),
      });
      console.error('Failed to save user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine router based on mode
  const RouterComponent =
    routingProps?.mode === 'hosted' ? MemoryRouter : BrowserRouter;
  const initialEntries =
    routingProps?.mode === 'hosted'
      ? [
          routingProps.pathname +
            (routingProps.search ? `?${routingProps.search}` : ''),
        ]
      : undefined;

  // Create router key for MemoryRouter to force re-mount when pathname changes
  const routerKey =
    routingProps?.mode === 'hosted'
      ? `${routingProps.pathname}${routingProps.search ? `?${routingProps.search}` : ''}`
      : undefined;

  // Show not authenticated message if session is missing (hosted mode without auth)
  if (!session) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-muted-foreground">Not authenticated</div>
      </div>
    );
  }

  if (loading) {
    return <UserListSkeleton />;
  }

  return (
    <RouterComponent key={routerKey} initialEntries={initialEntries}>
      <RouterSync routingProps={routingProps} />
      <Routes>
        <Route
          path="/:id"
          element={
            <UserDetails
              users={users}
              canWrite={canWrite}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          }
        />
        <Route
          path="/"
          element={
            <UserList
              users={users}
              canWrite={canWrite}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onCreate={handleCreate}
            />
          }
        />
        <Route path="*" element={<UsersNotFound />} />
      </Routes>
      <UserFormDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (open) {
            openDialog();
          } else {
            closeDialog();
          }
        }}
        editingUser={editingUser}
        formData={formData}
        isSubmitting={isSubmitting}
        isFormValid={isFormValid}
        onFormDataChange={setFormData}
        onSubmit={() => {
          void handleSubmit();
        }}
      />
    </RouterComponent>
  );
}
