-- Phase 3: Seed public workout templates (library) — idempotent

do $$
begin
  if exists (select 1 from public.workout_templates limit 1) then
    return;
  end if;

  insert into public.workout_templates (
    name, target, category, level, duration_minutes, calories_estimate, image_url, is_public
  )
  values
    (
      'HIIT Inferno',
      'Full Body',
      'cardio',
      'Advanced',
      45,
      620,
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
      true
    ),
    (
      'Power Sculpt',
      'Upper Body',
      'strength',
      'Intermediate',
      60,
      480,
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
      true
    ),
    (
      'Core Crusher',
      'Core',
      'strength',
      'Beginner',
      30,
      280,
      'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=800&q=80',
      true
    ),
    (
      'Sunrise Flow',
      'Full Body',
      'flexibility',
      'Beginner',
      35,
      190,
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
      true
    ),
    (
      'Sprint Intervals',
      'Lower Body',
      'cardio',
      'Intermediate',
      40,
      540,
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80',
      true
    ),
    (
      'Deep Stretch',
      'Mobility',
      'flexibility',
      'Intermediate',
      25,
      120,
      'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&q=80',
      true
    );
end $$;
