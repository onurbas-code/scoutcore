-- RUN BEFORE DEPLOYMENT. Does NOT delete player data.
ALTER TABLE public.players ADD COLUMN IF NOT EXISTS shortlist text NOT NULL DEFAULT '';
CREATE INDEX IF NOT EXISTS scoutcore_players_shortlist_idx ON public.players(shortlist) WHERE scope='scout';
-- IMPORTANT: Existing V15 RLS allows anonymous writes. Restrict access separately
-- with organization-specific policies before exposing this service publicly.
-- BACK UP BEFORE ANY DESTRUCTIVE OPERATION.
-- OPTIONAL, MANUAL ONLY, after backup: DELETE FROM public.players WHERE scope='scout';
