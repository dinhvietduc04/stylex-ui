'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { Check, Minus } from 'lucide-react';
import { globalTokens } from '../tokens/global.stylex';
import { semanticTokens } from '../tokens/semantic.stylex';
import { componentTokens } from '../tokens/component.stylex';
import { mergeStylexProps } from '../lib/stylex-utils';

const styles = stylex.create({
  controlWrapper: {
    display: 'inline-flex',
    alignItems: 'flex-start',
    gap: globalTokens.space2,
  },
  controlDisabled: {
    opacity: 0.55,
    cursor: 'not-allowed',
  },
  labelStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.125rem',
  },
  labelText: {
    fontSize: globalTokens.fontSizeSm,
    fontWeight: globalTokens.fontWeightMedium,
    color: semanticTokens.textPrimary,
    lineHeight: globalTokens.lineHeightTight,
    cursor: 'pointer',
    userSelect: 'none',
  },
  descriptionText: {
    fontSize: globalTokens.fontSizeXs,
    color: semanticTokens.textMuted,
    lineHeight: globalTokens.lineHeightNormal,
  },

  // Checkbox
  checkboxRoot: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: componentTokens.controlSizeMd,
    height: componentTokens.controlSizeMd,
    flexShrink: 0,
    marginTop: '0.1rem',
    borderRadius: componentTokens.controlRadius,
    backgroundColor: componentTokens.controlBg,
    borderWidth: '1.5px',
    borderStyle: 'solid',
    borderColor: componentTokens.controlBorder,
    color: componentTokens.controlCheckedText,
    cursor: 'pointer',
    outline: 'none',
    padding: 0,
    transitionProperty: 'background-color, border-color, box-shadow, transform',
    transitionDuration: globalTokens.durationFast,
    transitionTimingFunction: globalTokens.easeSpring,
    ':hover': {
      borderColor: semanticTokens.brandPrimary,
    },
    ':focus-visible': {
      boxShadow: `0 0 0 3px ${semanticTokens.ringColor}`,
      borderColor: semanticTokens.borderFocus,
    },
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.55,
    },
  },
  checkboxChecked: {
    backgroundColor: componentTokens.controlCheckedBg,
    borderColor: componentTokens.controlCheckedBg,
  },
  checkboxIndicator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'currentColor',
  },

  // RadioGroup
  radioGroupVertical: {
    display: 'flex',
    flexDirection: 'column',
    gap: globalTokens.space3,
  },
  radioGroupHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: globalTokens.space4,
  },
  radioItemCard: {
    paddingTop: globalTokens.space3,
    paddingBottom: globalTokens.space3,
    paddingLeft: globalTokens.space3,
    paddingRight: globalTokens.space4,
    borderRadius: globalTokens.radiusMd,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: semanticTokens.borderDefault,
    backgroundColor: semanticTokens.bgSurface,
    transitionProperty: 'border-color, background-color, box-shadow',
    transitionDuration: globalTokens.durationFast,
    ':hover': {
      borderColor: semanticTokens.brandPrimaryBorder,
      backgroundColor: semanticTokens.bgSurfaceHover,
    },
  },
  radioRoot: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: componentTokens.controlSizeMd,
    height: componentTokens.controlSizeMd,
    flexShrink: 0,
    marginTop: '0.1rem',
    borderRadius: globalTokens.radiusFull,
    backgroundColor: componentTokens.controlBg,
    borderWidth: '1.5px',
    borderStyle: 'solid',
    borderColor: componentTokens.controlBorder,
    color: componentTokens.controlCheckedBg,
    cursor: 'pointer',
    outline: 'none',
    padding: 0,
    transitionProperty: 'border-color, box-shadow, background-color',
    transitionDuration: globalTokens.durationFast,
    ':hover': {
      borderColor: semanticTokens.brandPrimary,
    },
    ':focus-visible': {
      boxShadow: `0 0 0 3px ${semanticTokens.ringColor}`,
      borderColor: semanticTokens.borderFocus,
    },
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.55,
    },
  },
  radioIndicator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  radioDot: {
    width: '0.55rem',
    height: '0.55rem',
    borderRadius: globalTokens.radiusFull,
    backgroundColor: semanticTokens.brandText,
  },

  // Switch / Toggle
  switchRoot: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: globalTokens.radiusFull,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    backgroundColor: semanticTokens.borderStrong,
    cursor: 'pointer',
    outline: 'none',
    padding: 0,
    transitionProperty: 'background-color, box-shadow',
    transitionDuration: globalTokens.durationNormal,
    transitionTimingFunction: globalTokens.easeSpring,
    ':focus-visible': {
      boxShadow: `0 0 0 3px ${semanticTokens.ringColor}`,
    },
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.55,
    },
  },
  switchSm: {
    width: '2.125rem',
    height: '1.25rem',
  },
  switchMd: {
    width: '2.625rem',
    height: '1.5rem',
  },
  switchLg: {
    width: '3.125rem',
    height: '1.75rem',
  },
  switchChecked: {
    backgroundColor: semanticTokens.brandPrimary,
  },
  switchThumb: {
    display: 'block',
    borderRadius: globalTokens.radiusFull,
    backgroundColor: globalTokens.white,
    boxShadow: globalTokens.shadowSm,
    pointerEvents: 'none',
    transitionProperty: 'transform',
    transitionDuration: globalTokens.durationNormal,
    transitionTimingFunction: globalTokens.easeSpring,
    transform: 'translateX(0px)',
  },
  thumbSm: {
    width: '0.95rem',
    height: '0.95rem',
  },
  thumbSmChecked: {
    transform: 'translateX(0.875rem)',
  },
  thumbMd: {
    width: '1.2rem',
    height: '1.2rem',
  },
  thumbMdChecked: {
    transform: 'translateX(1.125rem)',
  },
  thumbLg: {
    width: '1.45rem',
    height: '1.45rem',
  },
  thumbLgChecked: {
    transform: 'translateX(1.375rem)',
  },
});

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  sx?: StyleXStyles;
}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      id,
      label,
      description,
      checked,
      defaultChecked,
      onCheckedChange,
      disabled,
      sx: customSx,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const controlId = id ?? generatedId;
    const [internalChecked, setInternalChecked] =
      React.useState<CheckboxPrimitive.CheckedState>(defaultChecked ?? false);

    const isControlled = checked !== undefined;
    const currentChecked = isControlled ? checked : internalChecked;
    const isActive =
      currentChecked === true || currentChecked === 'indeterminate';

    const handleCheckedChange = (next: CheckboxPrimitive.CheckedState) => {
      if (!isControlled) {
        setInternalChecked(next);
      }
      onCheckedChange?.(next);
    };

    const checkboxNode = (
      <CheckboxPrimitive.Root
        ref={ref}
        id={controlId}
        checked={currentChecked}
        onCheckedChange={handleCheckedChange}
        disabled={disabled}
        {...mergeStylexProps(
          { className, style, sx: customSx },
          styles.checkboxRoot,
          isActive && styles.checkboxChecked,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator {...stylex.props(styles.checkboxIndicator)}>
          {currentChecked === 'indeterminate' ? (
            <Minus size={12} strokeWidth={3} />
          ) : (
            <Check size={12} strokeWidth={3} />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );

    if (!label && !description) {
      return checkboxNode;
    }

    return (
      <div
        {...stylex.props(
          styles.controlWrapper,
          disabled && styles.controlDisabled,
        )}
      >
        {checkboxNode}
        <div {...stylex.props(styles.labelStack)}>
          {label ? (
            <label htmlFor={controlId} {...stylex.props(styles.labelText)}>
              {label}
            </label>
          ) : null}
          {description ? (
            <span {...stylex.props(styles.descriptionText)}>{description}</span>
          ) : null}
        </div>
      </div>
    );
  },
);
Checkbox.displayName = 'Checkbox';

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  orientation?: 'vertical' | 'horizontal';
  sx?: StyleXStyles;
}

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(
  (
    {
      orientation = 'vertical',
      sx: customSx,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const styleProps = mergeStylexProps(
      { className, style, sx: customSx },
      orientation === 'horizontal'
        ? styles.radioGroupHorizontal
        : styles.radioGroupVertical,
    );

    return (
      <RadioGroupPrimitive.Root
        ref={ref}
        orientation={orientation}
        {...styleProps}
        {...props}
      />
    );
  },
);
RadioGroup.displayName = 'RadioGroup';

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  card?: boolean;
  sx?: StyleXStyles;
}

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(
  (
    {
      id,
      label,
      description,
      card = false,
      disabled,
      sx: customSx,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const controlId = id ?? generatedId;

    const radioNode = (
      <RadioGroupPrimitive.Item
        ref={ref}
        id={controlId}
        disabled={disabled}
        {...mergeStylexProps(
          { className, style, sx: customSx },
          styles.radioRoot,
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator {...stylex.props(styles.radioIndicator)}>
          <span {...stylex.props(styles.radioDot)} />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
    );

    if (!label && !description) {
      return radioNode;
    }

    return (
      <div
        {...stylex.props(
          styles.controlWrapper,
          card && styles.radioItemCard,
          disabled && styles.controlDisabled,
        )}
      >
        {radioNode}
        <div {...stylex.props(styles.labelStack)}>
          {label ? (
            <label htmlFor={controlId} {...stylex.props(styles.labelText)}>
              {label}
            </label>
          ) : null}
          {description ? (
            <span {...stylex.props(styles.descriptionText)}>{description}</span>
          ) : null}
        </div>
      </div>
    );
  },
);
RadioGroupItem.displayName = 'RadioGroupItem';

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  size?: 'sm' | 'md' | 'lg';
  label?: React.ReactNode;
  description?: React.ReactNode;
  sx?: StyleXStyles;
}

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(
  (
    {
      id,
      size = 'md',
      label,
      description,
      checked,
      defaultChecked,
      onCheckedChange,
      disabled,
      sx: customSx,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const controlId = id ?? generatedId;
    const [internalChecked, setInternalChecked] = React.useState(
      defaultChecked ?? false,
    );

    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    const handleCheckedChange = (next: boolean) => {
      if (!isControlled) {
        setInternalChecked(next);
      }
      onCheckedChange?.(next);
    };

    const rootSizeStyle =
      size === 'sm'
        ? styles.switchSm
        : size === 'lg'
          ? styles.switchLg
          : styles.switchMd;

    const thumbSizeStyle =
      size === 'sm'
        ? styles.thumbSm
        : size === 'lg'
          ? styles.thumbLg
          : styles.thumbMd;

    const thumbCheckedStyle =
      size === 'sm'
        ? styles.thumbSmChecked
        : size === 'lg'
          ? styles.thumbLgChecked
          : styles.thumbMdChecked;

    const switchNode = (
      <SwitchPrimitive.Root
        ref={ref}
        id={controlId}
        checked={isChecked}
        onCheckedChange={handleCheckedChange}
        disabled={disabled}
        {...mergeStylexProps(
          { className, style, sx: customSx },
          styles.switchRoot,
          rootSizeStyle,
          isChecked && styles.switchChecked,
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          {...stylex.props(
            styles.switchThumb,
            thumbSizeStyle,
            isChecked && thumbCheckedStyle,
          )}
        />
      </SwitchPrimitive.Root>
    );

    if (!label && !description) {
      return switchNode;
    }

    return (
      <div
        {...stylex.props(
          styles.controlWrapper,
          disabled && styles.controlDisabled,
        )}
      >
        {switchNode}
        <div {...stylex.props(styles.labelStack)}>
          {label ? (
            <label htmlFor={controlId} {...stylex.props(styles.labelText)}>
              {label}
            </label>
          ) : null}
          {description ? (
            <span {...stylex.props(styles.descriptionText)}>{description}</span>
          ) : null}
        </div>
      </div>
    );
  },
);
Switch.displayName = 'Switch';
