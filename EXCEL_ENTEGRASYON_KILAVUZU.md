# ScoutCore Elite V16 - Çorum FK Scouting Entegrasyonu

Kaynak: `CORUM_FK_SCOUTING_24_LINK_GUNCEL.xlsx`

- 251 oyuncu, 9 ana mevki kategorisinden okundu. Kaynak Excel değiştirilmedi.
- 153 oyuncu profil bağlantısı kaynak dosyadan eşleştirildi.
- Oyuncu adları, uyruk, doğum tarihi, kulüp, sözleşme bitiş tarihi, durum ve bulunan Transfermarkt bağlantıları içe aktarma veri setine alındı.
- Mevcut ScoutCore menüsü, dashboard, fotoğraf yükleme ve diğer modüller korunmuştur.
- Ayarlar > Excel Oyuncu Havuzu > Excel Verilerini Önizle > Yeni Oyuncuları Aktar.
- Veri aktarımı sadece kullanıcı onayından sonra mevcut Supabase `players` tablosuna yapılır. İsim bazlı mükerrerler atlanır; mevcut kayıtlar değiştirilmez.
- Supabase URL ve publishable key ortam değişkenlerinin ayarlı, kullanıcının giriş yapmış ve `players` tablosuna yazma yetkisi olması gerekir.
- İlk aktarımdan önce veritabanının yedeğini alın. Canlı veritabanına bu teslim sırasında hiçbir işlem yapılmadı.
- Kaynak dosyada boş bırakılmış alanlar doldurulmadı. Excel formülleri web uygulamasına taşınmadı, tarih/yaş hesabı import sırasında yapılır.
