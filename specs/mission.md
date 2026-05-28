# Mission

## What we are building

**FitSprint** is a scalable, cloud-hosted fitness SaaS platform—a complete digital fitness ecosystem for people who want more than a single-purpose tracker.

The platform unifies:

- Workout planning and logging
- Nutrition tracking
- Progress analytics
- Subscriptions and premium services
- Educational content (blog/CMS)
- Trainer programs and interaction
- Community engagement

It serves **multiple roles**: visitors, registered users, premium subscribers, trainers, and administrators—while keeping a **strength-training-first** experience for users who care about control, flexibility, and serious insights in the gym.

## Why we are building it

Most fitness products force a tradeoff: mass-market simplicity versus power-user depth. FitSprint aims to deliver **both breadth and depth**:

- **Breadth** — One platform for training, nutrition, progress, community, and coaching-related workflows
- **Depth** — Workout logging and analytics that respect how serious lifters train (custom exercises, templates, meaningful metrics, data portability)

We are not building another engagement-only social app. Community, gamification, and content exist to **support** training outcomes—not replace them.

## Who it is for

| Segment | Need |
|---------|------|
| **Solo gym lifters** (core DNA) | Precise logging, templates, progress insights, data ownership |
| **General fitness users** | Plans, nutrition, measurements, approachable dashboards |
| **Premium users** | Advanced analytics, personalized plans, premium content |
| **Trainers** | Profiles, published programs, client inquiries, ratings |
| **Administrators** | Users, subscriptions, moderation, platform analytics |

**Early release priority (Phases 1–4):** Auth (email + OAuth) — **delivered in Phase 1**; wire profiles and workout core to DB (Phase 3), then progress tracking (Phase 4). **UI shells** for dashboard, nutrition, progress, community, pricing, and admin are **built in Phase 1** with dummy data (see [roadmap.md](./roadmap.md)).

## Core objectives (from product requirements)

1. Deliver personalized fitness experiences
2. Enable workout and nutrition tracking
3. Provide subscription-based premium services
4. Support trainers and community engagement
5. Maintain high performance and scalability
6. Ensure strong security and accessibility (WCAG 2.1)

## Product principles

1. **API-first, modular design** — Features map to clear modules (auth, workouts, nutrition, progress, etc.) that can ship independently.
2. **Frictionless sign-in** — Email/password and OAuth (Google, Apple, Facebook) delivered in Phase 1; polish in Phase 2.
3. **Control & flexibility** — Especially in workouts: user-defined exercises, adaptable logging, templates—not only preset flows.
4. **Insight over noise** — Analytics answer training and health questions; avoid vanity dashboards.
5. **Data ownership** — Exportable history, transparent storage, GDPR-aligned practices; no lock-in by design.
6. **Security by default** — RBAC, RLS, HTTPS, audited admin actions, payments via compliant providers.
7. **Accessible & performant** — WCAG 2.1; homepage < 3s; APIs < 500ms targets at scale.

## Success criteria (directional)

**Platform**

- Users can register or sign in via email/password or OAuth, manage profiles, and access role-appropriate features
- Workout and nutrition data persist reliably with clear permissions
- Premium and payments work end-to-end without storing raw card data
- Admins can moderate users and content

**Strength-first core**

- A serious lifter can log sessions with custom exercises and templates
- Progress charts and (premium) advanced metrics inform training decisions
- Users can export training history in open formats

## Non-goals (initial releases)

- Replacing certified medical or nutrition advice
- Native mobile apps before responsive web is excellent
- AI coaching, live streaming, wearables—documented as future enhancements
- Implementing every module in parallel; **phased delivery** is required

## Relationship to documentation

- **[README.md](../README.md)** — Full feature list, NFRs, APIs, entities
- **[tech-stack.md](./tech-stack.md)** — Canonical technical decisions
- **[roadmap.md](./roadmap.md)** — Implementation order by phase
