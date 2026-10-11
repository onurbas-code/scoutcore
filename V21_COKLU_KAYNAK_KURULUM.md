# ScoutCore Elite V21 - Çoklu Kaynak Veri Motoru

## Akış
Transfermarkt URL'si yalnızca oyuncu kimliği için kullanılır. Sunucu üç ayrı **yetkili/lisanslı** sağlayıcıdan paralel olarak veri ister: kimlik, performans, piyasa değeri/sözleşme. Doğrulanan alanlar birleştirilir; çakışmalarda ilk sağlayıcının verisi korunur ve uyarı döner. OpenAI doğrulanmış verilerle scout raporu üretir. Kullanıcı kaydettiğinde mevcut Supabase / dashboard akışı çalışır.

## Vercel Production ortam değişkenleri
- `SCOUTCORE_IDENTITY_API_URL` + `SCOUTCORE_IDENTITY_API_KEY` (kimlik ve mevki)
- `SCOUTCORE_FOOTBALL_STATS_API_URL` + `SCOUTCORE_FOOTBALL_STATS_API_KEY` (maç/gol/asist/dakika)
- `SCOUTCORE_CONTRACTS_API_URL` + `SCOUTCORE_CONTRACTS_API_KEY` (piyasa değeri/sözleşme)
- `OPENAI_API_KEY` (önceden tanımlı)
- `SCOUTCORE_OPENAI_MODEL` (isteğe bağlı)
- Eski `SCOUTCORE_PLAYER_DATA_API_URL` da geriye dönük desteklenir.

Her sağlayıcı **HTTPS POST** kabul etmeli. Gönderilen JSON: `{"url":"https://www.transfermarkt.com.tr/.../spieler/123","player_id":"123"}`. Bearer token varsa Authorization header'ında gönderilir. JSON yanıtı `{"player_id":"123","player":{"name":"...","birth_date":"2001-01-01","position":"Kanat","matches":20}}` veya alanları doğrudan içeren JSON olabilir.

**ÖNEMLİ:** Bu ZIP bir futbol verisi aboneliği veya gerçek sağlayıcı API anahtarı içermez. Sağlayıcı URL ve erişim bilgileri olmadan otomatik bilgi çekme çalışmaz. Transfermarkt sayfaları doğrudan kazınmaz. Her sağlayıcı Transfermarkt player_id ile arama desteklemiyorsa sağlayıcıya özel bir eşleme/adaptör geliştirilmelidir. Eksik alanlar uydurulmaz.

## Yayına alma
1. `npm ci && npm run build` ile kontrol edin.
2. Sağlayıcı aboneliklerini ve Transfermarkt ID eşleştirme yeteneğini doğrulayın.
3. Vercel'e sunucu ortam değişkenlerini ekleyin, Preview'da deneyin.
4. Farklı pozisyonlardan oyuncularla kaynak ve eksik alan kontrolleri yapın.
5. Supabase RLS ve erişim yetkilerini denetleyin, sonra Production'a alın.

**Canlı oyuncular bu ZIP ile silinmez.** Mevcut V20 SQL dosyası yalnızca bağımsız inceleme sonrası kullanılmalıdır. Eski kayıtların silinmesi geri dönüşsüzdür.
