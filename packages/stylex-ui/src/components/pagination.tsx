'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { globalTokens } from '../tokens/global.stylex';
import { semanticTokens } from '../tokens/semantic.stylex';
import { mergeStylexProps } from '../lib/stylex-utils';
import { SimpleSelect } from './select';

type PageItem = number | 'ellipsis';

const styles = stylex.create({
  nav: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: globalTokens.space3,
    width: '100%',
    paddingTop: globalTokens.space3,
    paddingBottom: globalTokens.space3,
    paddingLeft: globalTokens.space4,
    paddingRight: globalTokens.space4,
    fontFamily: globalTokens.fontSans,
    '@media (max-width: 640px)': {
      paddingLeft: globalTokens.space3,
      paddingRight: globalTokens.space3,
    },
  },
  range: {
    margin: 0,
    fontSize: globalTokens.fontSizeSm,
    color: semanticTokens.textMuted,
    fontVariantNumeric: 'tabular-nums',
  },
  controls: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: globalTokens.space2,
    marginLeft: 'auto',
    '@media (max-width: 640px)': {
      width: '100%',
      marginLeft: 0,
      justifyContent: 'flex-end',
    },
  },
  pageSize: {
    width: '7.5rem',
    flexShrink: 0,
    '@media (max-width: 640px)': {
      display: 'none',
    },
  },
  pageNumbers: {
    display: 'flex',
    alignItems: 'center',
    gap: globalTokens.space1,
    '@media (max-width: 640px)': {
      display: 'none',
    },
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '2.25rem',
    height: '2.25rem',
    paddingLeft: globalTokens.space2,
    paddingRight: globalTokens.space2,
    borderRadius: globalTokens.radiusMd,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    fontFamily: globalTokens.fontSans,
    fontSize: globalTokens.fontSizeSm,
    fontWeight: globalTokens.fontWeightMedium,
    color: semanticTokens.textSecondary,
    cursor: 'pointer',
    outline: 'none',
    fontVariantNumeric: 'tabular-nums',
    transitionProperty: 'background-color, color, border-color, box-shadow',
    transitionDuration: globalTokens.durationFast,
    ':hover': {
      backgroundColor: semanticTokens.bgSurfaceHover,
      color: semanticTokens.textPrimary,
    },
    ':focus-visible': {
      borderColor: semanticTokens.borderFocus,
      boxShadow: `0 0 0 3px ${semanticTokens.ringColor}`,
    },
    ':disabled': {
      opacity: 0.45,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
    '@media (max-width: 640px)': {
      minWidth: '2.75rem',
      height: '2.75rem',
    },
  },
  navButton: {
    borderColor: semanticTokens.borderDefault,
    backgroundColor: semanticTokens.bgSurface,
  },
  activeButton: {
    borderColor: semanticTokens.brandPrimary,
    backgroundColor: semanticTokens.brandPrimary,
    color: semanticTokens.textOnPrimary,
    ':hover': {
      borderColor: semanticTokens.brandPrimaryHover,
      backgroundColor: semanticTokens.brandPrimaryHover,
      color: semanticTokens.textOnPrimary,
    },
  },
  ellipsis: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2.25rem',
    height: '2.25rem',
    color: semanticTokens.textMuted,
    fontSize: globalTokens.fontSizeSm,
    userSelect: 'none',
    '@media (max-width: 640px)': {
      display: 'none',
    },
  },
});

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function getPageItems(
  page: number,
  pageCount: number,
  siblingCount: number,
): PageItem[] {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (pageCount <= totalPageNumbers) {
    return range(1, pageCount);
  }

  const leftSiblingIndex = Math.max(page - siblingCount, 1);
  const rightSiblingIndex = Math.min(page + siblingCount, pageCount);
  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < pageCount - 2;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    return [...range(1, leftItemCount), 'ellipsis', pageCount];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    return [1, 'ellipsis', ...range(pageCount - rightItemCount + 1, pageCount)];
  }

  return [
    1,
    'ellipsis',
    ...range(leftSiblingIndex, rightSiblingIndex),
    'ellipsis',
    pageCount,
  ];
}

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  page: number;
  pageCount: number;
  total?: number;
  pageSize?: number;
  pageSizeOptions?: readonly number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  siblingCount?: number;
  showRange?: boolean;
  showPageNumbers?: boolean;
  showPageSize?: boolean;
  disabled?: boolean;
  sx?: StyleXStyles;
}

export function Pagination({
  page,
  pageCount,
  total,
  pageSize,
  pageSizeOptions = [10, 20, 50],
  onPageChange,
  onPageSizeChange,
  siblingCount = 1,
  showRange = true,
  showPageNumbers = true,
  showPageSize = Boolean(onPageSizeChange),
  disabled = false,
  sx: customSx,
  className,
  style,
  'aria-label': ariaLabel = 'Pagination',
  ...props
}: PaginationProps) {
  if (pageCount < 1) {
    return null;
  }

  const safePageCount = Math.max(1, pageCount);
  const safePage = Math.min(Math.max(1, page), safePageCount);
  const safeSiblingCount = Math.max(0, siblingCount);
  const pageItems = getPageItems(safePage, safePageCount, safeSiblingCount);

  const canGoPrevious = safePage > 1 && !disabled;
  const canGoNext = safePage < safePageCount && !disabled;

  let rangeLabel = `Page ${safePage} of ${safePageCount}`;

  if (typeof total === 'number' && typeof pageSize === 'number' && total > 0) {
    const start = Math.min((safePage - 1) * pageSize + 1, total);
    const end = Math.min(safePage * pageSize, total);
    rangeLabel = `Showing ${start}–${end} of ${total}`;
  }

  const pageSizeSelectVisible =
    showPageSize && Boolean(onPageSizeChange) && pageSizeOptions.length > 0;

  return (
    <nav
      aria-label={ariaLabel}
      {...mergeStylexProps({ className, style, sx: customSx }, styles.nav)}
      {...props}
    >
      {showRange ? (
        <p aria-live="polite" {...stylex.props(styles.range)}>
          {rangeLabel}
        </p>
      ) : null}

      <div {...stylex.props(styles.controls)}>
        {pageSizeSelectVisible ? (
          <div {...stylex.props(styles.pageSize)}>
            <SimpleSelect
              aria-label="Rows per page"
              disabled={disabled}
              options={pageSizeOptions.map((option) => ({
                value: String(option),
                label: `${option} / page`,
              }))}
              value={String(pageSize ?? pageSizeOptions[0] ?? 10)}
              onValueChange={(value) => onPageSizeChange?.(Number(value))}
            />
          </div>
        ) : null}

        {showPageNumbers ? (
          <div {...stylex.props(styles.pageNumbers)}>
            {pageItems.map((item, index) =>
              item === 'ellipsis' ? (
                <span
                  key={`ellipsis-${index}`}
                  aria-hidden="true"
                  {...stylex.props(styles.ellipsis)}
                >
                  …
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  aria-label={`Go to page ${item}`}
                  aria-current={item === safePage ? 'page' : undefined}
                  disabled={disabled}
                  onClick={() => onPageChange(item)}
                  {...stylex.props(
                    styles.button,
                    item === safePage ? styles.activeButton : undefined,
                  )}
                >
                  {item}
                </button>
              ),
            )}
          </div>
        ) : null}

        <button
          type="button"
          aria-label="Go to previous page"
          disabled={!canGoPrevious}
          onClick={() => onPageChange(safePage - 1)}
          {...stylex.props(styles.button, styles.navButton)}
        >
          <ChevronLeft size={16} aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-label="Go to next page"
          disabled={!canGoNext}
          onClick={() => onPageChange(safePage + 1)}
          {...stylex.props(styles.button, styles.navButton)}
        >
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}

Pagination.displayName = 'Pagination';
