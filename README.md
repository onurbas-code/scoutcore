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
