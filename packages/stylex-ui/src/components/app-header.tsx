import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { Menu } from 'lucide-react';
import { globalTokens } from '../tokens/global.stylex';
import { semanticTokens } from '../tokens/semantic.stylex';
import { componentTokens } from '../tokens/component.stylex';
import { IconButton } from './button';
import { Breadcrumbs } from './breadcrumbs';
import type { BreadcrumbItem } from '../lib/navigation';

const styles = stylex.create({
  header: {
    position: 'sticky',
    top: 0,
    zIndex: globalTokens.zSticky,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: globalTokens.space4,
    flexShrink: 0,
    height: componentTokens.headerHeight,
    paddingLeft: globalTokens.space6,
    paddingRight: globalTokens.space6,
    backgroundColor: componentTokens.headerBg,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: componentTokens.headerBorder,
    '@media (max-width: 640px)': {
      paddingLeft: globalTokens.space4,
      paddingRight: globalTokens.space4,
    },
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    gap: globalTokens.space3,
    minWidth: 0,
  },
  menuButton: {
    flexShrink: 0,
    '@media (min-width: 768px)': {
      display: 'none',
    },
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    gap: globalTokens.space2,
  },
});

export interface AppHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  onMenuClick?: () => void;
  menuLabel?: string;
  linkComponent?: React.ElementType;
}

export function AppHeader({
  breadcrumbs,
  actions,
  onMenuClick,
  menuLabel = 'Open navigation',
  linkComponent,
}: AppHeaderProps) {
  return (
    <header {...stylex.props(styles.header)}>
      <div {...stylex.props(styles.left)}>
        {onMenuClick ? (
          <IconButton
            aria-label={menuLabel}
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            sx={styles.menuButton}
            icon={<Menu size={18} aria-hidden="true" />}
          />
        ) : null}
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <Breadcrumbs items={breadcrumbs} linkComponent={linkComponent} />
        ) : null}
      </div>

      {actions ? <div {...stylex.props(styles.actions)}>{actions}</div> : null}
    </header>
  );
}

AppHeader.displayName = 'AppHeader';
