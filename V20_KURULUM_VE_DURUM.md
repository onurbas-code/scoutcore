# ScoutCore Elite V20 - kurulum ve sınırlar

## Yapılanlar
- Mevcut Next.js tasarım ve menü yapısı korundu.
- `/api/ai-player` gerçek OpenAI Responses API çağrısı yapabilir; anahtar yalnızca sunucuda kullanılır.
- `SCOUTCORE_PLAYER_DATA_API_URL` ile yetkili HTTPS veri sağlayıcısı entegrasyonu desteklenir; JSON'daki bilinen 17 alan eşleştirilir.
- Kaynaksız istatistik, doğum tarihi ve sözleşme tarihi otomatik uydurulmaz.
- Dashboard, karar ve shortlist seçimleri mevcut Supabase oyuncu kayıtlarından hesaplanmaya devam eder.

## Zorunlu ayarlar
Vercel Environment Variables (Production):
- `OPENAI_API_KEY`: OpenAI gizli anahtarı (sohbette paylaşmayın)
- `SCOUTCORE_PLAYER_DATA_API_URL`: **yetkili veri sağlayıcısının HTTPS endpoint adresi** (henüz kullanıcı tarafından sağlanmadı)
- `SCOUTCORE_PLAYER_DATA_API_KEY`: sağlayıcı gerektiriyorsa gizli erişim anahtarı
- `SCOUTCORE_OPENAI_MODEL`: opsiyonel, varsayılan `gpt-4.1-mini`
- Mevcut `NEXT_PUBLIC_SUPABASE_URL` ve `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` aynen korunur.

Veri sağlayıcı POST gövdesi: `{ "url": "https://.../spieler/123", "player_id": "123" }`.
Yanıt örneği: `{ "name":"...", "nationality":"...", "birth_date":"1999-02-12", "position":"Kanat", "club":"...", "country":"...", "market_value":"...", "contract_end":"2027-06-30", "height":"...", "matches":25, "goals":4, "assists":5, "minutes":1800 }`.
Transfermarkt'ın bütün verilerine otomatik erişim garantisi yoktur. Servis olmadan sadece link ve slug doğrulanır, AI raporu oluşturulmaz.

## Canlı verileri silme
**Bu ZIP canlı Supabase'e erişemez ve canlı kayıtları silmez.** Kullanıcı yedek aldığını bildirmiştir; yedeğin geri yüklenebilirliği ayrıca doğrulanmalıdır. `supabase/V20_RESET_AFTER_BACKUP.sql` dosyasını yalnızca şema / foreign key ilişkilerini kontrol ettikten sonra Supabase SQL Editor'de manuel çalıştırın. Bu işlem scout + team bütün oyuncuları ve ilişkili raporları siler. Yetkisiz tablolar veya farklı foreign key ilişkileri için uyarlama gerekebilir.

## Kontrol listesi
1. `npm ci && npm run build`
2. `supabase/V19_SETUP.sql` migration'ını daha önce çalıştırmadıysanız uygulayın.
3. Veri sağlayıcı ve OpenAI değişkenlerini ekleyip yeni Vercel deployment oluşturun.
4. Gerçek Transfermarkt linkini deneyin; eksik alanları boş bırakın ve kaydetmeden önce kontrol edin.
5. Dashboard A/B/Renk/Yeniden İzle sayılarını doğrulayın.

**Uyarı:** Projenin mevcut RLS politikaları anon kullanıcıya yazma izni veriyor olabilir. Canlıda yayınlamadan önce yetkili kullanıcı bazlı RLS düzeltmesi zorunludur.
