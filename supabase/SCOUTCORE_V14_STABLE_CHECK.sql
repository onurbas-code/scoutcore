-- ScoutCore V14 Stable Check
-- Mevcut veriyi silmez. UUID hatası frontend tarafında çözüldü.

alter table public.players add column if not exists injury_history text default '';
alter table public.players add column if not exists yellow_cards int default 0;
alter table public.players add column if not exists red_cards int default 0;

alter table public.players enable row level security;
drop policy if exists "players all access" on public.players;
create policy "players all access" on public.players for all to anon, authenticated using (true) with check (true);
