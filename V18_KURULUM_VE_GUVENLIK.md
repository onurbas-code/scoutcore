# ScoutCore Elite V18 - Kurulum ve veri güvenliği

## Bu sürümde
- Mevcut V17 premium görünüm, logo, giriş ekranı ve Supabase bağlantısı korunmuştur.
- Türkiye Ligleri: yüklenen Excel'den 53 dolu futbolcu kaydı ve orijinal dosya; mevki sekmeleri, tüm kaynak sütunları oyuncu detayında.
- Gurbetçi Takip: yüklenen Excel'den 47 dolu futbolcu kaydı ve orijinal dosya; mevki sekmeleri, tüm kaynak sütunları oyuncu detayında.
- Takip Ettiğim Futbolcular: manuel kayıt, Supabase `players` tablosunda `tag=Takip Ettiğim Futbolcular`.
- Excel'den Futbolcu Ekle: kullanıcı .xlsx yükler, sunucu `/api/excel-preview` ile yalnızca önizleme verisini okur. Mevcut kayıtlarla ad+doğum tarihi eşleştirilir, yeni kayıtlar açık onayla Supabase'e eklenir.
- Dashboard: ülke dağılımı canlı Supabase `players` verilerinden hesaplanır.
- A/B listeleri, sözleşme ve kontenjan özetleri yeni kayıt eklenip `loadAll` tamamlandığında güncellenir.

## Kullanım
1. ZIP içeriğini GitHub projesinin köküne yükleyin. `package-lock.json` korunmuştur.
2. Vercel'de test/preview deployment oluşturun. Ortam değişkenleri V17 ile aynı kalır.
3. Türkiye ve Gurbetçi sayfalarındaki futbolcular ilk etapta **kaynak Excel önizlemesidir**. Veritabanına eklemek için ayrı bir 'Yeni oyuncuları ana havuza ekle' butonu vardır. Bu işlem mevcut 251 oyuncuyu silmez.
4. Excel'den Futbolcu Ekle sayfasından .xlsx seçin, önizlemede yeni/mükerrer sayılarını kontrol edin, ardından eklemeyi onaylayın.
5. Manuel takip sayfasından tek oyuncu ekleyin. Gerekirse 'İzlenen Futbolcular' bölümünden rapor/durum düzenleyin.

## Kritik notlar
- V17'nin 'Supabase scout havuzunu Excel ile değiştir' butonu hâlâ eski V17 özelliğidir ve veri SİLER. Yeni oyuncu eklemek için onu kullanmayın. V18 'Excel'den Futbolcu Ekle' modülünü kullanın.
- Excel kaynak sayfaları önizlemesi otomatik olarak canlı Supabase kaydı oluşturmaz. Kayıtlar açık onayla eklenir.
- Çakışma denetimi ad + doğum tarihi üzerinden yapılır; doğum tarihi boşsa aynı isimli farklı oyuncular ayrıca kontrol edilmelidir.
- İçe aktarma tek tek Supabase kayıtlarıyla yapılır; bazı kayıtlar başarısız olursa diğerleri kalır. Hata mesajlarını kontrol edin. Tekrar yüklemede başarılı kayıtlar atlanır.
- Canlı ortamda uçtan uca test yapılmadı. Yayına almadan önce preview deployment üzerinde test edin ve veritabanı yedeği alın.
- Supabase tarafında yeni SQL migration gerekmez; mevcut `players` alanları kullanılır.
