'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  ArrowRight,
  Check,
  Download,
  Heart,
  Plus,
  Settings,
  Share2,
  Trash2,
} from 'lucide-react';
import { globalTokens } from '../../tokens/global.stylex';
import { semanticTokens } from '../../tokens/semantic.stylex';
import { Typography } from '../typography';
import { Icon } from '../icon';
import { Button, IconButton } from '../button';
import { Section, Specimen, Mono } from './primitives';

const styles = stylex.create({
  typeList: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  typeRow: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: '2rem',
    paddingTop: '0.875rem',
    paddingBottom: '0.875rem',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: semanticTokens.borderSubtle,
  },
  typeRowLast: {
    borderBottomWidth: 0,
  },
  typeSample: {
    minWidth: 0,
    color: semanticTokens.textPrimary,
  },
  typeMeta: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '0.125rem',
    flexShrink: 0,
    fontFamily: globalTokens.fontMono,
    fontSize: '0.6875rem',
    lineHeight: 1.4,
    color: semanticTokens.textMuted,
    fontVariantNumeric: 'tabular-nums',
    textAlign: 'right',
  },
  typeName: {
    color: semanticTokens.textSecondary,
  },
  inlineStack: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '0.75rem',
  },
  columnStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    width: '100%',
  },
  iconRow: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '1.125rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
  iconCell: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.375rem',
    color: semanticTokens.textPrimary,
  },
  iconCellLabel: {
    fontFamily: globalTokens.fontMono,
    fontSize: '0.625rem',
    color: semanticTokens.textMuted,
  },
});

interface TypeRowProps {
  sample: React.ReactNode;
  name: string;
  size: string;
  line: string;
  last?: boolean;
}

function TypeRow({ sample, name, size, line, last = false }: TypeRowProps) {
  return (
    <div {...stylex.props(styles.typeRow, last && styles.typeRowLast)}>
      <div {...stylex.props(styles.typeSample)}>{sample}</div>
      <div {...stylex.props(styles.typeMeta)}>
        <span {...stylex.props(styles.typeName)}>{name}</span>
        <span>
          {size} / {line}
        </span>
      </div>
    </div>
  );
}

export function TypographySection() {
  return (
    <Section
      id="typography"
      eyebrow="Foundations"
      title="Typography"
      meta="4 headings · 3 body · 3 utility"
      description="One display face, one text face, one mono for values. Sizes are semantic tokens, so a heading is always the heading role — never an ad-hoc pixel value."
    >
      <Specimen label="Scale" note="Set in production copy, at the size it ships." stack>
        <div {...stylex.props(styles.typeList)}>
          <TypeRow
            sample={<Typography variant="h1">Deploy with confidence.</Typography>}
            name="h1"
            size="2.25rem"
            line="1.15"
          />
          <TypeRow
            sample={
              <Typography variant="h2">Release channels and rollbacks.</Typography>
            }
            name="h2"
            size="1.875rem"
            line="1.25"
          />
          <TypeRow
            sample={
              <Typography variant="h3">
                Shared tokens across every shell.
              </Typography>
            }
            name="h3"
            size="1.5rem"
            line="1.375"
          />
          <TypeRow
            sample={
              <Typography variant="h4">
                Environment variables and secrets.
              </Typography>
            }
            name="h4"
            size="1.25rem"
            line="1.375"
          />
          <TypeRow
            sample={
              <Typography variant="body-lg">
                Body large carries the opening paragraph and the one sentence a
                reader should not be able to miss.
              </Typography>
            }
            name="body-lg"
            size="1.125rem"
            line="1.625"
          />
          <TypeRow
            sample={
              <Typography variant="body">
                Body default is the workhorse: table cells, form help, and any
                prose long enough to need a comfortable measure.
              </Typography>
            }
            name="body"
            size="1rem"
            line="1.5"
          />
          <TypeRow
            sample={
              <Typography variant="body-sm" tone="secondary">
                Body small sits inside dense controls and secondary metadata.
              </Typography>
            }
            name="body-sm"
            size="0.875rem"
            line="1.5"
          />
          <TypeRow
            sample={<Typography variant="caption">Last synced 4 minutes ago</Typography>}
            name="caption"
            size="0.75rem"
            line="1.5"
          />
          <TypeRow
            sample={<Typography variant="overline">Release channel</Typography>}
            name="overline"
            size="0.75rem"
            line="1.25"
          />
          <TypeRow
            sample={<Typography variant="code">stylex.defineVars()</Typography>}
            name="code"
            size="0.85em"
            line="mono"
            last
          />
        </div>
      </Specimen>

      <Specimen
        label="Tone and weight"
        note="Colour is a semantic role, not a hex value, so status text stays legible in both modes."
        last
      >
        <div {...stylex.props(styles.inlineStack)}>
          <Typography variant="body-sm" weight="medium">
            Primary
          </Typography>
          <Typography variant="body-sm" tone="secondary">
            Secondary
          </Typography>
          <Typography variant="body-sm" tone="muted">
            Muted
          </Typography>
          <Typography variant="body-sm" tone="brand" weight="semibold">
            Brand
          </Typography>
          <Typography variant="body-sm" tone="success" weight="medium">
            Success
          </Typography>
          <Typography variant="body-sm" tone="warning" weight="medium">
            Warning
          </Typography>
          <Typography variant="body-sm" tone="error" weight="medium">
            Error
          </Typography>
          <Typography variant="body-sm" tone="info" weight="medium">
            Info
          </Typography>
        </div>
      </Specimen>
    </Section>
  );
}

const iconSizes = [
  { size: 'xs' as const, px: 14 },
  { size: 'sm' as const, px: 16 },
  { size: 'md' as const, px: 20 },
  { size: 'lg' as const, px: 24 },
  { size: 'xl' as const, px: 32 },
];

export function ActionsSection() {
  const [loading, setLoading] = React.useState(false);

  const runLoading = () => {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 1600);
  };

  return (
    <Section
      id="actions"
      eyebrow="Components"
      title="Actions"
      meta="7 variants · 4 sizes"
      description="One button component covers the whole scale, from a quiet ghost action in a table row to a destructive confirmation. Loading owns the spinner, the label, and the disabled state so callers never wire that up by hand."
    >
      <Specimen label="Variants" note="Primary is the only accent per screen; everything else defers.">
        <div {...stylex.props(styles.inlineStack)}>
          <Button variant="primary" rightIcon={<ArrowRight size={15} />}>
            Deploy
          </Button>
          <Button variant="secondary">Duplicate</Button>
          <Button variant="outline">Export</Button>
          <Button variant="ghost">Cancel</Button>
          <Button variant="destructive" leftIcon={<Trash2 size={15} />}>
            Delete
          </Button>
          <Button variant="success" leftIcon={<Check size={15} />}>
            Approve
          </Button>
          <Button variant="link">View logs</Button>
        </div>
      </Specimen>

      <Specimen label="Sizes" note="Heights come from component tokens, so they match inputs exactly.">
        <div {...stylex.props(styles.inlineStack)}>
          <Button size="xs" variant="outline">
            Extra small
          </Button>
          <Button size="sm" variant="outline">
            Small
          </Button>
          <Button size="md" variant="outline">
            Medium
          </Button>
          <Button size="lg" variant="primary" leftIcon={<Download size={16} />}>
            Large
          </Button>
        </div>
      </Specimen>

      <Specimen
        label="States"
        note={
          <>
            Ask for <Mono>isLoading</Mono> and the button handles aria-busy,
            label swap, and the spinner.
          </>
        }
      >
        <div {...stylex.props(styles.inlineStack)}>
          <Button variant="primary" onClick={runLoading} isLoading={loading} loadingText="Deploying">
            {loading ? 'Deploying' : 'Run loading state'}
          </Button>
          <Button variant="outline" isLoading loadingText="Syncing" />
          <Button variant="secondary" disabled>
            Disabled
          </Button>
        </div>
      </Specimen>

      <Specimen
        label="Icon buttons"
        note="aria-label is required by the type — an icon-only control cannot ship unlabelled."
      >
        <div {...stylex.props(styles.inlineStack)}>
          <IconButton aria-label="Add item" variant="primary" icon={<Plus size={16} />} />
          <IconButton
            aria-label="Save to favourites"
            variant="outline"
            shape="circle"
            icon={<Heart size={16} />}
          />
          <IconButton
            aria-label="Share resource"
            variant="secondary"
            icon={<Share2 size={16} />}
          />
          <IconButton
            aria-label="Settings"
            variant="ghost"
            icon={<Settings size={16} />}
          />
          <IconButton
            aria-label="Delete"
            variant="destructive"
            icon={<Trash2 size={16} />}
          />
        </div>
      </Specimen>

      <Specimen
        label="Slot pattern"
        note={
          <>
            <Mono>asChild</Mono> hands styling to the child, so a router link keeps
            its navigation semantics.
          </>
        }
      >
        <div {...stylex.props(styles.inlineStack)}>
          <Button asChild variant="primary" size="sm">
            <a href="#forms">
              Link rendered as button <ArrowRight size={14} />
            </a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <a href="#overlays">Jump to overlays</a>
          </Button>
        </div>
      </Specimen>

      <Specimen label="Icon system" note="One stroke weight, five sizes, decorative by default." last>
        <div {...stylex.props(styles.columnStack)}>
          <div {...stylex.props(styles.iconRow)}>
            {iconSizes.map((i) => (
              <div key={i.size} {...stylex.props(styles.iconCell)}>
                <Icon icon={Settings} size={i.size} tone="primary" />
                <span {...stylex.props(styles.iconCellLabel)}>{i.px}px</span>
              </div>
            ))}
          </div>
          <div {...stylex.props(styles.iconRow)}>
            <Icon icon={Heart} size="md" tone="error" label="Favourite" />
            <Icon icon={Check} size="md" tone="success" label="Approved" />
            <Icon icon={Share2} size="md" tone="brand" label="Shared" />
            <Icon icon={Download} size="md" tone="muted" label="Download" />
          </div>
        </div>
      </Specimen>
    </Section>
  );
}
