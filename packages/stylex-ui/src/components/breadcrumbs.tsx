import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { ChevronRight } from 'lucide-react';
import { globalTokens } from '../tokens/global.stylex';
import { semanticTokens } from '../tokens/semantic.stylex';
import { Icon } from './icon';
import type { BreadcrumbItem } from '../lib/navigation';

const styles = stylex.create({
  nav: {
    minWidth: 0,
  },
  list: {
    display: 'flex',
    alignItems: 'center',
    gap: globalTokens.space1,
    margin: 0,
    padding: 0,
    listStyle: 'none',
    minWidth: 0,
    overflow: 'hidden',
  },
  item: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: globalTokens.space1,
    minWidth: 0,
  },
  middle: {
    '@media (max-width: 640px)': {
      display: 'none',
    },
  },
  separator: {
    flexShrink: 0,
    color: semanticTokens.textMuted,
  },
  link: {
    fontFamily: globalTokens.fontSans,
    fontSize: globalTokens.fontSizeSm,
    color: semanticTokens.textSecondary,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    outline: 'none',
    borderRadius: globalTokens.radiusXs,
    transitionProperty: 'color',
    transitionDuration: globalTokens.durationFast,
    ':hover': {
      color: semanticTokens.textPrimary,
    },
    ':focus-visible': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: semanticTokens.borderFocus,
      outlineOffset: '2px',
    },
  },
  current: {
    fontFamily: globalTokens.fontSans,
    fontSize: globalTokens.fontSizeSm,
    fontWeight: globalTokens.fontWeightMedium,
    color: semanticTokens.textPrimary,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '14rem',
  },
  muted: {
    color: semanticTokens.textMuted,
  },
});

interface RenderBreadcrumb extends BreadcrumbItem {
  ellipsis?: boolean;
}

function collapseItems(
  items: BreadcrumbItem[],
  maxItems?: number,
): RenderBreadcrumb[] {
  if (!maxItems || maxItems < 3 || items.length <= maxItems) {
    return items;
  }

  return [items[0]!, { label: '…', ellipsis: true }, ...items.slice(-2)];
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  linkComponent?: React.ElementType;
  ariaLabel?: string;
  maxItems?: number;
}

export function Breadcrumbs({
  items,
  linkComponent,
  ariaLabel = 'Breadcrumb',
  maxItems,
}: BreadcrumbsProps) {
  const LinkComponent = (linkComponent ?? 'a') as React.ElementType;
  const visibleItems = collapseItems(items, maxItems);

  if (visibleItems.length === 0) return null;

  return (
    <nav aria-label={ariaLabel} {...stylex.props(styles.nav)}>
      <ol {...stylex.props(styles.list)}>
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          const isMiddle = !isLast && index > 0;

          return (
            <li
              key={`${item.href ?? item.label}-${index}`}
              {...stylex.props(styles.item, isMiddle && styles.middle)}
            >
              {index > 0 ? (
                <ChevronRight
                  size={14}
                  aria-hidden="true"
                  {...stylex.props(styles.separator)}
                />
              ) : null}

              {item.icon ? (
                <Icon icon={item.icon} size="xs" tone="muted" />
              ) : null}

              {!isLast && !item.ellipsis && item.href ? (
                <LinkComponent href={item.href} {...stylex.props(styles.link)}>
                  {item.label}
                </LinkComponent>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  {...stylex.props(
                    styles.current,
                    (item.ellipsis || !isLast) && styles.muted,
                  )}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

Breadcrumbs.displayName = 'Breadcrumbs';
