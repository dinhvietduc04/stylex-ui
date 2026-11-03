import type * as React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  id?: string;
  label: string;
  href?: string;
  icon?: LucideIcon;
  badge?: React.ReactNode;
  children?: NavigationItem[];
  exact?: boolean;
  disabled?: boolean;
}

export interface NavigationSection<T extends NavigationItem = NavigationItem> {
  id?: string;
  label?: string;
  items: T[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: LucideIcon;
}

export function normalizePath(path: string): string {
  const cleaned = (path || '/').split(/[?#]/, 1)[0] ?? '/';
  const slashed = cleaned.replace(/\/+/g, '/');

  return slashed === '/' ? '/' : slashed.replace(/\/+$/, '') || '/';
}

export function isPathActive(
  pathname: string,
  href: string,
  exact = false,
): boolean {
  const path = normalizePath(pathname);
  const target = normalizePath(href);

  if (path === target) return true;
  return !exact && path.startsWith(`${target}/`);
}

export function getNavigationItemKey(item: NavigationItem): string {
  return item.id ?? item.href ?? item.label;
}

export function findActiveTrail(
  items: NavigationItem[],
  pathname: string,
): NavigationItem[] {
  const candidates: Array<{
    trail: NavigationItem[];
    hrefLength: number;
    depth: number;
  }> = [];

  const visit = (item: NavigationItem, ancestors: NavigationItem[]): void => {
    const trail = [...ancestors, item];

    if (item.href && isPathActive(pathname, item.href, item.exact)) {
      candidates.push({
        trail,
        hrefLength: normalizePath(item.href).length,
        depth: trail.length,
      });
    }

    item.children?.forEach((child) => {
      visit(child, trail);
    });
  };

  items.forEach((item) => {
    visit(item, []);
  });

  candidates.sort((a, b) => b.hrefLength - a.hrefLength || b.depth - a.depth);

  return candidates[0]?.trail ?? [];
}

export interface BuildBreadcrumbsOptions {
  pathname: string;
  sections: NavigationSection[];
  root?: BreadcrumbItem;
  resolveSegment?: (
    segment: string,
    context: { index: number; parentPath: string },
  ) => string | undefined;
}

export function humanizeSegment(segment: string): string {
  let decoded = segment;
  try {
    decoded = decodeURIComponent(segment);
  } catch {
    // keep the raw segment
  }

  return decoded
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

interface FlatNavigationEntry {
  item: NavigationItem;
  ancestors: NavigationItem[];
}

function flattenNavigation(
  items: NavigationItem[],
  ancestors: NavigationItem[] = [],
): FlatNavigationEntry[] {
  return items.flatMap((item) => [
    { item, ancestors },
    ...(item.children?.length
      ? flattenNavigation(item.children, [...ancestors, item])
      : []),
  ]);
}

export function buildBreadcrumbs({
  pathname,
  sections,
  root,
  resolveSegment,
}: BuildBreadcrumbsOptions): BreadcrumbItem[] {
  const path = normalizePath(pathname);
  const entries = flattenNavigation(
    sections.flatMap((section) => section.items),
  );

  const match = entries
    .filter(
      ({ item }) => item.href && isPathActive(path, item.href, item.exact),
    )
    .sort(
      (a, b) =>
        normalizePath(b.item.href!).length - normalizePath(a.item.href!).length,
    )[0];

  const crumbs: BreadcrumbItem[] = [];
  const rootPath = root?.href ? normalizePath(root.href) : null;
  const pathUnderRoot =
    rootPath !== null && (path === rootPath || path.startsWith(`${rootPath}/`));

  if (match?.item.href) {
    for (const entry of [...match.ancestors, match.item]) {
      if (entry.href) {
        crumbs.push({
          label: entry.label,
          href: entry.href,
          icon: entry.icon,
        });
      }
    }
  } else if (root && pathUnderRoot) {
    crumbs.push({ ...root });
  }

  if (root && crumbs[0]?.href !== root.href) {
    crumbs.unshift({ ...root });
  }

  const baseHref = match?.item.href
    ? normalizePath(match.item.href)
    : pathUnderRoot && rootPath
      ? rootPath
      : '';

  const remainder =
    baseHref && path.startsWith(baseHref)
      ? path.slice(baseHref.length).split('/').filter(Boolean)
      : !match && !root
        ? path.split('/').filter(Boolean)
        : [];

  let parentPath = baseHref;

  remainder.forEach((segment, index) => {
    const label =
      resolveSegment?.(segment, { index, parentPath }) ??
      humanizeSegment(segment);

    parentPath = parentPath ? `${parentPath}/${segment}` : `/${segment}`;

    crumbs.push({ label, href: parentPath });
  });

  const seen = new Set<string>();
  const deduped = crumbs.filter((crumb) => {
    const key = `${crumb.href ?? ''}::${crumb.label}`;

    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return deduped.map((crumb, index) =>
    index === deduped.length - 1
      ? { label: crumb.label, icon: crumb.icon }
      : crumb,
  );
}
