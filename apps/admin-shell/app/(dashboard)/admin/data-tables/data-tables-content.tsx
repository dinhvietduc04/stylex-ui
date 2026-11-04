'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Package, Pencil, Plus, Search, Trash2, Users } from 'lucide-react';
import type { Product, User } from '@repo/api-contracts';
import type { TableToolbarFilter } from '@repo/stylex-ui';
import {
  Badge,
  Button,
  EmptyState,
  Heading,
  IconButton,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  Text,
  semanticTokens,
  toast,
  useConfirm,
} from '@repo/stylex-ui';

import { DEMO_PRODUCTS, DEMO_USERS } from './mock-data';
import { ProductFormDrawer } from './product-form-drawer';
import type { ProductFormValues } from './product-form.schema';
import { UserFormDrawer } from './user-form-drawer';
import type { UserFormValues } from './user-form.schema';
import {
  TABLE_PAGE_SIZES,
  useTableQueryParams,
  type TableDataset,
} from './use-table-query-params';

type Dataset = TableDataset;
type PreviewState = 'populated' | 'empty';
type BadgeVariant = 'primary' | 'success' | 'info' | 'neutral';

const DATASET_OPTIONS = [
  { value: 'users', label: 'Users' },
  { value: 'products', label: 'Products' },
] as const;

const PREVIEW_OPTIONS = [
  { value: 'populated', label: 'Populated' },
  { value: 'empty', label: 'Empty' },
] as const;

const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'active', label: 'Active' },
  { value: 'archived', label: 'Archived' },
];

const ROLE_OPTIONS = [
  { value: 'all', label: 'All roles' },
  { value: 'admin', label: 'Admin' },
  { value: 'manager', label: 'Manager' },
  { value: 'viewer', label: 'Viewer' },
];

const DATE_SORT_OPTIONS = [
  { value: 'desc', label: 'Newest first' },
  { value: 'asc', label: 'Oldest first' },
];

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function formatDate(value: string): string {
  return dateFormatter.format(new Date(value));
}

function formatPrice(value: number): string {
  return priceFormatter.format(value);
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function roleVariant(role: string): BadgeVariant {
  if (role === 'admin') return 'primary';
  if (role === 'manager') return 'info';
  return 'neutral';
}

function statusVariant(status: Product['status']): BadgeVariant {
  return status === 'active' ? 'success' : 'neutral';
}

interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  label: string;
  value: T;
  options: ReadonlyArray<SegmentedOption<T>>;
  onChange: (value: T) => void;
}

function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center gap-1 rounded-lg border p-1"
      style={{
        borderColor: semanticTokens.borderDefault,
        backgroundColor: semanticTokens.bgSurfaceSubtle,
      }}
    >
      {options.map((option) => {
        const active = option.value === value;

        return (
          <Button
            key={option.value}
            type="button"
            size="sm"
            variant={active ? 'primary' : 'ghost'}
            aria-pressed={active}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </Button>
        );
      })}
    </div>
  );
}

interface DataTablesContentProps {
  permissions: readonly string[];
}

export function DataTablesContent({ permissions }: DataTablesContentProps) {
  const {
    dataset,
    q,
    status,
    role,
    from,
    to,
    dateSort,
    page,
    pageSize,
    setSearch,
    setStatus,
    setRole,
    setFrom,
    setTo,
    setDateSort,
    setPage,
    setPageSize,
    setDataset,
    clearFilters,
  } = useTableQueryParams();
  const [preview, setPreview] = useState<PreviewState>('populated');
  const [users, setUsers] = useState<User[]>(() => DEMO_USERS);
  const [products, setProducts] = useState<Product[]>(() => DEMO_PRODUCTS);
  const [userForm, setUserForm] = useState<{
    open: boolean;
    user: User | null;
  }>({ open: false, user: null });
  const [productForm, setProductForm] = useState<{
    open: boolean;
    product: Product | null;
  }>({ open: false, product: null });
  const confirm = useConfirm();
  // Check the entity write permissions directly; admin:access is the shell
  // entry permission, not a grant for every entity mutation.
  const canWriteUsers = permissions.includes('user:write');
  const canWriteProducts = permissions.includes('product:write');
  const canWrite = dataset === 'users' ? canWriteUsers : canWriteProducts;

  const normalizedQuery = q.trim().toLowerCase();

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => {
        const matchesQuery =
          !normalizedQuery ||
          user.name.toLowerCase().includes(normalizedQuery) ||
          user.email.toLowerCase().includes(normalizedQuery);
        const matchesRole = role === 'all' || user.role === role;
        const userDate = user.createdAt.slice(0, 10);
        const matchesFrom = !from || userDate >= from;
        const matchesTo = !to || userDate <= to;

        return matchesQuery && matchesRole && matchesFrom && matchesTo;
      })
      .sort((a, b) => {
        const diff = Date.parse(a.createdAt) - Date.parse(b.createdAt);
        return dateSort === 'asc' ? diff : -diff;
      });
  }, [users, normalizedQuery, role, from, to, dateSort]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesQuery =
          !normalizedQuery ||
          product.name.toLowerCase().includes(normalizedQuery) ||
          product.description.toLowerCase().includes(normalizedQuery);
        const matchesStatus = status === 'all' || product.status === status;
        const productDate = product.updatedAt.slice(0, 10);
        const matchesFrom = !from || productDate >= from;
        const matchesTo = !to || productDate <= to;

        return matchesQuery && matchesStatus && matchesFrom && matchesTo;
      })
      .sort((a, b) => {
        const diff = Date.parse(a.updatedAt) - Date.parse(b.updatedAt);
        return dateSort === 'asc' ? diff : -diff;
      });
  }, [products, normalizedQuery, status, from, to, dateSort]);

  const total =
    preview === 'empty'
      ? 0
      : dataset === 'users'
        ? filteredUsers.length
        : filteredProducts.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, pageCount);
  const isEmpty = preview === 'empty' || total === 0;
  const start = (safePage - 1) * pageSize;
  const hasActiveFilters =
    normalizedQuery !== '' ||
    (dataset === 'users' && role !== 'all') ||
    (dataset === 'products' && status !== 'all') ||
    from !== '' ||
    to !== '' ||
    dateSort !== 'desc';
  const tableMinHeight = pageSize * (dataset === 'users' ? 64 : 72) + 48;

  const pagedUsers: User[] =
    preview === 'empty' ? [] : filteredUsers.slice(start, start + pageSize);

  const pagedProducts: Product[] =
    preview === 'empty' ? [] : filteredProducts.slice(start, start + pageSize);

  useEffect(() => {
    if (page !== safePage) {
      setPage(safePage);
    }
  }, [page, safePage, setPage]);

  const handleDatasetChange = (next: Dataset) => {
    setDataset(next);
  };

  const handlePreviewChange = (next: PreviewState) => {
    setPreview(next);
    setPage(1);
  };

  const openCreateForm = () => {
    if (!canWrite) return;

    if (dataset === 'users') {
      setUserForm({ open: true, user: null });
    } else {
      setProductForm({ open: true, product: null });
    }
  };

  const openEditUser = (user: User) => {
    if (!canWriteUsers) return;

    setUserForm({ open: true, user });
  };

  const openEditProduct = (product: Product) => {
    if (!canWriteProducts) return;

    setProductForm({ open: true, product });
  };

  const handleSaveUser = (values: UserFormValues) => {
    const now = new Date().toISOString();
    const editingUser = userForm.user;

    setUsers((current) => {
      if (editingUser) {
        return current.map((user) =>
          user.id === editingUser.id
            ? { ...user, ...values, updatedAt: now }
            : user,
        );
      }

      return [
        {
          id: crypto.randomUUID(),
          ...values,
          createdAt: now,
          updatedAt: now,
        },
        ...current,
      ];
    });

    toast.success(editingUser ? 'User updated' : 'User added', {
      description: editingUser
        ? `${values.name}'s profile has been updated.`
        : `${values.name} has been added to the demo directory.`,
    });
  };

  const handleSaveProduct = (values: ProductFormValues) => {
    const now = new Date().toISOString();
    const editingProduct = productForm.product;

    setProducts((current) => {
      if (editingProduct) {
        return current.map((product) =>
          product.id === editingProduct.id
            ? { ...product, ...values, updatedAt: now }
            : product,
        );
      }

      return [
        {
          id: crypto.randomUUID(),
          ...values,
          createdAt: now,
          updatedAt: now,
        },
        ...current,
      ];
    });

    toast.success(editingProduct ? 'Product updated' : 'Product added', {
      description: editingProduct
        ? `${values.name} has been updated.`
        : `${values.name} has been added to the demo catalogue.`,
    });
  };

  const handleDeleteUser = async (user: User) => {
    if (!canWriteUsers) return;

    const confirmed = await confirm({
      title: 'Delete user?',
      description: (
        <>
          This permanently removes <strong>{user.name}</strong> from the demo
          directory. This can’t be undone.
        </>
      ),
      confirmText: 'Delete user',
      cancelText: 'Cancel',
      variant: 'danger',
    });

    if (!confirmed) return;

    setUsers((current) =>
      current.filter((candidate) => candidate.id !== user.id),
    );

    toast.warning('User deleted', {
      description: `${user.name} has been removed.`,
    });
  };

  const handleDeleteProduct = async (product: Product) => {
    if (!canWriteProducts) return;

    const confirmed = await confirm({
      title: 'Delete product?',
      description: (
        <>
          This permanently removes <strong>{product.name}</strong> from the demo
          catalogue. This can’t be undone.
        </>
      ),
      confirmText: 'Delete product',
      cancelText: 'Cancel',
      variant: 'danger',
    });

    if (!confirmed) return;

    setProducts((current) =>
      current.filter((candidate) => candidate.id !== product.id),
    );

    toast.warning('Product deleted', {
      description: `${product.name} has been removed.`,
    });
  };

  const renderEmptyState = (entity: 'users' | 'products', icon: ReactNode) => {
    if (hasActiveFilters && preview !== 'empty') {
      return (
        <EmptyState
          size="sm"
          icon={<Search size={20} />}
          title={`No ${entity} match your filters`}
          description={
            q
              ? `Nothing matches “${q}”. Try a different search or clear the filters.`
              : from || to
                ? 'Try a different date range or clear the filters.'
                : `Try a different ${
                    dataset === 'users' ? 'role' : 'status'
                  } or clear the filters.`
          }
          primaryAction={
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={clearFilters}
            >
              Clear filters
            </Button>
          }
        />
      );
    }

    const entityLabel = entity === 'users' ? 'Users' : 'Products';

    return (
      <EmptyState
        size="sm"
        icon={icon}
        title={`No ${entity} yet`}
        description={`${entityLabel} will appear here once they are added.`}
        primaryAction={
          preview === 'empty' || !canWrite ? undefined : (
            <Button
              type="button"
              size="sm"
              variant="secondary"
              leftIcon={<Plus size={14} />}
              onClick={openCreateForm}
            >
              Add {entity === 'users' ? 'user' : 'product'}
            </Button>
          )
        }
      />
    );
  };

  const datasetFilter: TableToolbarFilter =
    dataset === 'users'
      ? {
          key: 'role',
          label: 'Filter by role',
          value: role,
          options: ROLE_OPTIONS,
          onChange: setRole,
        }
      : {
          key: 'status',
          label: 'Filter by status',
          value: status,
          options: STATUS_OPTIONS,
          onChange: setStatus,
        };

  const filters: TableToolbarFilter[] = [
    datasetFilter,
    {
      key: 'dateSort',
      label: 'Sort by date',
      value: dateSort,
      options: DATE_SORT_OPTIONS,
      onChange: setDateSort,
    },
  ];

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <span
          className="text-xs font-semibold uppercase tracking-[0.08em]"
          style={{ color: semanticTokens.brandText }}
        >
          Component demo
        </span>

        <div className="flex flex-wrap items-center gap-3">
          <Heading level={1}>Data tables</Heading>
          <Badge variant="info" size="sm">
            Demo data
          </Badge>
        </div>

        <Text tone="secondary" className="max-w-2xl">
          Table primitives, empty states, and a controlled pagination bar from
          @repo/stylex-ui.
        </Text>
      </header>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <SegmentedControl
          label="Dataset"
          value={dataset}
          options={DATASET_OPTIONS}
          onChange={handleDatasetChange}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Text as="span" size="sm" tone="muted">
          Preview
        </Text>

        <SegmentedControl
          label="Preview state"
          value={preview}
          options={PREVIEW_OPTIONS}
          onChange={handlePreviewChange}
        />
      </div>

      <TableToolbar
        key={dataset}
        searchValue={q}
        onSearchChange={setSearch}
        searchPlaceholder={
          dataset === 'users'
            ? 'Search users by name or email…'
            : 'Search products by name or description…'
        }
        searchAriaLabel={
          dataset === 'users' ? 'Search users' : 'Search products'
        }
        filters={filters}
        actions={
          canWrite || hasActiveFilters ? (
            <div className="flex items-center gap-2">
              {hasActiveFilters ? (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={clearFilters}
                >
                  Clear filters
                </Button>
              ) : null}

              {canWrite ? (
                <Button
                  type="button"
                  size="sm"
                  leftIcon={<Plus size={14} />}
                  onClick={openCreateForm}
                >
                  {dataset === 'users' ? 'Add user' : 'Add product'}
                </Button>
              ) : null}
            </div>
          ) : undefined
        }
      >
        <div className="flex flex-wrap items-center gap-2">
          <Text as="span" size="sm" tone="muted">
            Date range
          </Text>

          <div className="w-[9.5rem]">
            <Input
              type="date"
              value={from}
              max={to || undefined}
              onChange={(event) => setFrom(event.target.value)}
              aria-label="From date"
            />
          </div>

          <Text as="span" size="sm" tone="muted">
            to
          </Text>

          <div className="w-[9.5rem]">
            <Input
              type="date"
              value={to}
              min={from || undefined}
              onChange={(event) => setTo(event.target.value)}
              aria-label="To date"
            />
          </div>
        </div>
      </TableToolbar>

      <Table
        label={dataset === 'users' ? 'Users table' : 'Products table'}
        density="comfortable"
        minHeight={tableMinHeight}
        style={{ minWidth: dataset === 'users' ? 760 : 680 }}
        footer={
          !isEmpty ? (
            <Pagination
              page={safePage}
              pageCount={pageCount}
              total={total}
              pageSize={pageSize}
              pageSizeOptions={TABLE_PAGE_SIZES}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          ) : undefined
        }
      >
        <TableCaption visuallyHidden>
          {dataset === 'users' ? 'Users' : 'Products'}
        </TableCaption>

        {dataset === 'users' ? (
          <>
            <TableHeader>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead align="center">Role</TableHead>
              <TableHead>Joined</TableHead>
              {canWrite ? <TableHead align="right">Actions</TableHead> : null}
            </TableHeader>

            <TableBody>
              {isEmpty ? (
                <TableEmpty colSpan={canWrite ? 5 : 4}>
                  {renderEmptyState('users', <Users size={20} />)}
                </TableEmpty>
              ) : (
                pagedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor: semanticTokens.brandPrimarySubtle,
                            color: semanticTokens.brandText,
                          }}
                        >
                          {getInitials(user.name)}
                        </span>

                        <Text as="span" weight="medium">
                          {user.name}
                        </Text>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Text as="span" tone="secondary">
                        {user.email}
                      </Text>
                    </TableCell>

                    <TableCell align="center">
                      <Badge
                        variant={roleVariant(user.role)}
                        className="capitalize"
                        dot
                      >
                        {user.role}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Text as="span" tone="muted">
                        {formatDate(user.createdAt)}
                      </Text>
                    </TableCell>

                    {canWrite ? (
                      <TableCell align="right">
                        <div className="flex items-center justify-end gap-1">
                          <IconButton
                            aria-label={`Edit ${user.name}`}
                            variant="ghost"
                            size="md"
                            style={{ width: '2.75rem', height: '2.75rem' }}
                            icon={<Pencil size={15} />}
                            onClick={() => openEditUser(user)}
                          />
                          <IconButton
                            aria-label={`Delete ${user.name}`}
                            variant="ghost"
                            size="md"
                            style={{ width: '2.75rem', height: '2.75rem' }}
                            icon={<Trash2 size={15} />}
                            onClick={() => {
                              void handleDeleteUser(user);
                            }}
                          />
                        </div>
                      </TableCell>
                    ) : null}
                  </TableRow>
                ))
              )}
            </TableBody>
          </>
        ) : (
          <>
            <TableHeader>
              <TableHead>Product</TableHead>
              <TableHead align="center">Price</TableHead>
              <TableHead align="center">Status</TableHead>
              <TableHead>Updated</TableHead>
              {canWrite ? <TableHead align="right">Actions</TableHead> : null}
            </TableHeader>

            <TableBody>
              {isEmpty ? (
                <TableEmpty colSpan={canWrite ? 5 : 4}>
                  {renderEmptyState('products', <Package size={20} />)}
                </TableEmpty>
              ) : (
                pagedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex max-w-md flex-col gap-0.5">
                        <Text as="span" weight="medium">
                          {product.name}
                        </Text>

                        <Text as="span" size="sm" tone="muted" truncate>
                          {product.description}
                        </Text>
                      </div>
                    </TableCell>

                    <TableCell align="center">
                      <Text as="span" className="tabular-nums">
                        {formatPrice(product.price)}
                      </Text>
                    </TableCell>

                    <TableCell align="center">
                      <Badge
                        variant={statusVariant(product.status)}
                        className="capitalize"
                        dot
                      >
                        {product.status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Text as="span" tone="muted">
                        {formatDate(product.updatedAt)}
                      </Text>
                    </TableCell>

                    {canWrite ? (
                      <TableCell align="right">
                        <div className="flex items-center justify-end gap-1">
                          <IconButton
                            aria-label={`Edit ${product.name}`}
                            variant="ghost"
                            size="md"
                            style={{ width: '2.75rem', height: '2.75rem' }}
                            icon={<Pencil size={15} />}
                            onClick={() => openEditProduct(product)}
                          />
                          <IconButton
                            aria-label={`Delete ${product.name}`}
                            variant="ghost"
                            size="md"
                            style={{ width: '2.75rem', height: '2.75rem' }}
                            icon={<Trash2 size={15} />}
                            onClick={() => {
                              void handleDeleteProduct(product);
                            }}
                          />
                        </div>
                      </TableCell>
                    ) : null}
                  </TableRow>
                ))
              )}
            </TableBody>
          </>
        )}
      </Table>

      <Text size="sm" tone="muted">
        Demo controls are page-specific. The table, empty state, and pagination
        are imported from @repo/stylex-ui.
      </Text>

      <UserFormDrawer
        open={userForm.open}
        onOpenChange={(open) =>
          setUserForm((current) => ({ ...current, open }))
        }
        user={userForm.user}
        users={users}
        onSave={handleSaveUser}
      />

      <ProductFormDrawer
        open={productForm.open}
        onOpenChange={(open) =>
          setProductForm((current) => ({ ...current, open }))
        }
        product={productForm.product}
        onSave={handleSaveProduct}
      />
    </div>
  );
}
