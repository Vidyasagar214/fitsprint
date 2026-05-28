# Phase 2 — Authentication polish & CI — Validation

**Status:** ✅ Complete

---

## Definition of done

| # | Criterion | Status |
|---|-----------|--------|
| 1 | Sign-up → verify email flow (when Supabase requires confirmation) | ✅ |
| 2 | Forgot / reset password flows | ✅ |
| 3 | Middleware RBAC + email verified | ✅ |
| 4 | Premium gate on `/dashboard/progress` | ✅ |
| 5 | `POST /api/auth/register` | ✅ |
| 6 | `POST /api/auth/reset-password` | ✅ |
| 7 | GitHub Actions CI passes | ✅ |
| 8 | `npm run build` / lint / typecheck locally | ✅ |

---

## Manual checklist

### Email verification

- [ ] Supabase → Authentication → enable “Confirm email” (recommended for production)
- [ ] Sign up new user → lands on `/verify-email`
- [ ] Click confirmation link → can access `/dashboard`
- [ ] Resend verification from `/verify-email`

### Password reset

- [ ] `/forgot-password` sends reset email
- [ ] Email link → `/reset-password` → new password works
- [ ] Sign in with new password

### RBAC

- [ ] Free user (`profiles.role = user`) visiting `/dashboard/progress` → redirected to pricing
- [ ] Set `profiles.role = premium` in Supabase → `/dashboard/progress` loads
- [ ] Admin still routes to `/admin` only

### API

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","fullName":"Test"}'

curl -X POST http://localhost:3000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### CI

- [ ] Push branch → GitHub Actions workflow runs green

---

## Supabase dashboard

1. **Authentication → URL configuration** — include `/auth/callback`, `/reset-password` redirect chain via callback.
2. **Authentication → Email** — enable confirmations for password signups.
3. **Site URL / Redirect URLs** — match `NEXT_PUBLIC_APP_URL`.
