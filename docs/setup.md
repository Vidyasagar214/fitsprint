# FitSprint — Local setup

Phase 1 foundation. See [specs/2026-05-21-phase-1-foundation](../specs/2026-05-21-phase-1-foundation/).

## Prerequisites

- Node.js 20+
- npm 10+
- Supabase project (URL + keys) — required from Phase 1 task group 4 onward

## Install

```bash
npm install
```

## Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase values. Never commit `.env.local`.

| Variable | Required | Notes |
|----------|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes (auth) | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes (auth) | Anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional | Server-only; admin tasks later |
| `NEXT_PUBLIC_APP_URL` | Yes (OAuth) | `http://localhost:3000` locally |

### Supabase dashboard setup

1. **Authentication → URL configuration**  
   - Site URL: `http://localhost:3000` (and your Vercel URL)  
   - Redirect URLs: `http://localhost:3000/auth/callback`, `https://<your-app>.vercel.app/auth/callback`

2. **Authentication → Providers**  
   Enable Google, Apple, and Facebook; add OAuth client IDs/secrets per provider.

3. **Authentication → Email (Phase 2)**  
   Enable **Confirm email** for password sign-ups so new users land on `/verify-email` until confirmed.  
   Add redirect URLs: `{APP_URL}/auth/callback`, `{APP_URL}/auth/callback?next=/reset-password`.

4. **Database**  

   **Supabase SQL editor — run in this order** (one file at a time, wait for success before the next):

   | # | File | Purpose |
   |---|------|---------|
   | 1 | `supabase/migrations/20260521120000_profiles.sql` | `profiles` table, RLS, sign-up trigger |
   | 2 | `supabase/migrations/20260522120000_admin_role.sql` | Admin role for `admin@fitsprint.com` |
   | 3 | `supabase/migrations/20260523120000_domain_schema.sql` | Workouts, nutrition, progress, community, etc. |
   | 4 | `supabase/migrations/20260524120000_seed_workouts.sql` | Workout library seed data |
   | 5 | `supabase/migrations/20260524120001_phase3_profile_fields.sql` | Height/weight/goals + user setup trigger |

   Or from repo root with CLI:

   ```bash
   supabase link --project-ref <your-ref>
   supabase db push
   ```

   The domain migration (step 3) creates tables for later phases; the app UI still uses dummy data in `lib/data/*` until Phase 3+.

### Auth flows

- **Sign up / sign in** — same `/login` page for everyone (email + password or OAuth)
- **Regular users** — sign up at `/signup` → **`/verify-email`** (if email confirmation enabled) → **`/dashboard`**
- **Password reset** — `/forgot-password` → email link → `/reset-password`
- **Admin (demo)** — sign in only (no public signup):
  - Email: `admin@fitsprint.com`
  - Password: `password`
  - Lands on **`/admin`**
  - Requires **`SUPABASE_SERVICE_ROLE_KEY`** in `.env.local` so the app can auto-confirm the admin email (fixes “Email not confirmed”). Alternatively, confirm the user manually in Supabase → Authentication → Users.
- **OAuth** — Google, Apple, Facebook buttons (requires provider config)
- **Protected routes** — `/dashboard/*` and `/admin/*` require login; admins cannot access user dashboard routes (redirected to `/admin`)

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (Turbopack) at http://localhost:3000 |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |

## Verify (after full Phase 1)

```bash
npm run build
npm run lint
npm run typecheck
curl http://localhost:3000/api/health
```

**UI smoke test (dummy data):** sign in as a user → visit `/dashboard`, `/dashboard/workouts`, `/dashboard/nutrition`, `/dashboard/progress`, `/dashboard/community`, `/dashboard/pricing`. Sign in as admin → visit `/admin` and sub-pages.

## Project layout

```text
app/          # Routes and API
components/   # UI and site components
lib/          # Utilities and Supabase clients
supabase/     # Migrations (added in task group 4)
public/       # Static assets
```

## Deploy (Vercel)

See **[docs/deploy.md](./deploy.md)** for full steps, env vars, Supabase redirect URLs, and verification checklist.
