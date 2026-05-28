# Phase 2 — Authentication polish & CI

**Feature folder:** `specs/2026-05-22-phase-2-auth-ci/`  
**Roadmap reference:** [roadmap.md](../roadmap.md) — Phase 2  
**Depends on:** [Phase 1 foundation](../2026-05-21-phase-1-foundation/) ✅

---

## Scope

Harden authentication flows and add automated CI. Builds on Phase 1 Supabase Auth, middleware, and `profiles.role`.

**In scope**

- Email verification UX after password sign-up (`/verify-email`, resend)
- Password reset request + set new password (`/forgot-password`, `/reset-password`)
- Middleware: verified-email requirement for `/dashboard` and `/admin`
- RBAC: role from `profiles`; premium gate on `/dashboard/progress`
- REST endpoints: `POST /api/auth/register`, `POST /api/auth/reset-password`
- GitHub Actions: `lint`, `typecheck`, `build` on push/PR

**Out of scope**

- Transactional email provider beyond Supabase Auth emails
- Stripe billing / role upgrade automation (Phase 6)
- Trainer-only routes (Phase 8+)

---

## Implementation status

✅ **Delivered** — see [validation.md](./validation.md)
