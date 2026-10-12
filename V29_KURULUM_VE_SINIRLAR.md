# ScoutCore Elite V29: Wikipedia + Wikidata kimlik doğrulama

## Değişiklikler
- Transfermarkt profil URL'si kimlik referansı olarak korunur.
- Erişilebilen Transfermarkt profilinin yapılandırılmış JSON-LD `birthDate` alanı da kontrol edilir.
- Wikidata aramasında eşleşme bulunamazsa Wikipedia (EN/TR) başlık aramasıyla Wikidata kimliği bulunmaya çalışılır.
- Yalnızca tekil, kesin eşleşen futbolcu kaydının doğum tarihi kullanılır; tahmin yapılmaz.
- Kaynaklar çelişirse uyarı verilir. Kulüp, sözleşme ve sezon istatistikleri Wikipedia'dan tahmin edilmez.
- Mevcut Supabase verileri ve tasarım değiştirilmez.

## Önemli sınırlar
- Wikipedia/Wikidata her futbolcuyu içermez. İsim eşleşmesi veya kaynak erişimi yoksa alan boş kalır.
- Transfermarkt erişim kısıtları nedeniyle her profil otomatik okunamaz.
- Bu pakette genel internet arama motoru kazıma sistemi yoktur; üçüncü taraf web sitelerinden rastgele veri toplanmaz.
- API yanıtında `warnings`, `missing_fields`, `field_sources` bulunur.
- Vercel Preview ortamında test edilmelidir. npm bağımlılık kurulumu bu ortamda zaman aşımına uğradığı için üretim derlemesi doğrulanamadı.

## Test
1. Vercel Preview ortamına yükleyin.
2. AI ile Oyuncu Ekle'de bir Transfermarkt oyuncu bağlantısı girin.
3. Doğum tarihi gelmiyorsa hata/uyarı mesajını kontrol edin. Kaynağı doğrulanmayan tarihler elle girilmelidir.
4. Yanlış kimlik eşleşmesi görürseniz oyuncuyu kaydetmeyin.
