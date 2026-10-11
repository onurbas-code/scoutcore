# ScoutCore Elite V23 | Transfermarkt + Wikidata + OpenAI

## Değişiklikler
- Mevcut V22 arayüzü, 17 alan, Supabase kayıt yolu ve karar listeleri korunmuştur.
- `/api/ai-player` artık Transfermarkt doğrudan profil okuma denemesinden sonra Wikidata API ile oyuncu adı bazlı kimlik zenginleştirmesi yapar.
- Wikidata'da birden fazla birebir isim eşleşmesi varsa otomatik yanlış oyuncu seçilmez.
- Transfermarkt verileri ile Wikidata çelişirse ilk kaynak korunur ve uyarı verilir.
- Alan bazlı kaynak bilgisi `field_sources` yanıtında yer alır.
- Wikipedia'nın ansiklopedik içeriğini otomatik serbest metin olarak scout raporuna katmak yerine yapılandırılmış Wikidata iddiaları kullanılır.
- Transfermarkt erişimi engellenirse bağlantı adından Wikidata araması denenir.
- OpenAI yalnızca eldeki verilere göre ihtiyatlı rapor üretir.

## Önemli sınırlar
- Transfermarkt otomatik okuması erişim engelleri nedeniyle her ortamda çalışmayabilir.
- Wikidata genç veya az tanınan oyuncuları kapsamıyor olabilir. Aynı isimli oyuncu hatasını önlemek için belirsiz kayıtlar reddedilir.
- Wikidata piyasa değeri, sözleşme bitişi, maç, gol, asist ve dakika verilerinin güncel kaynağı değildir. Bu alanlar doğrulanamazsa boş kalır.
- Vercel Production ortamında `OPENAI_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` ayarlı olmalıdır.
- Supabase canlı verileri silinmemiştir; mevcut SQL şeması değiştirilmemiştir.
- Bu ortamda npm bağımlılıkları offline önbellekte eksik olduğundan Next.js üretim derlemesi doğrulanamadı. **Önce Vercel Preview'da test edin.**

## Hızlı test
1. GitHub'a ZIP içindeki `scout_work` klasörünün **içeriğini** proje köküne aktarın.
2. Vercel Preview deploy'unun başarılı olmasını bekleyin.
3. Giriş yapıp AI ile Oyuncu Ekle ekranında bir Transfermarkt profil bağlantısı deneyin.
4. Önizlemede veri kaynağını, uyarıları ve oyuncu kimliğini kontrol edin; yanlış eşleşme varsa kaydetmeyin.
5. Kaydettikten sonra Dashboard ve takip listelerini kontrol edin.
