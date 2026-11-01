'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import { X, AlertCircle } from 'lucide-react';
import { globalTokens } from '../tokens/global.stylex';
import { semanticTokens } from '../tokens/semantic.stylex';
import { componentTokens } from '../tokens/component.stylex';
import { mergeStylexProps } from '../lib/stylex-utils';

const styles = stylex.create({
  inputContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: componentTokens.inputRadius,
    backgroundColor: componentTokens.inputBg,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: componentTokens.inputBorder,
    color: semanticTokens.textPrimary,
    transitionProperty: 'border-color, box-shadow, background-color',
    transitionDuration: globalTokens.durationFast,
    transitionTimingFunction: globalTokens.easeStandard,
    ':focus-within': {
      borderColor: componentTokens.inputFocusBorder,
      boxShadow: `0 0 0 3px ${componentTokens.inputFocusRing}`,
    },
  },
  containerSm: {
    minHeight: componentTokens.inputHeightSm,
    paddingLeft: globalTokens.space2,
    paddingRight: globalTokens.space2,
  },
  containerMd: {
    minHeight: componentTokens.inputHeightMd,
    paddingLeft: globalTokens.space3,
    paddingRight: globalTokens.space3,
  },
  containerLg: {
    minHeight: componentTokens.inputHeightLg,
    paddingLeft: globalTokens.space4,
    paddingRight: globalTokens.space4,
  },
  containerError: {
    borderColor: componentTokens.inputErrorBorder,
    ':focus-within': {
      borderColor: componentTokens.inputErrorBorder,
      boxShadow: `0 0 0 3px ${componentTokens.inputErrorRing}`,
    },
  },
  containerDisabled: {
    backgroundColor: componentTokens.inputDisabledBg,
    opacity: 0.65,
    cursor: 'not-allowed',
  },
  nativeInput: {
    flex: 1,
    width: '100%',
    minWidth: 0,
    borderWidth: 0,
    outline: 'none',
    backgroundColor: 'transparent',
    color: semanticTokens.textPrimary,
    fontFamily: globalTokens.fontSans,
    fontSize: globalTokens.fontSizeSm,
    lineHeight: globalTokens.lineHeightNormal,
    caretColor: semanticTokens.brandPrimary,
    '::placeholder': {
      color: semanticTokens.textMuted,
    },
    ':disabled': {
      cursor: 'not-allowed',
      color: semanticTokens.textDisabled,
    },
  },
  nativeInputLg: {
    fontSize: globalTokens.fontSizeMd,
  },
  slotIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: semanticTokens.textMuted,
    flexShrink: 0,
  },
  prefixSlot: {
    marginRight: globalTokens.space2,
  },
  suffixSlot: {
    marginLeft: globalTokens.space2,
    display: 'inline-flex',
    alignItems: 'center',
    gap: globalTokens.space1,
  },
  clearButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.25rem',
    height: '1.25rem',
    borderRadius: globalTokens.radiusFull,
    borderWidth: 0,
    padding: 0,
    backgroundColor: 'transparent',
    color: semanticTokens.textMuted,
    cursor: 'pointer',
    transitionProperty: 'background-color, color',
    transitionDuration: globalTokens.durationFast,
    ':hover': {
      backgroundColor: semanticTokens.bgSurfaceMuted,
      color: semanticTokens.textPrimary,
    },
    ':focus-visible': {
      outline: `2px solid ${semanticTokens.borderFocus}`,
    },
  },

  // Textarea styles
  textareaContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderRadius: componentTokens.inputRadius,
    backgroundColor: componentTokens.inputBg,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: componentTokens.inputBorder,
    transitionProperty: 'border-color, box-shadow, background-color',
    transitionDuration: globalTokens.durationFast,
    ':focus-within': {
      borderColor: componentTokens.inputFocusBorder,
      boxShadow: `0 0 0 3px ${componentTokens.inputFocusRing}`,
    },
  },
  textareaTopRow: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    paddingTop: globalTokens.space2,
    paddingBottom: globalTokens.space2,
    paddingLeft: globalTokens.space3,
    paddingRight: globalTokens.space3,
    gap: globalTokens.space2,
  },
  nativeTextarea: {
    flex: 1,
    width: '100%',
    minHeight: '5rem',
    borderWidth: 0,
    outline: 'none',
    resize: 'vertical',
    backgroundColor: 'transparent',
    color: semanticTokens.textPrimary,
    fontFamily: globalTokens.fontSans,
    fontSize: globalTokens.fontSizeSm,
    lineHeight: globalTokens.lineHeightNormal,
    caretColor: semanticTokens.brandPrimary,
    '::placeholder': {
      color: semanticTokens.textMuted,
    },
    ':disabled': {
      cursor: 'not-allowed',
      color: semanticTokens.textDisabled,
    },
  },
  textareaFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: globalTokens.space3,
    paddingRight: globalTokens.space3,
    paddingBottom: globalTokens.space2,
    fontSize: globalTokens.fontSizeXs,
    color: semanticTokens.textMuted,
  },

  // FormField styles
  fieldRoot: {
    display: 'flex',
    flexDirection: 'column',
    gap: globalTokens.space1,
    width: '100%',
  },
  labelRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: globalTokens.space2,
  },
  label: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: globalTokens.space1,
    fontSize: globalTokens.fontSizeSm,
    fontWeight: globalTokens.fontWeightMedium,
    color: semanticTokens.textPrimary,
    cursor: 'pointer',
  },
  requiredStar: {
    color: semanticTokens.statusError,
    fontWeight: globalTokens.fontWeightBold,
  },
  descriptionText: {
    margin: 0,
    fontSize: globalTokens.fontSizeXs,
    color: semanticTokens.textMuted,
    lineHeight: globalTokens.lineHeightNormal,
  },
  errorRow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: globalTokens.space1,
    margin: 0,
    fontSize: globalTokens.fontSizeXs,
    fontWeight: globalTokens.fontWeightMedium,
    color: semanticTokens.statusErrorText,
    lineHeight: globalTokens.lineHeightNormal,
  },
});

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /** Input height scale */
  size?: 'sm' | 'md' | 'lg';
  /** Leading icon or prefix element */
  prefixIcon?: React.ReactNode;
  /** Trailing icon or suffix element */
  suffixIcon?: React.ReactNode;
  /** Show clear button when input has value */
  clearable?: boolean;
  /** Callback invoked when clear button is clicked */
  onClear?: () => void;
  /** Error state styling */
  error?: boolean;
  /** StyleX overrides for outer container */
  containerSx?: StyleXStyles;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      prefixIcon,
      suffixIcon,
      clearable = false,
      onClear,
      error = false,
      disabled = false,
      value,
      defaultValue,
      onChange,
      containerSx,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const internalRef = React.useRef<HTMLInputElement | null>(null);
    const [uncontrolledHasValue, setUncontrolledHasValue] = React.useState(
      () => Boolean(defaultValue !== undefined && String(defaultValue).length > 0),
    );

    const setRefs = React.useCallback(
      (node: HTMLInputElement | null) => {
        internalRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    const isControlled = value !== undefined;
    const hasValue = isControlled
      ? String(value ?? '').length > 0
      : uncontrolledHasValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledHasValue(e.target.value.length > 0);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (disabled || props.readOnly) return;
      if (onClear) {
        onClear();
      } else if (internalRef.current) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value',
        )?.set;
        nativeInputValueSetter?.call(internalRef.current, '');
        const event = new Event('input', { bubbles: true });
        internalRef.current.dispatchEvent(event);
        setUncontrolledHasValue(false);
      }
      internalRef.current?.focus();
    };

    const sizeStyle =
      size === 'sm'
        ? styles.containerSm
        : size === 'lg'
          ? styles.containerLg
          : styles.containerMd;

    const containerProps = mergeStylexProps(
      { className, style, sx: containerSx },
      styles.inputContainer,
      sizeStyle,
      error && styles.containerError,
      disabled && styles.containerDisabled,
    );

    return (
      <div {...containerProps}>
        {prefixIcon ? (
          <span {...stylex.props(styles.slotIcon, styles.prefixSlot)}>
            {prefixIcon}
          </span>
        ) : null}
        <input
          ref={setRefs}
          disabled={disabled}
          aria-invalid={error || undefined}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          {...stylex.props(
            styles.nativeInput,
            size === 'lg' && styles.nativeInputLg,
          )}
          {...props}
        />
        {clearable && hasValue && !disabled && !props.readOnly ? (
          <span {...stylex.props(styles.suffixSlot)}>
            <button
              type="button"
              aria-label="Clear input"
              onClick={handleClear}
              {...stylex.props(styles.clearButton)}
            >
              <X size={13} aria-hidden="true" />
            </button>
            {suffixIcon ? (
              <span {...stylex.props(styles.slotIcon)}>{suffixIcon}</span>
            ) : null}
          </span>
        ) : suffixIcon ? (
          <span {...stylex.props(styles.slotIcon, styles.suffixSlot)}>
            {suffixIcon}
          </span>
        ) : null}
      </div>
    );
  },
);
Input.displayName = 'Input';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Leading icon or prefix element */
  prefixIcon?: React.ReactNode;
  /** Trailing icon or suffix element */
  suffixIcon?: React.ReactNode;
  /** Show clear button when textarea has content */
  clearable?: boolean;
  /** Callback invoked when clear button is clicked */
  onClear?: () => void;
  /** Error state styling */
  error?: boolean;
  /** Show character count in footer */
  showCount?: boolean;
  /** Custom StyleX overrides */
  containerSx?: StyleXStyles;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      prefixIcon,
      suffixIcon,
      clearable = false,
      onClear,
      error = false,
      disabled = false,
      showCount = false,
      maxLength,
      value,
      defaultValue,
      onChange,
      containerSx,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const internalRef = React.useRef<HTMLTextAreaElement | null>(null);
    const [charLength, setCharLength] = React.useState(() =>
      String(value ?? defaultValue ?? '').length,
    );

    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    const isControlled = value !== undefined;
    const currentLen = isControlled
      ? String(value ?? '').length
      : charLength;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setCharLength(e.target.value.length);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (disabled || props.readOnly) return;
      if (onClear) {
        onClear();
      } else if (internalRef.current) {
        internalRef.current.value = '';
        setCharLength(0);
      }
      internalRef.current?.focus();
    };

    const containerProps = mergeStylexProps(
      { className, style, sx: containerSx },
      styles.textareaContainer,
      error && styles.containerError,
      disabled && styles.containerDisabled,
    );

    return (
      <div {...containerProps}>
        <div {...stylex.props(styles.textareaTopRow)}>
          {prefixIcon ? (
            <span {...stylex.props(styles.slotIcon)}>{prefixIcon}</span>
          ) : null}
          <textarea
            ref={setRefs}
            disabled={disabled}
            maxLength={maxLength}
            aria-invalid={error || undefined}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            {...stylex.props(styles.nativeTextarea)}
            {...props}
          />
          {clearable && currentLen > 0 && !disabled && !props.readOnly ? (
            <button
              type="button"
              aria-label="Clear textarea"
              onClick={handleClear}
              {...stylex.props(styles.clearButton)}
            >
              <X size={13} aria-hidden="true" />
            </button>
          ) : null}
          {suffixIcon ? (
            <span {...stylex.props(styles.slotIcon)}>{suffixIcon}</span>
          ) : null}
        </div>
        {showCount || maxLength ? (
          <div {...stylex.props(styles.textareaFooter)}>
            <span>
              {currentLen}
              {maxLength ? ` / ${maxLength}` : ' chars'}
            </span>
          </div>
        ) : null}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Label text or node */
  label?: React.ReactNode;
  /** Associated form control id */
  htmlFor?: string;
  /** Marks field as required */
  required?: boolean;
  /** Helper description below label or input */
  description?: React.ReactNode;
  /** Validation error message */
  error?: React.ReactNode;
  /** Optional element on the right side of the label row */
  labelAction?: React.ReactNode;
  sx?: StyleXStyles;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      htmlFor,
      required = false,
      description,
      error,
      labelAction,
      sx: customSx,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const styleProps = mergeStylexProps(
      { className, style, sx: customSx },
      styles.fieldRoot,
    );

    return (
      <div ref={ref} {...styleProps} {...props}>
        {label || labelAction ? (
          <div {...stylex.props(styles.labelRow)}>
            {label ? (
              <label htmlFor={htmlFor} {...stylex.props(styles.label)}>
                <span>{label}</span>
                {required ? (
                  <span
                    aria-hidden="true"
                    {...stylex.props(styles.requiredStar)}
                  >
                    *
                  </span>
                ) : null}
              </label>
            ) : <span />}
            {labelAction}
          </div>
        ) : null}

        {description ? (
          <p {...stylex.props(styles.descriptionText)}>{description}</p>
        ) : null}

        {children}

        {error ? (
          <p role="alert" {...stylex.props(styles.errorRow)}>
            <AlertCircle size={14} aria-hidden="true" />
            <span>{error}</span>
          </p>
        ) : null}
      </div>
    );
  },
);
FormField.displayName = 'FormField';
