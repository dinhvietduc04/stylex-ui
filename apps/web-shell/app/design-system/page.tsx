import type { Metadata } from 'next';
import { DesignSystemShowcase } from '@repo/stylex-ui/showcase';

export const metadata: Metadata = {
  title: 'Design System | @repo/stylex-ui',
  description:
    'Token, theme, and component reference for @repo/stylex-ui — the StyleX design system shared by every shell.',
};

export default function DesignSystemPage() {
  return <DesignSystemShowcase />;
}
