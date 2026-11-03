import type * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';

type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Record<string, unknown>
  | ClassValue[];

/**
 * Standard className join helper (zero-dependency, clsx-compatible).
 *
 * StyleX already resolves conflicting style props in `stylex.props`, so this
 * only flattens and joins external class names — it does not merge utilities
 * the way `twMerge` does for Tailwind.
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) classes.push(nested);
    } else if (typeof input === 'string' || typeof input === 'number') {
      classes.push(String(input));
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.join(' ');
}

/**
 * Merges StyleX compiled style objects with optional external `className` and `inlineStyle`.
 * Essential for Radix UI `Slot` (`asChild`) and third-party wrapper compatibility.
 */
export function mergeStylexProps(
  external: {
    className?: string;
    style?: React.CSSProperties;
    sx?: StyleXStyles;
  },
  ...styles: StyleXStyles[]
): {
  className?: string;
  style?: React.CSSProperties;
} {
  const resolved = stylex.props(...styles, external.sx);
  const combinedClassName = cn(resolved.className, external.className);
  const combinedStyle =
    resolved.style || external.style
      ? ({
          ...(resolved.style ?? {}),
          ...(external.style ?? {}),
        } as React.CSSProperties)
      : undefined;

  return {
    ...(combinedClassName ? { className: combinedClassName } : {}),
    ...(combinedStyle ? { style: combinedStyle } : {}),
  };
}

/**
 * Shorthand helper wrapping `stylex.props(...)`
 */
export function sx(...styles: StyleXStyles[]) {
  return stylex.props(...styles);
}

type VariantRecord = Record<string, Record<string, StyleXStyles>>;

type VariantSelection<V extends VariantRecord> = {
  [K in keyof V]?: keyof V[K] | null | undefined;
};

type CompoundVariant<V extends VariantRecord> = VariantSelection<V> & {
  style: StyleXStyles;
};

export interface StylexVariantsConfig<V extends VariantRecord> {
  base?: StyleXStyles;
  variants: V;
  defaultVariants?: VariantSelection<V>;
  compoundVariants?: CompoundVariant<V>[];
}

/**
 * CVA-equivalent Variant Engine for Pure StyleX (`stylexVariants`).
 * Separates component variant & size logic from JSX rendering.
 */
export function stylexVariants<V extends VariantRecord>(
  config: StylexVariantsConfig<V>,
) {
  return function resolveVariants(
    props?: VariantSelection<V> & { sx?: StyleXStyles },
  ): StyleXStyles[] {
    const result: StyleXStyles[] = [];

    if (config.base) {
      result.push(config.base);
    }

    const activeVariants: Record<string, string | undefined> = {};
    const variantKeys = Object.keys(config.variants) as (keyof V & string)[];

    for (const key of variantKeys) {
      const propValue = props?.[key] ?? config.defaultVariants?.[key];
      if (propValue !== undefined && propValue !== null) {
        const strValue = String(propValue);
        activeVariants[key] = strValue;
        const variantGroup = config.variants[key];
        const matchedStyle = variantGroup?.[strValue];
        if (matchedStyle) {
          result.push(matchedStyle);
        }
      }
    }

    if (config.compoundVariants) {
      for (const compound of config.compoundVariants) {
        const { style: compoundStyle, ...conditions } = compound;
        const matchesAll = Object.entries(conditions).every(
          ([condKey, condVal]) =>
            condVal === undefined ||
            activeVariants[condKey] === String(condVal),
        );
        if (matchesAll) {
          result.push(compoundStyle);
        }
      }
    }

    if (props?.sx) {
      result.push(props.sx);
    }

    return result;
  };
}

/**
 * Infers the variant props type from a `stylexVariants` definition (like `VariantProps` in CVA).
 */
export type StylexVariantProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends (props?: any) => StyleXStyles[],
> = Omit<NonNullable<Parameters<T>[0]>, 'sx'>;
