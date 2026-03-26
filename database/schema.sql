-- Run this in your Supabase SQL editor to set up the project.

create extension if not exists "pgcrypto";

create table if not exists public.urls (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  original_url text not null,
  short_code  text not null unique,
  clicks      integer not null default 0
);

create index if not exists urls_short_code_idx on public.urls (short_code);

-- RLS
alter table public.urls enable row level security;

create policy "Allow public inserts" on public.urls
  for insert to anon with check (true);

create policy "Allow public reads" on public.urls
  for select to anon using (true);

-- Increment clicks atomically so concurrent reads don't race
create or replace function public.increment_clicks(code text)
returns void
language plpgsql security definer as $$
begin
  update public.urls set clicks = clicks + 1 where short_code = code;
end;
$$;
