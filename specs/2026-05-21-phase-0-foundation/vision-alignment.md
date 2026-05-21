# Phase 0 — Vision alignment

Cross-check of delivered work against the **original Fitness Website Platform** requirements and [mission.md](../mission.md).

**Product:** FitSprint  
**Phase:** 0 — Foundation (+ core auth delivered early)

---

## Platform vision (original) ↔ Phase 0 delivery

| Original requirement | Phase 0 status | Notes |
|---------------------|----------------|--------|
| Scalable cloud-hosted SaaS | ✅ | Next.js on Vercel; Supabase backend |
| Multi-role platform (visitor → admin) | 🔄 | `profiles.role` + visitor/public routes; role gates in Phase 1+ |
| Workout, nutrition, analytics, subs, CMS, community, trainers | 📋 Roadmap | Phases 2–9; not in Phase 0 |
| API-first modular design | ✅ | `/api/health`, `/api/auth/logout`; Route Handlers pattern |
| Responsive web, mobile-first | ✅ | Tailwind + shadcn; app shell responsive |
| Secure authentication | ✅ | Supabase Auth; email + OAuth; middleware; RLS on `profiles` |
| WCAG accessibility | ✅ Baseline | Skip link, landmarks, focus, `lang`, core-web-vitals ESLint |
| Performance targets (< 3s home) | 🔄 | Static marketing pages; formal pass in Phase 10 |
| JWT / session auth | ✅ | Supabase sessions (JWT) |
| OAuth (Google, Apple, Facebook) | ✅ | UI + callback; requires Supabase provider config |
| Next.js + shadcn + Supabase + Vercel | ✅ | [tech-stack.md](../tech-stack.md) |

---

## Strength-first DNA ([mission.md](../mission.md))

| Principle | Phase 0 evidence |
|-----------|------------------|
| Control & flexibility | Landing copy; dashboard placeholders for workouts (Phase 2) |
| Frictionless sign-in | `/login`, `/signup`, OAuth, redirect to `/dashboard` |
| Insight over noise | Dashboard cards reference Phase 2/3 modules—no vanity metrics |
| Data ownership | Supabase Postgres; export deferred Phase 10 |
| Security by default | RLS on `profiles`; env secrets; no service role in client |
| Accessible & performant | Design tokens documented for WCAG AA intent |

---

## Phase 0 roadmap exit criteria

| Criterion | Met? |
|-----------|------|
| App deploys | ✅ Ready (Vercel import + [docs/deploy.md](../../docs/deploy.md)) |
| Health check passes | ✅ `GET /api/health` → `{ ok: true, db?: "ok" }` |
| Design system tokens | ✅ Teal fitness palette + dark mode |

---

## Intentional deferrals (still aligned)

- GitHub Actions CI → Phase 1
- Workout / nutrition / progress modules → Phases 2–4
- Premium billing, community, trainers, CMS, admin → Phases 5–9
- GDPR export, formal NFR audit → Phase 10

---

## Verdict

**Phase 0 fulfills the foundation and auth slice of the original vision** without scope creep into later modules. Next phase per [roadmap.md](../roadmap.md): **Phase 1** (email verification polish, full RBAC gates, CI) and **Phase 2** (workout MVP).
