-- ============================================================
-- ROW LEVEL SECURITY
-- All tables locked down. Students can only access their own data.
-- ============================================================

alter table public.profiles    enable row level security;
alter table public.subjects    enable row level security;
alter table public.summaries   enable row level security;
alter table public.assignments enable row level security;

-- Profiles: each user can only read and write their own profile
create policy "profiles: own row only"
  on public.profiles for all
  using (auth.uid() = id);

-- Subjects: all authenticated users can SELECT (read-only for students)
create policy "subjects: authenticated read"
  on public.subjects for select
  using (auth.role() = 'authenticated');

-- Summaries: students can only access their own rows
create policy "summaries: own rows only"
  on public.summaries for all
  using (auth.uid() = user_id);

-- Assignments: students can only access their own rows
create policy "assignments: own rows only"
  on public.assignments for all
  using (auth.uid() = user_id);

-- ============================================================
-- TRIGGER: Auto-create profile on user signup
-- ============================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name, locale)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'locale', 'th')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
