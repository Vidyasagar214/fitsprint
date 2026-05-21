# FitSprint — Deploy on Vercel

Phase 0 foundation deployment guide. Aligns with [tech-stack.md](../specs/tech-stack.md) and [validation.md](../specs/2026-05-21-phase-0-foundation/validation.md).

## Prerequisites

- Git repository pushed to GitHub, GitLab, or Bitbucket
- Supabase project with `profiles` migration applied
- Local `npm run build` passes

## 1. Import project

1. Open [vercel.com/new](https://vercel.com/new).
2. Import **TRAINLYTICS** / **fitsprint** repository.
3. Framework preset: **Next.js** (auto-detected).
4. Root directory: `.` (repository root).

## 2. Environment variables

Add for **Production** and **Preview**:

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → anon `public` key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → service_role key (server only) |
| `NEXT_PUBLIC_APP_URL` | `https://<your-production-domain>` (no trailing slash) |

**Important:** After first deploy, set `NEXT_PUBLIC_APP_URL` to your stable Vercel URL (e.g. `https://fitsprint.vercel.app`) and redeploy so OAuth redirects work.

Vercel also sets `VERCEL_URL` automatically; the app uses it as a fallback when `NEXT_PUBLIC_APP_URL` is unset.

## 3. Supabase Auth URLs

In Supabase **Authentication → URL configuration**:

| Field | Value |
|-------|--------|
| Site URL | Your `NEXT_PUBLIC_APP_URL` |
| Redirect URLs | `https://<domain>/auth/callback`, `http://localhost:3000/auth/callback` |

Add preview URLs if needed: `https://*-your-team.vercel.app/auth/callback` (wildcard per Supabase docs).

## 4. Deploy

**Dashboard:** Deploy from import flow.

**CLI:**

```bash
npm i -g vercel
vercel login
vercel link
vercel env pull .env.local   # optional, for local parity
vercel --prod
```

## 5. Post-deploy verification

```bash
curl https://<your-domain>/api/health
# {"ok":true,"db":"ok"}  when Supabase env is set

curl -I https://<your-domain>/
# 200
```

Manual:

- [ ] Landing `/` loads with FitSprint branding
- [ ] Sign up → dashboard (email)
- [ ] Sign out → home
- [ ] `/dashboard` redirects to `/login` when logged out
- [ ] OAuth (if providers configured)

Record deploy URL in [validation.md](../specs/2026-05-21-phase-0-foundation/validation.md) sign-off.

## 6. Rollback

Vercel → Deployments → select previous deployment → **Promote to Production**.

## CI (Phase 1)

GitHub Actions is deferred to Phase 1. Vercel builds on each push when the repo is linked.
