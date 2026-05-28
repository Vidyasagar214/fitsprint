# Phase 1 — Foundation

**Feature folder:** `specs/2026-05-21-phase-1-foundation/`  
**Roadmap reference:** [roadmap.md](../roadmap.md) — Phase 1  
**Branch:** `feature/phase-1-foundation` (merged / continued on `main`)  
**Product:** FitSprint

---

## Scope

Establish a production-ready application skeleton: Next.js app with design system, Supabase wiring, public/authenticated app shell, accessibility baseline, health endpoint, deployment to Vercel, and a **full UI shell** for marketing, member dashboard, and admin (dummy data until domain APIs ship in later phases).

**In scope**

- Next.js (App Router) + TypeScript + Tailwind + shadcn/ui
- Supabase client setup against an **existing** project (migrations pipeline; `profiles` + domain schema stubs)
- App layout: marketing/public area vs authenticated member shell vs admin shell
- WCAG-oriented UI baseline (landmarks, focus, contrast tokens)
- Fitness-oriented design tokens (energetic palette; dark mode support)
- `GET /api/health` returning `{ ok: true }`
- Vercel project connected; preview/production deploy with env vars documented
- Environment variable template (`.env.example`) — no secrets committed
- **UI shell (Phase 1 extension):** Landing, auth, user dashboard routes, admin routes, chart components, dummy data modules — **no persistence for domain data yet**

**Out of scope (deferred to later phases)**

- Wiring dashboard/workout/nutrition/community data to Postgres (Phases 3–7)
- Payment provider integration (Phase 6)
- Full RBAC enforcement for `premium` / `trainer` (Phase 2+)
- CI/GitHub Actions (Phase 2)
- E2E test suite
- Email verification polish, password reset UX (Phase 2)

---

## Context

FitSprint is a modular fitness SaaS ([mission.md](../mission.md)). Phase 1 unblocks all later phases by providing a deployable, accessible shell on the canonical stack ([tech-stack.md](../tech-stack.md)).

**Implementation:** ✅ **Phase 1 complete** — foundation, auth, role routing, marketing UI, member dashboard UI shell, admin UI shell, domain SQL schema. See [plan.md](./plan.md), [validation.md](./validation.md), [vision-alignment.md](./vision-alignment.md).

---

## Delivered UI inventory (as-built)

All member and admin surfaces below use **static dummy data** from `lib/data/landing.ts`, `lib/data/user-dashboard.ts`, and `lib/data/admin-dashboard.ts` unless noted.

### Public / marketing

| Route | Purpose |
|-------|---------|
| `/` | Landing: hero, stats, features, coaches, stories, BMI calculator, pricing, CTA |
| `/about` | About page |
| `/login`, `/signup` | Email/password + OAuth; shared login for all roles |

### Authenticated member (`(app)` — role `user` / `premium` / `trainer`)

| Route | Purpose |
|-------|---------|
| `/dashboard` | Overview: stat cards, weekly activity chart, goals, hydration, macros, recent workouts |
| `/dashboard/workouts` | Workout library with category filters |
| `/dashboard/nutrition` | Macro donut, meal list, daily summary cards |
| `/dashboard/progress` | PR/metric cards, bar charts, combined weekly chart |
| `/dashboard/community` | Social feed cards (like/comment UI) |
| `/dashboard/pricing` | Plan comparison (Starter / Pro / Elite) |
| `/dashboard/profile` | Profile card + editable fields (UI only) |
| `/dashboard/settings` | Theme, units, notifications, privacy actions (UI only) |

**Layout:** `UserDashboardNav` (Dashboard, Workouts, Nutrition, Progress, Community, Pricing), header with theme toggle + profile dropdown → Profile / Settings.

**Charts:** `WeeklyActivityChart`, `MacroDonutChart`, `SimpleBarChart` (`components/charts/*`) — realistic axes/legends; data from dummy modules.

### Admin (`(admin)` — role `admin`, email `admin@fitsprint.com`)

| Route | Purpose |
|-------|---------|
| `/admin` | Overview: metrics, revenue chart, plan donut, signups, flagged content |
| `/admin/users` | User management table |
| `/admin/subscriptions` | Subscription plans / MRR table |
| `/admin/trainers` | Trainer roster |
| `/admin/content` | CMS-style content list |
| `/admin/reports` | Generated reports list |
| `/admin/settings` | Platform settings (UI only) |

**Auth routing:** Middleware + layouts redirect admins to `/admin`; non-admins blocked from `/admin`. Demo admin auto-provision via `lib/auth/ensure-admin.ts` + `SUPABASE_SERVICE_ROLE_KEY`.

### APIs (live)

| Route | Purpose |
|-------|---------|
| `GET /api/health` | `{ ok: true, db?: "ok" }` |
| `POST /api/auth/logout` | Sign out |
| `GET /auth/callback` | OAuth callback |

---

## Database (migrations)

| Migration | Contents |
|-----------|----------|
| `20260521120000_profiles.sql` | `profiles`, RLS, `handle_new_user` trigger |
| `20260522120000_admin_role.sql` | Admin role assignment for `admin@fitsprint.com` |
| `20260523120000_domain_schema.sql` | Domain tables for workouts, nutrition, progress, community, subscriptions, trainers, CMS, moderation — **schema only**; UI not wired |

Apply with Supabase CLI: `supabase db push` or run SQL in dashboard.

---

## Key decisions

| Topic | Decision | Source |
|-------|----------|--------|
| Supabase | Use **existing** project; keys supplied by developer | Stakeholder Q&A |
| CI | **Skip in Phase 1**; add GitHub Actions in Phase 2 | Stakeholder Q&A |
| Health check | **`GET /api/health`** → `{ ok: true }` | Stakeholder Q&A |
| Design | **Fitness-oriented palette** + dark mode | Stakeholder Q&A + [ui-ux.md](../design/ui-ux.md) |
| UI data | **Dummy modules** in `lib/data/*` until phase APIs | Phase 1 extension |
| Admin access | Email-based admin + `profiles.role` | Implementation |
| Vercel | **Full deploy** in this phase | Stakeholder Q&A |

---

## Stakeholder inputs required

1. **Supabase** — Project URL, anon key, service role key (server-only)
2. **Vercel** — Repo linked; auth redirect URLs for prod/preview
3. **OAuth** — Google, Apple, Facebook enabled in Supabase dashboard

---

## Related documents

- [plan.md](./plan.md) — Task groups
- [validation.md](./validation.md) — Merge criteria
- [vision-alignment.md](./vision-alignment.md) — Vision ↔ delivery matrix
- [../roadmap.md](../roadmap.md) — Phase 1 exit criteria
- [../design/ui-ux.md](../design/ui-ux.md) — Design spec + implementation map
