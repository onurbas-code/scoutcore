# ScoutCore Elite V25: Excel aktarımı ve liste yönetimi

## Excel aktarımı
- Yalnızca dokuz mevki sekmesi okunur. Dashboard, A/B Liste, kontenjan ve diğer türetilmiş sekmeler atlanır.
- Başlıklar üçüncü satırdan, futbolcular dördüncü satırdan alınır.
- B: ad; C: uyruk; D: doğum; F: mevki; H: kulüp; I: sözleşme; J: durum; K: oyuncu raporu; L: oyuncu profili.
- Önizlemede tüm oyuncular gösterilir, kayıt onay gerektirir. İsim + doğum tarihine göre mükerrerler atlanır.
- Hücrede düz metin olarak bulunan Transfermarkt URL'leri aktarılır; Excel hyperlink nesnesi olarak saklanan bağlantılar ayrıca doğrulanmalıdır.

## Türkiye Ligleri / Gurbetçi / Takip
- Türkiye ve gurbetçi sayfaları kaynak Excel JSON'ları ile Supabase kayıtlarını birlikte gösterir.
- Kaynak listedeki oyuncu önce 'Kaydet' ile Supabase'e aktarılır; ardından düzenlenir, rapor eklenir veya silinir.
- Elle oyuncu ekleme düğmesi ortak oyuncu editörünü açar ve doğru liste etiketini otomatik seçer.
- Silinen kaynak oyuncuları aynı tarayıcıda tekrar görünmesin diye localStorage'da gizlenir. Farklı tarayıcılarda kaynak listesi yeniden görünebilir; kalıcı global kaynak silme için ayrı veri tabanı modeli gerekir.
- Takip Ettiğim Futbolcular sayfasında düzenleme/silme ve detaylı oyuncu ekleme vardır.

## Test / dağıtım
1. Mevcut Supabase verilerinin yedeğini alın.
2. Vercel Preview ortamına yükleyin. Vercel'de NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY mevcut olmalı.
3. 27 oyunculuk Excel dosyasını yükleyin; önizleme sayısını, ilk ve son oyuncunun adını, tarihleri ve pozisyonları kontrol edin.
4. Bir oyuncu kaydedip düzenleyin, rapor yazın, ardından bir test oyuncusunu silin.
5. Türkiye Ligleri, Gurbetçi ve Takip sayfalarında elle ekleme ve düzenleme akışlarını kontrol edin.

**Not:** Bu ortamda npm bağımlılıkları kurulamadığı için Next.js üretim derlemesi ve canlı Supabase testleri yapılamadı. Canlı ortama doğrudan göndermeyin.
