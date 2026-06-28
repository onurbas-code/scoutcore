-- ScoutCore V15 Elite Migration
-- Sadece bir kez Supabase SQL Editor içinde çalıştırın. Mevcut veriyi silmez.

create extension if not exists "pgcrypto";

alter table public.players
add column if not exists injury_history text default '';

create table if not exists public.transfer_committee_comments (
  id uuid primary key default gen_random_uuid(),
  committee_id uuid references public.transfer_committee(id) on delete cascade,
  author text default '',
  comment_text text default '',
  vote_type text default 'Beklet',
  created_by uuid references auth.users(id),
  created_at timestamptz default now()
);

alter table public.transfer_committee_comments enable row level security;
drop policy if exists "transfer_committee_comments all access" on public.transfer_committee_comments;
create policy "transfer_committee_comments all access" on public.transfer_committee_comments
for all to anon, authenticated using (true) with check (true);

alter table public.players enable row level security;
drop policy if exists "players all access" on public.players;
create policy "players all access" on public.players
for all to anon, authenticated using (true) with check (true);
