# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Developers at an outsourcing company who use this repository as a UI framework and starter for rapidly building client admin projects.

## Product Purpose

Give the company one reusable foundation for admin portals so new client projects start from a working shell instead of a blank app. Success means a team can stand up a new admin project quickly, with authentication, permissions, layout, notifications, themeable components, and a place for feature modules already in place.

## Positioning

A competitor's generic admin starter could not truthfully copy this combination:

- **Federated feature delivery** — a Next.js shell hosts Vite remotes loaded at runtime, so feature teams ship independently into one admin product.
- **Batteries-included admin shell** — auth, RBAC, route protection, routing, notifications, and shared state come wired.
- **Themeable design system** — the `@repo/stylex-ui` token and component layer keeps many client projects consistent while adapting brand themes.
- **Conventions over configuration** — a predictable monorepo structure and shared packages let any team member join a client project and contribute quickly.

## Operating Context

- pnpm + Turborepo monorepo; admin shell is Next.js 15 on port 3001, the users feature is a Vite 6 remote on port 6517.
- The users remote is mounted under `/admin/users`; the shell owns chrome, auth, routing, and notifications.
- Remote URLs are read at runtime from `public/config/remote-configs.json`, per environment (development, staging, production).
- NextAuth.js v5 with JWT sessions is the auth boundary; `@repo/rbac` evaluates permissions.
- A Zustand shell store is shared across shell and remotes via a singleton.
- `@repo/stylex-ui` provides components, tokens, theming, and feedback primitives (toasts, confirm dialogs).
- Pages are split into two Next.js route groups that do not appear in URLs: `(auth)` holds the signed-out surface and `(dashboard)` holds the authenticated shell.
- Current routes: `/` (redirects to `/admin`), `/login`, `/admin` (dashboard), `/admin/users/[[...slug]]` (remote), `/admin/unauthorized`, plus the `/api/auth/[...nextauth]` route handler.
- `(dashboard)/layout.tsx` redirects signed-out users to `/login`, and `(auth)/layout.tsx` redirects signed-in users to `/admin`. `middleware.ts` also maps `/admin/users` to the `user:read` permission and sends denials to `/admin/unauthorized`.

## Capabilities and Constraints

- Current authentication is a mock credentials provider that accepts any email/password and infers roles and permissions from the email string (admin, manager, viewer). **A real backend is planned.**
- Users management must stay a federated remote, not be folded into the shell.
- Styling must come from `@repo/stylex-ui` components and tokens rather than ad-hoc styles.
- Confirmed permissions today: `admin:access`, `user:read`, plus `user:write`, `product:read`, `product:write` in mock data.
- Accessibility is a stated requirement for the framework's output; the specific standard or level is undecided.
- API/data contracts, persistence, and deployment targets for real projects are not yet specified.

## Brand Commitments

- The shell presents itself as "Admin Portal".
- The default theme brand recorded in code is `emerald`, with light mode as the default.
- No voice, logo, or marketing identity has been confirmed.

## Evidence on Hand

- `README.md` — architecture, ports, and feature inventory for the monorepo example.
- `docs/` — setup, development workflow, deployment, packages, and CSS strategy guides.
- `public/config/remote-configs.json` — example remote endpoints (`example.com` placeholders, not live services).
- `packages/stylex-ui` — the real component and token library used by the shell.
- `packages/rbac`, `packages/auth-next`, `packages/stores` — real auth, permission, and state implementations.

Absent and must not be fabricated: real user records, a live API or database, customer names, testimonials, benchmarks, or production URLs.

## Product Principles

1. **Start from a working shell.** Every new admin project should inherit the essentials rather than rebuild them.
2. **Features travel as remotes.** Keep the shell thin and let feature teams own independently shipped modules.
3. **One system, many brands.** Consistency comes from shared tokens and components; client identity comes from theming.
4. **Conventions beat configuration.** Predictable structure is the framework's main usability feature.
5. **Accessibility is built in.** Quality is judged on the output, not on the intent to fix it later.

## Accessibility & Inclusion

Accessibility is a required quality of the framework and any portal built with it. No specific standard or conformance level has been confirmed yet.
