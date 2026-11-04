'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import { Search } from 'lucide-react';
import { globalTokens } from '../tokens/global.stylex';
import { mergeStylexProps } from '../lib/stylex-utils';
import { useDebouncedValue } from '../lib/use-debounced-value';
import { Input } from './input';
import { SimpleSelect, type SelectOption } from './select';

const styles = stylex.create({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: globalTokens.space2,
    width: '100%',
  },
  search: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '16rem',
    maxWidth: '24rem',
  },
  filter: {
    width: '11rem',
    flexShrink: 0,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: globalTokens.space2,
    marginLeft: 'auto',
  },
});

export interface TableToolbarFilter {
  /** Stable identifier for the filter. */
  key: string;
  /** Accessible label for the select. */
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

export interface TableToolbarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  searchValue: string;
  /** Called with the debounced search value. */
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  /** Debounce applied to the search input. Defaults to 300ms. */
  searchDebounceMs?: number;
  /** Accessible label for the search input. */
  searchAriaLabel?: string;
  filters?: TableToolbarFilter[];
  /** Custom controls rendered inline after the filters. */
  children?: React.ReactNode;
  actions?: React.ReactNode;
  sx?: StyleXStyles;
}

/**
 * Search + filter bar for data tables.
 *
 * The component owns the immediate input value and the debounce; the consumer
 * owns the committed value and renders the filtered data.
 */
export function TableToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search…',
  searchDebounceMs = 300,
  searchAriaLabel = 'Search table',
  filters = [],
  children,
  actions,
  sx: customSx,
  className,
  style,
  ...props
}: TableToolbarProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const committedRef = React.useRef(searchValue);
  const onSearchChangeRef = React.useRef(onSearchChange);
  const pendingExternalRef = React.useRef<string | null>(null);
  const [inputValue, setInputValue] = React.useState(searchValue);
  const debouncedValue = useDebouncedValue(inputValue, searchDebounceMs);

  React.useEffect(() => {
    onSearchChangeRef.current = onSearchChange;
  }, [onSearchChange]);

  // Adopt external changes (URL navigation, "clear filters") unless the user is
  // actively editing, so a slow URL round-trip cannot steal keystrokes. When
  // the input is focused, hold the external value and apply it on blur if the
  // user has not typed since.
  React.useEffect(() => {
    if (searchValue === committedRef.current) {
      pendingExternalRef.current = null;
      return;
    }

    if (document.activeElement === inputRef.current) {
      pendingExternalRef.current = searchValue;
      return;
    }

    pendingExternalRef.current = null;
    committedRef.current = searchValue;
    setInputValue(searchValue);
  }, [searchValue]);

  React.useEffect(() => {
    // Ignore a stale debounced value while the input has already moved on.
    if (debouncedValue !== inputValue) return;
    if (debouncedValue === committedRef.current) return;

    pendingExternalRef.current = null;
    committedRef.current = debouncedValue;
    onSearchChangeRef.current(debouncedValue);
  }, [debouncedValue, inputValue]);

  const handleBlur = () => {
    const pending = pendingExternalRef.current;
    if (pending === null) return;

    pendingExternalRef.current = null;

    // Keep uncommitted edits; only adopt the external value when the input
    // still matches the last committed value.
    if (inputValue !== committedRef.current) return;

    committedRef.current = pending;
    setInputValue(pending);
  };

  const handleClear = () => {
    pendingExternalRef.current = null;
    committedRef.current = '';
    setInputValue('');
    onSearchChange('');
  };

  return (
    <div
      {...mergeStylexProps({ className, style, sx: customSx }, styles.root)}
      {...props}
    >
      <Input
        ref={inputRef}
        type="text"
        role="searchbox"
        autoComplete="off"
        spellCheck={false}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onBlur={handleBlur}
        onClear={handleClear}
        clearable
        placeholder={searchPlaceholder}
        aria-label={searchAriaLabel}
        prefixIcon={<Search size={16} aria-hidden="true" />}
        containerSx={styles.search}
      />

      {filters.map((filter) => (
        <div key={filter.key} {...stylex.props(styles.filter)}>
          <SimpleSelect
            aria-label={filter.label}
            options={filter.options}
            value={filter.value}
            onValueChange={filter.onChange}
          />
        </div>
      ))}

      {children}

      {actions ? <div {...stylex.props(styles.actions)}>{actions}</div> : null}
    </div>
  );
}

TableToolbar.displayName = 'TableToolbar';
