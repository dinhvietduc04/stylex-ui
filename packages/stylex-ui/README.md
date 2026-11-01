# `@repo/stylex-ui` — Internal StyleX UI Framework

Zero-runtime, type-safe internal design system and component library built on **`@stylexjs/stylex`**, **Radix UI Primitives**, **Lucide React**, **Sonner**, and **React Hook Form**.

## Architecture Overview (Tasks 1.1 – 3.4)

| Task | Module | Description |
| :--- | :--- | :--- |
| **1.1** | `src/tokens/` | **3-Tier Token System** (`globalTokens`, `semanticTokens`, `componentTokens`) via `stylex.defineVars` + OKLCH/HSL alpha transparency utilities (`withAlpha`, `oklchChannel`, `hslChannel`). |
| **1.2** | `src/themes/` | **Multi-Theme & Brand Preset Engine** (`StylexThemeProvider`, `useStylexTheme`, `ThemeSwitcher`) integrating `next-themes` (Light/Dark) with 2 brand presets: **Ember** (warm amber) and **Emerald** (deep green) via `stylex.createTheme`. |
| **1.3** | `src/lib/` | **StyleX Variant Engine & Utilities** (`stylexVariants`, `mergeStylexProps`, `sx`, `cn`) separating component variants/sizes from JSX logic. |
| **1.4** | `src/components/typography.tsx`, `icon.tsx` | **Typography & Iconography System** (`Typography`, `Heading`, `Text`, `Caption`, `Code`, and accessible Lucide `<Icon>` wrapper). |
| **2.1** | `src/components/button.tsx` | **Button & IconButton** with variants, sizes, loading spinner, Radix `Slot` (`asChild`), and mandatory `aria-label` on `IconButton`. |
| **2.2** | `src/components/input.tsx` | **Input, Textarea & FormField** with prefix/suffix icons, clear button, character counter, and error/disabled states. |
| **2.3** | `src/components/select.tsx`, `combobox.tsx` | **Select & Searchable Combobox** on Radix UI with client-side search filtering and keyboard navigation. |
| **2.4** | `src/components/selection-controls.tsx` | **Checkbox, RadioGroup & Switch** with smooth spring transitions, indeterminate state, and `react-hook-form` compatibility. |
| **3.1** | `src/components/badge.tsx` | **Badge, Tag & StatusDot** with `success`, `warning`, `error`, `info`, `neutral`, `primary` variants and pulsing status indicators. |
| **3.2** | `src/components/overlay.tsx` | **Modal (Dialog) & Slide-Over Drawer** with backdrop blur, focus trap, and Escape key dismissal. |
| **3.3** | `src/components/feedback.tsx` | **ConfirmDialog + `useConfirm()` Hook & Semantic `Toaster` / `toast` Wrapper** powered by Sonner. |
| **3.4** | `src/components/skeleton.tsx`, `showcase.tsx` | **Skeleton Loader** (`Skeleton`, `SkeletonCard`) and interactive `/design-system` Showcase Page. |

## Usage

1. Import the compiled stylesheet in your application root layout or `globals.css`.
   If the app also uses Tailwind, load Tailwind first so preflight runs before the
   component styles:
   ```css
   @import 'tailwindcss';
   @import '@repo/stylex-ui/styles.css';
   ```

2. Wrap your application or page in `<StylexThemeProvider>` and `<ConfirmProvider>`:
   ```tsx
   import {
     StylexThemeProvider,
     ConfirmProvider,
     Toaster,
     Button,
   } from '@repo/stylex-ui';

   export default function App({ children }) {
     return (
       <StylexThemeProvider defaultMode="light" defaultBrand="ember">
         <ConfirmProvider>
           {children}
           <Toaster />
         </ConfirmProvider>
       </StylexThemeProvider>
     );
   }
   ```

## Brand presets

| Preset | Light | Dark | Feel |
| :--- | :--- | :--- | :--- |
| **Ember** (default) | warm paper, espresso ink, amber accent | warm charcoal, same amber | consumer-facing, editorial |
| **Emerald** | white, deep green accent | deep forest, mint accent | financial, admin |

Presets are switched with `setBrand()` from `useStylexTheme()`, persisted in
`localStorage`, and additionally set `data-brand` on `<html>` so CSS-only
surfaces (selection colour, scrollbar) follow along. Each preset also overrides
the component radius tier, so shape changes with the brand, not just hue.

## Accessibility

- Body text and placeholder text meet 4.5:1 in all four preset × mode pairs.
- Control borders and focus rings meet 3:1 against their surface.
- Icon-only buttons require `aria-label` at the type level.
- Focus is never removed: every interactive element ships a visible ring, and
  `prefers-reduced-motion` disables animation and smooth scrolling.
