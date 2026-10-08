# SCOUTCORE ELITE V17 | EXCEL VERİ MERKEZİ

## Önemli: canlı veriler henüz değiştirilmedi
Bu ZIP, mevcut V16 arayüzünün geliştirilmiş halidir. Excel oyuncuları **Scouting Veri Merkezi** ekranında önizlenebilir.
Supabase bağlantısı ve mevcut oturum olmadan canlı aktarım yapılamaz.

1. Mevcut Supabase projenizin **yedek kopyasını** alın. Eski scout futbolcularının rapor ve ilişkili kayıtları silinme işleminden etkilenebilir.
2. Supabase SQL Editor içinde `supabase/SCOUTCORE_V17_EXCEL_POOL_ATOMIC_REPLACE.sql` dosyasını çalıştırın. Bu adım tek başına oyuncu silmez.
3. ZIP içeriğini mevcut GitHub/Vercel projesine yükleyin. Ortam değişkenlerini ve mevcut Supabase projenizi koruyun.
4. Siteye giriş yapın, sol menüde **SCOUTING VERİ MERKEZİ** bölümünü açın. Kaynak Excel oyuncularını, mevkilerini, kararlarını ve profillerini kontrol edin.
5. **SUPABASE SCOUT HAVUZUNU EXCEL İLE DEĞİŞTİR** düğmesine basıp iki aşamalı onay verin. Veritabanı işlemi tek transaction olarak yapılır; hata halinde silme ve ekleme birlikte geri alınır.
6. İşlem sonrasında Dashboard ve İzlenen Futbolcular ekranları gerçek Supabase verilerini gösterir. Kulüp kadrosu silinmez.

## Veri ve kapsam
- Kaynak dosya: `public/data/CORUM_FK_SCOUTING_KAYNAK.xlsx` (değiştirilmemiş orijinal)
- Önizleme: `public/data/scouting-players.json`
- Oyuncuların Excel sayfası, satırı ve diğer sütunları `excel_data` JSONB alanında korunur.
- Excel'deki karar alanı Yeşil/Sarı/Kırmızı ise A/B/Kırmızı listeler otomatik hesaplanır.
- 12 ay sözleşme ve 2003+ kontenjan filtreleri eklendi.
- Dashboard'daki gerçek dışı sabit örnek rakamlar kaldırıldı.
- Premium koyu tema sadeleştirildi, parlak vurgu azaltıldı, mevcut logo korundu.

## Sınırlar
- Canlı Supabase hesabına erişim olmadığı için canlı veri değişikliği yapılmadı.
- `npm install` / `npm run build` ortamda npm bağımlılık erişimi kısıtlıysa yerelde veya Vercel'de yapılmalıdır.
- Excel'de formüller, grafikler, otomatik listeler web'e birebir Excel motoru olarak taşınmaz; türetilmiş filtreler ve dashboard mantığı yeniden oluşturulmuştur.
- Var olan oyuncu raporları eski oyuncu ID'lerine bağlıysa havuz değişiminde ilişkileri etkilenebilir; yedek alınması zorunludur.
