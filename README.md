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
