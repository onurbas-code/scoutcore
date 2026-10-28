-- SCOUTCORE V20: SADECE SUPABASE SQL EDITOR'DE, YEDEK DOGRULANDIKTAN SONRA.
-- Bu dosya ZIP kurulumu ile otomatik CALISMAZ. KULLANICI BILEREK CALISTIRMALIDIR.
-- Yalnizca futbolcuya bagli kayitlar ve oyuncular silinir; kullanici hesaplari, ajanda, ayarlar korunur.
BEGIN;
DELETE FROM public.transfer_committee_comments WHERE committee_id IN (SELECT id FROM public.transfer_committee WHERE player_id IN (SELECT id FROM public.players));
DELETE FROM public.transfer_committee WHERE player_id IN (SELECT id FROM public.players);
DELETE FROM public.scout_reports WHERE player_id IN (SELECT id FROM public.players);
DELETE FROM public.players;
COMMIT;
-- Diger oyuncuya bagli tablolar varsa, SQL hata verebilir ve transaction geri alinir.
-- Calistirmadan once gercek tablo yapisi / FK iliskileri kontrol edilmelidir.
