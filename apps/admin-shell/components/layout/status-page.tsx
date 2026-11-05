import type { ReactNode } from 'react';
import { EmptyState, globalTokens, semanticTokens } from '@repo/stylex-ui';

export interface StatusPageProps {
  title: ReactNode;
  description?: ReactNode;
  /** HTTP status code shown inside the icon frame, e.g. `404` or `403`. */
  code?: string | number;
  icon?: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  /** Fill the viewport. Use for standalone pages such as error and 404. */
  fullHeight?: boolean;
}

/**
 * Shared shell for error, 404, and 403 surfaces. Keeps the status code,
 * heading hierarchy, and action layout consistent across all three pages.
 */
export function StatusPage({
  title,
  description,
  code,
  icon,
  primaryAction,
  secondaryAction,
  fullHeight = false,
}: StatusPageProps) {
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        minHeight: fullHeight ? '100dvh' : '60vh',
        padding: globalTokens.space6,
        backgroundColor: fullHeight ? semanticTokens.bgCanvas : undefined,
      }}
    >
      <div style={{ width: '100%', maxWidth: '34rem' }}>
        <EmptyState
          size="lg"
          titleAs="h1"
          icon={
            icon ??
            (code !== undefined ? <StatusCode value={code} /> : undefined)
          }
          title={title}
          description={description}
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
        />
      </div>
    </div>
  );
}

function StatusCode({ value }: { value: string | number }) {
  return (
    <span
      style={{
        fontFamily: globalTokens.fontDisplay,
        fontSize: globalTokens.fontSize2xl,
        fontWeight: globalTokens.fontWeightBold,
        letterSpacing: '-0.03em',
      }}
    >
      {value}
    </span>
  );
}
