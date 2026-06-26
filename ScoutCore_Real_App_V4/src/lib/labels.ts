export const positionTabs = [
  { key: "ALL", label: "Tümü" },
  { key: "KALECI", label: "Kaleci" },
  { key: "STOPER", label: "Stoper" },
  { key: "SOL_BEK", label: "Sol Bek" },
  { key: "SAG_BEK", label: "Sağ Bek" },
  { key: "ORTA_SAHA", label: "Orta Saha" },
  { key: "KANAT", label: "Kanat" },
  { key: "FORVET", label: "Forvet" }
];

export const folderTabs = [
  { key: "ALL", label: "Tüm Listeler" },
  { key: "ACIL_TRANSFER", label: "Acil Transfer" },
  { key: "GELECEK_SEZON", label: "Gelecek Sezon" },
  { key: "GELISIM_OYUNCULARI", label: "Gelişim Oyuncuları" },
  { key: "KIRALIK", label: "Kiralık" },
  { key: "SOZLESMESI_BITECEKLER", label: "Sözleşmesi Bitecekler" },
  { key: "SERBEST_OYUNCULAR", label: "Serbest Oyuncular" },
  { key: "TAKIP_LISTESI", label: "Takip Listesi" }
];

export function statusLabel(status: string) { return ({A_TARGET:"A Hedef",B_TARGET:"B Hedef",C_WATCH:"C Takip",WATCHING:"İzleme",REJECTED:"Önerilmez"} as any)[status] || status; }
export function stageLabel(stage: string) { return ({WATCHING:"Takip",LIVE_SCOUTING:"Canlı İzleme",SECOND_SCOUTING:"2. İzleme",VIDEO_ANALYSIS:"Video Analizi",TECHNICAL_DIRECTOR_REVIEW:"Teknik Direktör",TRANSFER_COMMITTEE:"Transfer Komitesi",OFFER:"Teklif",COMPLETED:"Tamamlandı",REJECTED:"Reddedildi"} as any)[stage] || stage; }
export function badgeClass(status: string) { if(status==="A_TARGET")return"green"; if(status==="B_TARGET")return"yellow"; if(status==="C_WATCH")return"orange"; if(status==="REJECTED")return"red"; return"neutral"; }
export function folderLabel(folder: string) { return (folderTabs.find(f=>f.key===folder)?.label) || folder; }
