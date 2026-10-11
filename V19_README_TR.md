# ScoutCore Elite V19 - Kurulum ve dürüst durum raporu

## Yapılanlar
- V18 arayüzü ve mevcut menüler korunarak AI ile Oyuncu Ekle sayfası eklendi.
- Transfermarkt profil URL doğrulama, oyuncu kartında 17 alan, manuel düzeltme, kaydetme ve tekrar kayıt kontrolü.
- Canlı Supabase veri havuzuna bağlı dashboard, bağımsız renk kararı ve A/B/Yeniden İzle liste alanı.
- Supabase oyuncu kayıtları değiştirilmeden dağıtılabilir; mevcut kayıtlar canlı ortamda **silinmedi**.
- ExcelHub artık statik Excel paketini değil Supabase scout havuzunu gösterir. ZIP'teki eski Excel verileri referans olarak kalır.

## Zorunlu kurulum
1. Supabase SQL Editor'de `supabase/V19_SETUP.sql` çalıştırın.
2. Vercel'de mevcut `NEXT_PUBLIC_SUPABASE_URL` ve `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` değerlerini koruyun.
3. Otomatik oyuncu veri doldurma için izinli bir sağlayıcı kurun: `SCOUTCORE_PLAYER_DATA_API_URL` (HTTPS POST endpoint), `SCOUTCORE_PLAYER_DATA_API_KEY` (opsiyonel). İstek `{url,player_id}`; yanıt alanları `name,nationality,birth_date,position,club,country,market_value,contract_end,height,matches,goals,assists,minutes,player_type,report`.
4. Bu sağlayıcı kurulmazsa sadece Transfermarkt URL ve URL slug'dan türetilen oyuncu adı gelir. Diğer alanlar manuel doldurulur. **Transfermarkt'tan otomatik tam veri çekme ve OpenAI analizi henüz yapılmış değildir.**
5. Canlı kayıtları temizlemek istiyorsanız önce tam veritabanı yedeği alın. Sonra SQL dosyasındaki manuel DELETE ifadesini ayrı bir işlem olarak, bağımlı kayıtların etkisini değerlendirerek uygulayın.

## Bilinen sınırlamalar
- Supabase'in önceki sürümlerinde `players` tablosunun mevcut alanları gereklidir.
- Eski V15 RLS politikası anonim yazmaya izin veriyor; üretimde kullanıcı/organizasyon bazlı RLS uygulanmadan hassas veriler için güvenli değildir.
- OpenAI API henüz bağlanmadı. Güvenilir video/performans verisi olmadan otomatik scout raporu uydurulmamalıdır.
- Eski Türkiye/Gurbetçi statik katalogları ZIP'te kalır; canlı scouting oyuncu sayısına katılmaz.
- Otomatik tam veri, sağlayıcının lisansı, erişimi ve kapsamına bağlıdır.
