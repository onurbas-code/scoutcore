# ScoutCore Elite V22: Transfermarkt doğrudan profil okuma (deneysel)

## Yapılanlar
- V21 sayfaları, CSS, Supabase şeması ve takip listeleri değiştirilmedi.
- `/api/ai-player` girişinde Supabase oturumu doğrulaması eklendi. OpenAI anahtarı sunucuda kalır.
- Transfermarkt HTTPS profil URL'si sunucu tarafında okunur; sayfa izin verirse başlık, doğum tarihi, uyruk, boy, mevki, kulüp, sözleşme ve piyasa değeri gibi erişilebilir alanlar çıkarılmaya çalışılır.
- Önceki opsiyonel çoklu veri sağlayıcıları ve OpenAI raporu korunur. Alanların kaynağı raporlanır; eksikler bildirilir.
- Boş sayısal önizleme alanında `null` korunur; Supabase eski şemasında kaydederken bazı sayısal alanlar 0'a çevrilebilir.

## Önemli sınırlar
- Transfermarkt'ın erişim engeli, sayfa yapısı değişimi ve kullanım koşulları nedeniyle **otomatik veri çekme garanti değildir**. CAPTCHA ve erişim kontrolleri aşılmaz.
- Profil sayfası istatistikleri (maç/gol/asist/dakika) garanti edilmez. Sezon ve müsabaka eşleştirmesi için ayrı güvenilir veri kaynağı gerekir.
- Piyasa değeri ve sözleşme alanları yalnızca sayfadan okunabildiğinde doldurulur.
- Yapay zekâ raporu, yalnızca yeterli doğrulanmış alan varsa üretilir. Teknik/taktik gözlem iddiasında bulunmaz.
- Canlı Supabase verileri **silinmedi**. V20 reset SQL'i pakette duruyor, otomatik çalıştırılmaz.
- Üretim derlemesi bu ortamda doğrulanamadı: npm bağımlılıklarının offline cache'i eksik. Canlı yayın öncesi `npm ci && npm run build` çalıştırın.

## Yayınlama
1. Mevcut GitHub projesini yedekleyin; V22 dosyalarını aynı repo içine aktarın.
2. `OPENAI_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` Vercel Production ortamında bulunmalı.
3. `npm ci && npm run build` ile derleyin. Sonra Preview ortamında deneyin.
4. Gerçek oyuncu linkiyle önizleme ve kayıt sonrası Dashboard'u test edin. Eksik verileri kaydetmeden kontrol edin.
5. Gerekirse `SCOUTCORE_OPENAI_MODEL` ile model seçin.

## Güvenlik
Sohbette veya ekran görüntüsünde gösterilmiş API anahtarları risk altındadır. Yenileyin ve yalnızca sunucu tarafında saklayın.
