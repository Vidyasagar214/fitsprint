# FitSprint — Local setup

Phase 0 foundation. See [specs/2026-05-21-phase-0-foundation](../specs/2026-05-21-phase-0-foundation/).

## Prerequisites

- Node.js 20+
- npm 10+
- Supabase project (URL + keys) — required from Phase 0 task group 4 onward

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

3. **Database**  
   Run migration from repo root:
   ```bash
   supabase link --project-ref <your-ref>
   supabase db push
   ```
   Or paste `supabase/migrations/20260521120000_profiles.sql` into the SQL editor.

### Auth flows

- **Sign up / sign in** — email + password at `/signup` and `/login`
- **OAuth** — Google, Apple, Facebook buttons (requires provider config)
- **Sign out** — button in dashboard header
- **Protected routes** — `/dashboard/*` redirects to `/login` when logged out
- After login, users land on **`/dashboard`**

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (Turbopack) at http://localhost:3000 |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |

## Verify (after full Phase 0)

```bash
npm run build
npm run lint
npm run typecheck
curl http://localhost:3000/api/health
```

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
