import type { Product, User } from '@repo/api-contracts';

function user(
  id: string,
  name: string,
  email: string,
  role: string,
  joined: string,
): User {
  return {
    id,
    name,
    email,
    role,
    createdAt: joined,
    updatedAt: joined,
  };
}

const BASE_USERS: User[] = [
  user(
    '1',
    'John Doe',
    'john@example.com',
    'admin',
    '2026-01-15T10:00:00.000Z',
  ),
  user(
    '2',
    'Jane Smith',
    'jane@example.com',
    'manager',
    '2026-01-18T10:00:00.000Z',
  ),
  user(
    '3',
    'Bob Johnson',
    'bob@example.com',
    'viewer',
    '2026-01-21T10:00:00.000Z',
  ),
  user(
    '4',
    'Alice Chen',
    'alice@example.com',
    'admin',
    '2026-02-02T10:00:00.000Z',
  ),
  user(
    '5',
    'Marcus Lee',
    'marcus@example.com',
    'manager',
    '2026-02-09T10:00:00.000Z',
  ),
  user(
    '6',
    'Priya Patel',
    'priya@example.com',
    'viewer',
    '2026-02-14T10:00:00.000Z',
  ),
  user(
    '7',
    'Tom Becker',
    'tom@example.com',
    'manager',
    '2026-02-20T10:00:00.000Z',
  ),
  user(
    '8',
    'Sofia Rossi',
    'sofia@example.com',
    'viewer',
    '2026-03-01T10:00:00.000Z',
  ),
  user(
    '9',
    'Daniel Kim',
    'daniel@example.com',
    'admin',
    '2026-03-06T10:00:00.000Z',
  ),
  user(
    '10',
    'Emma Wilson',
    'emma@example.com',
    'viewer',
    '2026-03-12T10:00:00.000Z',
  ),
  user(
    '11',
    'Noah Davis',
    'noah@example.com',
    'manager',
    '2026-03-18T10:00:00.000Z',
  ),
  user(
    '12',
    'Olivia Brown',
    'olivia@example.com',
    'viewer',
    '2026-03-24T10:00:00.000Z',
  ),
];

const EXTRA_USER_NAMES = [
  'Mia Turner',
  'Ethan Brooks',
  'Ava Martinez',
  'Liam Foster',
  'Zoe Nguyen',
  'Caleb Wright',
  'Nora Bennett',
  'Owen Hughes',
  'Layla Price',
  'Mason Gray',
  'Chloe Sanders',
  'Leo Palmer',
  'Grace Coleman',
  'Isaac Reed',
  'Ruby Simmons',
  'Ezra Howard',
  'Lily Jenkins',
  'Finn Russell',
  'Aria Woods',
  'Jasper Long',
  'Ella Fisher',
  'Miles Hamilton',
  'Scarlett Wallace',
  'Silas Grant',
  'Hazel Porter',
  'Gavin Stone',
  'Ivy Chapman',
  'Theo Lane',
  'Nina Hart',
  'Caleb Dunn',
  'Maya Fox',
  'Roman Ellis',
  'Ada Banks',
  'Cole Hayes',
  'June Barrett',
  'Max Lowe',
];

const EXTRA_USERS: User[] = EXTRA_USER_NAMES.map((name, index) => {
  const id = String(13 + index);
  const email = `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`;
  const role =
    index % 3 === 0 ? 'admin' : index % 3 === 1 ? 'manager' : 'viewer';
  const day = String(1 + (index % 28)).padStart(2, '0');
  const month = index < 18 ? '04' : '05';

  return user(id, name, email, role, `2026-${month}-${day}T10:00:00.000Z`);
});

// 48 users total: enough to exercise pagination and ellipsis at 5 rows/page.
export const DEMO_USERS: User[] = [...BASE_USERS, ...EXTRA_USERS];

function product(
  id: string,
  name: string,
  description: string,
  price: number,
  status: Product['status'],
  createdAt: string,
  updatedAt: string,
): Product {
  return {
    id,
    name,
    description,
    price,
    status,
    createdAt,
    updatedAt,
  };
}

const BASE_PRODUCTS: Product[] = [
  product(
    'p-1',
    'Aurora Desk Lamp',
    'Warm dimmable task light with a steel base.',
    89,
    'active',
    '2026-01-08T09:00:00.000Z',
    '2026-03-20T09:00:00.000Z',
  ),
  product(
    'p-2',
    'Atlas Standing Desk',
    'Height-adjustable desk with a compact footprint.',
    649,
    'active',
    '2026-01-10T09:00:00.000Z',
    '2026-03-22T09:00:00.000Z',
  ),
  product(
    'p-3',
    'Cove Task Chair',
    'Breathable mesh chair with adjustable lumbar support.',
    329,
    'active',
    '2026-01-12T09:00:00.000Z',
    '2026-03-19T09:00:00.000Z',
  ),
  product(
    'p-4',
    'Drift Monitor Arm',
    'Gas-adjustable monitor arm with integrated cable management.',
    129,
    'active',
    '2026-01-15T09:00:00.000Z',
    '2026-03-18T09:00:00.000Z',
  ),
  product(
    'p-5',
    'Ember Notebook',
    'Lay-flat notebook with dot-grid pages and a linen cover.',
    18,
    'active',
    '2026-01-18T09:00:00.000Z',
    '2026-03-12T09:00:00.000Z',
  ),
  product(
    'p-6',
    'Field Backpack',
    'Weather-resistant commuter pack with a padded laptop sleeve.',
    74,
    'archived',
    '2026-01-20T09:00:00.000Z',
    '2026-02-26T09:00:00.000Z',
  ),
  product(
    'p-7',
    'Grove Planter',
    'Self-watering ceramic planter for small indoor plants.',
    34,
    'active',
    '2026-01-24T09:00:00.000Z',
    '2026-03-24T09:00:00.000Z',
  ),
  product(
    'p-8',
    'Halo Keyboard',
    'Low-profile mechanical keyboard with hot-swappable switches.',
    149,
    'active',
    '2026-01-28T09:00:00.000Z',
    '2026-03-21T09:00:00.000Z',
  ),
  product(
    'p-9',
    'Iris Webcam',
    '1080p webcam with a privacy shutter and dual microphones.',
    99,
    'archived',
    '2026-02-01T09:00:00.000Z',
    '2026-02-18T09:00:00.000Z',
  ),
  product(
    'p-10',
    'Juno Headphones',
    'Wireless over-ear headphones with active noise cancellation.',
    199,
    'active',
    '2026-02-05T09:00:00.000Z',
    '2026-03-25T09:00:00.000Z',
  ),
  product(
    'p-11',
    'Kite Cable Kit',
    'Braided USB-C cable set with a travel pouch.',
    24,
    'active',
    '2026-02-08T09:00:00.000Z',
    '2026-03-16T09:00:00.000Z',
  ),
  product(
    'p-12',
    'Lumen Mouse',
    'Ergonomic wireless mouse with quiet switches.',
    59,
    'active',
    '2026-02-11T09:00:00.000Z',
    '2026-03-23T09:00:00.000Z',
  ),
];

const PRODUCT_PREFIXES = [
  'Arc',
  'Nova',
  'Pulse',
  'Slate',
  'Terra',
  'Echo',
  'Flux',
  'Orbit',
  'Vista',
  'Drift',
  'Lumen',
  'Halo',
];

const PRODUCT_TYPES = [
  'Travel Mug',
  'Cable Organizer',
  'Monitor Stand',
  'Desk Mat',
  'Charging Dock',
  'Speaker',
];

const EXTRA_PRODUCTS: Product[] = Array.from({ length: 36 }, (_, index) => {
  const type =
    PRODUCT_TYPES[Math.floor(index / 6) % PRODUCT_TYPES.length] ??
    'Desk Accessory';
  const prefix = PRODUCT_PREFIXES[index % PRODUCT_PREFIXES.length] ?? 'Arc';
  const name = `${prefix} ${type}`;
  const id = `p-${13 + index}`;
  const price = 19 + (index % 10) * 12;
  const status: Product['status'] = index % 5 === 0 ? 'archived' : 'active';
  const createdDay = String(1 + (index % 28)).padStart(2, '0');
  const updatedDay = String(1 + ((index + 4) % 28)).padStart(2, '0');
  const month = index < 18 ? '04' : '05';

  return product(
    id,
    name,
    `A ${type.toLowerCase()} designed for everyday workspaces.`,
    price,
    status,
    `2026-${month}-${createdDay}T09:00:00.000Z`,
    `2026-${month}-${updatedDay}T09:00:00.000Z`,
  );
});

// 48 products total: enough to exercise pagination and ellipsis at 5 rows/page.
export const DEMO_PRODUCTS: Product[] = [...BASE_PRODUCTS, ...EXTRA_PRODUCTS];
