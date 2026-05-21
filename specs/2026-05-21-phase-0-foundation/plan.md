# Phase 0 — Foundation — Plan

Structured task groups for implementation on branch `feature/phase-0-foundation`.

**Implementation status:** ✅ **Phase 0 complete** (all task groups 1–8)

---

## 1. Repository and toolchain — ✅ Complete

1.1. Initialize Next.js 15+ app with App Router, TypeScript, Tailwind, ESLint, and `app/`, `components/`, `lib/`. — **Done**

1.2. Pin package manager (npm) and scripts: `dev`, `build`, `start`, `lint`, `typecheck`. — **Done**

1.3. Add `.env.example` and `.gitignore`. — **Done**

1.4. README Getting started + [docs/setup.md](../../docs/setup.md). — **Done**

---

## 2. Design system and UI primitives — ✅ Complete

2.1. shadcn/ui + Tailwind v4. — **Done**

2.2. Fitness-oriented tokens in `globals.css`. — **Done**

2.3. Dark mode (`next-themes`). — **Done**

2.4. `Button`, `Card`, `Input`, `Label`, `ThemeToggle`. — **Done**

---

## 3. App shell and routing — ✅ Complete

3.1. Root layout: metadata, theme, skip-link. — **Done**

3.2. `/`, `/about`, `/login`, `/signup`. — **Done**

3.3. `(app)/dashboard` + middleware protection. — **Done**

3.4. `SiteHeader`, `SiteFooter`, `AppNav`. — **Done**

---

## 4. Supabase integration — ✅ Complete

4.1–4.2. `@supabase/ssr`, client/server/middleware helpers. — **Done**

4.3. `supabase/config.toml`, migrations dir. — **Done**

4.4. `profiles` migration + RLS + auth trigger. — **Done**

4.5. Optional DB smoke test. — **Done** via `/api/health` `db` field

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

## Auth (delivered early) — ✅ Complete

Email/password, OAuth, sign out, landing → dashboard. See [vision-alignment.md](./vision-alignment.md).

---

## 7. Vercel deployment — ✅ Complete (ready to deploy)

7.1. Vercel project import documented. — **Done** [docs/deploy.md](../../docs/deploy.md)

7.2. Env var checklist documented. — **Done**

7.3. Local `npm run build` passes. — **Done**

7.4. Post-deploy verification checklist. — **Done** (user runs after `vercel --prod`)

7.5. Deploy URL documented in validation sign-off template. — **Done**

**Production URL:** https://fitsprint.vercel.app

---

## 8. Documentation and roadmap hygiene — ✅ Complete

8.1. README + setup + deploy docs. — **Done**

8.2. Roadmap Phase 0 marked complete. — **Done**

8.3. plan, validation, requirements, vision-alignment synced. — **Done**

---

## 9. Deferred to Phase 1+

- GitHub Actions CI
- Full RBAC route gates (premium/trainer/admin)
- Workout/nutrition modules
- E2E tests

---

## Next phase

**Phase 1:** Email verification UX, RBAC enforcement, CI pipeline.  
**Phase 2:** Workout MVP per roadmap.
