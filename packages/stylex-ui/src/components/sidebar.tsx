'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { globalTokens } from '../tokens/global.stylex';
import { semanticTokens } from '../tokens/semantic.stylex';
import { componentTokens } from '../tokens/component.stylex';
import {
  findActiveTrail,
  getNavigationItemKey,
  isPathActive,
  type NavigationItem,
  type NavigationSection,
} from '../lib/navigation';
import { IconButton } from './button';
import { Icon } from './icon';
import { Drawer } from './overlay';

const styles = stylex.create({
  aside: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    height: '100%',
    width: componentTokens.sidebarWidthExpanded,
    backgroundColor: componentTokens.sidebarBg,
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: componentTokens.sidebarBorder,
    overflowX: 'hidden',
    transitionProperty: 'width',
    transitionDuration: globalTokens.durationNormal,
    transitionTimingFunction: globalTokens.easeStandard,
    '@media (max-width: 767px)': {
      display: 'none',
    },
  },
  asideCollapsed: {
    width: componentTokens.sidebarWidthCollapsed,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 0,
  },
  brandRow: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    height: componentTokens.headerHeight,
    paddingLeft: globalTokens.space3,
    paddingRight: globalTokens.space3,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: semanticTokens.borderSubtle,
  },
  brandRowCollapsed: {
    paddingLeft: '0.125rem',
    paddingRight: '0.125rem',
    gap: globalTokens.space1,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
  },
  brandCollapsed: {
    justifyContent: 'center',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: 0,
    gap: globalTokens.space4,
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingTop: globalTokens.space3,
    paddingBottom: globalTokens.space3,
    paddingLeft: globalTokens.space2,
    paddingRight: globalTokens.space2,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: globalTokens.space1,
  },
  sectionLabel: {
    paddingLeft: globalTokens.space2,
    paddingRight: globalTokens.space2,
    fontFamily: globalTokens.fontSans,
    fontSize: globalTokens.fontSizeXs,
    fontWeight: globalTokens.fontWeightSemibold,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: componentTokens.sidebarSectionLabel,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  sectionLabelCollapsed: {
    display: 'none',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  row: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: globalTokens.space2,
    width: '100%',
    minHeight: componentTokens.sidebarItemHeight,
    paddingLeft: globalTokens.space2,
    paddingRight: globalTokens.space2,
    borderRadius: componentTokens.sidebarItemRadius,
    borderWidth: 0,
    backgroundColor: 'transparent',
    color: semanticTokens.textSecondary,
    fontFamily: globalTokens.fontSans,
    fontSize: globalTokens.fontSizeSm,
    fontWeight: globalTokens.fontWeightMedium,
    lineHeight: globalTokens.lineHeightSnug,
    textAlign: 'left',
    textDecoration: 'none',
    cursor: 'pointer',
    outline: 'none',
    transitionProperty: 'background-color, color',
    transitionDuration: globalTokens.durationFast,
    transitionTimingFunction: globalTokens.easeStandard,
    ':hover': {
      backgroundColor: componentTokens.sidebarItemHoverBg,
      color: semanticTokens.textPrimary,
    },
    ':focus-visible': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: semanticTokens.borderFocus,
      outlineOffset: '2px',
    },
  },
  rowActive: {
    backgroundColor: componentTokens.sidebarItemActiveBg,
    color: componentTokens.sidebarItemActiveText,
    ':hover': {
      backgroundColor: componentTokens.sidebarItemActiveBg,
      color: componentTokens.sidebarItemActiveText,
    },
  },
  rowDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
  rowCollapsed: {
    justifyContent: 'center',
    gap: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  rowLink: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    gap: globalTokens.space2,
    minWidth: 0,
    color: 'inherit',
    textDecoration: 'none',
    outline: 'none',
    borderRadius: globalTokens.radiusSm,
    ':focus-visible': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: semanticTokens.borderFocus,
      outlineOffset: '2px',
    },
  },
  label: {
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  labelCollapsed: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
    borderWidth: 0,
  },
  fallbackIcon: {
    fontFamily: globalTokens.fontSans,
    fontSize: globalTokens.fontSizeSm,
    fontWeight: globalTokens.fontWeightSemibold,
    color: 'currentColor',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    marginLeft: 'auto',
  },
  chevronButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.5rem',
    height: '1.5rem',
    flexShrink: 0,
    padding: 0,
    borderWidth: 0,
    borderRadius: globalTokens.radiusSm,
    backgroundColor: 'transparent',
    color: semanticTokens.textMuted,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: semanticTokens.bgSurfaceMuted,
      color: semanticTokens.textPrimary,
    },
    ':focus-visible': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: semanticTokens.borderFocus,
      outlineOffset: '2px',
    },
  },
  chevron: {
    flexShrink: 0,
    transitionProperty: 'transform',
    transitionDuration: globalTokens.durationFast,
    transitionTimingFunction: globalTokens.easeStandard,
  },
  chevronOpen: {
    transform: 'rotate(90deg)',
  },
  childrenList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    listStyle: 'none',
    margin: 0,
    marginTop: '2px',
    marginLeft: globalTokens.space3,
    padding: 0,
    paddingLeft: globalTokens.space2,
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: semanticTokens.borderSubtle,
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    gap: globalTokens.space2,
    flexShrink: 0,
    marginTop: 'auto',
    padding: globalTokens.space2,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: semanticTokens.borderSubtle,
  },
  footerCollapsed: {
    alignItems: 'center',
  },
  mobileDrawer: {
    maxWidth: componentTokens.sidebarWidthExpanded,
  },
  mobileBody: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
});

function sanitizeId(value: string): string {
  return value.replace(/[^a-zA-Z0-9_-]/g, '-');
}

interface SidebarNodeProps {
  item: NavigationItem;
  pathname: string;
  collapsed: boolean;
  activeKeys: Set<string>;
  expandedIds: Set<string>;
  onToggleGroup: (key: string) => void;
  onExpandGroup: (key: string) => void;
  onExpandSidebar: () => void;
  onNavigate?: (item: NavigationItem) => void;
  onItemIntent?: (item: NavigationItem) => void;
  linkComponent?: React.ElementType;
}

function SidebarNode({
  item,
  pathname,
  collapsed,
  activeKeys,
  expandedIds,
  onToggleGroup,
  onExpandGroup,
  onExpandSidebar,
  onNavigate,
  onItemIntent,
  linkComponent,
}: SidebarNodeProps) {
  const itemKey = getNavigationItemKey(item);
  const hasChildren = Boolean(item.children?.length);
  const isExpanded = expandedIds.has(itemKey);
  const isActive = activeKeys.has(itemKey);
  const isCurrentPage = item.href
    ? isPathActive(pathname, item.href, true)
    : false;
  const childListId = `${React.useId().replace(/:/g, '')}-${sanitizeId(itemKey)}`;
  const LinkComponent = (linkComponent ?? 'a') as React.ElementType;

  const handleToggle = () => {
    if (collapsed) {
      onExpandSidebar();
      onExpandGroup(itemKey);
      return;
    }

    onToggleGroup(itemKey);
  };

  const handleNavigate = () => {
    onNavigate?.(item);
  };

  const handleIntent = () => {
    onItemIntent?.(item);
  };

  const rowProps = stylex.props(
    styles.row,
    isActive && styles.rowActive,
    item.disabled && styles.rowDisabled,
    collapsed && styles.rowCollapsed,
  );

  const content = (
    <>
      {item.icon ? (
        <Icon icon={item.icon} size="sm" tone="current" />
      ) : collapsed ? (
        <span aria-hidden="true" {...stylex.props(styles.fallbackIcon)}>
          {item.label.charAt(0).toUpperCase()}
        </span>
      ) : null}
      <span
        {...stylex.props(
          styles.label,
          collapsed && styles.labelCollapsed,
        )}
      >
        {item.label}
      </span>
      {!collapsed && item.badge ? (
        <span {...stylex.props(styles.badge)}>{item.badge}</span>
      ) : null}
    </>
  );

  const chevron = (
    <Icon
      icon={ChevronRight}
      size="xs"
      sx={[styles.chevron, isExpanded && styles.chevronOpen]}
    />
  );

  if (hasChildren) {
    if (collapsed || !item.href) {
      return (
        <li>
          <button
            type="button"
            title={collapsed ? item.label : undefined}
            aria-controls={!collapsed && isExpanded ? childListId : undefined}
            aria-expanded={collapsed ? false : isExpanded}
            disabled={item.disabled}
            onClick={handleToggle}
            onMouseEnter={handleIntent}
            onFocus={handleIntent}
            {...rowProps}
          >
            {content}
            {!collapsed ? chevron : null}
          </button>
          {!collapsed && isExpanded ? (
            <ul id={childListId} {...stylex.props(styles.childrenList)}>
              {item.children!.map((child) => (
                <SidebarNode
                  key={getNavigationItemKey(child)}
                  item={child}
                  pathname={pathname}
                  collapsed={collapsed}
                  activeKeys={activeKeys}
                  expandedIds={expandedIds}
                  onToggleGroup={onToggleGroup}
                  onExpandGroup={onExpandGroup}
                  onExpandSidebar={onExpandSidebar}
                  onNavigate={onNavigate}
                  onItemIntent={onItemIntent}
                  linkComponent={linkComponent}
                />
              ))}
            </ul>
          ) : null}
        </li>
      );
    }

    return (
      <li>
        <div {...rowProps}>
          <LinkComponent
            href={item.href}
            title={collapsed ? item.label : undefined}
            aria-current={isCurrentPage ? 'page' : undefined}
            onMouseEnter={handleIntent}
            onFocus={handleIntent}
            onClick={handleNavigate}
            {...stylex.props(styles.rowLink)}
          >
            {content}
          </LinkComponent>
          <button
            type="button"
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.label}`}
            aria-controls={isExpanded ? childListId : undefined}
            aria-expanded={isExpanded}
            onClick={handleToggle}
            {...stylex.props(styles.chevronButton)}
          >
            {chevron}
          </button>
        </div>
        {isExpanded ? (
          <ul id={childListId} {...stylex.props(styles.childrenList)}>
            {item.children!.map((child) => (
              <SidebarNode
                key={getNavigationItemKey(child)}
                item={child}
                pathname={pathname}
                collapsed={collapsed}
                activeKeys={activeKeys}
                expandedIds={expandedIds}
                onToggleGroup={onToggleGroup}
                onExpandGroup={onExpandGroup}
                onExpandSidebar={onExpandSidebar}
                onNavigate={onNavigate}
                onItemIntent={onItemIntent}
                linkComponent={linkComponent}
              />
            ))}
          </ul>
        ) : null}
      </li>
    );
  }

  if (item.href && !item.disabled) {
    return (
      <li>
        <LinkComponent
          href={item.href}
          title={collapsed ? item.label : undefined}
          aria-current={isCurrentPage ? 'page' : undefined}
          onMouseEnter={handleIntent}
          onFocus={handleIntent}
          onClick={handleNavigate}
          {...rowProps}
        >
          {content}
        </LinkComponent>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        title={collapsed ? item.label : undefined}
        disabled={item.disabled}
        onClick={handleNavigate}
        onMouseEnter={handleIntent}
        onFocus={handleIntent}
        {...rowProps}
      >
        {content}
      </button>
    </li>
  );
}

interface SidebarBodyProps {
  sections: NavigationSection[];
  pathname: string;
  collapsed: boolean;
  showToggle: boolean;
  showClose?: boolean;
  onClose?: () => void;
  activeKeys: Set<string>;
  expandedIds: Set<string>;
  onToggleGroup: (key: string) => void;
  onExpandGroup: (key: string) => void;
  onToggleCollapsed: () => void;
  onExpandSidebar: () => void;
  onNavigate?: (item: NavigationItem) => void;
  onItemIntent?: (item: NavigationItem) => void;
  linkComponent?: React.ElementType;
  brand?: React.ReactNode;
  brandCollapsed?: React.ReactNode;
  footer?: React.ReactNode;
  ariaLabel: string;
}

function SidebarBody({
  sections,
  pathname,
  collapsed,
  showToggle,
  showClose = false,
  onClose,
  activeKeys,
  expandedIds,
  onToggleGroup,
  onExpandGroup,
  onToggleCollapsed,
  onExpandSidebar,
  onNavigate,
  onItemIntent,
  linkComponent,
  brand,
  brandCollapsed,
  footer,
  ariaLabel,
}: SidebarBodyProps) {
  return (
    <div {...stylex.props(styles.body)}>
      <div
        {...stylex.props(
          styles.brandRow,
          collapsed && styles.brandRowCollapsed,
        )}
      >
        <div
          {...stylex.props(
            styles.brand,
            collapsed && styles.brandCollapsed,
          )}
        >
          {collapsed ? brandCollapsed ?? brand : brand}
        </div>
        {showClose ? (
          <IconButton
            aria-label="Close navigation"
            variant="ghost"
            size="sm"
            onClick={onClose}
            icon={<Icon icon={X} size="sm" />}
          />
        ) : showToggle ? (
          <IconButton
            aria-label={
              collapsed ? 'Expand sidebar' : 'Collapse sidebar'
            }
            title={
              collapsed ? 'Expand sidebar' : 'Collapse sidebar'
            }
            variant="ghost"
            size="xs"
            shape="circle"
            onClick={onToggleCollapsed}
            icon={
              <Icon
                icon={collapsed ? ChevronRight : ChevronLeft}
                size="sm"
              />
            }
          />
        ) : null}
      </div>

      <nav aria-label={ariaLabel} {...stylex.props(styles.nav)}>
        {sections.map((section, sectionIndex) => (
          <div
            key={section.id ?? section.label ?? sectionIndex}
            {...stylex.props(styles.section)}
          >
            {section.label ? (
              <div
                {...stylex.props(
                  styles.sectionLabel,
                  collapsed && styles.sectionLabelCollapsed,
                )}
              >
                {section.label}
              </div>
            ) : null}
            <ul {...stylex.props(styles.list)}>
              {section.items.map((item) => (
                <SidebarNode
                  key={getNavigationItemKey(item)}
                  item={item}
                  pathname={pathname}
                  collapsed={collapsed}
                  activeKeys={activeKeys}
                  expandedIds={expandedIds}
                  onToggleGroup={onToggleGroup}
                  onExpandGroup={onExpandGroup}
                  onExpandSidebar={onExpandSidebar}
                  onNavigate={onNavigate}
                  onItemIntent={onItemIntent}
                  linkComponent={linkComponent}
                />
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {footer ? (
        <div
          {...stylex.props(
            styles.footer,
            collapsed && styles.footerCollapsed,
          )}
        >
          {footer}
        </div>
      ) : null}
    </div>
  );
}

export interface SidebarProps {
  sections: NavigationSection[];
  pathname: string;

  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;

  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  mobileTitle?: string;

  linkComponent?: React.ElementType;
  onNavigate?: (item: NavigationItem) => void;
  onItemIntent?: (item: NavigationItem) => void;

  brand?: React.ReactNode;
  brandCollapsed?: React.ReactNode;
  footer?: React.ReactNode;
  ariaLabel?: string;
}

export function Sidebar({
  sections,
  pathname,
  collapsed,
  defaultCollapsed = true,
  onCollapsedChange,
  mobileOpen = false,
  onMobileOpenChange,
  mobileTitle = 'Navigation',
  linkComponent,
  onNavigate,
  onItemIntent,
  brand,
  brandCollapsed,
  footer,
  ariaLabel = 'Main navigation',
}: SidebarProps) {
  const isControlled = collapsed !== undefined;
  const [internalCollapsed, setInternalCollapsed] =
    React.useState(defaultCollapsed);
  const isCollapsed = isControlled ? collapsed : internalCollapsed;

  const allItems = React.useMemo(
    () => sections.flatMap((section) => section.items),
    [sections],
  );
  const activeTrail = React.useMemo(
    () => findActiveTrail(allItems, pathname),
    [allItems, pathname],
  );
  const activeKeys = React.useMemo(
    () => new Set(activeTrail.map(getNavigationItemKey)),
    [activeTrail],
  );

  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(
    () =>
      new Set(
        activeTrail.slice(0, -1).map(getNavigationItemKey),
      ),
  );

  React.useEffect(() => {
    const parentKeys = activeTrail
      .slice(0, -1)
      .map(getNavigationItemKey);

    if (parentKeys.length === 0) return;

    setExpandedIds((previous) => {
      let changed = false;
      const next = new Set(previous);

      for (const key of parentKeys) {
        if (!next.has(key)) {
          next.add(key);
          changed = true;
        }
      }

      return changed ? next : previous;
    });
  }, [activeTrail]);

  const setCollapsed = React.useCallback(
    (nextCollapsed: boolean) => {
      if (!isControlled) {
        setInternalCollapsed(nextCollapsed);
      }
      onCollapsedChange?.(nextCollapsed);
    },
    [isControlled, onCollapsedChange],
  );

  const toggleCollapsed = React.useCallback(() => {
    setCollapsed(!isCollapsed);
  }, [isCollapsed, setCollapsed]);

  const expandSidebar = React.useCallback(() => {
    setCollapsed(false);
  }, [setCollapsed]);

  const toggleGroup = React.useCallback((key: string) => {
    setExpandedIds((previous) => {
      const next = new Set(previous);

      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }

      return next;
    });
  }, []);

  const expandGroup = React.useCallback((key: string) => {
    setExpandedIds((previous) => {
      if (previous.has(key)) return previous;

      const next = new Set(previous);
      next.add(key);
      return next;
    });
  }, []);

  const closeMobile = React.useCallback(() => {
    onMobileOpenChange?.(false);
  }, [onMobileOpenChange]);

  const handleNavigate = React.useCallback(
    (item: NavigationItem) => {
      onNavigate?.(item);
      closeMobile();
    },
    [closeMobile, onNavigate],
  );

  const renderBody = (
    bodyCollapsed: boolean,
    showToggle: boolean,
    showClose = false,
  ) => (
    <SidebarBody
      sections={sections}
      pathname={pathname}
      collapsed={bodyCollapsed}
      showToggle={showToggle}
      showClose={showClose}
      onClose={closeMobile}
      activeKeys={activeKeys}
      expandedIds={expandedIds}
      onToggleGroup={toggleGroup}
      onExpandGroup={expandGroup}
      onToggleCollapsed={toggleCollapsed}
      onExpandSidebar={expandSidebar}
      onNavigate={handleNavigate}
      onItemIntent={onItemIntent}
      linkComponent={linkComponent}
      brand={brand}
      brandCollapsed={brandCollapsed}
      footer={footer}
      ariaLabel={ariaLabel}
    />
  );

  return (
    <>
      <aside
        aria-label={ariaLabel}
        {...stylex.props(
          styles.aside,
          isCollapsed && styles.asideCollapsed,
        )}
      >
        {renderBody(isCollapsed, true)}
      </aside>

      <Drawer
        open={mobileOpen}
        onOpenChange={onMobileOpenChange}
        title={mobileTitle}
        side="left"
        size="sm"
        hideHeader
        sx={styles.mobileDrawer}
        bodySx={styles.mobileBody}
      >
        {renderBody(false, false, true)}
      </Drawer>
    </>
  );
}

Sidebar.displayName = 'Sidebar';
