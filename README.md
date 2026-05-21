# FitSprint — Fitness Website Platform

A scalable, cloud-hosted fitness SaaS web application that combines workout planning, nutrition tracking, analytics, subscriptions, educational content, trainer interaction, and community engagement into a unified experience.

Built with **Next.js**, **TypeScript**, **Supabase**, and **Tailwind CSS**, deployed on **Vercel**.

---

## Executive summary

FitSprint is designed for multiple user roles: visitors, registered users, premium users, trainers, and administrators. The platform emphasizes:

- Responsive, API-first web architecture
- Modular system design
- Secure authentication and payments
- Scalable cloud infrastructure
- Future support for mobile and wearable integrations

**Product constitution** (mission, stack, phased delivery): see [`specs/`](./specs/). **Phase 0 complete** — [foundation spec](./specs/2026-05-21-phase-0-foundation/); **next:** Phase 1 polish / Phase 2 workouts.

---

## Getting started

```bash
npm install
cp .env.example .env.local   # add Supabase keys when integrating Supabase
npm run dev
```

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server (http://localhost:3000) |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |

Full setup: [docs/setup.md](./docs/setup.md) · Deploy: [docs/deploy.md](./docs/deploy.md)

### Phase 0 status

| Capability | Status |
|------------|--------|
| Landing, about, design system | ✅ |
| Sign up / sign in / sign out | ✅ |
| OAuth (Google, Apple, Facebook) | ✅ (configure in Supabase) |
| Protected dashboard | ✅ |
| Health API | ✅ `GET /api/health` |
| Vercel deploy | 📋 Follow [docs/deploy.md](./docs/deploy.md) |

---

## Core objectives

- Deliver personalized fitness experiences
- Enable workout and nutrition tracking
- Provide subscription-based premium services
- Support trainers and community engagement
- Maintain high performance and scalability
- Ensure strong security and accessibility compliance

---

## Features

### Authentication & user management

- Email/password registration
- OAuth / social login (Google, Apple, Facebook) via Supabase Auth
- Session-based JWT authentication (issued by Supabase Auth)
- Role-based access control (RBAC)
- Password reset and email verification
- User profile management

### User profiles

- Profile editing
- Fitness goal management
- BMI calculation
- Activity tracking preferences

### Workout management

- Personalized workout plans
- Exercise filtering
- Workout completion tracking
- Exercise videos and instructions
- Favorite workouts

### Nutrition tracking

- Meal logging
- Calorie and macro calculation
- Water intake tracking
- Searchable food database
- Nutrition recommendations

### Progress tracking

- Weight and measurement tracking
- Progress charts and reports
- Achievement milestones
- Progress photo uploads

### Subscriptions

- Free and premium plans
- Monthly and yearly billing
- Payment gateway integration (Stripe / Razorpay)
- Trial plans and cancellation

### Community

- Posts and discussions
- Likes, comments, replies
- User following
- Achievement badges
- Moderation tools

### Trainers

- Trainer profiles
- Program publishing
- User inquiries
- Trainer ratings

### Blog & CMS

- Blog publishing
- SEO support
- Categories and tags
- Embedded video support

### Notifications

- Email and in-app notifications
- Workout reminders
- Subscription alerts
- User notification preferences

### Admin dashboard

- User management
- Subscription management
- Content moderation
- Analytics dashboard
- Community management

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Application | Next.js (App Router) + TypeScript |
| UI | React + shadcn/ui + Tailwind CSS |
| Data & authentication | Supabase (Postgres, Auth, Row Level Security) |
| Hosting | Vercel (app + serverless/edge functions) |
| Repository | Single Next.js app (monorepo not required initially) |

**Supporting services** (introduced as scale requires): Redis caching, object storage for media, payment provider APIs, email provider.

---

## System architecture

### Frontend

- Next.js application
- Tailwind CSS + shadcn/ui
- Responsive, mobile-first UI
- SEO-optimized public pages

### Backend

- Next.js Route Handlers and Server Actions (API-first)
- Supabase Auth (session/JWT via Supabase; RBAC in app + database)
- Business logic in server modules and Supabase RLS policies
- Notification services (email, in-app)

### Data layer

- PostgreSQL (Supabase)
- Object storage for media (Supabase Storage or S3-compatible)
- Optional Redis for caching at scale
- Analytics and audit logging

---

## User roles

| Role | Capabilities |
|------|----------------|
| **Visitor** | Browse public pages; view limited content |
| **Registered user** | Dashboard; workout and nutrition tracking; community participation |
| **Premium user** | Advanced analytics; personalized plans; premium content |
| **Trainer** | Trainer profile; program publishing; user interaction |
| **Administrator** | Full system management; moderation; analytics; subscriptions |

---

## Functional modules

| Module | Purpose |
|--------|---------|
| Authentication | Login and access control |
| Profiles | User fitness information |
| Workouts | Exercises and plans |
| Nutrition | Meal tracking |
| Progress | Analytics and reports |
| Subscription | Premium billing |
| Community | Social engagement |
| Trainers | Fitness coaching |
| CMS | Blog and educational content |
| Notifications | Alerts and reminders |
| Admin | System management |

---

## Non-functional requirements

### Performance targets

| Requirement | Target |
|-------------|--------|
| Homepage load time | < 3 seconds |
| API response time | < 500 ms |
| Database query time | < 200 ms |
| Concurrent users | 10,000+ |

### Security

- HTTPS encryption
- Authenticated APIs with RBAC
- Password hashing (via Supabase Auth)
- SQL injection prevention (parameterized queries, RLS)
- XSS and CSRF protection
- Rate limiting
- Audit logging
- GDPR alignment
- PCI-DSS via payment provider (no raw card storage)
- OWASP best practices

### Accessibility

- WCAG 2.1 compliance
- Keyboard navigation
- Screen reader support
- Sufficient contrast and responsive typography
- Alt text for media

### Scalability & reliability

- Horizontal scaling via serverless/CDN and edge caching
- Load distribution via Vercel/CDN (load balancing at platform layer)
- Database indexing and query optimization
- 99.9% uptime target
- Automated backups and disaster recovery
- Monitoring and alerts

---

## API overview

REST-style routes under Next.js `/api` (representative):

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/reset-password
```

### Workouts

```http
GET    /api/workouts
POST   /api/workouts/create
PUT    /api/workouts/update
DELETE /api/workouts/delete
```

### Nutrition

```http
POST /api/nutrition/log
GET  /api/nutrition/history
GET  /api/nutrition/recommendations
```

Additional modules follow the same pattern (`/api/progress`, `/api/community`, etc.).

---

## Database entities (core)

- Users & roles
- Workout plans & exercises
- Nutrition logs
- Progress records
- Subscriptions & payments
- Trainers
- Blog posts
- Comments & community content
- Notifications

Schema and migrations live in Supabase (see `specs/tech-stack.md`).

---

## Project structure (target)

```text
fitsprint/
├── app/                    # Next.js App Router (pages, API routes)
├── components/             # UI components
├── lib/                    # Shared server/client utilities
├── supabase/               # Migrations, seeds, local config
├── public/                 # Static assets
├── specs/                  # Constitution (mission, stack, roadmap)
├── docs/                   # Additional documentation
└── README.md
```

---

## Deployment

- **Primary:** Vercel (application + previews)
- **Database & auth:** Supabase
- **CI/CD:** Automated builds, tests, staging deployments, rollback support

Alternative cloud providers (AWS, GCP, Azure) are viable for enterprise or self-hosted variants later.

---

## Future enhancements

- Native mobile applications
- AI-powered coaching
- Wearable integrations
- Live workout streaming
- Voice assistant support
- Gamification
- Multilingual support

---

## Acceptance criteria

The system is release-ready when:

- All critical features for the target phase are implemented
- Security review passes
- Performance benchmarks are met
- Accessibility compliance is verified
- Stakeholders approve the release

---

## License

Proprietary unless otherwise specified.
