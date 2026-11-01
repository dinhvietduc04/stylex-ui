/**
 * CSS Variables Engine - OKLCH / HSL Alpha Transparency Utilities
 * Enables dynamic alpha transparency on any CSS variable or OKLCH/HSL token using `color-mix(in oklch, ...)`.
 */

/**
 * Mixes any CSS color or StyleX token variable with transparent in OKLCH perceptual color space.
 * @param colorToken CSS color or `var(--...)` token reference
 * @param alpha Opacity between 0 and 1 (e.g. 0.15 for 15% opacity)
 */
export function withAlpha(colorToken: string, alpha: number): string {
  const clamped = Math.max(0, Math.min(1, alpha));
  const percentage = Math.round(clamped * 1000) / 10;
  return `color-mix(in oklch, ${colorToken} ${percentage}%, transparent)`;
}

/**
 * Formats raw OKLCH channel values (`L C H`) with optional alpha transparency.
 */
export function oklchChannel(
  l: number,
  c: number,
  h: number,
  alpha?: number,
): string {
  if (alpha !== undefined) {
    return `oklch(${l} ${c} ${h} / ${alpha})`;
  }
  return `oklch(${l} ${c} ${h})`;
}

/**
 * Formats raw HSL channel values (`H S% L%`) with optional alpha transparency.
 */
export function hslChannel(
  h: number,
  s: number,
  l: number,
  alpha?: number,
): string {
  if (alpha !== undefined) {
    return `hsl(${h} ${s}% ${l}% / ${alpha})`;
  }
  return `hsl(${h} ${s}% ${l}%)`;
}

export interface TokenDescriptor {
  name: string;
  tier: 'global' | 'semantic' | 'component';
  category: string;
  valuePreview: string;
  description: string;
}

export const TOKEN_ARCHITECTURE_CATALOG: TokenDescriptor[] = [
  // Tier 1: Global
  {
    name: 'globalTokens.blue600',
    tier: 'global',
    category: 'Color Primitive (OKLCH)',
    valuePreview: 'oklch(0.546 0.245 262.88)',
    description: 'Ocean Blue primary 600 primitive in perceptual OKLCH space',
  },
  {
    name: 'globalTokens.emerald600',
    tier: 'global',
    category: 'Color Primitive (OKLCH)',
    valuePreview: 'oklch(0.596 0.145 163.23)',
    description: 'Emerald primary 600 primitive in perceptual OKLCH space',
  },
  {
    name: 'globalTokens.slate900',
    tier: 'global',
    category: 'Color Primitive (OKLCH)',
    valuePreview: 'oklch(0.208 0.042 265.75)',
    description: 'Deep neutral slate primitive for dark surfaces & typography',
  },
  {
    name: 'globalTokens.space4',
    tier: 'global',
    category: 'Spacing Scale',
    valuePreview: '1rem (16px)',
    description: 'Base spacing unit (4x 4px grid)',
  },
  {
    name: 'globalTokens.radiusMd',
    tier: 'global',
    category: 'Radius Scale',
    valuePreview: '0.5rem (8px)',
    description: 'Standard medium border radius',
  },
  // Tier 2: Semantic
  {
    name: 'semanticTokens.bgCanvas',
    tier: 'semantic',
    category: 'Surface',
    valuePreview: 'Theme-adaptive canvas background',
    description: 'Page-level background adapting to Light/Dark & Brand theme',
  },
  {
    name: 'semanticTokens.bgSurface',
    tier: 'semantic',
    category: 'Surface',
    valuePreview: 'Theme-adaptive card/container surface',
    description: 'Elevated surface for cards, panels, inputs, and dialogs',
  },
  {
    name: 'semanticTokens.brandPrimary',
    tier: 'semantic',
    category: 'Brand',
    valuePreview: 'Ocean Blue / Emerald Brand Primary',
    description: 'Active brand accent switched dynamically by Brand Preset',
  },
  {
    name: 'semanticTokens.brandPrimarySubtle',
    tier: 'semantic',
    category: 'Brand (Alpha)',
    valuePreview: 'color-mix(in oklch, brandPrimary 12%, transparent)',
    description: 'Alpha-transparent tint of primary brand token',
  },
  {
    name: 'semanticTokens.statusSuccess',
    tier: 'semantic',
    category: 'Feedback Status',
    valuePreview: 'oklch(0.596 0.145 163.23)',
    description: 'Semantic positive/success indicator color',
  },
  {
    name: 'semanticTokens.statusWarning',
    tier: 'semantic',
    category: 'Feedback Status',
    valuePreview: 'oklch(0.666 0.179 58.31)',
    description: 'Semantic caution/warning indicator color',
  },
  {
    name: 'semanticTokens.statusError',
    tier: 'semantic',
    category: 'Feedback Status',
    valuePreview: 'oklch(0.586 0.253 17.58)',
    description: 'Semantic danger/destructive/error indicator color',
  },
  {
    name: 'semanticTokens.statusInfo',
    tier: 'semantic',
    category: 'Feedback Status',
    valuePreview: 'oklch(0.588 0.158 241.96)',
    description: 'Semantic informational indicator color',
  },
  // Tier 3: Component
  {
    name: 'componentTokens.buttonPrimaryBg',
    tier: 'component',
    category: 'Button',
    valuePreview: '-> semanticTokens.brandPrimary',
    description: 'Primary button background mapped from semantic brand token',
  },
  {
    name: 'componentTokens.inputFocusRing',
    tier: 'component',
    category: 'Form Input',
    valuePreview: '-> semanticTokens.ringColor',
    description: 'Focus ring with OKLCH alpha transparency on form controls',
  },
  {
    name: 'componentTokens.modalRadius',
    tier: 'component',
    category: 'Modal / Overlay',
    valuePreview: '-> globalTokens.radiusXl (1rem)',
    description: 'Dialog & overlay container border radius',
  },
  {
    name: 'componentTokens.drawerWidthMd',
    tier: 'component',
    category: 'Drawer',
    valuePreview: '28rem (448px)',
    description: 'Standard slide-over drawer panel width',
  },
];
