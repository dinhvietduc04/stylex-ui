'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
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
    ':focus': {
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
    ':focus': {
      borderColor: componentTokens.inputErrorBorder,
      boxShadow: `0 0 0 3px ${componentTokens.inputErrorRing}`,
    },
  },
  chevronIcon: {
    color: semanticTokens.textMuted,
    flexShrink: 0,
  },
  content: {
    position: 'relative',
    zIndex: globalTokens.zDropdown,
    minWidth: '8rem',
    maxHeight: '20rem',
    overflow: 'hidden',
    borderRadius: globalTokens.radiusLg,
    backgroundColor: semanticTokens.bgSurfaceElevated,
    color: semanticTokens.textPrimary,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: semanticTokens.borderDefault,
    boxShadow: globalTokens.shadowLg,
    animationName: 'dfw-fade-in',
    animationDuration: globalTokens.durationFast,
  },
  viewport: {
    padding: globalTokens.space1,
    width: '100%',
    minWidth: 'var(--radix-select-trigger-width)',
  },
  scrollBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '1.5rem',
    backgroundColor: semanticTokens.bgSurfaceElevated,
    color: semanticTokens.textMuted,
    cursor: 'default',
  },
  label: {
    paddingTop: globalTokens.space1,
    paddingBottom: globalTokens.space1,
    paddingLeft: globalTokens.space6,
    paddingRight: globalTokens.space2,
    fontSize: globalTokens.fontSizeXs,
    fontWeight: globalTokens.fontWeightSemibold,
    color: semanticTokens.textMuted,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  item: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    paddingTop: '0.45rem',
    paddingBottom: '0.45rem',
    paddingLeft: globalTokens.space8,
    paddingRight: globalTokens.space3,
    borderRadius: globalTokens.radiusSm,
    fontSize: globalTokens.fontSizeSm,
    color: semanticTokens.textPrimary,
    cursor: 'pointer',
    userSelect: 'none',
    outline: 'none',
    transitionProperty: 'background-color, color',
    transitionDuration: globalTokens.durationFast,
    ':hover': {
      backgroundColor: semanticTokens.bgSurfaceHover,
    },
    ':focus': {
      backgroundColor: semanticTokens.brandPrimarySubtle,
      color: semanticTokens.brandText,
    },
  },
  itemDisabled: {
    opacity: 0.45,
    pointerEvents: 'none',
  },
  indicatorWrapper: {
    position: 'absolute',
    left: globalTokens.space2,
    display: ' inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1rem',
    height: '1rem',
    color: semanticTokens.brandText,
  },
  separator: {
    height: '1px',
    marginTop: globalTokens.space1,
    marginBottom: globalTokens.space1,
    backgroundColor: semanticTokens.borderDefault,
  },
});

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  error?: boolean;
  sx?: StyleXStyles;
}

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(
  (
    { error = false, sx: customSx, className, style, children, ...props },
    ref,
  ) => {
    const styleProps = mergeStylexProps(
      { className, style, sx: customSx },
      styles.trigger,
      error && styles.triggerError,
    );

    return (
      <SelectPrimitive.Trigger ref={ref} {...styleProps} {...props}>
        {children}
        <SelectPrimitive.Icon asChild>
          <ChevronDown
            size={16}
            aria-hidden="true"
            {...stylex.props(styles.chevronIcon)}
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    );
  },
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    sx?: StyleXStyles;
  }
>(
  (
    { sx: customSx, className, style, children, position = 'popper', ...props },
    ref,
  ) => {
    const styleProps = mergeStylexProps(
      { className, style, sx: customSx },
      styles.content,
    );

    return (
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          ref={ref}
          position={position}
          sideOffset={4}
          {...styleProps}
          {...props}
        >
          <SelectPrimitive.ScrollUpButton {...stylex.props(styles.scrollBtn)}>
            <ChevronUp size={14} />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport {...stylex.props(styles.viewport)}>
            {children}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton {...stylex.props(styles.scrollBtn)}>
            <ChevronDown size={14} />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    );
  },
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

export const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, style, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    {...mergeStylexProps({ className, style }, styles.label)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, style, children, disabled, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    disabled={disabled}
    {...mergeStylexProps(
      { className, style },
      styles.item,
      disabled && styles.itemDisabled,
    )}
    {...props}
  >
    <span {...stylex.props(styles.indicatorWrapper)}>
      <SelectPrimitive.ItemIndicator>
        <Check size={14} />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

export const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, style, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    {...mergeStylexProps({ className, style }, styles.separator)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface SimpleSelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  id?: string;
  name?: string;
  'aria-label'?: string;
}

export function SimpleSelect({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select an option...',
  disabled = false,
  error = false,
  id,
  name,
  'aria-label': ariaLabel,
}: SimpleSelectProps) {
  return (
    <Select
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      name={name}
    >
      <SelectTrigger id={id} error={error} aria-label={ariaLabel}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
