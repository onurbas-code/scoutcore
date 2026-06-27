-- ScoutCore V12 kontrol SQL'i
-- V11 migration çalıştıysa zorunlu değildir. Eksik alanları güvenli şekilde tamamlar.

alter table public.players
add column if not exists league text default '',
add column if not exists passport text default '',
add column if not exists player_type text default 'Normal',
add column if not exists speed numeric(3,1) default 5 check (speed >= 0 and speed <= 10),
add column if not exists technique numeric(3,1) default 5 check (technique >= 0 and technique <= 10),
add column if not exists passing numeric(3,1) default 5 check (passing >= 0 and passing <= 10),
add column if not exists defending numeric(3,1) default 5 check (defending >= 0 and defending <= 10),
add column if not exists physical numeric(3,1) default 5 check (physical >= 0 and physical <= 10),
add column if not exists aerial numeric(3,1) default 5 check (aerial >= 0 and aerial <= 10),
add column if not exists decision_making numeric(3,1) default 5 check (decision_making >= 0 and decision_making <= 10),
add column if not exists mental numeric(3,1) default 5 check (mental >= 0 and mental <= 10),
add column if not exists yellow_cards int default 0,
add column if not exists red_cards int default 0,
add column if not exists injury_status text default 'Sağlam',
add column if not exists training_score numeric(3,1) default 0 check (training_score >= 0 and training_score <= 10),
add column if not exists performance_score numeric(3,1) default 0 check (performance_score >= 0 and performance_score <= 10),
add column if not exists development_note text default '';

create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  club_name text not null,
  season_name text default '',
  project_name text not null,
  position_focus text default '',
  target_count int default 0,
  status text default 'Aktif',
  note text default '',
  created_by uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.workspaces enable row level security;
drop policy if exists "workspaces all access" on public.workspaces;
create policy "workspaces all access" on public.workspaces for all to anon, authenticated using (true) with check (true);
