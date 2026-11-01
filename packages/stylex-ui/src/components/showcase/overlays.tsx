'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { AlertTriangle, Mail, PanelRightOpen, Trash2 } from 'lucide-react';
import { semanticTokens } from '../../tokens/semantic.stylex';
import { globalTokens } from '../../tokens/global.stylex';
import { Modal, Drawer } from '../overlay';
import { Button } from '../button';
import { Input, FormField } from '../input';
import { SimpleSelect } from '../select';
import { Switch } from '../selection-controls';
import { useConfirm, toast } from '../feedback';
import { StatusDot } from '../badge';
import { Section, Specimen } from './primitives';

const styles = stylex.create({
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  wrap: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '0.625rem',
  },
  drawerStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.125rem',
    width: '100%',
  },
  modalNote: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.625rem',
    padding: '0.75rem 0.875rem',
    borderRadius: '0.5rem',
    backgroundColor: semanticTokens.bgSurfaceSubtle,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: semanticTokens.borderSubtle,
    fontSize: '0.8125rem',
    color: semanticTokens.textSecondary,
  },
  key: {
    fontFamily: globalTokens.fontMono,
    fontSize: '0.75rem',
    padding: '0.1rem 0.35rem',
    borderRadius: '0.25rem',
    backgroundColor: semanticTokens.bgSurfaceMuted,
    color: semanticTokens.textPrimary,
  },
});

export function OverlaysSection() {
  const confirm = useConfirm();

  const [modalOpen, setModalOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [projectName, setProjectName] = React.useState('dfw-web-shell');
  const [owner, setOwner] = React.useState('owner@company.io');

  const askDelete = async () => {
    const approved = await confirm({
      title: 'Delete this workspace?',
      description:
        'Three microfrontends point at this workspace. Their next deploy will fail until a new target is chosen.',
      confirmText: 'Delete workspace',
      cancelText: 'Keep it',
      variant: 'danger',
    });

    if (approved) {
      toast.error('Workspace deleted', {
        description: 'dfw-staging has been removed. Restore within 30 days.',
      });
      return;
    }
    toast.info('Nothing deleted');
  };

  const askFreeze = async () => {
    const approved = await confirm({
      title: 'Freeze all release channels?',
      description:
        'In-flight deploys will finish. New deploys are rejected until you unfreeze.',
      confirmText: 'Freeze',
      cancelText: 'Cancel',
      variant: 'warning',
    });

    if (approved) {
      toast.warning('Release channels frozen');
    }
  };

  return (
    <Section
      id="overlays"
      eyebrow="Components"
      title="Overlays"
      meta="Modal · drawer · confirm · toast"
      description="Modal for a decision, drawer for a longer edit, confirm for an interruption you can undo. All three trap focus, lock scroll, restore the trigger, and close on Escape."
    >
      <Specimen
        label="Modal"
        note={
          <>
            Size is a token, not a magic number. <span {...stylex.props(styles.key)}>Tab</span>{' '}
            cycles inside, <span {...stylex.props(styles.key)}>Esc</span> closes.
          </>
        }
      >
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          Open modal
        </Button>

        <Modal
          open={modalOpen}
          onOpenChange={setModalOpen}
          title="Promote build 4f2c1a"
          description="This build moves the canary ring to production across three regions."
          size="md"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setModalOpen(false);
                  toast.success('Build promoted', {
                    description: '4f2c1a is live in production.',
                  });
                }}
              >
                Promote
              </Button>
            </>
          }
        >
          <div {...stylex.props(styles.stack)}>
            <div {...stylex.props(styles.modalNote)}>
              <StatusDot variant="success" pulse />
              Canary held 0.02% error rate for 42 minutes.
            </div>
            <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.6, color: semanticTokens.textSecondary }}>
              Promoting rewrites the production alias. The previous build stays
              addressable by its commit hash for rollback.
            </p>
          </div>
        </Modal>
      </Specimen>

      <Specimen
        label="Slide-over drawer"
        note="For edits that need a form but not a page. The panel slides from the right and keeps the list visible behind it."
      >
        <Button
          variant="secondary"
          leftIcon={<PanelRightOpen size={15} />}
          onClick={() => setDrawerOpen(true)}
        >
          Open drawer
        </Button>

        <Drawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          title="Workspace settings"
          description="Changes apply to every microfrontend on the next build."
          size="md"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setDrawerOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setDrawerOpen(false);
                  toast.success('Workspace updated', {
                    description: `Saved settings for ${projectName}.`,
                  });
                }}
              >
                Save changes
              </Button>
            </>
          }
        >
          <div {...stylex.props(styles.drawerStack)}>
            <FormField label="Workspace" htmlFor="drawer-name" required>
              <Input
                id="drawer-name"
                value={projectName}
                clearable
                onClear={() => setProjectName('')}
                onChange={(event) => setProjectName(event.target.value)}
              />
            </FormField>
            <FormField label="Owner" htmlFor="drawer-owner" required>
              <Input
                id="drawer-owner"
                value={owner}
                prefixIcon={<Mail size={15} />}
                onChange={(event) => setOwner(event.target.value)}
              />
            </FormField>
            <FormField label="Release channel" htmlFor="drawer-channel">
              <SimpleSelect
                id="drawer-channel"
                defaultValue="stable"
                options={[
                  { value: 'stable', label: 'Stable' },
                  { value: 'canary', label: 'Canary' },
                  { value: 'internal', label: 'Internal' },
                ]}
              />
            </FormField>
            <Switch defaultChecked label="Publish a changeset on merge" />
          </div>
        </Drawer>
      </Specimen>

      <Specimen label="Confirm" note="Returns a promise — branch on the answer without wiring modal state.">
        <div {...stylex.props(styles.wrap)}>
          <Button
            variant="destructive"
            size="sm"
            leftIcon={<Trash2 size={14} />}
            onClick={() => {
              void askDelete();
            }}
          >
            Delete workspace
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<AlertTriangle size={14} />}
            onClick={() => {
              void askFreeze();
            }}
          >
            Freeze releases
          </Button>
        </div>
      </Specimen>

      <Specimen label="Toast" note="Mapped to the same status tokens as badges — one source of truth." last>
        <div {...stylex.props(styles.wrap)}>
          <Button
            size="xs"
            variant="success"
            onClick={() =>
              toast.success('Deploy finished', {
                description: '14 packages in 38 seconds.',
              })
            }
          >
            Success
          </Button>
          <Button
            size="xs"
            variant="outline"
            onClick={() =>
              toast.warning('Quota at 85%', {
                description: 'Requests will be throttled in about 2 hours.',
              })
            }
          >
            Warning
          </Button>
          <Button
            size="xs"
            variant="destructive"
            onClick={() =>
              toast.error('Upstream unreachable', {
                description: 'Retrying in 5 seconds.',
              })
            }
          >
            Error
          </Button>
          <Button
            size="xs"
            variant="secondary"
            onClick={() => toast.info('Preset switched', { description: 'Tokens reloaded.' })}
          >
            Info
          </Button>
        </div>
      </Specimen>
    </Section>
  );
}
