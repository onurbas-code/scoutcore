# ScoutCore Elite V28 - Karakter kodlama düzeltmesi

## Sorun
Eski içe aktarma veya veritabanı kayıtlarında `&#304;`, `&#220;`, `&#xE9;` gibi HTML karakter referansları düz metin olarak görünüyordu.

## Değişiklikler
- Supabase'den yüklenen oyuncuların metin alanları arayüze aktarılmadan önce HTML karakter referanslarından temizlenir.
- Oyuncu adı, uyruk, mevki, kulüp, rapor ve diğer açıklama alanları kapsanır.
- Profil URL'leri, kayıt kimlikleri, doğum ve sözleşme tarihleri değiştirilmez.
- Oyuncu düzenlenip kaydedilirse metin alanları temizlenmiş olarak kaydedilir.
- Excel içe aktarma XML okuyucusuna ondalık ve onaltılık karakter referansı çözme desteği eklendi.
- Transfermarkt profil bağlantısı, filtreler, mevcut oyuncular ve görsel tasarım korunur.

## Güvenlik ve veri bütünlüğü
Bu sürüm veritabanında toplu güncelleme veya silme yapmaz. Önce Vercel Preview ortamında test edin. Mevcut Supabase kayıtlarındaki HTML karakter kodları, kayıtlar düzenlenip kaydedilene kadar veritabanında kalabilir; arayüzde doğru gösterilir.

## Kontrol örnekleri
`MAR&#304;N PETKOV` -> `MARİN PETKOV`
`T&#220;RK&#304;YE` -> `TÜRKİYE`
`NO&#201; LEBRETON` -> `NOÉ LEBRETON`

## Test sınırı
Dosya yapısı ve ZIP bütünlüğü kontrol edildi. Ortamda proje bağımlılıkları kurulu olmadığı için Next.js build ve canlı Supabase testleri yapılamadı.
