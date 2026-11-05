import type { User } from '@repo/api-contracts';

let mockUsers: User[] = [
  {
    id: '1',
    email: 'john@example.com',
    name: 'John Doe',
    role: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'jane@example.com',
    name: 'Jane Smith',
    role: 'manager',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'bob@example.com',
    name: 'Bob Johnson',
    role: 'viewer',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockUserApi = {
  list: async (): Promise<User[]> => {
    return [...mockUsers];
  },
  get: async (id: string): Promise<User> => {
    const user = mockUsers.find((u) => u.id === id);
    if (!user) throw new Error('User not found');
    return user;
  },
  create: async (data: {
    email: string;
    name: string;
    role: string;
  }): Promise<User> => {
    const user: User = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockUsers.push(user);
    return user;
  },
  update: async (
    id: string,
    data: { email?: string; name?: string; role?: string },
  ): Promise<User> => {
    const existing = mockUsers.find((u) => u.id === id);
    if (!existing) throw new Error('User not found');

    const updated: User = {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    mockUsers = mockUsers.map((user) => (user.id === id ? updated : user));

    return updated;
  },
  delete: async (id: string): Promise<void> => {
    mockUsers = mockUsers.filter((u) => u.id !== id);
  },
};
