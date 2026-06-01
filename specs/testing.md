# FitSprint — Testing (SDD)

How testing fits **Spec-Driven Development** in this repo: specs define *what* must be true; automated tests prove *parts* of that; `validation.md` checklists cover the rest.

---

## SDD testing layers

| Layer | Where it lives | When to use |
|-------|----------------|-------------|
| **Requirements** | `specs/<phase>/requirements.md` | Behaviors and acceptance criteria for the phase |
| **Plan** | `specs/<phase>/plan.md` | What to build; note testable modules |
| **Validation** | `specs/<phase>/validation.md` | Manual sign-off, curl checks, Supabase dashboard steps |
| **Unit tests** | `tests/unit/**/*.test.ts` | Pure logic: RBAC, dates, BMI, chart helpers |
| **CI** | `.github/workflows/ci.yml` | `lint` → `typecheck` → `test` → `build` on every PR |

**Rule:** Do not mark a phase complete in `validation.md` until CI is green and relevant unit tests exist for new pure logic (or an explicit note why not, e.g. UI-only).

---

## What we unit-test (Phases 1–3)

| Area | Module | Examples |
|------|--------|----------|
| Auth / RBAC | `lib/auth/rbac.ts`, `roles.ts`, `session.ts` | Route access, premium gate, admin routing |
| Fitness | `lib/fitness/bmi.ts` | BMI calculation |
| Data shaping | `lib/db/dates.ts` | Date strings, day labels, relative session text |
| Charts | `components/charts/types.ts`, `chart-theme.ts` | Pie slice mapping, theme tokens |
| Utils | `lib/utils.ts` | `cn()` merge (optional) |

**Not in unit scope yet (use validation.md + manual/E2E later):**

- Full Next.js pages and Chart.js canvas rendering
- Supabase RLS and live DB (integration tests / staging checklist)
- OAuth and email flows (manual + optional Playwright in a later phase)

---

## Commands

```bash
npm run test          # single run (CI)
npm run test:watch    # local development
```

---

## Adding tests for a new phase

1. Read `requirements.md` → list behaviors that are **pure functions** or **deterministic rules**.
2. Add or extend `tests/unit/<module>.test.ts` beside the mental map of `lib/` or `components/`.
3. Add manual steps to `specs/<phase>/validation.md` for UI, auth email, and DB.
4. Ensure `npm run test` passes locally before updating phase status to ✅.

---

## Conventions

- File name: `<module>.test.ts` under `tests/unit/`, grouped by domain (`auth/`, `fitness/`, `charts/`, `db/`).
- Prefer **table-driven** `it.each` for RBAC and route matrices.
- Use `vi.useFakeTimers()` when testing date-relative copy (`formatRelativeSessionDate`).
- No network, no real Supabase — mock at integration boundaries in future phases.

---

## Phase coverage snapshot

| Phase | Automated unit tests | Manual validation |
|-------|----------------------|-------------------|
| 1 Foundation | BMI, `cn`, dates (partial) | `2026-05-21-phase-1-foundation/validation.md` |
| 2 Auth & CI | RBAC, roles, session helpers | `2026-05-22-phase-2-auth-ci/validation.md` |
| 3 Workouts MVP | Dates + chart helpers | `2026-05-24-phase-3-workouts-mvp/validation.md` |
| 4+ Nutrition | TBD when APIs land | TBD |
