# ScoutCore Elite V27: Transfermarkt profil sütunu

## Değişiklikler
- Scouting Veri Merkezi PROFİL sütunu, Supabase `external_link` alanındaki geçerli Transfermarkt URL'sini gösterir.
- Supabase alanı boşsa paket içindeki özgün `public/data/scouting-players.json` Excel kaynak listesinden oyuncu adına göre bağlantı aranır. İsim çakışıyorsa eşleşme reddedilir. Her iki tarafta doğum tarihi varsa tarihlerin eşleşmesi gerekir.
- Eşleşen bağlantılar yeşil **TRANSFERMARKT ↗** olarak görünür. Bulunamayanlarda **＋ Profil Ekle** ile oyuncu düzenleme ekranı açılır.
- Üstte bulunan **BULUNAN PROFİLLERİ SUPABASE’E KAYDET** butonu yalnızca kullanıcı onayıyla boş `external_link` alanlarını doldurur; dolu alanları değiştirmez.
- Mevcut futbolcu kayıtları otomatik olarak değiştirilmez veya silinmez.

## Önemli sınırlar
- Kaynak JSON dosyasında 251 oyuncu var; bunların 153 tanesinde URL metni bulunuyor. Bu yüzden 554 oyuncunun tamamına doğrulanmış bağlantı sağlanamaz. Eksikler elle tamamlanabilir.
- Farklı isim yazımları, aynı isimli oyuncular ve kaynakta URL olmayan oyuncular için otomatik bağlantı oluşturulmaz.
- Canlı Supabase ve Vercel ortamında uçtan uca test yapılmadı. Yayınlamadan önce Preview deploy ve test önerilir.
