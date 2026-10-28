# ScoutCore Elite V34 - Excel dışa aktarma

Scouting Veri Merkezi ekranına iki yeni buton eklendi:
- TÜM FUTBOLCULARI EXCEL’E AKTAR: Supabase'den yüklenmiş bütün oyuncular.
- FİLTRELİ LİSTEYİ EXCEL’E AKTAR: Arama, mevki ve liste filtrelerinin sonucu.

Dosya gerçek .xlsx biçimindedir. İsim, doğum tarihi, yaş, mevki, kulüp, ülke, uyruk, sözleşme, piyasa değeri, maç, gol, asist, dakika, durum, shortlist, Transfermarkt URL, scout raporu ve notlar yer alır. Veritabanına yazma/silme işlemi yapmaz. Export sadece istemci tarafında çalışır.

Not: Bu sürümün canlı Vercel ortamı test edilmemiştir. Bu ortamda npm bağımlılıklarının kurulması zaman aşımına uğradığı için Next.js build testi tamamlanamamıştır. Türkiye Ligleri/Gurbetçi kaynak JSON listelerinden Supabase'e kaydedilmemiş kayıtlar bu export kapsamına girmez.
