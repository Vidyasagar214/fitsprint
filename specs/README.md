# FitSprint — Specifications

Constitution and phased delivery docs for the **Fitness Website Platform** (product name: **FitSprint**).

## Document map

| Document | Purpose |
|----------|---------|
| [../README.md](../README.md) | Full requirements: features, NFRs, APIs, entities |
| [mission.md](./mission.md) | What/why, audience, principles |
| [tech-stack.md](./tech-stack.md) | Canonical stack and architecture |
| [roadmap.md](./roadmap.md) | Phases 1–12 in implementation order |
| [testing.md](./testing.md) | SDD testing strategy (unit tests + validation) |
| [design/ui-ux.md](./design/ui-ux.md) | UI/UX design controls (you define) |

## Feature specs

| Phase | Folder | Status |
|-------|--------|--------|
| **1 — Foundation** | [2026-05-21-phase-1-foundation](./2026-05-21-phase-1-foundation/) | ✅ Complete |
| **2 — Auth polish & CI** | [2026-05-22-phase-2-auth-ci](./2026-05-22-phase-2-auth-ci/) | ✅ Complete |
| **3 — Workouts MVP** | [2026-05-24-phase-3-workouts-mvp](./2026-05-24-phase-3-workouts-mvp/) | ✅ Complete |

Phase 1 includes [vision-alignment.md](./2026-05-21-phase-1-foundation/vision-alignment.md) vs original platform requirements.

Each feature folder contains `requirements.md`, `plan.md`, and `validation.md`. Automated unit tests live in `tests/unit/` and are described in [testing.md](./testing.md).

## Vision alignment (summary)

FitSprint delivers a **modular fitness SaaS** (workouts, nutrition, progress, subscriptions, community, trainers, CMS, admin) with **strength-training depth** for serious lifters. Delivery is strictly phased; do not implement later modules before earlier exit criteria are met.
