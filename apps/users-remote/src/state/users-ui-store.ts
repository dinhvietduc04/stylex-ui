import { create } from 'zustand';
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
} from '@repo/api-contracts';

interface UsersUIState {
  // Data state
  users: User[];
  loading: boolean;

  // Dialog state
  dialogOpen: boolean;
  editingUser: User | null;

  // Form state
  formData: CreateUserRequest;

  // Actions
  setUsers: (users: User[]) => void;
  setLoading: (loading: boolean) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  removeUser: (id: string) => void;
  openDialog: () => void;
  closeDialog: () => void;
  setEditingUser: (user: User | null) => void;
  setFormData: (data: CreateUserRequest) => void;
  resetForm: () => void;
}

export const useUsersUIStore = create<UsersUIState>((set, get) => ({
  // Initial state
  users: [],
  loading: true,
  dialogOpen: false,
  editingUser: null,
  formData: {
    email: '',
    name: '',
    role: 'viewer',
  },

  // Actions
  setUsers: (users) => set({ users }),
  setLoading: (loading) => set({ loading }),

  addUser: (user) =>
    set((state) => ({
      users: [user, ...state.users],
    })),

  updateUser: (user) =>
    set((state) => ({
      users: state.users.map((candidate) =>
        candidate.id === user.id ? user : candidate,
      ),
    })),

  removeUser: (id) =>
    set((state) => ({
      users: state.users.filter((candidate) => candidate.id !== id),
    })),

  openDialog: () => {
    set({ dialogOpen: true });
  },
  closeDialog: () => {
    set({ dialogOpen: false });
  },

  setEditingUser: (editingUser) => set({ editingUser }),

  setFormData: (formData) => set({ formData }),

  resetForm: () =>
    set({
      formData: {
        email: '',
        name: '',
        role: 'viewer',
      },
    }),
}));
