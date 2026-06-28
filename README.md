# ScoutCore V12 Stable TR

Bu sürümde UUID oyuncu ekleme hatası giderildi.

## V12 Düzeltmeleri
- Yeni oyuncu eklerken `id: ""` artık Supabase'e gönderilmez. UUID Supabase tarafından otomatik üretilir.
- Radar değerleri bölümünde ne girileceğini anlatan Türkçe placeholder açıklamaları eklendi.
- Scout Yönetimi bölümü güçlendirildi:
  - Scout ekleme
  - Scout çıkarma
  - Maç görevlendirme
  - Oyuncu görevlendirme
  - Görev notu / talimat
  - Bekliyor / İzleniyor / Tamamlandı durum yönetimi

## Supabase
V11 migration çalıştıysa ekstra SQL zorunlu değildir. Yine de dosya içinde V12 kontrol SQL'i bulunur.

## Test
Build testi yapılmıştır.


# ScoutCore V13 UI Fix TR

## Düzeltilenler
- `invalid input syntax for type uuid: ""` hatası düzeltildi. Yeni futbolcu eklenirken boş id artık Supabase'e gönderilmez.
- Oyuncu detay ekranı artık listenin altında açılmaz; tam sayfa detay görünümü olarak açılır.
- Oyuncular bölümü “İzlenen Futbolcular” olarak değiştirildi.
- Ana sayfa sadeleştirildi; logo ve SCOUTCORE COMMAND CENTER ortalı hale getirildi.
- Doğum tarihi gün/ay/yıl gösterilir; doğum tarihi girildiğinde yaş otomatik hesaplanır.
- Futbolcu bilgi ekranından pasaport, piyasa değeri, maaş ve sağlık bölümleri kaldırıldı.
- Rapor bölümüne Sakatlık Geçmişi alanı eklendi.
- Kulüp Kadrosu sadeleştirildi: adı soyadı, doğum tarihi, yaş, mevki, maç, gol, asist, dakika, sarı kart, kırmızı kart.
- 3 sarı kart ve 4 sarı/kırmızı kart bildirimleri eklendi.
- Kulüp Kadrosu için toplu PDF ve tek futbolcu PDF çıktısı eklendi.
- Transfer Komitesi ekleme/çıkarma/oylama/onay sistemi güçlendirildi.
- Scout Yönetimi ekleme, çıkarma ve görevlendirme akışı güçlendirildi.
- Radar değerleri inputlarında hangi değerin girileceği açıklayıcı placeholder olarak yazıldı.

## Supabase
Ek kontrol için Supabase SQL Editor’da şunu çalıştırabilirsin:
`supabase/SCOUTCORE_V13_UI_FIX.sql`


# ScoutCore V14 Final UI TR

## Son düzeltmeler
- Oyuncu ekleme UUID hatasına karşı frontend payload temizliği güçlendirildi.
- `id`, `created_by`, `player_id`, `workspace_id` gibi UUID alanlarına boş string gönderimi engellendi.
- Yaş otomatik hesaplama kaldırıldı; doğum tarihi ve yaş ayrı manuel alanlar oldu.
- Oyuncu detay ekranı artık liste altında değil, aynı sekme içinde tam sayfa bilgi ekranı olarak açılır.
- Detay ekranına geri dönüş butonu eklendi.
- Kulüp Kadrosu satır görünümü sadeleştirildi: solda sadece ad soyad, sağda küçük kutularda yaş, maç, gol, asist, dakika, sarı kart, kırmızı kart.
- Kulüp Kadrosu butonları küçültüldü ve düzenlendi.
- Radar değerleri placeholder açıklamaları korundu.
