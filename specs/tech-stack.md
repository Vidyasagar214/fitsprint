# Tech Stack

Canonical technical decisions for FitSprint. Aligns with [README.md](../README.md). Changes here should update [roadmap.md](./roadmap.md) when delivery order is affected.

## Summary

| Layer | Technology |
|-------|------------|
| Application | **Next.js** (App Router) + **TypeScript** |
| UI | **React** + **shadcn/ui** + **Tailwind CSS** |
| Data & auth | **Supabase** (Postgres, Auth, Storage, RLS) |
| Hosting | **Vercel** (app, serverless/edge functions, previews) |
| Payments | **Stripe** or **Razorpay** (server-side only; webhooks) |
| Email | Transactional provider (e.g. Resend, SendGrid) via API |
| Repository | Single Next.js app; monorepo not required initially |

## Architecture stance

The requirements describe a classic **frontend + REST API + Postgres** stack. Our **canonical** approach for v1:

| Requirement doc | Canonical implementation |
|-----------------|---------------------------|
| Node.js REST APIs | **Next.js Route Handlers** under `/app/api/**` |
| JWT authentication | **Supabase Auth** sessions (JWT); validate in middleware/server |
| PostgreSQL | **Supabase Postgres** |
| Redis caching | **Deferred** until performance testing requires it |
| Object storage | **Supabase Storage** (or S3-compatible) for progress photos, media |
| Separate `backend/` repo folder | **Not in v1** — logic in `lib/` + API routes; extract service later if needed |

This keeps one deployable unit on Vercel while remaining API-first and modular.

## Application layer

**Next.js + TypeScript**

- App Router: layouts, server components, streaming where useful
- **Server Actions** for form mutations; **Route Handlers** for REST-shaped `/api/*` endpoints (README contract)
- Shared Zod schemas for validation at API boundaries
- RBAC: role on `profiles` + middleware checks + Supabase RLS policies

**UI**

- Tailwind CSS + shadcn/ui (accessible primitives, consistent design system)
- Mobile-first responsive layouts
- Charting (Phase 1 UI): custom SVG charts in `components/charts/*` (axes, legends, dummy series); evaluate Recharts when wiring live time-series (Phase 4)

**Conventions**

- Domain types: `User`, `Exercise`, `WorkoutPlan`, `WorkoutSession`, `NutritionLog`, `ProgressRecord`, `Subscription`, etc.
- No business secrets in client bundles; payment and admin keys server-only

## Data & authentication

**Supabase**

- **Postgres** — all entities in README § Database Entities
- **Auth** — email/password plus **OAuth** (Google, Apple, Facebook) via Supabase Auth providers
- **RLS** — default deny; policies per role and ownership
- **Storage** — progress photos, exercise media, CMS assets
- Migrations versioned in `supabase/migrations`:
  - `20260521120000_profiles.sql` — `profiles`, auth trigger, RLS
  - `20260522120000_admin_role.sql` — admin role for demo account
  - `20260523120000_domain_schema.sql` — workouts, nutrition, progress, community, subscriptions, trainers, CMS, moderation (UI wiring Phase 3+)

**RBAC roles** (app + DB): `visitor` (implicit), `user`, `premium`, `trainer`, `admin`

## Payments & compliance

- **Stripe / Razorpay** — checkout, subscriptions, trials; webhooks handled in API routes
- **PCI-DSS** — no raw card data on our servers
- **GDPR** — export/delete account flows; privacy policy and consent where required
- **Audit logging** — admin and sensitive actions to `audit_logs` table

## Performance & scale (targets)

| Metric | Target |
|--------|--------|
| Homepage load | < 3 s |
| API response | < 500 ms (p95 goal) |
| DB queries | < 200 ms for hot paths (indexes, selective columns) |
| Concurrency | Design for 10,000+ users (CDN, connection pooling, caching when needed) |

**Later:** Redis (session/cache), read replicas, background jobs (Supabase Edge Functions or queue worker).

## Security baseline

- HTTPS (Vercel)
- Supabase Auth + RLS on all tenant data
- CSRF: SameSite cookies; validate origin on mutations
- XSS: React defaults + sanitize rich text in CMS/community
- Rate limiting on auth and public APIs (Vercel middleware or Upstash)
- OWASP ASVS-aligned review before major releases
- Secrets in environment variables only

## Accessibility

- WCAG 2.1 Level AA as target
- shadcn/Radix primitives for keyboard and screen reader patterns
- Lint/a11y checks in CI (eslint-plugin-jsx-a11y, optional axe in E2E)

## Testing & CI

| Concern | Tool (recommended) | When |
|---------|-------------------|------|
| Unit / integration | Vitest | Phase 2+ |
| E2E | Playwright | Phase 2+ |
| CI | GitHub Actions — lint, typecheck, test on PR | **Phase 2+** (Phase 1: local scripts only) |
| Deploy | Vercel previews + production; Supabase migration on release | Phase 1+ |

Phase 1 uses local `lint`, `typecheck`, and `build` before merge; automated CI pipeline is not required until Phase 2 (see [2026-05-21-phase-1-foundation](./2026-05-21-phase-1-foundation/requirements.md)).

## What we are not using (v1)

- Standalone Express/Fastify API server
- Custom password hashing or home-grown auth
- Monorepo with separate `frontend/` and `backend/` packages (simplify until team scale demands split)

## OAuth configuration (Phase 1 — delivered; provider setup ongoing)

- Enable **Google**, **Apple**, and **Facebook** providers in Supabase Auth
- Register OAuth apps with redirect URLs for local dev and Vercel production/preview
- Map provider identity to `profiles` on first sign-in; support linking when email already exists
- UI: dedicated OAuth buttons alongside email/password on register and login

## Open decisions

- Primary payment provider (Stripe vs Razorpay) by market
- Food/nutrition database source (USDA, Open Food Facts, commercial API)
- CMS: embedded in Next.js vs headless (Sanity, etc.) for blog module
- Search: Postgres full-text vs external (Typesense/Algolia) for exercises and food

## Module → technical owner (reference)

| Module | Primary surface |
|--------|-----------------|
| Auth | Supabase Auth + `/api/auth/*` + middleware |
| Profiles | `profiles` table + RLS |
| Workouts | Postgres + `/api/workouts/*` |
| Nutrition | Postgres + `/api/nutrition/*` |
| Progress | Postgres + Storage + charts |
| Subscription | Stripe/Razorpay + webhooks |
| Community | Postgres + moderation flags |
| Trainers | Postgres + public profile routes |
| CMS | Postgres or headless + SEO metadata |
| Notifications | Email API + `notifications` table |
| Admin | Protected routes + service role (server only) |
