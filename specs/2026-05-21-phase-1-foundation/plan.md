# Phase 1 — Foundation — Plan

Structured task groups for implementation on branch `feature/phase-1-foundation`.

**Implementation status:** ✅ **Phase 1 complete** (task groups 1–12)

---

## 1. Repository and toolchain — ✅ Complete

1.1. Initialize Next.js 16 app with App Router, TypeScript, Tailwind, ESLint, and `app/`, `components/`, `lib/`. — **Done**

1.2. Pin package manager (npm) and scripts: `dev`, `build`, `start`, `lint`, `typecheck`. — **Done**

1.3. Add `.env.example` and `.gitignore`. — **Done**

1.4. README Getting started + [docs/setup.md](../../docs/setup.md). — **Done**

---

## 2. Design system and UI primitives — ✅ Complete

2.1. shadcn/ui + Tailwind v4. — **Done**

2.2. Fitness-oriented tokens in `globals.css` (glass, gradients, mesh, motion). — **Done**

2.3. Dark mode (`next-themes`) + light mode. — **Done**

2.4. `Button`, `Card`, `Input`, `Label`, `Badge`, `ThemeToggle`. — **Done**

2.5. Brand: `FitSprintLogo`, Syne display font, mesh background. — **Done**

---

## 3. App shell and routing — ✅ Complete

3.1. Root layout: metadata, theme, skip-link. — **Done**

3.2. Marketing: `/`, `/about`, `(marketing)` layout + `SiteHeader` / `SiteFooter`. — **Done**

3.3. Auth: `/login`, `/signup`, `(auth)` glass layout, OAuth buttons. — **Done**

3.4. Member shell: `(app)/dashboard/*` + middleware protection. — **Done**

3.5. Admin shell: `(admin)/admin/*` + sidebar. — **Done**

---

## 4. Supabase integration — ✅ Complete

4.1–4.2. `@supabase/ssr`, client/server/middleware helpers. — **Done**

4.3. `supabase/config.toml`, migrations dir. — **Done**

4.4. `profiles` migration + RLS + auth trigger. — **Done**

4.5. Admin role migration + demo admin seed path. — **Done**

4.6. Domain schema migration (`20260523120000_domain_schema.sql`). — **Done** (tables + baseline RLS; not wired to UI)

4.7. Optional DB smoke test. — **Done** via `/api/health` `db` field

---

## 5. Health API — ✅ Complete

5.1. `GET /api/health` → `{ ok: true }`. — **Done**

5.2. Optional `db` status when Supabase configured. — **Done**

5.3. Excluded from auth via `PUBLIC_PATHS`. — **Done**

---

## 6. Accessibility baseline — ✅ Complete

6.1. jsx-a11y via `eslint-config-next/core-web-vitals`. — **Done**

6.2–6.4. Focus, `lang`, landmarks, route titles. — **Done**

---

## Auth & role routing — ✅ Complete

- Email/password sign up & sign in
- OAuth (Google, Apple, Facebook) + `/auth/callback`
- `POST /api/auth/logout`
- `profiles.role`: `user`, `premium`, `trainer`, `admin`
- Post-login: members → `/dashboard`, admin → `/admin`
- Middleware cross-access blocks (`lib/supabase/middleware.ts`)
- Demo admin: `admin@fitsprint.com` / `password` (`lib/auth/ensure-admin.ts`)

See [vision-alignment.md](./vision-alignment.md).

---

## 7. Vercel deployment — ✅ Complete (ready to deploy)

7.1. Vercel project import documented. — **Done** [docs/deploy.md](../../docs/deploy.md)

7.2. Env var checklist documented. — **Done**

7.3. Local `npm run build` passes. — **Done**

7.4. Post-deploy verification checklist. — **Done**

**Production URL:** https://fitsprint.vercel.app

---

## 8. Documentation and roadmap hygiene — ✅ Complete

8.1. README + setup + deploy docs. — **Done**

8.2. Roadmap Phase 1 marked complete with UI shell notes. — **Done**

8.3. plan, validation, requirements, vision-alignment synced. — **Done**

---

## 9. Marketing landing UI — ✅ Complete (UI shell)

9.1. Hero, stats band, features, coaches, member stories. — **Done** `components/marketing/*`

9.2. BMI calculator section. — **Done** `components/marketing/bmi-calculator.tsx`

9.3. Pricing section + final CTA. — **Done**

9.4. Landing data module. — **Done** `lib/data/landing.ts`

---

## 10. Member dashboard UI — ✅ Complete (UI shell, dummy data)

10.1. Routes: overview, workouts, nutrition, progress, community, pricing, profile, settings. — **Done**

10.2. Nav + header (`user-dashboard-nav`, `user-dashboard-header`, `profile-dropdown`). — **Done**

10.3. Dashboard widgets: stat cards, goals, hydration, macros, recent workouts. — **Done**

10.4. Charts: weekly activity (bars + line), macro donut, simple bar charts. — **Done** `components/charts/*`

10.5. Workout library with filters. — **Done** `components/dashboard/workout-library.tsx`

10.6. Dummy data. — **Done** `lib/data/user-dashboard.ts`

---

## 11. Admin panel UI — ✅ Complete (UI shell, dummy data)

11.1. Routes: overview, users, subscriptions, trainers, content, reports, settings. — **Done**

11.2. Sidebar + page header with theme/profile. — **Done** `components/admin/*`

11.3. Dummy data. — **Done** `lib/data/admin-dashboard.ts`

---

## 12. Deferred to Phase 2+

| Item | Target phase |
|------|----------------|
| GitHub Actions CI | Phase 2 |
| Email verification / password reset UX | Phase 2 |
| Full RBAC gates (`premium`, `trainer`) | Phase 2 |
| Wire UI → Postgres (CRUD, Server Actions) | Phases 3–7 per module |
| Stripe/Razorpay billing | Phase 6 |
| Real community CRUD + moderation workflow | Phase 7 |
| E2E tests | Phase 2+ |
| GDPR export/delete implementation | Phase 11 |

---

## Next phase

**Phase 2:** Email verification UX, RBAC enforcement, CI pipeline.  
**Phase 3:** Workout MVP — connect `workout_templates` / `workout_sessions` to `/dashboard/workouts` and logging flows.
