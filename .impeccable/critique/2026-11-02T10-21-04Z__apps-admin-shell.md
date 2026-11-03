---
target: apps/admin-shell
total_score: 20
max_score: 40
na_heuristics:
p0_count: 1
p1_count: 3
p2_count: 1
target_identity: "file:C:\\Users\\dvduc\\stylex-ui\\apps\\admin-shell"
timestamp: 2026-11-02T10-21-04Z
slug: apps-admin-shell
---

Method: dual-agent (A: ses_e645b2d6effe0kuHSUNu8qFK6y · B: ses_e645b2d6dffe7FRwZgQb0ZQaUY)

# Admin Shell UI/UX Critique

## Design Health Score

| #         | Heuristic                       | Score     | Key Issue                                                                                                                                    |
| --------- | ------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 1         | Visibility of System Status     | 3         | Breadcrumbs and unread badge are solid; the collapsed rail gives no current-page label and routes have no loading feedback.                  |
| 2         | Match System / Real World       | 2         | Raw scopes (`admin:access`), "Access control" wrapping a single Users link, and mock-login instructions in product UI.                       |
| 3         | User Control and Freedom        | 2         | No undo for delete or clear-all; deep-link destination is lost after sign-in; sign-out gives no acknowledgement.                             |
| 4         | Consistency and Standards       | 1         | Emerald shell vs. a black/purple Users remote; native `confirm()` on delete vs. a polished custom confirm on clear-all.                      |
| 5         | Error Prevention                | 2         | Required fields and confirmations help, but role is free text, duplicate emails are allowed, and delete confirmation does not name the user. |
| 6         | Recognition Rather Than Recall  | 2         | Icon-only collapsed rail, Users buried two levels deep, and core row actions invisible until hover.                                          |
| 7         | Flexibility and Efficiency      | 2         | Ctrl+B and remote preload are good; no search, filter, bulk actions, or command surface.                                                     |
| 8         | Aesthetic and Minimalist Design | 2         | Shell is restrained; the remote's gradients, heavy rules, and empty third dashboard column fight Operate mode.                               |
| 9         | Error Recovery                  | 2         | "Invalid credentials. Please try again." is clear but offers no next step; denial does not state the required permission.                    |
| 10        | Help and Documentation          | 1         | No help or shortcut surface; the mock-login hint is the only guidance in the product.                                                        |
| **Total** |                                 | **20/40** | **Acceptable** (lower band)                                                                                                                  |

**Cognitive load: 2/8 failures** — single focus (the dashboard has no primary task) and working memory (icon-only rail, nested Users, truncated mobile crumbs). Moderate, not critical.

## Design Specificity Verdict

**LLM assessment: 2/5 — partially authored.** The shell has a real point of view: emerald/mint palette, a 72px icon rail, permission-aware navigation, a focus-trapped drawer, and a genuinely good destructive confirmation. But the login, dashboard, and denial screens are template-grade, and the federated Users module looks like a different product. "Admin Portal" is a green layout glyph and a name — any admin starter could wear it unchanged. The framework's actual differentiator is cohesion across independently shipped modules, and the seam is exactly where that promise visibly fails. Missed character opportunities: environment/organization context, density control, a command surface, role/session context, and a distinctive admin-framework pattern.

**Deterministic scan.** The CLI scanned 17 TS/TSX/JS files and returned zero findings with exit code 0. That is a false negative for rendered UI: it does not see hover states, focus order, or mobile clipping. Browser overlay injection on four pages found seven unique findings: `skipped-heading` on `/admin` (h1 "Dashboard" → h3 stat title) and `/admin/users` (h1 "Users" → h3 "User Directory"); `overused-font` (Inter, 74–100% of text); `low-contrast` at 3.9:1 for `#64748b` on `#e8e8ea` ("3 users registered"); and a `gradient-text` advisory on the Users h1. `text-occlusion` was a false positive caused by the overlay's own probe element. The overlay did **not** catch the P0 hover-only actions, the mobile table clipping, or the missing focus rings — those came from keyboard and viewport inspection.

**Visual overlays.** Injection succeeded on `/admin`, `/admin/users`, `/admin/unauthorized`, and `/login`. The flagged pages were captured at `.playwright-mcp/assessment-b/08-overlay-dashboard-1440x900.png` and `09-overlay-users-1440x900.png`. Because the assessment ran in an isolated browser context, treat those screenshots as the durable overlay evidence rather than assuming the overlay persists in your window.

## Overall Impression

A calm, competent shell with real craft in its chrome, undermined by two broken seams: the Users remote and the edges (touch, keyboard, mobile). The first impression is quiet but unbranded; the peak is the shell's restraint and the clear-all confirmation; the end is weak — sign-out dumps you on a generic login, denial is a tiny card with no reason, and "Users 0" contradicts the directory's "3 users registered" at the exact moment the demo asks you to trust it.

The biggest opportunity is to make the framework's cohesion claim visible: one system across shell and remote, plus shell-level utilities (search, density, environment context) that prove this is a framework, not a template.

## What's Working

1. **Shell chrome and theming.** The emerald/mint system, 32px content inset, light/dark parity, and visible focus rings on nav and header controls are consistent and calm. Ctrl+B collapses the rail as expected.
2. **Permission-aware chrome.** Navigation filters by permission, `canWrite` hides Add User, the bell's accessible name includes the unread count, the skip link works, and the drawer traps focus and closes on Esc.
3. **Clear-all confirmation.** It names the consequence, uses danger styling, and offers Cancel. It is the most reassuring interaction in the product.

## Priority Issues

### [P0] Row actions are invisible until hover

- **What:** Edit and Delete are `opacity-0 group-hover:opacity-100`. Keyboard focus lands on an invisible Edit button; on touch there is no hover at all. On mobile the Actions column is off-canvas.
- **Why it matters:** Core admin CRUD is impossible for keyboard and touch users. This is not a polish issue; it blocks the primary task.
- **Fix:** Keep actions visible, or use an always-visible kebab menu. Add `focus-within` reveal, 44px touch targets, and a mobile-safe action pattern.
- **Suggested command:** `/impeccable harden`

### [P1] The federated Users remote breaks the design system

- **What:** The emerald shell gives way to a black/purple Users module: purple and blue role badges, a near-black Add User button (white in dark mode), a 36px h1, heavy table rules, and a gradient-text advisory. The overlay also confirmed a 3.9:1 contrast failure in "3 users registered."
- **Why it matters:** A reusable framework sells cohesion across remotes. Its own remote looking like a different product undermines the entire positioning.
- **Fix:** Bridge `@repo/ui` tokens to `@repo/stylex-ui` semantic tokens. Use one primary, card, badge, and type scale. Remove decorative gradients from an Operate surface and fix the muted-text contrast.
- **Suggested command:** `/impeccable polish`

### [P1] Mobile orientation and the Users table fail

- **What:** At 390px the breadcrumb truncates to "Dash… > U…", the table is 611px wide inside an `overflow:hidden` card, role badges are clipped, Actions start at x=438, and theme controls are 28px high.
- **Why it matters:** The only location cue is truncated and the only action column is unreachable. Admins on phones cannot see or act.
- **Fix:** Show a current-page-only breadcrumb on mobile, use a labeled nav drawer with child-page flyout, and make the table responsive (stacked cards or horizontal scroll with a sticky first column and visible actions). Raise targets to 44px.
- **Suggested command:** `/impeccable adapt`

### [P1] The demo's truth and RBAC story contradict each other

- **What:** The dashboard says "Users 0 / Total users" while the directory says "3 users registered." The viewer role has `user:read`, so `/admin/users` renders for viewers and the Unauthorized page is only reachable by direct URL. Any email containing "admin" gets full access with any password.
- **Why it matters:** The starter's job is to prove auth and RBAC work. Contradictory counts and an unreachable denial state destroy trust in the framework.
- **Fix:** Wire the count to the actual directory data, add a genuinely denied role or guard, and keep mock-credential copy dev-only and clearly labeled.
- **Suggested command:** `/impeccable harden`

### [P2] Accessibility and form hygiene need a pass

- **What:** `/login` and `/admin/unauthorized` have no h1; dashboard and Users skip from h1 to h3; collapsed rail and Notifications have no visible focus ring; login inputs lack `name` and `autocomplete` and trigger a hydration mismatch; the notification dialog logs a missing-description warning; table headers lack `scope` and a caption; sidebar/theme targets are 28px; delete uses a native `confirm()` while clear-all uses the custom dialog.
- **Why it matters:** Accessibility is a stated product principle, and these are cheap, high-leverage fixes. The confirm inconsistency also makes the higher-risk action feel less considered than clear-all.
- **Fix:** Give every page an h1 in order, add `:focus-visible` to every control, add `name`/`autocomplete` and fix the hydration mismatch, add `aria-describedby` to the drawer, add table `scope`/caption, raise targets to 44px, add a password reveal, and use the shared confirm dialog for delete with the user's name.
- **Suggested command:** `/impeccable audit`

## Persona Red Flags

**Alex (Power User):** No search, filter, or bulk actions. Users is two levels deep and the rail is collapsed every session. Opening a user in a new tab goes to `/1`, not a real user route. The Ctrl+B shortcut is undiscoverable, and a deep link is dropped after login.

**Sam (Accessibility):** Hover-only actions that stay in the tab order. 28–36px targets. Icon-only rail with native `title` tooltips. No h1 on login or denial. Skipped heading levels. Truncated mobile breadcrumb. Missing focus rings on collapse and Notifications. Table headers without `scope` or a caption.

**Riley (Stress Tester):** Any password works; `superadmin@x.com` gets admin. Arbitrary role strings and duplicate emails are accepted. The notification list silently caps at 10. Clear-all has no undo and notifications reset on reload. `/favicon.ico` returns 404.

## Minor Observations

- The theme switcher has no "system" option; sign-out has no "signed out" notice.
- Login lacks brand identity, a password reveal, and 44px touch targets.
- The user menu shows both "admin" and "manager" chips; the empty notification state says both "No new notifications" and "You are all caught up!"
- The breadcrumb says "Unauthorized" while the page says "Access Denied."
- The sidebar highlights both "Access control" and "Users" at once.
- The collapsed brand mark is left-shifted and visually clipped against the rail edge.
- "Add User," "Create New User," and "Create User" name the same action three ways.
- The dashboard's third grid column is empty at 1440px; the Unauthorized card sits in the upper third rather than vertically centered.
- The document title is always "Admin Portal"; there are no per-page titles.
- The Next.js dev badge overlaps the avatar and login theme controls in screenshots — development artifact, not product UI.

## Questions to Consider

- If cohesion is the framework's promise, why does its own remote look like a different product?
- What is the one task `/admin` asks a new admin to do? Right now it is a stats page with no action.
- Is a collapsed-by-default rail with two destinations a power feature or a discoverability tax?
- Why show a fake zero in the demo whose only job is proving users work?
- What would make denial feel like recovery — identity, required permission, request access, switch account?
