'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Check, ChevronsUpDown, Search, X } from 'lucide-react';
import { globalTokens } from '../tokens/global.stylex';
import { semanticTokens } from '../tokens/semantic.stylex';
import { componentTokens } from '../tokens/component.stylex';
import { mergeStylexProps } from '../lib/stylex-utils';

const styles = stylex.create({
  trigger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: globalTokens.space2,
    width: '100%',
    height: componentTokens.inputHeightMd,
    paddingLeft: globalTokens.space3,
    paddingRight: globalTokens.space3,
    borderRadius: componentTokens.inputRadius,
    backgroundColor: componentTokens.inputBg,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: componentTokens.inputBorder,
    color: semanticTokens.textPrimary,
    fontFamily: globalTokens.fontSans,
    fontSize: globalTokens.fontSizeSm,
    cursor: 'pointer',
    outline: 'none',
    transitionProperty: 'border-color, box-shadow, background-color',
    transitionDuration: globalTokens.durationFast,
    ':focus-visible': {
      borderColor: componentTokens.inputFocusBorder,
      boxShadow: `0 0 0 3px ${componentTokens.inputFocusRing}`,
    },
    ':disabled': {
      backgroundColor: componentTokens.inputDisabledBg,
      opacity: 0.65,
      cursor: 'not-allowed',
    },
  },
  triggerError: {
    borderColor: componentTokens.inputErrorBorder,
  },
  placeholderText: {
    color: semanticTokens.textMuted,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  selectedText: {
    color: semanticTokens.textPrimary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  triggerActions: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: globalTokens.space1,
    flexShrink: 0,
  },
  clearBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.125rem',
    height: '1.125rem',
    borderRadius: globalTokens.radiusFull,
    color: semanticTokens.textMuted,
    ':hover': {
      backgroundColor: semanticTokens.bgSurfaceMuted,
      color: semanticTokens.textPrimary,
    },
  },
  popoverContent: {
    zIndex: globalTokens.zPopover,
    width: 'var(--radix-popover-trigger-width)',
    minWidth: '15rem',
    borderRadius: globalTokens.radiusLg,
    backgroundColor: semanticTokens.bgSurfaceElevated,
    color: semanticTokens.textPrimary,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: semanticTokens.borderDefault,
    boxShadow: globalTokens.shadowLg,
    overflow: 'hidden',
    outline: 'none',
    animationName: 'dfw-fade-in',
    animationDuration: globalTokens.durationFast,
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: globalTokens.space2,
    paddingTop: globalTokens.space2,
    paddingBottom: globalTokens.space2,
    paddingLeft: globalTokens.space3,
    paddingRight: globalTokens.space3,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: semanticTokens.borderDefault,
  },
  searchInput: {
    flex: 1,
    width: '100%',
    borderWidth: 0,
    outline: 'none',
    backgroundColor: 'transparent',
    color: semanticTokens.textPrimary,
    fontFamily: globalTokens.fontSans,
    fontSize: globalTokens.fontSizeSm,
    '::placeholder': {
      color: semanticTokens.textMuted,
    },
  },
  listContainer: {
    maxHeight: '15rem',
    overflowY: 'auto',
    padding: globalTokens.space1,
  },
  optionRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: globalTokens.space2,
    width: '100%',
    paddingTop: '0.45rem',
    paddingBottom: '0.45rem',
    paddingLeft: globalTokens.space3,
    paddingRight: globalTokens.space3,
    borderRadius: globalTokens.radiusSm,
    borderWidth: 0,
    backgroundColor: 'transparent',
    color: semanticTokens.textPrimary,
    fontFamily: globalTokens.fontSans,
    fontSize: globalTokens.fontSizeSm,
    textAlign: 'left',
    cursor: 'pointer',
    transitionProperty: 'background-color, color',
    transitionDuration: globalTokens.durationFast,
    ':hover': {
      backgroundColor: semanticTokens.bgSurfaceHover,
    },
  },
  optionActive: {
    backgroundColor: semanticTokens.brandPrimarySubtle,
    color: semanticTokens.brandText,
  },
  optionSelected: {
    fontWeight: globalTokens.fontWeightMedium,
  },
  optionDisabled: {
    opacity: 0.45,
    pointerEvents: 'none',
  },
  optionMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.1rem',
    minWidth: 0,
  },
  optionDescription: {
    fontSize: globalTokens.fontSizeXs,
    color: semanticTokens.textMuted,
  },
  emptyState: {
    paddingTop: globalTokens.space6,
    paddingBottom: globalTokens.space6,
    paddingLeft: globalTokens.space4,
    paddingRight: globalTokens.space4,
    textAlign: 'center',
    fontSize: globalTokens.fontSizeSm,
    color: semanticTokens.textMuted,
  },
  countFooter: {
    paddingTop: globalTokens.space1,
    paddingBottom: globalTokens.space1,
    paddingLeft: globalTokens.space3,
    paddingRight: globalTokens.space3,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: semanticTokens.borderSubtle,
    fontSize: globalTokens.fontSizeXs,
    color: semanticTokens.textMuted,
    backgroundColor: semanticTokens.bgSurfaceSubtle,
  },
});

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  keywords?: string[];
  disabled?: boolean;
}

export interface ComboboxProps {
  /** Dataset of options to search & select */
  options: ComboboxOption[];
  /** Controlled selected value */
  value?: string;
  /** Default value when uncontrolled */
  defaultValue?: string;
  /** Callback when selection changes */
  onValueChange?: (value: string) => void;
  /** Button placeholder when nothing selected */
  placeholder?: string;
  /** Placeholder inside search input */
  searchPlaceholder?: string;
  /** Message shown when client-side filter finds 0 matches */
  emptyMessage?: string;
  /** Allow clearing selected item */
  clearable?: boolean;
  /** Error state */
  error?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Trigger element id for FormField label binding */
  id?: string;
  /** Accessible label */
  'aria-label'?: string;
  sx?: StyleXStyles;
}

export function Combobox({
  options,
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  placeholder = 'Select item...',
  searchPlaceholder = 'Type to filter options...',
  emptyMessage = 'No matching options found.',
  clearable = true,
  error = false,
  disabled = false,
  id,
  'aria-label': ariaLabel,
  sx: customSx,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [query, setQuery] = React.useState('');
  const [highlightedIndex, setHighlightedIndex] = React.useState(0);
  const searchInputRef = React.useRef<HTMLInputElement | null>(null);
  const listboxId = React.useId();

  const isControlled = controlledValue !== undefined;
  const selectedValue = isControlled ? controlledValue : internalValue;

  const selectedOption = React.useMemo(
    () => options.find((o) => o.value === selectedValue),
    [options, selectedValue],
  );

  const filteredOptions = React.useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return options;
    return options.filter((opt) => {
      const matchLabel = opt.label.toLowerCase().includes(trimmed);
      const matchValue = opt.value.toLowerCase().includes(trimmed);
      const matchDesc = opt.description?.toLowerCase().includes(trimmed);
      const matchKeywords = opt.keywords?.some((k) =>
        k.toLowerCase().includes(trimmed),
      );
      return Boolean(matchLabel || matchValue || matchDesc || matchKeywords);
    });
  }, [options, query]);

  React.useEffect(() => {
    setHighlightedIndex(0);
  }, [query, open]);

  const handleSelect = (nextVal: string) => {
    if (!isControlled) {
      setInternalValue(nextVal);
    }
    onValueChange?.(nextVal);
    setOpen(false);
    setQuery('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isControlled) {
      setInternalValue('');
    }
    onValueChange?.('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredOptions.length > 0) {
        setHighlightedIndex((prev) => (prev + 1) % filteredOptions.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filteredOptions.length > 0) {
        setHighlightedIndex(
          (prev) =>
            (prev - 1 + filteredOptions.length) % filteredOptions.length,
        );
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = filteredOptions[highlightedIndex];
      if (target && !target.disabled) {
        handleSelect(target.value);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const triggerProps = mergeStylexProps(
    { sx: customSx },
    styles.trigger,
    error && styles.triggerError,
  );

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          id={id}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-label={ariaLabel}
          disabled={disabled}
          {...triggerProps}
        >
          <span
            {...stylex.props(
              selectedOption ? styles.selectedText : styles.placeholderText,
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span {...stylex.props(styles.triggerActions)}>
            {clearable && selectedOption && !disabled ? (
              <span
                role="button"
                tabIndex={-1}
                aria-label="Clear selection"
                onClick={handleClear}
                {...stylex.props(styles.clearBadge)}
              >
                <X size={12} aria-hidden="true" />
              </span>
            ) : null}
            <ChevronsUpDown
              size={15}
              aria-hidden="true"
              style={{ opacity: 0.6 }}
            />
          </span>
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          sideOffset={4}
          align="start"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            searchInputRef.current?.focus();
          }}
          {...stylex.props(styles.popoverContent)}
        >
          <div {...stylex.props(styles.searchBar)}>
            <Search size={15} aria-hidden="true" style={{ opacity: 0.55 }} />
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              aria-autocomplete="list"
              aria-controls={listboxId}
              {...stylex.props(styles.searchInput)}
            />
            {query ? (
              <button
                type="button"
                aria-label="Clear search query"
                onClick={() => setQuery('')}
                {...stylex.props(styles.clearBadge)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
              >
                <X size={13} aria-hidden="true" />
              </button>
            ) : null}
          </div>

          <div
            id={listboxId}
            role="listbox"
            aria-label="Options"
            {...stylex.props(styles.listContainer)}
          >
            {filteredOptions.length === 0 ? (
              <div {...stylex.props(styles.emptyState)}>{emptyMessage}</div>
            ) : (
              filteredOptions.map((option, idx) => {
                const isSelected = option.value === selectedValue;
                const isHighlighted = idx === highlightedIndex;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    disabled={option.disabled}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    onClick={() => handleSelect(option.value)}
                    {...stylex.props(
                      styles.optionRow,
                      isHighlighted && styles.optionActive,
                      isSelected && styles.optionSelected,
                      option.disabled && styles.optionDisabled,
                    )}
                  >
                    <span {...stylex.props(styles.optionMeta)}>
                      <span>{option.label}</span>
                      {option.description ? (
                        <span {...stylex.props(styles.optionDescription)}>
                          {option.description}
                        </span>
                      ) : null}
                    </span>
                    {isSelected ? (
                      <Check size={15} aria-hidden="true" />
                    ) : null}
                  </button>
                );
              })
            )}
          </div>

          <div {...stylex.props(styles.countFooter)}>
            Showing {filteredOptions.length} of {options.length} items
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
