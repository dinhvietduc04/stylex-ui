import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { globalTokens } from '../tokens/global.stylex';
import { semanticTokens } from '../tokens/semantic.stylex';

const styles = stylex.create({
  shell: {
    display: 'flex',
    height: '100dvh',
    overflow: 'hidden',
    backgroundColor: semanticTokens.bgCanvas,
    color: semanticTokens.textPrimary,
    fontFamily: globalTokens.fontSans,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: 0,
    minHeight: 0,
  },
  main: {
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    paddingTop: globalTokens.space8,
    paddingBottom: globalTokens.space8,
    paddingLeft: globalTokens.space6,
    paddingRight: globalTokens.space6,
    '@media (max-width: 640px)': {
      paddingTop: globalTokens.space4,
      paddingBottom: globalTokens.space4,
      paddingLeft: globalTokens.space4,
      paddingRight: globalTokens.space4,
    },
  },
  skipLink: {
    position: 'absolute',
    left: '-9999px',
    top: 0,
    zIndex: globalTokens.zToast,
    paddingTop: globalTokens.space2,
    paddingBottom: globalTokens.space2,
    paddingLeft: globalTokens.space3,
    paddingRight: globalTokens.space3,
    borderRadius: globalTokens.radiusMd,
    backgroundColor: semanticTokens.brandPrimary,
    color: semanticTokens.textOnPrimary,
    fontFamily: globalTokens.fontSans,
    fontSize: globalTokens.fontSizeSm,
    fontWeight: globalTokens.fontWeightSemibold,
    textDecoration: 'none',
    ':focus': {
      left: globalTokens.space4,
      top: globalTokens.space4,
    },
  },
});

export interface AppShellProps {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  children: React.ReactNode;
  mainId?: string;
}

export function AppShell({
  sidebar,
  header,
  children,
  mainId = 'app-main',
}: AppShellProps) {
  return (
    <div {...stylex.props(styles.shell)}>
      <a href={`#${mainId}`} {...stylex.props(styles.skipLink)}>
        Skip to content
      </a>
      {sidebar}
      <div {...stylex.props(styles.content)}>
        {header}
        <main id={mainId} {...stylex.props(styles.main)}>
          {children}
        </main>
      </div>
    </div>
  );
}

AppShell.displayName = 'AppShell';
