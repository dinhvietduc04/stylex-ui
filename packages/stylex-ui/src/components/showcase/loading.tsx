'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { semanticTokens } from '../../tokens/semantic.stylex';
import { globalTokens } from '../../tokens/global.stylex';
import { Skeleton, SkeletonCard } from '../skeleton';
import { Switch } from '../selection-controls';
import { Badge, StatusDot } from '../badge';
import { Section, Specimen } from './primitives';

const styles = stylex.create({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',
    gap: '1rem',
    width: '100%',
  },
  panel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.875rem',
    padding: '1rem',
    borderRadius: '0.75rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: semanticTokens.borderSubtle,
    backgroundColor: semanticTokens.bgSurface,
  },
  panelTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.75rem',
  },
  panelTitle: {
    fontSize: '0.875rem',
    fontWeight: globalTokens.fontWeightSemibold,
    color: semanticTokens.textPrimary,
  },
  panelBody: {
    fontSize: '0.8125rem',
    lineHeight: 1.55,
    color: semanticTokens.textSecondary,
  },
  meta: {
    fontFamily: globalTokens.fontMono,
    fontSize: '0.6875rem',
    color: semanticTokens.textMuted,
  },
  primitiveRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.875rem',
    width: '100%',
  },
  primitiveCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    flex: 1,
    minWidth: 0,
  },
});

const loaded = [
  {
    name: 'web-shell',
    badge: 'healthy' as const,
    body: 'Host shell on Next.js 15. Consumes the token layer and composes the remotes at runtime.',
    meta: 'v1.0.0 · 3000',
  },
  {
    name: 'admin-shell',
    badge: 'active' as const,
    body: 'Role-gated management surface. Shares auth, RBAC, and the same component layer.',
    meta: 'v1.0.0 · 3001',
  },
  {
    name: 'users-remote',
    badge: 'active' as const,
    body: 'Vite remote exposing the user directory through Module Federation.',
    meta: 'v1.0.0 · 6517',
  },
];

export function LoadingSection() {
  const [skeleton, setSkeleton] = React.useState(true);

  return (
    <Section
      id="loading"
      eyebrow="Components"
      title="Loading"
      meta="Skeleton · card · text"
      description="Skeletons mirror the shape of what is coming, so the layout does not jump when data lands. The pulse is one shared keyframe at 1.6 seconds."
    >
      <Specimen
        label="Shape match"
        note="Toggle between the placeholder and the real cards — the grid does not move."
      >
        <Switch
          checked={skeleton}
          onCheckedChange={setSkeleton}
          label={skeleton ? 'Placeholder' : 'Loaded'}
        />
      </Specimen>

      <Specimen
        label="Card skeletons"
        note="Avatar, two text lines, and a media block."
        stack
      >
        <div {...stylex.props(styles.grid)}>
          {skeleton ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            loaded.map((item) => (
              <div key={item.name} {...stylex.props(styles.panel)}>
                <div {...stylex.props(styles.panelTop)}>
                  <span {...stylex.props(styles.panelTitle)}>{item.name}</span>
                  <Badge
                    variant={item.badge === 'healthy' ? 'success' : 'primary'}
                    size="sm"
                    dot
                  >
                    {item.badge}
                  </Badge>
                </div>
                <span {...stylex.props(styles.panelBody)}>{item.body}</span>
                <span {...stylex.props(styles.meta)}>{item.meta}</span>
              </div>
            ))
          )}
        </div>
      </Specimen>

      <Specimen
        label="Primitives"
        note="Text, circle, and rounded blocks compose any layout."
        stack
        last
      >
        <div {...stylex.props(styles.grid)}>
          <div {...stylex.props(styles.panel)}>
            <div {...stylex.props(styles.primitiveRow)}>
              <Skeleton variant="circular" width={40} height={40} />
              <div {...stylex.props(styles.primitiveCol)}>
                <Skeleton variant="text" width="62%" height={12} />
                <Skeleton variant="text" width="38%" height={10} />
              </div>
            </div>
            <Skeleton variant="text" lines={3} />
          </div>
          <div {...stylex.props(styles.panel)}>
            <Skeleton variant="rounded" height={72} />
            <Skeleton variant="text" lines={2} />
          </div>
          <div {...stylex.props(styles.panel)}>
            <StatusDot variant="info" pulse label="Streaming" />
            <Skeleton variant="text" width="84%" height={11} />
            <Skeleton variant="text" width="70%" height={11} />
            <Skeleton variant="text" width="52%" height={11} />
          </div>
        </div>
      </Specimen>
    </Section>
  );
}
