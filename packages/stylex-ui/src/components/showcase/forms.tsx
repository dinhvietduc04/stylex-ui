'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { useForm, Controller } from 'react-hook-form';
import { Check, Hash, Lock, Mail, Search, Send, User } from 'lucide-react';
import { globalTokens } from '../../tokens/global.stylex';
import { semanticTokens } from '../../tokens/semantic.stylex';
import { Input, PasswordInput, Textarea, FormField } from '../input';
import { SimpleSelect, type SelectOption } from '../select';
import { Combobox, type ComboboxOption } from '../combobox';
import { Checkbox, RadioGroup, RadioGroupItem, Switch } from '../selection-controls';
import { Button } from '../button';
import { toast } from '../feedback';
import { Section, Specimen, Mono } from './primitives';

const styles = stylex.create({
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.125rem',
    width: '100%',
    maxWidth: '30rem',
  },
  twoCol: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',
    gap: '1.125rem',
    width: '100%',
  },
  radioCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.875rem',
    width: '100%',
  },
  toggleCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
    maxWidth: '26rem',
  },
  formFoot: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.75rem',
    width: '100%',
    paddingTop: '0.25rem',
  },
  formFootNote: {
    fontSize: '0.8125rem',
    color: semanticTokens.textMuted,
  },
  rangeRow: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '1.5rem',
  },
});

const ROLE_OPTIONS: SelectOption[] = [
  { value: 'architect', label: 'Frontend architect' },
  { value: 'engineer', label: 'UI engineer' },
  { value: 'designer', label: 'Design technologist' },
  { value: 'qa', label: 'QA automation' },
  { value: 'legacy', label: 'Legacy platform (read-only)', disabled: true },
];

const DEPARTMENT_OPTIONS: ComboboxOption[] = [
  {
    value: 'design-systems',
    label: 'Design systems',
    description: 'Tokens, components, accessibility',
    keywords: ['ui', 'stylex', 'tokens'],
  },
  {
    value: 'core-banking',
    label: 'Core banking',
    description: 'Ledger, settlement, reconciliation',
    keywords: ['finance', 'payments'],
  },
  {
    value: 'cloud-infra',
    label: 'Cloud infrastructure',
    description: 'Kubernetes, observability, releases',
    keywords: ['devops', 'sre'],
  },
  {
    value: 'identity',
    label: 'Identity and access',
    description: 'OAuth, OIDC, policy enforcement',
    keywords: ['auth', 'rbac', 'security'],
  },
  {
    value: 'applied-ai',
    label: 'Applied AI',
    description: 'Evaluation, orchestration, tooling',
    keywords: ['ml', 'llm'],
  },
  {
    value: 'data',
    label: 'Data and analytics',
    description: 'Streaming, warehousing, dashboards',
    keywords: ['sql', 'bi'],
  },
  {
    value: 'merchant',
    label: 'Merchant portal',
    description: 'Microfrontend shell and remotes',
    keywords: ['mfe', 'web'],
  },
];

interface FormValues {
  workspace: string;
  email: string;
  role: string;
  department: string;
  notes: string;
  channel: string;
  requireReview: boolean;
  notifyOnDeploy: boolean;
}

export function FormsSection() {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      workspace: 'dfw-web-shell',
      email: 'owner@company.io',
      role: 'engineer',
      department: 'design-systems',
      notes: 'Shared tokens land before the first component, so no shell ships its own palette.',
      channel: 'production',
      requireReview: true,
      notifyOnDeploy: false,
    },
  });

  const workspace = watch('workspace');

  const onSubmit = async (values: FormValues) => {
    await new Promise((resolve) => {
      window.setTimeout(resolve, 600);
    });
    toast.success('Workspace saved', {
      description: `${values.workspace} → ${values.channel}, owned by ${values.email}`,
    });
  };

  return (
    <Section
      id="forms"
      eyebrow="Components"
      title="Forms"
      meta="Input · password · textarea · select · combobox"
      description="Text entry, dropdowns, and search share one geometry: same height, same radius token, same focus ring. Every control below is bound to React Hook Form and reports its own error to the screen reader."
    >
      <Specimen
        label="Text input"
        note={
          <>
            Prefix icon, suffix slot, and a clear affordance that only appears when
            there is something to clear.
          </>
        }
        stack
      >
        <div {...stylex.props(styles.twoCol)}>
          <FormField
            label="Workspace name"
            htmlFor="demo-workspace"
            required
            description="Lowercase, hyphens, maximum 32 characters."
            error={errors.workspace?.message}
          >
            <Input
              id="demo-workspace"
              prefixIcon={<Hash size={15} />}
              clearable
              value={workspace}
              onClear={() => setValue('workspace', '')}
              error={Boolean(errors.workspace)}
              {...register('workspace', {
                required: 'A workspace name is required.',
                minLength: { value: 3, message: 'Use at least 3 characters.' },
              })}
            />
          </FormField>

          <FormField label="Owner email" htmlFor="demo-email" required>
            <Input
              id="demo-email"
              type="email"
              prefixIcon={<Mail size={15} />}
              suffixIcon={<Check size={14} />}
              {...register('email')}
            />
          </FormField>
        </div>

        <div {...stylex.props(styles.twoCol)}>
          <FormField
            label="Error state"
            htmlFor="demo-error"
            error="Token must start with dfw_live_"
          >
            <Input
              id="demo-error"
              defaultValue="invalid_token_9312"
              prefixIcon={<Lock size={15} />}
              error
              clearable
            />
          </FormField>

          <FormField label="Disabled" htmlFor="demo-disabled" description="Inherited from the parent scope.">
            <Input id="demo-disabled" defaultValue="cluster-eu-west-1" disabled />
          </FormField>
        </div>
      </Specimen>

      <Specimen
        label="Password input"
        note="A reveal toggle that keeps the field fully keyboard-accessible."
        stack
      >
        <div {...stylex.props(styles.twoCol)}>
          <FormField
            label="Password"
            htmlFor="demo-password"
            required
            description="Use the eye button to check what you typed."
          >
            <PasswordInput
              id="demo-password"
              autoComplete="new-password"
              placeholder="Enter a password"
            />
          </FormField>

          <FormField
            label="Password with error"
            htmlFor="demo-password-error"
            error="Password must be at least 12 characters."
          >
            <PasswordInput
              id="demo-password-error"
              autoComplete="new-password"
              defaultValue="short"
              error
            />
          </FormField>
        </div>
      </Specimen>

      <Specimen
        label="Textarea"
        note="Counter and clear are opt-in; the resize handle stays vertical."
        stack
      >
        <FormField
          label="Review notes"
          htmlFor="demo-notes"
          description="Visible to everyone with read access to this workspace."
        >
          <Textarea
            id="demo-notes"
            rows={3}
            maxLength={240}
            showCount
            clearable
            {...register('notes')}
          />
        </FormField>
      </Specimen>

      <Specimen
        label="Select and combobox"
        note={
          <>
            Native-feeling <Mono>Select</Mono> for short lists; <Mono>Combobox</Mono>{' '}
            filters on label, description, and keywords.
          </>
        }
        stack
      >
        <div {...stylex.props(styles.twoCol)}>
          <FormField label="Role" htmlFor="demo-role" required>
            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <SimpleSelect
                  id="demo-role"
                  options={ROLE_OPTIONS}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
          </FormField>

          <FormField
            label="Department"
            htmlFor="demo-department"
            description="Type to filter, arrows to move, enter to pick."
          >
            <Controller
              control={control}
              name="department"
              render={({ field }) => (
                <Combobox
                  id="demo-department"
                  options={DEPARTMENT_OPTIONS}
                  value={field.value}
                  onValueChange={field.onChange}
                  searchPlaceholder="Search departments…"
                  placeholder="Choose a department"
                />
              )}
            />
          </FormField>
        </div>
      </Specimen>

      <Specimen
        label="Bound form"
        note="Validation, submission, and reset end to end. Submit triggers a real toast."
        stack
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div {...stylex.props(styles.stack)}>
            <Controller
              control={control}
              name="channel"
              render={({ field }) => (
                <FormField label="Release channel">
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    orientation="horizontal"
                  >
                    <RadioGroupItem value="production" card label="Production" />
                    <RadioGroupItem value="canary" card label="Canary" />
                    <RadioGroupItem value="internal" card label="Internal" />
                  </RadioGroup>
                </FormField>
              )}
            />

            <Controller
              control={control}
              name="requireReview"
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(next) => field.onChange(Boolean(next))}
                  label="Require a second reviewer before deploy"
                  description="Applies to production only."
                />
              )}
            />

            <div {...stylex.props(styles.formFoot)}>
              <span {...stylex.props(styles.formFootNote)}>
                Nothing leaves this page — the submit resolves locally.
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => reset()}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  isLoading={isSubmitting}
                  leftIcon={<Send size={14} />}
                >
                  Save workspace
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Specimen>
    </Section>
  );
}

export function SelectionSection() {
  const [checks, setChecks] = React.useState<(boolean | 'indeterminate')[]>([
    true,
    false,
    'indeterminate',
  ]);

  const all = checks.every((c) => c === true);
  const some = checks.some((c) => c === true || c === 'indeterminate');

  const toggleAll = () => {
    setChecks(checks.map(() => (all ? false : true)));
  };

  return (
    <Section
      id="selection"
      eyebrow="Components"
      title="Selection"
      meta="Checkbox · radio · switch"
      description="Three ways to change state, three distinct shapes and motions. Space toggles, arrows move within a group, and every control keeps a visible focus ring."
    >
      <Specimen label="Checkbox" note="Indeterminate is a first-class state, not a private prop." stack>
        <div {...stylex.props(styles.toggleCol)}>
          <Checkbox
            checked={all}
            onCheckedChange={toggleAll}
            aria-label="Select all scopes"
            label="All microfrontend scopes"
            description={some && !all ? 'Partially selected' : 'Selects everything below'}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              paddingLeft: '1.75rem',
            }}
          >
            {['web-shell', 'admin-shell', 'users-remote'].map((scope, index) => (
              <Checkbox
                key={scope}
                checked={checks[index] === true}
                onCheckedChange={(next) =>
                  setChecks((prev) => {
                    const copy = [...prev];
                    copy[index] = next;
                    return copy;
                  })
                }
                label={scope}
              />
            ))}
          </div>
          <Checkbox
            checked="indeterminate"
            onCheckedChange={() => undefined}
            label="Indeterminate (static)"
            description="Shown when the parent selection is mixed."
          />
          <Checkbox disabled defaultChecked label="Locked by policy" />
        </div>
      </Specimen>

      <Specimen label="Radio group" note="Card radios are the default when each option needs a sentence." stack>
        <div {...stylex.props(styles.radioCard)}>
          <RadioGroup defaultValue="standard">
            <RadioGroupItem
              value="standard"
              card
              label="Standard"
              description="Zero-downtime rollout across three regions."
            />
            <RadioGroupItem
              value="strict"
              card
              label="Strict"
              description="Manual approval between every stage."
            />
            <RadioGroupItem value="paused" card label="Paused" disabled description="No deploys while frozen." />
          </RadioGroup>
        </div>
      </Specimen>

      <Specimen label="Switch" note="Use for a setting that applies immediately; use a checkbox for a value you submit." last>
        <div {...stylex.props(styles.toggleCol)}>
          <Switch
            defaultChecked
            label="Notify on deploy"
            description="Sends a message to #releases."
          />
          <Switch label="Require hardware MFA" description="WebAuthn only." />
          <div {...stylex.props(styles.rangeRow)}>
            <Switch size="sm" defaultChecked aria-label="Small switch" label="sm" />
            <Switch size="md" defaultChecked aria-label="Medium switch" label="md" />
            <Switch size="lg" defaultChecked aria-label="Large switch" label="lg" />
          </div>
        </div>
      </Specimen>
    </Section>
  );
}
