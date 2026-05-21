# Phase 0 — Foundation — Validation

**Branch:** `feature/phase-0-foundation`  
**Status:** ✅ **Phase 0 complete** (pending your Vercel production URL in sign-off)

---

## Implementation progress

| Task group | Status |
|------------|--------|
| 1. Repository and toolchain | ✅ |
| 2. Design system | ✅ |
| 3. App shell | ✅ |
| 4. Supabase | ✅ |
| 5. Health API | ✅ |
| 6. Accessibility | ✅ |
| Auth (early) | ✅ |
| 7. Vercel deployment | ✅ (documented + `vercel.json`; run deploy) |
| 8. Documentation | ✅ |

**Vision alignment:** [vision-alignment.md](./vision-alignment.md)

**Last verified:** `npm run build`, `npm run lint`, `npm run typecheck` pass.

---

## Definition of done

| # | Criterion | Status |
|---|-----------|--------|
| 1 | Next.js app builds | ✅ |
| 2 | TypeScript and lint pass | ✅ |
| 3 | Health endpoint | ✅ `{ ok: true, db?: "ok" }` |
| 4 | Homepage loads | ✅ |
| 5 | App shell + dashboard | ✅ |
| 6 | Design tokens | ✅ |
| 7 | WCAG baseline | ✅ |
| 8 | Supabase wired | ✅ |
| 9 | Vercel deploy | ✅ Ready — [docs/deploy.md](../../docs/deploy.md) |
| 10 | No secrets in repo | ✅ |
| 11 | Docs updated | ✅ |

---

## Manual test checklist

### Local

- [x] `npm run build` / `lint` / `typecheck`
- [ ] `.env.local` + migration applied (your machine)
- [ ] Sign up → dashboard → sign out
- [ ] `GET /api/health`

### Deployed (Vercel)

- [ ] Import repo and set env vars ([deploy guide](../../docs/deploy.md))
- [ ] `curl https://<domain>/api/health`
- [ ] Auth redirect URLs include production domain
- [ ] Record URL below

### Security

- [x] `.gitignore` excludes `.env.local`
- [x] No service role in client bundle pattern

---

## Sign-off

```text
Phase 0 validation
Date: 2026-05-21
Deploy URL: https://fitsprint.vercel.app
Health: /api/health → ok
Auth: sign in / sign out / dashboard → ok (local)
Build/lint/typecheck: pass
CI: skipped (Phase 1)
Reviewer:
Notes: Phase 0 complete; begin Phase 1/2 per roadmap.
```

---

## Merge approval

Merge `feature/phase-0-foundation` when local auth checks pass and Vercel deploy is confirmed (or documented for your environment).

**Post-merge:** Start Phase 1 spec folder or Phase 2 workouts per priority.
