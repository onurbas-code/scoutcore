-- ScoutCore V13 UI Fix / Stable Check
-- Supabase SQL Editor içinde çalıştırılabilir. Mevcut veriyi silmez.

alter table public.players
add column if not exists injury_history text default '';

alter table public.scouts enable row level security;
drop policy if exists "scouts all access" on public.scouts;
create policy "scouts all access" on public.scouts
for all to anon, authenticated using (true) with check (true);

alter table public.transfer_committee enable row level security;
drop policy if exists "transfer_committee all access" on public.transfer_committee;
create policy "transfer_committee all access" on public.transfer_committee
for all to anon, authenticated using (true) with check (true);
