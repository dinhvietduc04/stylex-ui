'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { globalTokens } from '../../tokens/global.stylex';
import { semanticTokens } from '../../tokens/semantic.stylex';
import { Section, Specimen } from './primitives';

const styles = stylex.create({
  rampBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    width: '100%',
  },
  rampTitle: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: '0.75rem',
    fontSize: '0.75rem',
    fontWeight: globalTokens.fontWeightSemibold,
    color: semanticTokens.textSecondary,
  },
  rampMeta: {
    fontFamily: globalTokens.fontMono,
    fontSize: '0.6875rem',
    color: semanticTokens.textMuted,
    fontWeight: globalTokens.fontWeightRegular,
  },
  ramp: {
    display: 'flex',
    width: '100%',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    boxShadow: 'inset 0 0 0 1px oklch(0 0 0 / 0.08)',
  },
  rampStep: {
    flex: 1,
    minWidth: 0,
    height: '3.25rem',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: '0.375rem',
  },
  rampStepLabel: {
    fontFamily: globalTokens.fontMono,
    fontSize: '0.625rem',
    letterSpacing: '0.02em',
    opacity: 0.75,
  },

  swatchGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(11rem, 1fr))',
    gap: '0.75rem',
    width: '100%',
  },
  swatch: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.375rem',
    padding: '0.625rem',
    borderRadius: '0.5rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: semanticTokens.borderSubtle,
    backgroundColor: semanticTokens.bgSurface,
  },
  swatchChipFrame: {
    display: 'flex',
    padding: '0.25rem',
    borderRadius: '0.4375rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    // Fixed neutral frame so near-black and near-white tokens stay legible
    // against the card in either mode.
    borderColor: 'oklch(0.58 0.006 70)',
    backgroundColor: 'oklch(0.74 0.006 70)',
  },
  swatchChip: {
    width: '100%',
    height: '2.125rem',
    borderRadius: '0.25rem',
    boxShadow: 'inset 0 0 0 1px oklch(0 0 0 / 0.18)',
  },
  swatchName: {
    fontFamily: globalTokens.fontMono,
    fontSize: '0.6875rem',
    color: semanticTokens.textSecondary,
  },

  statusRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    width: '100%',
  },
  statusChip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    paddingTop: '0.375rem',
    paddingBottom: '0.375rem',
    paddingLeft: '0.625rem',
    paddingRight: '0.75rem',
    borderRadius: '9999px',
    borderWidth: '1px',
    borderStyle: 'solid',
    fontFamily: globalTokens.fontMono,
    fontSize: '0.6875rem',
  },
  dot: {
    width: '0.5rem',
    height: '0.5rem',
    borderRadius: '9999px',
    flexShrink: 0,
  },

  barRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.875rem',
    width: '100%',
  },
  barTrack: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    alignItems: 'center',
  },
  bar: {
    height: '0.625rem',
    borderRadius: '0.1875rem',
    backgroundColor: semanticTokens.brandPrimary,
    flexShrink: 0,
  },
  barLabel: {
    fontFamily: globalTokens.fontMono,
    fontSize: '0.6875rem',
    color: semanticTokens.textMuted,
    whiteSpace: 'nowrap',
    fontVariantNumeric: 'tabular-nums',
    minWidth: '5.5rem',
  },
  barGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    width: '100%',
  },

  radiusRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.875rem',
  },
  radiusBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.375rem',
  },
  radiusSquare: {
    width: '3.5rem',
    height: '3.5rem',
    backgroundColor: semanticTokens.brandPrimarySubtle,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: semanticTokens.brandPrimaryBorder,
  },
  radiusLabel: {
    fontFamily: globalTokens.fontMono,
    fontSize: '0.625rem',
    color: semanticTokens.textMuted,
  },

  elevationRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.25rem',
  },
  elevationBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
  },
  elevationSurface: {
    width: '4.5rem',
    height: '3.25rem',
    borderRadius: '0.5rem',
    backgroundColor: semanticTokens.bgSurface,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: semanticTokens.borderSubtle,
  },
});

interface RampStep {
  step: string;
  value: string;
  labelColor: string;
}

function Ramp({
  title,
  meta,
  steps,
}: {
  title: string;
  meta: string;
  steps: RampStep[];
}) {
  return (
    <div {...stylex.props(styles.rampBlock)}>
      <div {...stylex.props(styles.rampTitle)}>
        <span>{title}</span>
        <span {...stylex.props(styles.rampMeta)}>{meta}</span>
      </div>
      <div {...stylex.props(styles.ramp)}>
        {steps.map((s) => (
          <div
            key={s.step}
            {...stylex.props(styles.rampStep)}
            style={{ backgroundColor: s.value }}
          >
            <span
              {...stylex.props(styles.rampStepLabel)}
              style={{ color: s.labelColor }}
            >
              {s.step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const emberSteps: RampStep[] = [
  { step: '50', value: globalTokens.ember50, labelColor: 'oklch(0.3 0.08 45)' },
  { step: '100', value: globalTokens.ember100, labelColor: 'oklch(0.3 0.08 45)' },
  { step: '200', value: globalTokens.ember200, labelColor: 'oklch(0.3 0.08 45)' },
  { step: '300', value: globalTokens.ember300, labelColor: 'oklch(0.28 0.07 45)' },
  { step: '400', value: globalTokens.ember400, labelColor: 'oklch(0.24 0.06 45)' },
  { step: '500', value: globalTokens.ember500, labelColor: 'oklch(0.2 0.05 45)' },
  { step: '600', value: globalTokens.ember600, labelColor: 'oklch(0.99 0.01 70)' },
  { step: '700', value: globalTokens.ember700, labelColor: 'oklch(0.99 0.01 70)' },
  { step: '800', value: globalTokens.ember800, labelColor: 'oklch(0.99 0.01 70)' },
  { step: '900', value: globalTokens.ember900, labelColor: 'oklch(0.99 0.01 70)' },
  { step: '950', value: globalTokens.ember950, labelColor: 'oklch(0.95 0.02 70)' },
];

const emeraldSteps: RampStep[] = [
  { step: '50', value: globalTokens.emerald50, labelColor: 'oklch(0.28 0.06 168)' },
  { step: '100', value: globalTokens.emerald100, labelColor: 'oklch(0.28 0.06 168)' },
  { step: '200', value: globalTokens.emerald200, labelColor: 'oklch(0.28 0.06 168)' },
  { step: '400', value: globalTokens.emerald400, labelColor: 'oklch(0.24 0.05 168)' },
  { step: '500', value: globalTokens.emerald500, labelColor: 'oklch(0.2 0.04 168)' },
  { step: '600', value: globalTokens.emerald600, labelColor: 'oklch(0.99 0.01 168)' },
  { step: '700', value: globalTokens.emerald700, labelColor: 'oklch(0.99 0.01 168)' },
  { step: '800', value: globalTokens.emerald800, labelColor: 'oklch(0.99 0.01 168)' },
  { step: '900', value: globalTokens.emerald900, labelColor: 'oklch(0.99 0.01 168)' },
  { step: '950', value: globalTokens.emerald950, labelColor: 'oklch(0.95 0.02 168)' },
];

const surfaceSwatches = [
  { name: 'bgCanvas', value: semanticTokens.bgCanvas },
  { name: 'bgSurface', value: semanticTokens.bgSurface },
  { name: 'bgSurfaceSubtle', value: semanticTokens.bgSurfaceSubtle },
  { name: 'bgSurfaceMuted', value: semanticTokens.bgSurfaceMuted },
  { name: 'brandPrimary', value: semanticTokens.brandPrimary },
  { name: 'brandSecondary', value: semanticTokens.brandSecondary },
  { name: 'brandAccent', value: semanticTokens.brandAccent },
  { name: 'borderStrong', value: semanticTokens.borderStrong },
];

const statusSwatches = [
  {
    label: 'success',
    dot: semanticTokens.statusSuccess,
    bg: semanticTokens.statusSuccessBg,
    border: semanticTokens.statusSuccessBorder,
    text: semanticTokens.statusSuccessText,
  },
  {
    label: 'warning',
    dot: semanticTokens.statusWarning,
    bg: semanticTokens.statusWarningBg,
    border: semanticTokens.statusWarningBorder,
    text: semanticTokens.statusWarningText,
  },
  {
    label: 'error',
    dot: semanticTokens.statusError,
    bg: semanticTokens.statusErrorBg,
    border: semanticTokens.statusErrorBorder,
    text: semanticTokens.statusErrorText,
  },
  {
    label: 'info',
    dot: semanticTokens.statusInfo,
    bg: semanticTokens.statusInfoBg,
    border: semanticTokens.statusInfoBorder,
    text: semanticTokens.statusInfoText,
  },
  {
    label: 'neutral',
    dot: semanticTokens.statusNeutral,
    bg: semanticTokens.statusNeutralBg,
    border: semanticTokens.statusNeutralBorder,
    text: semanticTokens.statusNeutralText,
  },
];

const spacingSteps = [
  { token: 'space1', value: globalTokens.space1, px: '4' },
  { token: 'space2', value: globalTokens.space2, px: '8' },
  { token: 'space3', value: globalTokens.space3, px: '12' },
  { token: 'space4', value: globalTokens.space4, px: '16' },
  { token: 'space6', value: globalTokens.space6, px: '24' },
  { token: 'space8', value: globalTokens.space8, px: '32' },
  { token: 'space12', value: globalTokens.space12, px: '48' },
  { token: 'space16', value: globalTokens.space16, px: '64' },
];

const radiusStepList = [
  { token: 'xs', value: globalTokens.radiusXs },
  { token: 'sm', value: globalTokens.radiusSm },
  { token: 'md', value: globalTokens.radiusMd },
  { token: 'lg', value: globalTokens.radiusLg },
  { token: 'xl', value: globalTokens.radiusXl },
  { token: 'full', value: globalTokens.radiusFull },
];

const elevationSteps = [
  { token: 'xs', value: globalTokens.shadowXs },
  { token: 'sm', value: globalTokens.shadowSm },
  { token: 'md', value: globalTokens.shadowMd },
  { token: 'lg', value: globalTokens.shadowLg },
  { token: 'xl', value: globalTokens.shadowXl },
];

export function FoundationsSection() {
  return (
    <Section
      id="foundations"
      eyebrow="Foundations"
      title="Tokens"
      meta="3-tier token system"
      description="Three tiers, one direction. Primitives hold raw values, semantic tokens name intent, and component tokens scope the exceptions. Switching brand or mode only rewrites the middle tier."
    >
      <Specimen
        label="Brand scales"
        note="Global primitives in OKLCH. Ember at 500 is the light-mode accent; Emerald at 455 lightness carries white text."
        stack
      >
        <Ramp title="Ember" meta="hue 42–70" steps={emberSteps} />
        <Ramp title="Emerald" meta="hue 162–172" steps={emeraldSteps} />
      </Specimen>

      <Specimen
        label="Semantic surfaces"
        note="Every value below is a live token — switch the preset and they all move."
        grid
      >
        {surfaceSwatches.map((s) => (
          <div key={s.name} {...stylex.props(styles.swatch)}>
            <div {...stylex.props(styles.swatchChipFrame)}>
              <div
                {...stylex.props(styles.swatchChip)}
                style={{ backgroundColor: s.value }}
              />
            </div>
            <span {...stylex.props(styles.swatchName)}>{s.name}</span>
          </div>
        ))}
      </Specimen>

      <Specimen
        label="Status"
        note="Tinted backgrounds are alpha mixes in OKLCH, so they sit correctly on either surface."
      >
        <div {...stylex.props(styles.statusRow)}>
          {statusSwatches.map((s) => (
            <span
              key={s.label}
              {...stylex.props(styles.statusChip)}
              style={{
                backgroundColor: s.bg,
                borderColor: s.border,
                color: s.text,
              }}
            >
              <span
                {...stylex.props(styles.dot)}
                style={{ backgroundColor: s.dot }}
              />
              {s.label}
            </span>
          ))}
        </div>
      </Specimen>

      <Specimen label="Spacing" note="A 4px base grid, expressed in rem." stack>
        <div {...stylex.props(styles.barGroup)}>
          {spacingSteps.map((s) => (
            <div key={s.token} {...stylex.props(styles.barRow)}>
              <span {...stylex.props(styles.barLabel)}>
                {s.token} · {s.px}px
              </span>
              <div {...stylex.props(styles.barTrack)}>
                <div
                  {...stylex.props(styles.bar)}
                  style={{ width: s.value }}
                />
              </div>
            </div>
          ))}
        </div>
      </Specimen>

      <Specimen label="Radius" note="Ember rounds; Emerald tightens. Same tokens, different preset.">
        <div {...stylex.props(styles.radiusRow)}>
          {radiusStepList.map((r) => (
            <div key={r.token} {...stylex.props(styles.radiusBox)}>
              <div
                {...stylex.props(styles.radiusSquare)}
                style={{ borderRadius: r.value }}
              />
              <span {...stylex.props(styles.radiusLabel)}>{r.token}</span>
            </div>
          ))}
        </div>
      </Specimen>

      <Specimen label="Elevation" note="Five steps, every one an offset blur rather than a halo." last>
        <div {...stylex.props(styles.elevationRow)}>
          {elevationSteps.map((e) => (
            <div key={e.token} {...stylex.props(styles.elevationBox)}>
              <div
                {...stylex.props(styles.elevationSurface)}
                style={{ boxShadow: e.value }}
              />
              <span {...stylex.props(styles.radiusLabel)}>{e.token}</span>
            </div>
          ))}
        </div>
      </Specimen>
    </Section>
  );
}
