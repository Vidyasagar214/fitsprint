# FitSprint — UI/UX specifications

Design controls and guidelines for FitSprint.

## Delivery status (Phase 1 — as-built)

| # | Spec screen | Status | Route | Data source |
|---|-------------|--------|-------|-------------|
| 1 | Landing page | ✅ Built | `/` | `lib/data/landing.ts` |
| 2 | Authentication | ✅ Live auth | `/login`, `/signup` | Supabase Auth |
| 3 | User dashboard | 🎨 UI shell | `/dashboard` | `lib/data/user-dashboard.ts` |
| 4 | Workout plans | 🎨 UI shell | `/dashboard/workouts` | Dummy library |
| 5 | Nutrition tracker | 🎨 UI shell | `/dashboard/nutrition` | Dummy meals/macros |
| 6 | Progress tracking | 🎨 UI shell | `/dashboard/progress` | Dummy metrics + charts |
| 7 | Community | 🎨 UI shell | `/dashboard/community` | Dummy feed |
| 8 | Trainer marketplace | ⏳ Partial | `/admin/trainers` only | Admin dummy data; public marketplace Phase 8 |
| 9 | Blog & CMS | ⏳ Partial | `/admin/content` | Admin list UI; public blog Phase 9 |
| 10 | Subscription & pricing | 🎨 UI shell | `/dashboard/pricing`, landing `#pricing` | Dummy plans |
| 11 | Admin dashboard | 🎨 UI shell | `/admin/*` | `lib/data/admin-dashboard.ts` |

🎨 = visual + interaction prototype; persistence in Phases 2–9 per [roadmap.md](../roadmap.md).

**Member charts:** `components/charts/weekly-activity-chart.tsx`, `macro-donut-chart.tsx`, `simple-bar-chart.tsx`  
**Member layout:** `components/site/user-dashboard-nav.tsx`, `user-dashboard-header.tsx`, `profile-dropdown.tsx`  
**Admin layout:** `components/admin/admin-sidebar.tsx`, `admin-page-header.tsx`

---

## Implementation map (codebase)

| Spec area | Location |
|-----------|----------|
| Design tokens (colors, glass, gradients, motion) | `app/globals.css` |
| Mesh background | `components/design/mesh-background.tsx` |
| Page / auth shells | `components/design/page-shell.tsx`, `auth-shell.tsx` |
| UI primitives | `components/ui/*` (Button, Card, Input, Badge) |
| Dashboard widgets | `components/dashboard/*` (stat-card, goal-progress, workout-library, …) |
| Charts | `components/charts/*` |
| Marketing sections | `components/marketing/*` |
| Dummy data | `lib/data/landing.ts`, `user-dashboard.ts`, `admin-dashboard.ts` |
| Media URLs | `lib/media.ts` |
| Default theme | Dark-first — `components/theme-provider.tsx` |
| Display font | Syne — `app/layout.tsx` |
| Brand logo | `public/fitsprint-logo.png` — `components/brand/fitsprint-logo.tsx` |
| Body font | Geist Sans — `app/layout.tsx` |

Create a premium, modern, visually stunning fitness website UI/UX design for a full-scale SaaS fitness platform. The design should feel high-end, futuristic, motivational, energetic, and conversion-focused while maintaining excellent usability and accessibility.



Design Style:



\* Modern glassmorphism + soft neumorphism hybrid

\* Clean layouts with premium spacing

\* High-end SaaS aesthetics similar to Apple, Nike, Strava, Fitbit, and modern AI startups

\* Smooth gradients, glowing accents, layered cards, soft shadows

\* Stunning hero sections with cinematic visuals

\* Dynamic typography hierarchy

\* Dark mode first with optional light mode support

\* Responsive mobile-first design

\* High-end animations and micro-interactions

\* Professional fitness branding with energetic visual language



Color Palette:



\* Primary: Deep black / charcoal background

\* Accent gradients: electric blue, neon green, vibrant orange, purple

\* Secondary neutrals: dark gray, silver, off-white

\* Use glowing gradient borders and modern UI highlights



Typography:



\* Bold modern sans-serif fonts

\* Large hero headlines

\* Minimal but premium UI labels

\* Clear hierarchy and readability



Generate the following pages/screens with complete UI consistency:



1\. Landing Page



\* Full-screen hero section with powerful fitness imagery/video background

\* Animated CTA buttons

\* Headline:

&#x20; “Transform Your Body. Elevate Your Life.”

\* Fitness stats counters

\* Features showcase cards

\* Testimonials carousel

\* Trainer showcase section

\* Subscription pricing section

\* Interactive BMI calculator section

\* App preview section

\* Community showcase

\* Footer with modern multi-column layout



2\. Authentication Screens



\* Login

\* Register

\* Forgot Password

\* Social login buttons

\* Elegant glassmorphism card design

\* Animated fitness background



3\. User Dashboard



\* Premium analytics dashboard

\* Personalized greeting

\* Workout progress widgets

\* Nutrition tracking cards

\* Calorie charts

\* Goal completion rings

\* Weekly fitness activity graph

\* Water intake tracker

\* Workout streak indicators

\* Responsive sidebar navigation

\* Dark premium admin-style interface



4\. Workout Plans Page



\* AI-powered workout recommendation cards

\* Exercise cards with video previews

\* Filter by muscle group, difficulty, equipment

\* Interactive workout calendar

\* Exercise detail modal

\* Progress tracking indicators



5\. Nutrition Tracker



\* Modern meal logging interface

\* Macro nutrient visualization

\* Circular progress charts

\* Daily calorie breakdown

\* Food search UI

\* Hydration tracker with animated visuals



6\. Progress Tracking Page



\* Weight progress graphs

\* Body measurement tracking

\* Fitness milestones timeline

\* Before/after transformation gallery

\* Achievement badges

\* Interactive data visualization



7\. Community Page



\* Social fitness feed

\* User posts and comments

\* Leaderboards

\* Fitness challenges

\* Achievement sharing cards

\* Modern social media inspired layout



8\. Trainer Marketplace



\* Professional trainer profile cards

\* Trainer ratings and reviews

\* Program showcase

\* Booking CTA sections

\* Premium coaching UI



9\. Blog \& Content Hub



\* Magazine-style fitness blog layout

\* Featured articles hero

\* Category filters

\* Video content cards

\* SEO-focused clean reading experience



10\. Subscription \& Pricing



\* Premium pricing cards

\* Monthly/yearly toggle

\* Feature comparison table

\* Animated hover interactions

\* Strong conversion-oriented layout



11\. Admin Dashboard



\* Advanced analytics

\* User management tables

\* Revenue tracking graphs

\* Community moderation panel

\* Content management system

\* Modern enterprise SaaS admin UI



UI Components Required:



\* Glassmorphism cards

\* Gradient buttons

\* Animated charts

\* Floating navigation

\* Sticky headers

\* Modern modals

\* Progress bars

\* Interactive toggles

\* Premium forms

\* AI assistant widget

\* Notification center

\* Search overlays



Graphics \& Visuals:



\* Hyper-realistic fitness imagery

\* Futuristic glowing UI effects

\* High-quality 3D illustrations

\* Fitness lifestyle renders

\* Dynamic gradients

\* Abstract mesh backgrounds

\* Motion blur transitions

\* Premium iconography

\* Soft particle effects

\* Modern data visualizations



Animation Requirements:



\* Smooth page transitions

\* Scroll-triggered animations

\* Hover micro-interactions

\* Floating UI effects

\* Loading skeletons

\* Interactive charts

\* Animated counters

\* Motion-based onboarding



Technical Design Requirements:



\* Responsive across desktop, tablet, mobile

\* WCAG accessibility compliance

\* Optimized UI spacing system

\* Component-based design system

\* Design tokens for colors and typography

\* Modern SaaS dashboard patterns

\* Tailwind CSS compatible styling

\* Next.js friendly component structure



Generate:



\* Complete UI design system

\* Reusable component library

\* Full page layouts

\* Mobile responsive views

\* Dark and light theme variations

\* Professional UX flows

\* Production-quality modern visuals



The final result should look like a billion-dollar fitness startup platform with world-class UI/UX quality, stunning graphics, cinematic visuals, modern SaaS design patterns, and highly engaging user experiences.




