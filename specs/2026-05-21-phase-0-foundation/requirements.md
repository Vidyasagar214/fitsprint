# Phase 0 — Foundation

**Feature folder:** `specs/2026-05-21-phase-0-foundation/`  
**Roadmap reference:** [roadmap.md](../roadmap.md) — Phase 0  
**Branch:** `feature/phase-0-foundation`  
**Product:** FitSprint

---

## Scope

Establish a production-ready application skeleton: Next.js app with design system, Supabase wiring, public/authenticated app shell, accessibility baseline, health endpoint, and deployment to Vercel.

**In scope**

- Next.js (App Router) + TypeScript + Tailwind + shadcn/ui
- Supabase client setup against an **existing** project (migrations pipeline stub; minimal schema if needed for connectivity)
- App layout: marketing/public area vs authenticated shell (routes may be placeholders)
- WCAG-oriented UI baseline (landmarks, focus, contrast tokens)
- Fitness-oriented design tokens (energetic palette; dark mode support)
- `GET /api/health` returning `{ ok: true }`
- Vercel project connected; preview/production deploy with env vars documented
- Environment variable template (`.env.example`) — no secrets committed

**Out of scope (deferred)**

- Full RBAC route gates for premium/trainer/admin (Phase 1+)
- Workout, profile, or business tables beyond optional `profiles` stub
- CI/GitHub Actions (explicitly deferred to Phase 1 per stakeholder decision)
- Payment, email, Redis, E2E test suite
- Full Supabase RLS policies for domain data (Phase 1+)

---

## Context

FitSprint is a modular fitness SaaS ([mission.md](../mission.md)). Phase 0 unblocks all later phases by providing a deployable, accessible shell on the canonical stack ([tech-stack.md](../tech-stack.md)).

**Implementation:** ✅ **Phase 0 complete** — all task groups including auth, Vercel deploy guide, and vision alignment. See [plan.md](./plan.md), [validation.md](./validation.md), [vision-alignment.md](./vision-alignment.md).

---

## Key decisions

| Topic | Decision | Source |
|-------|----------|--------|
| Supabase | Use **existing** project; keys supplied by developer | Stakeholder Q&A |
| CI | **Skip in Phase 0**; add GitHub Actions in Phase 1 | Stakeholder Q&A |
| Health check | **`GET /api/health`** → `{ ok: true }` | Stakeholder Q&A |
| Design | **Fitness-oriented palette** (e.g. energetic green/teal) + dark mode | Stakeholder Q&A |
| Vercel | **Full deploy** in this phase (repo connected, env configured) | Stakeholder Q&A |
| API shape | Route Handlers under `app/api/` (not separate Node server) | tech-stack.md |
| UI kit | shadcn/ui + Tailwind | tech-stack.md |
| Repo layout | Single Next.js app per README (`app/`, `components/`, `lib/`, `supabase/`) | README.md |

---

## Stakeholder inputs required

Before or during implementation, provide:

1. **Supabase** — Project URL, anon key, service role key (server-only; never in client bundle for service role)
2. **Vercel** — Account access to link repository; confirm production domain strategy (default `*.vercel.app` vs custom domain)
3. **Optional** — Logo/wordmark assets for shell (can use text “FitSprint” placeholder)

---

## Technical notes

### Supabase (existing project)

- Add `supabase/` directory with CLI config and migration workflow
- Phase 0 may include only connectivity validation (e.g. empty migration or `profiles` placeholder)—full auth schema lands in Phase 1
- Document local dev: `supabase link` + env vars

### Vercel deploy

- Required env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server)
- Preview deployments on PR branches when CI exists (Phase 1); manual preview deploy acceptable for Phase 0

### WCAG baseline (Phase 0)

- Semantic landmarks: `header`, `main`, `nav`, `footer`
- Visible focus styles on interactive elements
- Color contrast ≥ 4.5:1 for body text on chosen palette
- `eslint-plugin-jsx-a11y` in lint config (no full audit required until Phase 10)

### Open items (non-blocking)

- Exact hex values for brand tokens—propose defaults in implementation, refine later
- Whether `profiles` table is created in Phase 0 or Phase 1 (recommend Phase 1 with auth trigger)

---

## Dependencies

- Node.js LTS (20+)
- npm/pnpm/bun (lock one package manager in scaffold)
- Supabase CLI (recommended for migrations)
- Vercel CLI or dashboard access

---

## Related documents

- [plan.md](./plan.md) — Task groups
- [validation.md](./validation.md) — Merge criteria
- [../roadmap.md](../roadmap.md) — Phase 0 exit criteria
- [../mission.md](../mission.md) — Product principles (accessibility, performance)
- [../tech-stack.md](../tech-stack.md) — Stack and conventions
