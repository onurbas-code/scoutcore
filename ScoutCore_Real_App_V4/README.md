# ScoutCore Real App V4

Eklenen ana yapı:
- Oyuncu Takip ekranında pozisyon klasörleri: Kaleci, Stoper, Sol Bek, Sağ Bek, Orta Saha, Kanat, Forvet
- Her pozisyon altında transfer klasörleri: Acil Transfer, Gelecek Sezon, Gelişim Oyuncuları, Kiralık, Sözleşmesi Bitecekler, Serbest Oyuncular, Takip Listesi
- Oyuncu ismine tıklayınca yönetici seviyesinde tam profil + rapor ekranı
- Fotoğraf, yaş, mevki, kulüp, sözleşme, maç, gol, asist, dakika, skor, kulüp ilgisi, rapor geçmişi
- Menajer modülü yok

Kurulum:
npm install
cp .env.example .env
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
