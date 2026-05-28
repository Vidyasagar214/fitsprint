# Phase 2 — Authentication polish & CI — Plan

**Status:** ✅ Complete

---

## 1. Email verification — ✅

1.1. Sign-up redirects to `/verify-email` when no session (confirmation required). — **Done**

1.2. `/verify-email` page + resend action (`resendVerificationEmail`). — **Done**

1.3. Middleware blocks `/dashboard` until `email_confirmed_at`. — **Done**

1.4. Sign-in surfaces unconfirmed-email error. — **Done**

1.5. Auth callback handles confirmation + recovery redirects. — **Done**

---

## 2. Password reset — ✅

2.1. `/forgot-password` + `requestPasswordReset` action. — **Done**

2.2. `/reset-password` + `updatePassword` after callback session. — **Done**

2.3. Sign-in “Forgot password?” link. — **Done**

2.4. `POST /api/auth/reset-password` JSON API. — **Done**

---

## 3. RBAC enforcement — ✅

3.1. `lib/auth/rbac.ts` — role hierarchy, route access, premium paths. — **Done**

3.2. Middleware loads `profiles.role` and enforces gates. — **Done**

3.3. Premium gate: `/dashboard/progress` → redirect to pricing with message. — **Done**

---

## 4. API routes — ✅

4.1. `POST /api/auth/register` — **Done** (`lib/auth/register-user.ts`)

4.2. `POST /api/auth/reset-password` — **Done**

4.3. Existing `POST /api/auth/logout` (Phase 1). — **Done**

---

## 5. CI pipeline — ✅

5.1. `.github/workflows/ci.yml` — lint, typecheck, build. — **Done**

---

## Next phase

**Phase 3:** Wire workouts and profiles to Postgres; replace dummy dashboard data.
