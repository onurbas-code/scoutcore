# V33 Excel İçe Aktarma Düzeltmesi

## Kök neden
V32 Excel parser'ı `sheet`, `row`, `c`, `v` XML etiketlerini yalnızca öneksiz olarak arıyordu. Gerçek .xlsx dosyaları `x:sheet`, `x:row`, `x:c`, `x:v` XML namespace öneklerini kullanıyor. Bu yüzden 0 oyuncu okunuyordu.

## Düzeltme
XML etiket eşleştirmeleri isteğe bağlı namespace öneklerini destekleyecek şekilde düzeltildi. Excel'deki L sütununda Transfermarkt URL'sinin yanlışlıkla `player_type` alanına atanması da önlendi.

## Gerçek dosyalarla doğrulama
- SCOUTCORE_EXCEL_AKTARIMA_HAZIR_238_FUTBOLCU.xlsx: **238 oyuncu**
- Futbolcular_Tam_Liste_Ulkeler_Tamamlandi(1).xlsx: **238 oyuncu**
- Doğum tarihi, mevki, ülke, sözleşme ve Transfermarkt URL örnekleri kontrol edildi.
- API parser'ı Node.js ortamında, gerçek XLSX baytlarıyla çalıştırıldı. Canlı Vercel/Supabase entegrasyonu ayrıca test edilmelidir.
