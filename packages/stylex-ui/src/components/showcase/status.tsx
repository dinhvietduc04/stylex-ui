'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { Plus } from 'lucide-react';
import { semanticTokens } from '../../tokens/semantic.stylex';
import { globalTokens } from '../../tokens/global.stylex';
import { Badge, Tag, StatusDot } from '../badge';
import { Button } from '../button';
import { Section, Specimen } from './primitives';

const styles = stylex.create({
  wrap: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '0.625rem',
    width: '100%',
  },
  dotList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.875rem',
    width: '100%',
  },
  dotRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    paddingBottom: '0.75rem',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: semanticTokens.borderSubtle,
  },
  dotRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  dotMeta: {
    fontFamily: globalTokens.fontMono,
    fontSize: '0.6875rem',
    color: semanticTokens.textMuted,
    fontVariantNumeric: 'tabular-nums',
  },
});

interface TagItem {
  id: string;
  label: string;
  variant: 'primary' | 'success' | 'info' | 'warning' | 'neutral';
}

const INITIAL_TAGS: TagItem[] = [
  { id: '1', label: 'StyleX', variant: 'primary' },
  { id: '2', label: 'OKLCH', variant: 'success' },
  { id: '3', label: 'Radix', variant: 'info' },
  { id: '4', label: 'AA contrast', variant: 'warning' },
  { id: '5', label: 'Zero runtime', variant: 'neutral' },
];

const services = [
  { name: 'API gateway', status: 'Operational', variant: 'success' as const, uptime: '99.99%', pulse: true },
  { name: 'Release queue', status: 'Backlog', variant: 'warning' as const, uptime: '412 jobs', pulse: true },
  { name: 'Legacy node', status: 'Offline', variant: 'error' as const, uptime: '3h 12m', pulse: false },
  { name: 'Token sync', status: 'Deploying', variant: 'info' as const, uptime: 'v1.0.0', pulse: true },
  { name: 'Archive', status: 'Idle', variant: 'neutral' as const, uptime: '—', pulse: false },
];

export function StatusSection() {
  const [tags, setTags] = React.useState<TagItem[]>(INITIAL_TAGS);

  return (
    <Section
      id="status"
      eyebrow="Components"
      title="Status and data"
      meta="Badge · tag · status dot"
      description="Six semantic variants, one grammar. Fill carries weight, tint carries context, and the pulse is reserved for something genuinely live."
    >
      <Specimen label="Badge" note="Subtle by default; switch to solid when the badge must survive a busy background.">
        <div {...stylex.props(styles.wrap)}>
          <Badge variant="success" dot>
            Operational
          </Badge>
          <Badge variant="warning" dot>
            Degraded
          </Badge>
          <Badge variant="error" dot>
            Outage
          </Badge>
          <Badge variant="info" dot>
            Deploying
          </Badge>
          <Badge variant="neutral" dot>
            Idle
          </Badge>
          <Badge variant="primary" dot>
            Enterprise
          </Badge>
        </div>
        <div {...stylex.props(styles.wrap)}>
          <Badge variant="success" appearance="solid">
            Solid success
          </Badge>
          <Badge variant="warning" appearance="solid">
            Solid warning
          </Badge>
          <Badge variant="error" appearance="solid">
            Solid error
          </Badge>
          <Badge variant="info" appearance="solid">
            Solid info
          </Badge>
          <Badge variant="primary" appearance="solid">
            Solid primary
          </Badge>
        </div>
      </Specimen>

      <Specimen label="Tag" note="Removable tags keep their own hit target so the label itself stays a label.">
        <div {...stylex.props(styles.wrap)}>
          {tags.map((tag) => (
            <Tag
              key={tag.id}
              variant={tag.variant}
              removable
              onRemove={() =>
                setTags((prev) => prev.filter((item) => item.id !== tag.id))
              }
            >
              {tag.label}
            </Tag>
          ))}
          {tags.length < INITIAL_TAGS.length ? (
            <Button
              size="xs"
              variant="ghost"
              leftIcon={<Plus size={12} />}
              onClick={() => setTags(INITIAL_TAGS)}
            >
              Restore
            </Button>
          ) : null}
        </div>
      </Specimen>

      <Specimen label="Status dot" note="The ring pulses behind the dot; the dot itself never moves." stack last>
        <div {...stylex.props(styles.dotList)}>
          {services.map((service, index) => (
            <div
              key={service.name}
              {...stylex.props(
                styles.dotRow,
                index === services.length - 1 && styles.dotRowLast,
              )}
            >
              <StatusDot
                variant={service.variant}
                pulse={service.pulse}
                label={service.name}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span {...stylex.props(styles.dotMeta)}>{service.uptime}</span>
                <Badge variant={service.variant} size="sm">
                  {service.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Specimen>
    </Section>
  );
}
