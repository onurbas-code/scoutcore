# ScoutCore V10 Enterprise TR

Eklenen modüller:
- Profesyonel Oyuncu Profili: fotoğraf, PDF/print scout raporu, video linki, video dosyası, dış profil linki, oyuncu belgeleri.
- Gerçek Scout Yönetimi: scout ekibi, görev atama, hangi maç/oyuncu, görev durumu.
- Kulüp Yönetim Modülü: transfer komitesi, aday oylaması, yönetici onayı, bütçe ve maaş simülasyonu.
- ScoutCore AI: otomatik analiz, güçlü/zayıf yön, benzer profil, Süper Lig uygunluğu, transfer risk puanı, potansiyel tahmini.

## Supabase Kurulum
V9 SQL kurulu olmalı. Sonra:
`supabase/SCOUTCORE_V10_ENTERPRISE_MIGRATION.sql`
Dosyasını Supabase > SQL Editor > New Query içine yapıştırıp RUN çalıştır.

## Vercel
Mevcut değişkenler kullanılmaya devam eder:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
