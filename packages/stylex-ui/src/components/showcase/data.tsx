'use client';

import * as React from 'react';
import { Users } from 'lucide-react';
import { Badge } from '../badge';
import { Button } from '../button';
import { EmptyState } from '../empty-state';
import { Pagination } from '../pagination';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
} from '../table';
import { Text } from '../typography';
import { Section, Specimen } from './primitives';

interface Member {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Active' | 'Invited';
}

const BASE_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Avery Cole',
    email: 'avery@example.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Jordan Ellis',
    email: 'jordan@example.com',
    role: 'Editor',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Riley Morgan',
    email: 'riley@example.com',
    role: 'Viewer',
    status: 'Invited',
  },
  {
    id: '4',
    name: 'Casey Brooks',
    email: 'casey@example.com',
    role: 'Editor',
    status: 'Active',
  },
  {
    id: '5',
    name: 'Morgan Reed',
    email: 'morgan@example.com',
    role: 'Viewer',
    status: 'Active',
  },
  {
    id: '6',
    name: 'Taylor Quinn',
    email: 'taylor@example.com',
    role: 'Viewer',
    status: 'Invited',
  },
];

const EXTRA_MEMBER_NAMES = [
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
];

const EXTRA_MEMBERS: Member[] = EXTRA_MEMBER_NAMES.map((name, index) => ({
  id: String(7 + index),
  name,
  email: `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
  role: index % 3 === 0 ? 'Admin' : index % 3 === 1 ? 'Editor' : 'Viewer',
  status: index % 4 === 0 ? 'Invited' : 'Active',
}));

// 36 members total: enough to exercise ellipsis at 3 rows per page.
const MEMBERS: Member[] = [...BASE_MEMBERS, ...EXTRA_MEMBERS];

function roleVariant(role: Member['role']): 'primary' | 'info' | 'neutral' {
  if (role === 'Admin') return 'primary';
  if (role === 'Editor') return 'info';
  return 'neutral';
}

function statusVariant(status: Member['status']): 'success' | 'warning' {
  return status === 'Active' ? 'success' : 'warning';
}

export function DataSection() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(3);

  const pageCount = Math.max(1, Math.ceil(MEMBERS.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const start = (safePage - 1) * pageSize;
  const rows = MEMBERS.slice(start, start + pageSize);

  const pagination = (
    <Pagination
      page={safePage}
      pageCount={pageCount}
      total={MEMBERS.length}
      pageSize={pageSize}
      pageSizeOptions={[3, 5, 10]}
      onPageChange={setPage}
      onPageSizeChange={(next) => {
        setPageSize(next);
        setPage(1);
      }}
    />
  );

  return (
    <Section
      id="data"
      eyebrow="Components"
      title="Data tables"
      meta="Table · empty state · pagination"
      description="Primitives, not a framework. Compose columns and rows per screen, then attach the controlled pagination bar to the table footer."
    >
      <Specimen
        label="Table"
        note="Bordered surface, subtle dividers, hover and selected states, and a pagination footer."
        stack
      >
        <Table
          label="Team members"
          density="comfortable"
          minHeight={pageSize * 64 + 48}
          style={{ minWidth: 520 }}
          footer={pagination}
        >
          <TableCaption visuallyHidden>Team members</TableCaption>

          <TableHeader>
            <TableHead>Member</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableHeader>

          <TableBody>
            {rows.map((member, index) => (
              <TableRow
                key={member.id}
                selected={safePage === 1 && index === 1}
              >
                <TableCell>
                  <Text as="span" weight="medium">
                    {member.name}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text as="span" size="sm" tone="muted">
                    {member.email}
                  </Text>
                </TableCell>
                <TableCell>
                  <Badge variant={roleVariant(member.role)}>
                    {member.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant(member.status)} dot>
                    {member.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Specimen>

      <Specimen
        label="Table empty state"
        note="TableEmpty spans every column and keeps the header visible."
        stack
      >
        <Table label="Empty team members" style={{ minWidth: 460 }}>
          <TableCaption visuallyHidden>Empty team members</TableCaption>

          <TableHeader>
            <TableHead>Member</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableHeader>

          <TableBody>
            <TableEmpty colSpan={3}>
              <EmptyState
                size="sm"
                icon={<Users size={20} />}
                title="No members yet"
                description="Invite a teammate to start building the directory."
                primaryAction={<Button size="sm">Invite member</Button>}
              />
            </TableEmpty>
          </TableBody>
        </Table>
      </Specimen>

      <Specimen
        label="Pagination"
        note="Controlled and 1-based. Page-size selection is optional."
        stack
      >
        {pagination}
      </Specimen>
    </Section>
  );
}
