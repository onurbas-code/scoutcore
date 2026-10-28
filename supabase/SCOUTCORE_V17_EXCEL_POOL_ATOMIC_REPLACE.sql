-- ScoutCore Elite V17 | Supabase SQL Editor'da BİR KEZ çalıştırın.
-- Bu geçiş yalnızca yeni sütun ve fonksiyon oluşturur, kendiliğinden veri silmez.
ALTER TABLE public.players ADD COLUMN IF NOT EXISTS excel_data jsonb NOT NULL DEFAULT '{}'::jsonb;
CREATE OR REPLACE FUNCTION public.scoutcore_replace_excel_pool(payload jsonb)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path=public AS $$
DECLARE old_count integer; new_count integer; expected integer;
BEGIN
 IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Oturum açmanız gerekiyor'; END IF;
 IF jsonb_typeof(payload) <> 'array' THEN RAISE EXCEPTION 'Geçersiz Excel verisi'; END IF;
 expected:=jsonb_array_length(payload);
 IF expected < 1 OR expected > 10000 THEN RAISE EXCEPTION 'Beklenmeyen kayıt sayısı: %', expected; END IF;
 IF EXISTS (SELECT 1 FROM jsonb_array_elements(payload) p WHERE COALESCE(TRIM(p->>'name'),'')='' OR COALESCE(TRIM(p->>'position'),'')='') THEN
  RAISE EXCEPTION 'Eksik oyuncu adı veya mevki'; END IF;
 SELECT COUNT(*) INTO old_count FROM public.players WHERE scope='scout';
 DELETE FROM public.players WHERE scope='scout';
 INSERT INTO public.players(scope,name,position,nationality,country,birth_date,age,club,contract_end,status,external_link,excel_data)
 SELECT 'scout',p->>'name',p->>'position',COALESCE(p->>'nationality',''),COALESCE(p->>'nationality',''),
 NULLIF(p->>'birth_date','')::date,
 CASE WHEN NULLIF(p->>'birth_date','') IS NOT NULL THEN EXTRACT(YEAR FROM age(CURRENT_DATE,(p->>'birth_date')::date))::int ELSE 0 END,
 COALESCE(p->>'club',''),NULLIF(p->>'contract_end','')::date,COALESCE(p->>'status',''),COALESCE(p->>'external_link',''),p
 FROM jsonb_array_elements(payload) p;
 GET DIAGNOSTICS new_count=ROW_COUNT;
 IF new_count<>expected THEN RAISE EXCEPTION 'Aktarım eksik: % / %',new_count,expected; END IF;
 RETURN jsonb_build_object('deleted',old_count,'inserted',new_count);
END $$;
REVOKE ALL ON FUNCTION public.scoutcore_replace_excel_pool(jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.scoutcore_replace_excel_pool(jsonb) TO authenticated;
