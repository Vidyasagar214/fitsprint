-- Phase 3: Profile fitness fields + auto-create prefs/goals for new users

alter table public.profiles
  add column if not exists height_cm smallint,
  add column if not exists weight_kg numeric(5, 2),
  add column if not exists fitness_goal text;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  assigned_role text := 'user';
begin
  if lower(new.email) = 'admin@fitsprint.com' then
    assigned_role := 'admin';
  end if;

  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', ''),
    assigned_role
  );

  insert into public.user_notification_preferences (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  insert into public.user_daily_goals (user_id, goal_date)
  values (new.id, current_date)
  on conflict (user_id, goal_date) do nothing;

  return new;
end;
$$;
