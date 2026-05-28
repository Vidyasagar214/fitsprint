-- FitSprint domain schema (Phase 1 UI shell → Phase 3+ data wiring)
-- Maps to user dashboard, admin panel, and README § Database entities.
-- UI currently uses lib/data/* dummy data until APIs and RLS policies are completed per phase.

-- ---------------------------------------------------------------------------
-- Profile extensions (Profile & Settings UI)
-- ---------------------------------------------------------------------------

alter table public.profiles
  add column if not exists bio text,
  add column if not exists avatar_url text,
  add column if not exists units text not null default 'metric'
    check (units in ('metric', 'imperial')),
  add column if not exists streak_days integer not null default 0,
  add column if not exists training_focus text[] default '{}';

create table if not exists public.user_notification_preferences (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  workout_reminders boolean not null default true,
  goal_progress boolean not null default true,
  community_activity boolean not null default false,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Dashboard goals & activity (Dashboard, Nutrition, Progress UI)
-- ---------------------------------------------------------------------------

create table if not exists public.user_daily_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  goal_date date not null default current_date,
  calories_current integer not null default 0,
  calories_target integer not null default 2200,
  protein_current_g integer not null default 0,
  protein_target_g integer not null default 180,
  steps_current integer not null default 0,
  steps_target integer not null default 10000,
  water_glasses_filled smallint not null default 0,
  water_glasses_target smallint not null default 8,
  unique (user_id, goal_date)
);

create table if not exists public.daily_activity_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  activity_date date not null,
  calories_burned integer not null default 0,
  active_minutes integer not null default 0,
  resting_heart_rate smallint,
  sleep_score smallint,
  unique (user_id, activity_date)
);

create index if not exists daily_activity_user_date_idx
  on public.daily_activity_snapshots (user_id, activity_date desc);

-- ---------------------------------------------------------------------------
-- Workouts (Workout library UI → Phase 2)
-- ---------------------------------------------------------------------------

create table if not exists public.exercises (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  category text not null check (category in ('cardio', 'strength', 'flexibility')),
  muscle_group text,
  equipment text,
  level text check (level in ('Beginner', 'Intermediate', 'Advanced')),
  instructions_url text,
  video_url text,
  image_url text,
  is_builtin boolean not null default true,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.workout_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  target text,
  category text not null check (category in ('cardio', 'strength', 'flexibility')),
  level text not null check (level in ('Beginner', 'Intermediate', 'Advanced')),
  duration_minutes integer not null,
  calories_estimate integer,
  image_url text,
  is_public boolean not null default true,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.workout_template_exercises (
  template_id uuid not null references public.workout_templates (id) on delete cascade,
  exercise_id uuid not null references public.exercises (id) on delete cascade,
  sort_order integer not null default 0,
  primary key (template_id, exercise_id)
);

create table if not exists public.workout_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  template_id uuid references public.workout_templates (id) on delete set null,
  name text not null,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  duration_minutes integer,
  calories_burned integer,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists workout_sessions_user_idx
  on public.workout_sessions (user_id, started_at desc);

create table if not exists public.workout_session_sets (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.workout_sessions (id) on delete cascade,
  exercise_id uuid references public.exercises (id) on delete set null,
  set_number smallint not null,
  reps smallint,
  weight_kg numeric(8, 2),
  completed boolean not null default false
);

-- ---------------------------------------------------------------------------
-- Nutrition (Nutrition UI → Phase 4)
-- ---------------------------------------------------------------------------

create table if not exists public.nutrition_meals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  meal_type text not null check (meal_type in ('Breakfast', 'Lunch', 'Dinner', 'Snack')),
  logged_at timestamptz not null default now(),
  items_description text,
  kcal integer not null default 0,
  protein_g integer not null default 0,
  carbs_g integer not null default 0,
  fat_g integer not null default 0,
  thumb_url text
);

create index if not exists nutrition_meals_user_idx
  on public.nutrition_meals (user_id, logged_at desc);

create table if not exists public.nutrition_daily_macros (
  user_id uuid not null references public.profiles (id) on delete cascade,
  macro_date date not null default current_date,
  protein_g integer not null default 0,
  carbs_g integer not null default 0,
  fat_g integer not null default 0,
  total_kcal integer not null default 0,
  primary key (user_id, macro_date)
);

-- ---------------------------------------------------------------------------
-- Progress (Progress UI → Phase 3)
-- ---------------------------------------------------------------------------

create table if not exists public.body_measurements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  recorded_at timestamptz not null default now(),
  weight_kg numeric(6, 2),
  body_fat_pct numeric(5, 2),
  notes text
);

create table if not exists public.progress_metrics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  metric_key text not null,
  label text not null,
  value text not null,
  change_summary text,
  period_label text,
  recorded_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Community (Community UI → Phase 6)
-- ---------------------------------------------------------------------------

create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  body text,
  thumb_url text,
  has_video boolean not null default false,
  likes_count integer not null default 0,
  comments_count integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.community_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.community_posts (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.community_likes (
  post_id uuid not null references public.community_posts (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

-- ---------------------------------------------------------------------------
-- Subscriptions (Pricing UI → Phase 5)
-- ---------------------------------------------------------------------------

create table if not exists public.subscription_plans (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  price_display text not null,
  price_cents integer,
  billing_period text not null check (billing_period in ('forever', 'month', 'year')),
  blurb text,
  features text[] not null default '{}',
  is_active boolean not null default true,
  sort_order smallint not null default 0
);

create table if not exists public.user_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  plan_id uuid not null references public.subscription_plans (id),
  status text not null default 'active'
    check (status in ('active', 'trialing', 'canceled', 'past_due')),
  started_at timestamptz not null default now(),
  ends_at timestamptz,
  unique (user_id, plan_id)
);

-- ---------------------------------------------------------------------------
-- Trainers (Admin trainers UI → Phase 7)
-- ---------------------------------------------------------------------------

create table if not exists public.trainers (
  profile_id uuid primary key references public.profiles (id) on delete cascade,
  specialty text,
  bio text,
  rating_avg numeric(3, 2),
  client_count integer not null default 0,
  is_listed boolean not null default true
);

create table if not exists public.trainer_programs (
  id uuid primary key default gen_random_uuid(),
  trainer_id uuid not null references public.trainers (profile_id) on delete cascade,
  title text not null,
  description text,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- CMS / content (Admin content UI → Phase 8)
-- ---------------------------------------------------------------------------

create table if not exists public.cms_content (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content_type text not null check (content_type in ('Workout', 'Tool', 'Article', 'Video')),
  status text not null default 'Draft'
    check (status in ('Draft', 'Review', 'Published', 'Archived')),
  author_label text,
  thumb_url text,
  has_video boolean not null default false,
  body text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Admin moderation & reports (Admin UI → Phase 9)
-- ---------------------------------------------------------------------------

create table if not exists public.content_moderation_flags (
  id uuid primary key default gen_random_uuid(),
  reported_user_label text,
  reason text not null,
  priority text not null check (priority in ('LOW', 'MEDIUM', 'HIGH')),
  thumb_url text,
  status text not null default 'open' check (status in ('open', 'reviewed', 'dismissed')),
  created_at timestamptz not null default now()
);

create table if not exists public.platform_reports (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  generated_at timestamptz not null default now(),
  format text not null check (format in ('PDF', 'CSV')),
  file_url text
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles (id) on delete set null,
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- RLS helpers
-- ---------------------------------------------------------------------------

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Enable RLS on new tables
alter table public.user_notification_preferences enable row level security;
alter table public.user_daily_goals enable row level security;
alter table public.daily_activity_snapshots enable row level security;
alter table public.exercises enable row level security;
alter table public.workout_templates enable row level security;
alter table public.workout_template_exercises enable row level security;
alter table public.workout_sessions enable row level security;
alter table public.workout_session_sets enable row level security;
alter table public.nutrition_meals enable row level security;
alter table public.nutrition_daily_macros enable row level security;
alter table public.body_measurements enable row level security;
alter table public.progress_metrics enable row level security;
alter table public.community_posts enable row level security;
alter table public.community_comments enable row level security;
alter table public.community_likes enable row level security;
alter table public.subscription_plans enable row level security;
alter table public.user_subscriptions enable row level security;
alter table public.trainers enable row level security;
alter table public.trainer_programs enable row level security;
alter table public.cms_content enable row level security;
alter table public.content_moderation_flags enable row level security;
alter table public.platform_reports enable row level security;
alter table public.audit_logs enable row level security;

-- Owner policies (user-owned rows)
create policy "Own notification prefs"
  on public.user_notification_preferences for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Own daily goals"
  on public.user_daily_goals for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Own activity snapshots"
  on public.daily_activity_snapshots for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Own workout sessions"
  on public.workout_sessions for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Own session sets via session"
  on public.workout_session_sets for all
  using (
    exists (
      select 1 from public.workout_sessions s
      where s.id = session_id and s.user_id = auth.uid()
    )
  );

create policy "Own nutrition meals"
  on public.nutrition_meals for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Own daily macros"
  on public.nutrition_daily_macros for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Own body measurements"
  on public.body_measurements for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Own progress metrics"
  on public.progress_metrics for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Own subscriptions read"
  on public.user_subscriptions for select
  using (auth.uid() = user_id);

-- Public read for catalog tables (write restricted to admin / creators in later phases)
create policy "Public read exercises"
  on public.exercises for select using (true);

create policy "Public read workout templates"
  on public.workout_templates for select using (is_public = true);

create policy "Public read subscription plans"
  on public.subscription_plans for select using (is_active = true);

create policy "Public read community posts"
  on public.community_posts for select using (true);

create policy "Public read trainers"
  on public.trainers for select using (is_listed = true);

-- Admin policies (server/UI admin role — full access for moderation tables)
create policy "Admin all moderation flags"
  on public.content_moderation_flags for all
  using (public.is_admin()) with check (public.is_admin());

create policy "Admin all cms content"
  on public.cms_content for all
  using (public.is_admin()) with check (public.is_admin());

create policy "Admin all platform reports"
  on public.platform_reports for all
  using (public.is_admin()) with check (public.is_admin());

create policy "Admin read audit logs"
  on public.audit_logs for select
  using (public.is_admin());
