import { PrismaClient, PlayerStatus, PositionGroup, TransferStage, TransferFolder } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.report.deleteMany();
  await prisma.player.deleteMany();

  const data:any[] = [
    ["Uğurcan Kaya","/uploads/player-placeholder-gk.svg",27,"GK",PositionGroup.KALECI,TransferFolder.ACIL_TRANSFER,"Anadolu FK",30,0,0,2700,78,PlayerStatus.B_TARGET,TransferStage.LIVE_SCOUTING,"Canlı İzleme Gerekli"],
    ["Johan Nilsen","/uploads/player-placeholder-cb.svg",24,"CB",PositionGroup.STOPER,TransferFolder.GELECEK_SEZON,"Nord FK",30,1,1,2700,72,PlayerStatus.C_WATCH,TransferStage.WATCHING,"İzleniyor"],
    ["Mert Arslan","/uploads/player-placeholder-lb.svg",23,"LB",PositionGroup.SOL_BEK,TransferFolder.SOZLESMESI_BITECEKLER,"Ege FK",27,1,5,2310,74,PlayerStatus.B_TARGET,TransferStage.SECOND_SCOUTING,"Video Analizi Tamamlandı"],
    ["Kaan Demir","/uploads/player-placeholder-rb.svg",25,"RB",PositionGroup.SAG_BEK,TransferFolder.TAKIP_LISTESI,"Marmara FK",29,0,6,2550,71,PlayerStatus.C_WATCH,TransferStage.WATCHING,"İzleniyor"],
    ["Ali Can","/uploads/player-placeholder-cm.svg",22,"DM",PositionGroup.ORTA_SAHA,TransferFolder.GELISIM_OYUNCULARI,"Anadolu FK",31,2,6,2640,78,PlayerStatus.B_TARGET,TransferStage.SECOND_SCOUTING,"Çok Beğenildi"],
    ["Lucas Ferreira","/uploads/player-placeholder-wing.svg",21,"RW",PositionGroup.KANAT,TransferFolder.KIRALIK,"Club Brasil",25,8,9,1975,75,PlayerStatus.B_TARGET,TransferStage.VIDEO_ANALYSIS,"Transfer Komitesine Sunulacak"],
    ["Marko Petrovic","/uploads/player-placeholder-st.svg",24,"ST",PositionGroup.FORVET,TransferFolder.ACIL_TRANSFER,"FK Novi",28,14,4,2310,82,PlayerStatus.A_TARGET,TransferStage.TRANSFER_COMMITTEE,"Transfer Komitesine Sunuldu"]
  ];

  for (const row of data) {
    const p = await prisma.player.create({ data: {
      name: row[0], photoUrl: row[1], age: row[2], position: row[3], positionGroup: row[4], transferFolder: row[5],
      club: row[6], apps: row[7], goals: row[8], assists: row[9], minutes: row[10],
      transferScore: row[11], status: row[12], stage: row[13], clubInterest: row[14],
      contractEnd: "30.06.2026", league: "Örnek Lig", nationality: "Örnek"
    }});
    await prisma.report.create({ data: {
      playerId: p.id,
      report: `${p.name} için yönetici seviyesinde örnek scout raporu. Oyun modeli uyumu, fiziksel profil, karar kalitesi, maliyet/performans dengesi ve transfer riski değerlendirilmiştir.`,
      strengths: "Pozisyon bilgisi, tempo, karar kalitesi, rol uyumu",
      weaknesses: "Adaptasyon, sürdürülebilir performans ve maliyet doğrulaması izlenmeli",
      action: "2 canlı maç + video analiz + maliyet doğrulama + teknik direktör kısa değerlendirmesi",
      decision: "Takip / Komite"
    }});
  }
}
main().finally(()=>prisma.$disconnect());
