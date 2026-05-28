# Phase 1 — Foundation — Validation

**Branch:** `feature/phase-1-foundation` / `main`  
**Status:** ✅ **Phase 1 complete** (foundation + UI shell + domain schema migration)

---

## Implementation progress

| Task group | Status |
|------------|--------|
| 1. Repository and toolchain | ✅ |
| 2. Design system | ✅ |
| 3. App shell & routing | ✅ |
| 4. Supabase (+ domain schema) | ✅ |
| 5. Health API | ✅ |
| 6. Accessibility | ✅ |
| Auth & role routing | ✅ |
| 7. Vercel deployment | ✅ |
| 8. Documentation | ✅ |
| 9. Marketing landing UI | ✅ |
| 10. Member dashboard UI | ✅ |
| 11. Admin panel UI | ✅ |

**Vision alignment:** [vision-alignment.md](./vision-alignment.md)

**Last verified:** `npm run build`, `npm run lint`, `npm run typecheck` pass.

---

## Definition of done

| # | Criterion | Status |
|---|-----------|--------|
| 1 | Next.js app builds | ✅ |
| 2 | TypeScript and lint pass | ✅ |
| 3 | Health endpoint | ✅ `{ ok: true, db?: "ok" }` |
| 4 | Homepage loads (full landing sections) | ✅ |
| 5 | Member + admin app shells | ✅ |
| 6 | Design tokens + dark/light theme | ✅ |
| 7 | WCAG baseline | ✅ |
| 8 | Supabase wired + migrations | ✅ `profiles` + `domain_schema` |
| 9 | Vercel deploy | ✅ [docs/deploy.md](../../docs/deploy.md) |
| 10 | No secrets in repo | ✅ |
| 11 | Docs/specs synced with UI | ✅ |
| 12 | Domain UI routes render (dummy data) | ✅ |

---

## Manual test checklist

### Local — toolchain

- [x] `npm run build` / `lint` / `typecheck`
- [ ] `.env.local` + all migrations applied (`profiles`, `admin_role`, `domain_schema`)
- [ ] `GET /api/health` → `ok` (+ `db: ok` when configured)

### Local — auth & roles

- [ ] Sign up as user → lands on `/dashboard`
- [ ] Sign in as `admin@fitsprint.com` → lands on `/admin`
- [ ] Non-admin cannot access `/admin` (redirect to `/dashboard`)
- [ ] Admin cannot access `/dashboard` (redirect to `/admin`)
- [ ] Sign out from profile dropdown

### Local — member UI (dummy data)

- [ ] `/dashboard` — stats, weekly chart, goals, macros, recent workouts
- [ ] `/dashboard/workouts` — library filters
- [ ] `/dashboard/nutrition` — macro chart + meals
- [ ] `/dashboard/progress` — metrics + bar charts
- [ ] `/dashboard/community` — feed cards
- [ ] `/dashboard/pricing` — three plans
- [ ] `/dashboard/profile`, `/dashboard/settings`
- [ ] Theme toggle (header + settings)

### Local — admin UI (dummy data)

- [ ] `/admin` — metrics, charts, signups, flags
- [ ] `/admin/users`, `/admin/subscriptions`, `/admin/trainers`
- [ ] `/admin/content`, `/admin/reports`, `/admin/settings`

### Local — marketing

- [ ] `/` — all sections including BMI calculator
- [ ] `/about`, `/login`, `/signup`

### Deployed (Vercel)

- [ ] Env vars set ([deploy guide](../../docs/deploy.md))
- [ ] `curl https://<domain>/api/health`
- [ ] Auth redirect URLs include production domain
- [ ] Record URL below

### Security

- [x] `.gitignore` excludes `.env.local`
- [x] Service role not exposed to client bundle
- [ ] RLS: user cannot read another user's `workout_sessions` (after wiring — Phase 3+)

---

## Sign-off

```text
Phase 1 validation
Date: 2026-05-21 (updated for UI shell + domain schema)
Deploy URL: https://fitsprint.vercel.app
Health: /api/health → ok
Auth: user → /dashboard; admin → /admin
UI shell: marketing + member + admin routes (dummy data)
Migrations: profiles, admin_role, domain_schema
Build/lint/typecheck: pass
CI: skipped (Phase 2)
Reviewer:
Notes: Begin Phase 2 polish; Phase 3 wire workouts to DB.
```

---

## Merge approval

Phase 1 is complete when local checks above pass and Vercel deploy is confirmed.

**Post-merge:** Phase 2 (auth polish, CI, RBAC) then Phase 3 (workout persistence).
