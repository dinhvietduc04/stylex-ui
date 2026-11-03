'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { globalTokens } from '../../tokens/global.stylex';
import { semanticTokens } from '../../tokens/semantic.stylex';

const styles = stylex.create({
  section: {
    paddingTop: '4rem',
    scrollMarginTop: '4.5rem',
  },
  head: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.375rem',
    paddingBottom: '0.875rem',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: semanticTokens.textPrimary,
  },
  eyebrow: {
    fontFamily: globalTokens.fontMono,
    fontSize: '0.625rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: semanticTokens.brandText,
  },
  title: {
    margin: 0,
    fontFamily: globalTokens.fontDisplay,
    fontSize: '1.625rem',
    lineHeight: 1.15,
    fontWeight: globalTokens.fontWeightSemibold,
    letterSpacing: '-0.028em',
    color: semanticTokens.textPrimary,
    textWrap: 'balance',
  },
  desc: {
    margin: 0,
    marginTop: '0.875rem',
    maxWidth: '68ch',
    fontSize: '0.9375rem',
    lineHeight: 1.65,
    color: semanticTokens.textSecondary,
    textWrap: 'pretty',
  },
  body: {
    marginTop: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.875rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1.25rem',
    borderRadius: '0.75rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: semanticTokens.borderSubtle,
    backgroundColor: semanticTokens.bgSurface,
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3125rem',
  },
  labelText: {
    fontSize: '0.9375rem',
    fontWeight: globalTokens.fontWeightSemibold,
    letterSpacing: '-0.006em',
    color: semanticTokens.textPrimary,
  },
  note: {
    maxWidth: '72ch',
    fontSize: '0.8125rem',
    lineHeight: 1.55,
    color: semanticTokens.textMuted,
    textWrap: 'pretty',
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '0.75rem',
    minWidth: 0,
    width: '100%',
  },
  contentStack: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '1rem',
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))',
    gap: '1rem',
    width: '100%',
  },
  inlineCode: {
    fontFamily: globalTokens.fontMono,
    fontSize: '0.78em',
    paddingTop: '0.1em',
    paddingBottom: '0.1em',
    paddingLeft: '0.3em',
    paddingRight: '0.3em',
    borderRadius: '0.25rem',
    backgroundColor: semanticTokens.bgSurfaceMuted,
    color: semanticTokens.textPrimary,
  },
});

export function Mono({ children }: { children: React.ReactNode }) {
  return <code {...stylex.props(styles.inlineCode)}>{children}</code>;
}

export interface SectionProps {
  id: string;
  title: string;
  /** Short category line shown above the title, e.g. "Foundations" */
  eyebrow?: string;
  /** Optional count or inventory, e.g. "7 variants · 4 sizes" */
  meta?: string;
  description?: string;
  children: React.ReactNode;
}

export function Section({
  id,
  title,
  eyebrow,
  meta,
  description,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      {...stylex.props(styles.section)}
    >
      <div {...stylex.props(styles.head)}>
        {eyebrow || meta ? (
          <span {...stylex.props(styles.eyebrow)}>
            {eyebrow}
            {eyebrow && meta ? ' · ' : null}
            {meta}
          </span>
        ) : null}
        <h2 id={`${id}-title`} {...stylex.props(styles.title)}>
          {title}
        </h2>
      </div>
      {description ? <p {...stylex.props(styles.desc)}>{description}</p> : null}
      <div {...stylex.props(styles.body)}>{children}</div>
    </section>
  );
}

export interface SpecimenProps {
  label: React.ReactNode;
  note?: React.ReactNode;
  children: React.ReactNode;
  /** Stack children vertically instead of inline */
  stack?: boolean;
  /** Render a grid of equal columns */
  grid?: boolean;
  /** Kept for call-site compatibility; every specimen is a standalone card */
  last?: boolean;
}

export function Specimen({
  label,
  note,
  children,
  stack = false,
  grid = false,
}: SpecimenProps) {
  return (
    <article {...stylex.props(styles.card)}>
      <div {...stylex.props(styles.label)}>
        <span {...stylex.props(styles.labelText)}>{label}</span>
        {note ? <span {...stylex.props(styles.note)}>{note}</span> : null}
      </div>
      <div
        {...stylex.props(
          grid ? styles.contentGrid : styles.content,
          stack && styles.contentStack,
        )}
      >
        {children}
      </div>
    </article>
  );
}
