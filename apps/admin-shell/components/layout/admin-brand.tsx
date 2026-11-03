import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';
import { Icon, Text, globalTokens, semanticTokens } from '@repo/stylex-ui';

const markStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '2.25rem',
  height: '2.25rem',
  backgroundColor: semanticTokens.brandPrimary,
  color: semanticTokens.textOnPrimary,
  borderRadius: globalTokens.radiusLg,
} as const;

export function AdminBrand() {
  return (
    <Link
      href="/admin"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: globalTokens.space3,
        minWidth: 0,
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      <span style={markStyle}>
        <Icon icon={LayoutDashboard} size="md" tone="current" />
      </span>
      <span style={{ minWidth: 0 }}>
        <Text as="span" size="sm" weight="semibold" truncate>
          Admin Portal
        </Text>
      </span>
    </Link>
  );
}

export function AdminBrandMark() {
  return (
    <Link
      href="/admin"
      aria-label="Admin Portal home"
      style={{ ...markStyle, textDecoration: 'none' }}
    >
      <Icon icon={LayoutDashboard} size="md" tone="current" />
    </Link>
  );
}
