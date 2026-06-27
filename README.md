# ScoutCore V9 Supabase TR

Bu sürüm localStorage yerine Supabase veritabanı kullanır. Veriler tüm cihazlarda ortak görünür.

## Kurulum
1. Supabase > SQL Editor aç.
2. `supabase/SCOUTCORE_SUPABASE_KURULUM.sql` dosyasındaki kodu yapıştır ve RUN yap.
3. Vercel Environment Variables içinde şu iki değer olmalı:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
4. ZIP içindeki dosyaları GitHub/Vercel projesine yükle.
5. Deploy sonrası giriş ekranında “Yeni kullanıcı oluştur” ile kullanıcı oluştur.

## Not
E-posta doğrulama açıksa Supabase Authentication > Providers > Email bölümünden kapatabilir veya mail doğrulamasını tamamlayabilirsin.
