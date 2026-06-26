import { prisma } from "@/lib/prisma";
import { Shell } from "@/components/Shell";
import { Badge } from "@/components/Badge";
import { badgeClass, statusLabel, stageLabel, positionTabs } from "@/lib/labels";
import Link from "next/link";

export default async function Dashboard() {
  const players = await prisma.player.findMany({ orderBy: { transferScore: "desc" } });
  const avg = Math.round(players.reduce((s,p)=>s+p.transferScore,0)/(players.length || 1));
  const groups = positionTabs.filter(t=>t.key !== "ALL").map(t => ({ label: t.label, count: players.filter(p => p.positionGroup === t.key).length }));
  return <Shell active="dashboard" title="Dashboard" subtitle="Giriş sonrası ana operasyon ekranı">
    <section className="hero"><div><span style={{color:"#fecaca",fontWeight:900,fontSize:12}}>SCOUTCORE COMMAND CENTER</span><h1>Çorum FK Scouting Dashboard</h1><p className="muted">Oyuncu klasörleri, transfer kararları ve yönetici profilleri tek merkezde.</p></div><div className="scoreBox"><small>Operasyon Skoru</small><strong>84</strong><em>Stabil</em></div></section>
    <div className="cards"><Card label="Toplam Oyuncu" value={players.length} sub="Canlı havuz"/><Card label="A Hedef" value={players.filter(p=>p.status==="A_TARGET").length} sub="Komite adayı"/><Card label="Ortalama Skor" value={avg} sub="Karar motoru"/><Card label="Acil Transfer" value={players.filter(p=>p.transferFolder==="ACIL_TRANSFER").length} sub="Pozisyon klasörü"/></div>
    <div className="grid2"><div className="panel"><h3>Yönetici Karar Listesi</h3><table><thead><tr><th>Oyuncu</th><th>Mevki</th><th>Klasör</th><th>Skor</th><th>Aşama</th></tr></thead><tbody>{players.slice(0,8).map(p=><tr key={p.id}><td><img src={p.photoUrl || "/uploads/player-placeholder-cm.svg"} className="photoMini"/><Link href={`/players/${p.id}`}>{p.name}</Link></td><td>{p.position}</td><td>{p.transferFolder}</td><td>{p.transferScore}</td><td>{stageLabel(p.stage)}</td></tr>)}</tbody></table></div><div className="panel"><h3>Mevki Klasörü Dağılımı</h3>{groups.map(g=><div key={g.label} style={{margin:"14px 0"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span>{g.label}</span><b>{g.count}</b></div><div className="chartBar"><div className="chartFill" style={{width:`${Math.min(100,g.count*15)}%`}}/></div></div>)}</div></div>
  </Shell>;
}
function Card({label,value,sub}:{label:string,value:any,sub:string}) { return <div className="card"><span>{label}</span><strong>{value}</strong><em className="muted">{sub}</em></div> }
