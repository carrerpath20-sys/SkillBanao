-- SkillBanao Stage 3 schema + RLS baseline

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('viewer', 'creator')) default 'viewer',
  full_name text,
  time_balance integer not null default 0,
  skill_points integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid references auth.users(id) on delete set null,
  title text not null,
  description text not null,
  module_count integer not null check (module_count > 0),
  time_cost integer not null check (time_cost >= 0),
  micro_price numeric(10,2) not null check (micro_price >= 0),
  video_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.creator_verifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  full_name text not null,
  cv_url text not null,
  certificate_url text not null,
  demo_video_url text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.creator_verifications enable row level security;

-- profiles
create policy if not exists "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy if not exists "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy if not exists "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

-- courses
create policy if not exists "courses_select_active_public"
  on public.courses for select
  using (is_active = true or creator_id = auth.uid());

create policy if not exists "courses_insert_creator"
  on public.courses for insert
  with check (creator_id = auth.uid());

create policy if not exists "courses_update_owner"
  on public.courses for update
  using (creator_id = auth.uid())
  with check (creator_id = auth.uid());

-- creator_verifications
create policy if not exists "verification_insert_own"
  on public.creator_verifications for insert
  with check (user_id = auth.uid());

create policy if not exists "verification_select_own"
  on public.creator_verifications for select
  using (user_id = auth.uid());
