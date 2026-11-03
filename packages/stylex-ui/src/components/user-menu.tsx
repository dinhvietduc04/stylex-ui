'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { ChevronDown, LogOut } from 'lucide-react';
import { globalTokens } from '../tokens/global.stylex';
import { semanticTokens } from '../tokens/semantic.stylex';
import { Avatar } from './avatar';
import { Badge } from './badge';
import { Button } from './button';
import { Divider } from './card';
import { Icon } from './icon';

const styles = stylex.create({
  trigger: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: globalTokens.space2,
    maxWidth: '15rem',
    paddingTop: globalTokens.space1,
    paddingBottom: globalTokens.space1,
    paddingLeft: globalTokens.space2,
    paddingRight: globalTokens.space2,
    borderWidth: 0,
    borderRadius: globalTokens.radiusLg,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontFamily: globalTokens.fontSans,
    textAlign: 'left',
    outline: 'none',
    transitionProperty: 'background-color',
    transitionDuration: globalTokens.durationFast,
    transitionTimingFunction: globalTokens.easeStandard,
    ':hover': {
      backgroundColor: semanticTokens.bgSurfaceHover,
    },
    ':focus-visible': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: semanticTokens.borderFocus,
      outlineOffset: '2px',
    },
  },
  triggerText: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    '@media (max-width: 639px)': {
      display: 'none',
    },
  },
  name: {
    fontFamily: globalTokens.fontSans,
    fontSize: globalTokens.fontSizeSm,
    fontWeight: globalTokens.fontWeightMedium,
    color: semanticTokens.textPrimary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  email: {
    fontFamily: globalTokens.fontSans,
    fontSize: globalTokens.fontSizeXs,
    color: semanticTokens.textMuted,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  chevron: {
    flexShrink: 0,
    color: semanticTokens.textMuted,
    '@media (max-width: 639px)': {
      display: 'none',
    },
  },
  content: {
    zIndex: globalTokens.zPopover,
    width: '17rem',
    padding: 0,
    borderRadius: globalTokens.radiusLg,
    backgroundColor: semanticTokens.bgSurfaceElevated,
    color: semanticTokens.textPrimary,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: semanticTokens.borderDefault,
    boxShadow: globalTokens.shadowLg,
    overflow: 'hidden',
    outline: 'none',
    animationName: 'dfw-fade-in',
    animationDuration: globalTokens.durationFast,
    animationTimingFunction: globalTokens.easeStandard,
  },
  identity: {
    display: 'flex',
    alignItems: 'center',
    gap: globalTokens.space3,
    padding: globalTokens.space4,
  },
  identityText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.125rem',
    minWidth: 0,
  },
  identityName: {
    fontFamily: globalTokens.fontSans,
    fontSize: globalTokens.fontSizeSm,
    fontWeight: globalTokens.fontWeightSemibold,
    color: semanticTokens.textPrimary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  identityEmail: {
    fontFamily: globalTokens.fontSans,
    fontSize: globalTokens.fontSizeXs,
    color: semanticTokens.textMuted,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  roles: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: globalTokens.space1,
    paddingTop: globalTokens.space3,
    paddingBottom: globalTokens.space3,
    paddingLeft: globalTokens.space4,
    paddingRight: globalTokens.space4,
  },
  actions: {
    padding: globalTokens.space2,
  },
  signOut: {
    justifyContent: 'flex-start',
    color: semanticTokens.statusErrorText,
    ':hover': {
      backgroundColor: semanticTokens.statusErrorBg,
      color: semanticTokens.statusErrorText,
    },
  },
});

export interface UserMenuUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  roles?: string[];
}

export interface UserMenuProps {
  user: UserMenuUser;
  onSignOut?: () => void;
  signOutLabel?: string;
  sx?: StyleXStyles;
}

export function UserMenu({
  user,
  onSignOut,
  signOutLabel = 'Sign out',
  sx: customSx,
}: UserMenuProps) {
  const displayName = user.name?.trim() || user.email || 'Account';
  const roles = user.roles ?? [];

  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          aria-label={`Open account menu for ${displayName}`}
          {...stylex.props(styles.trigger, customSx)}
        >
          <Avatar src={user.image} name={user.name ?? user.email} size="md" />
          <span {...stylex.props(styles.triggerText)}>
            <span {...stylex.props(styles.name)}>{displayName}</span>
            {user.email ? (
              <span {...stylex.props(styles.email)}>{user.email}</span>
            ) : null}
          </span>
          <ChevronDown
            size={14}
            aria-hidden="true"
            {...stylex.props(styles.chevron)}
          />
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          aria-label={`${displayName} account menu`}
          align="end"
          side="bottom"
          sideOffset={8}
          collisionPadding={8}
          tabIndex={-1}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            (event.currentTarget as HTMLElement | null)?.focus();
          }}
          {...stylex.props(styles.content)}
        >
          <div {...stylex.props(styles.identity)}>
            <Avatar src={user.image} name={user.name ?? user.email} size="lg" />
            <div {...stylex.props(styles.identityText)}>
              <span {...stylex.props(styles.identityName)}>{displayName}</span>
              {user.email ? (
                <span {...stylex.props(styles.identityEmail)}>
                  {user.email}
                </span>
              ) : null}
            </div>
          </div>

          {roles.length > 0 ? (
            <div {...stylex.props(styles.roles)}>
              {roles.map((role) => (
                <Badge key={role} variant="primary" size="sm">
                  {role}
                </Badge>
              ))}
            </div>
          ) : null}

          {onSignOut ? (
            <>
              <Divider />
              <div {...stylex.props(styles.actions)}>
                <PopoverPrimitive.Close asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    fullWidth
                    onClick={onSignOut}
                    leftIcon={<Icon icon={LogOut} size="sm" />}
                    sx={styles.signOut}
                  >
                    {signOutLabel}
                  </Button>
                </PopoverPrimitive.Close>
              </div>
            </>
          ) : null}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

UserMenu.displayName = 'UserMenu';
