-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES
-- One row per auth.users entry, auto-created via trigger
-- ============================================================
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  locale      text not null default 'th',
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ============================================================
-- SUBJECTS
-- Pre-seeded by system. Students can only read.
-- ============================================================
create table public.subjects (
  id          uuid primary key default uuid_generate_v4(),
  name_th     text not null,
  name_en     text not null,
  color       text not null default '#6366f1',
  icon        text,
  sort_order  integer not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- SUMMARIES
-- Daily lesson summaries created by students
-- ============================================================
create table public.summaries (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  subject_id      uuid references public.subjects(id) on delete set null,
  title           text not null,
  body            text not null,
  summary_date    date not null default current_date,
  tags            text[] not null default '{}',
  attachment_url  text,  -- reserved for future file upload feature
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ============================================================
-- ASSIGNMENTS
-- Assignments tracked by students
-- ============================================================
create table public.assignments (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  subject_id      uuid references public.subjects(id) on delete set null,
  title           text not null,
  description     text,
  due_date        date,
  type            text not null default 'homework'
                    check (type in ('homework', 'project', 'exam')),
  priority        text not null default 'medium'
                    check (priority in ('low', 'medium', 'high')),
  completed       boolean not null default false,
  completed_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
