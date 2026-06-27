"use client";
import { useEffect, useMemo, useState } from "react";

type Report = { id:number; date:string; scout:string; score:number; note:string; decision:string };
type Timeline = { id:number; date:string; title:string; detail:string };
type Player = {
 id:number; name:string; birthDate:string; age:number; position:string; club:string; country:string; nationality:string; foot:string; height:string; contract:string;
 matches:number; goals:number; assists:number; minutes:number; value:string; salary:string; scoutScore:number; potentialScore:number; stars:number;
 tag:string; favorite:boolean; status:string; photo:string; report:string; strengths:string; weaknesses:string; action:string; video:string; externalLink:string;
 reports:Report[]; timeline:Timeline[];
};
type Scout = { id:number; name:string; region:string; role:string; assignment:string; match:string; player:string; dueDate:string; status:string; reports:number; };
type AgendaItem = { id:number; date:string; title:string; detail:string; type:string; };

const positions = ["Kaleci","Stoper","Sağ Bek","Sol Bek","Orta Saha","Kanat","Forvet"];
const tags = ["Hazır","Takip","Riskli","Vazgeç","Genç","Kiralık","A Hedef","B Hedef"];
const tabs = ["Ana Sayfa","Oyuncular","Bizim Oyuncularımız","Ajanda","Scout Ekibi","Raporlar","Video Merkezi","Transfer Merkezi","Yönetim","Ayarlar"];
const LS_PLAYERS = "scoutcore_v8_players";
const LS_TEAM_PLAYERS = "scoutcore_v8_team_players";
const LS_SCOUTS = "scoutcore_v8_scouts";
const LS_AGENDA = "scoutcore_v8_agenda";

const today = new Date().toISOString().slice(0,10);
const initialPlayers: Player[] = [
 {id:1,name:"Marko Petrovic",birthDate:"12.04.2003",age:23,position:"Forvet",club:"FK Novi",country:"Sırbistan",nationality:"Sırbistan",foot:"Sağ",height:"1.86",contract:"2027-06-30",matches:31,goals:14,assists:5,minutes:2410,value:"650K €",salary:"18K €/ay",scoutScore:8.4,potentialScore:8.7,stars:5,tag:"A Hedef",favorite:true,status:"Komite",photo:"",report:"Ceza sahası koşuları güçlü. İlk temas kalitesi iyi. Transfer komitesi için uygun aday.",strengths:"Bitiricilik, koşu zamanlaması, pres",weaknesses:"Sırtı dönük oyun",action:"Komiteye sun",video:"https://youtube.com",externalLink:"",reports:[{id:11,date:"2026-06-20",scout:"Scout A",score:8,note:"Canlı izleme sonrası olumlu.",decision:"2. izleme"}],timeline:[{id:10,date:"2026-06-18",title:"İlk izleme",detail:"Video taraması tamamlandı."},{id:12,date:"2026-06-20",title:"Scout raporu",detail:"Aday havuza alındı."}]},
 {id:2,name:"Ali Can",birthDate:"18.09.2004",age:22,position:"Orta Saha",club:"Anadolu FK",country:"Türkiye",nationality:"Türkiye",foot:"Sağ",height:"1.78",contract:"2026-05-31",matches:34,goals:4,assists:9,minutes:2880,value:"400K €",salary:"320K ₺/ay",scoutScore:7.9,potentialScore:8.4,stars:4,tag:"B Hedef",favorite:false,status:"İzleniyor",photo:"",report:"Topla çıkış ve bağlantı oyununda değerli. Fiziksel temas seviyesi izlenmeli.",strengths:"Pas açısı, oyun görüşü, duran top",weaknesses:"Savunma geçişi",action:"2 maç daha izle",video:"",externalLink:"",reports:[],timeline:[{id:20,date:"2026-06-19",title:"Listeye eklendi",detail:"Orta saha havuzuna alındı."}]},
 {id:3,name:"Uğurcan Kaya",birthDate:"07.01.2001",age:25,position:"Kaleci",club:"Anadolu FK",country:"Türkiye",nationality:"Türkiye",foot:"Sağ",height:"1.91",contract:"2028-06-30",matches:32,goals:0,assists:0,minutes:2880,value:"550K €",salary:"420K ₺/ay",scoutScore:8.1,potentialScore:8.3,stars:4,tag:"Hazır",favorite:true,status:"Aday",photo:"",report:"Refleks, yan top ve iletişim seviyesi iyi. Ayakla oyun gelişebilir.",strengths:"Refleks, yan top, iletişim",weaknesses:"Uzun pas isabeti",action:"Canlı izleme planla",video:"",externalLink:"",reports:[],timeline:[]},
];

const initialTeamPlayers: Player[] = [
 {id:101,name:"Onur Baş",birthDate:"01.01.2003",age:23,position:"Stoper",club:"Mevcut Takım",country:"Türkiye",nationality:"Türkiye",foot:"Sol",height:"1.85",contract:"2027-06-30",matches:0,goals:0,assists:0,minutes:0,value:"45",salary:"",scoutScore:8.5,potentialScore:8.8,stars:4,tag:"Hazır",favorite:false,status:"Takip",photo:"",report:"Mevcut takım oyuncusu performans takibi.",strengths:"Savunma yerleşimi, temas, oyun disiplini",weaknesses:"Uzun pas sürekliliği",action:"Performans takibi",video:"",externalLink:"",reports:[],timeline:[{id:1011,date:today,title:"Takım oyuncusu eklendi",detail:"Bizim Oyuncularımız bölümüne eklendi."}]},
];

const initialScouts: Scout[] = [
 {id:1,name:"Scout A",region:"Balkanlar",role:"Senior Scout",assignment:"U21 lig izleme",match:"FK Novi - Radnicki",player:"Marko Petrovic",dueDate:"2026-06-30",status:"İzleniyor",reports:18},
 {id:2,name:"Scout B",region:"Türkiye",role:"Area Scout",assignment:"Orta saha havuzu",match:"Anadolu FK - Marmara SK",player:"Ali Can",dueDate:"2026-07-02",status:"Bekliyor",reports:12},
];
const initialAgenda: AgendaItem[] = [
 {id:1,date:"2026-06-27",title:"Transfer değerlendirme",detail:"A hedef oyuncuların son durum kontrolü",type:"Toplantı"},
 {id:2,date:"2026-06-28",title:"Video kontrol",detail:"Forvet ve kaleci video listesi",type:"Video"},
];

const blankPlayer: Player = {id:0,name:"",birthDate:"",age:0,position:"Stoper",club:"",country:"",nationality:"",foot:"",height:"",contract:"",matches:0,goals:0,assists:0,minutes:0,value:"",salary:"",scoutScore:0,potentialScore:0,stars:0,tag:"Takip",favorite:false,status:"Takip",photo:"",report:"",strengths:"",weaknesses:"",action:"",video:"",externalLink:"",reports:[],timeline:[]};

function loadLS<T>(key:string, fallback:T):T{
 if(typeof window==="undefined") return fallback;
 try { const raw=localStorage.getItem(key); return raw ? JSON.parse(raw) as T : fallback; } catch { return fallback; }
}
function clamp10(n:number){ return Math.max(0, Math.min(10, Number.isFinite(n)?n:0)); }
function contractAlarm(contract:string){
 if(!contract) return "Tarih yok";
 const d = new Date(contract);
 if(isNaN(d.getTime())) return "Tarih formatı kontrol";
 const diff = Math.ceil((d.getTime()-new Date().getTime())/(1000*60*60*24));
 if(diff < 0) return "Sözleşme bitti";
 if(diff <= 30) return "30 gün altı";
 if(diff <= 90) return "90 gün altı";
 if(diff <= 180) return "180 gün altı";
 return "Güvenli";
}
function tabKey(t:string){
 const map:Record<string,string> = {
  "Ana Sayfa":"Home","Oyuncular":"Players","Bizim Oyuncularımız":"TeamPlayers","Ajanda":"Agenda","Scout Ekibi":"Scouting","Raporlar":"Reports","Video Merkezi":"VideoCenter","Transfer Merkezi":"TransferCenter","Yönetim":"Management","Ayarlar":"Settings"
 };
 return map[t] || t;
}

export default function App(){
 const [logged,setLogged]=useState(false);
 const [active,setActive]=useState("Home");
 const [players,setPlayers]=useState<Player[]>(initialPlayers);
 const [teamPlayers,setTeamPlayers]=useState<Player[]>(initialTeamPlayers);
 const [scouts,setScouts]=useState<Scout[]>(initialScouts);
 const [agenda,setAgenda]=useState<AgendaItem[]>(initialAgenda);
 const [selected,setSelected]=useState<Player|null>(null);
 const [compare,setCompare]=useState<Player[]>([]);
 const [query,setQuery]=useState("");
 const [openFolder,setOpenFolder]=useState<string>("Kaleci");
 const [editing,setEditing]=useState<Player|null>(null);
 const [editingScope,setEditingScope]=useState<"players"|"team">("players");
 const [newScout,setNewScout]=useState({name:"",region:"",role:"Scout",assignment:"",match:"",player:"",dueDate:"",status:"Bekliyor"});
 const [newAgenda,setNewAgenda]=useState({date:"",title:"",detail:"",type:"Plan"});
 const [loaded,setLoaded]=useState(false);

 useEffect(()=>{setPlayers(loadLS(LS_PLAYERS,initialPlayers));setTeamPlayers(loadLS(LS_TEAM_PLAYERS,initialTeamPlayers));setScouts(loadLS(LS_SCOUTS,initialScouts));setAgenda(loadLS(LS_AGENDA,initialAgenda));setLoaded(true);},[]);
 useEffect(()=>{if(loaded)localStorage.setItem(LS_PLAYERS,JSON.stringify(players));},[players,loaded]);
 useEffect(()=>{if(loaded)localStorage.setItem(LS_TEAM_PLAYERS,JSON.stringify(teamPlayers));},[teamPlayers,loaded]);
 useEffect(()=>{if(loaded)localStorage.setItem(LS_SCOUTS,JSON.stringify(scouts));},[scouts,loaded]);
 useEffect(()=>{if(loaded)localStorage.setItem(LS_AGENDA,JSON.stringify(agenda));},[agenda,loaded]);

 function filterList(list:Player[]){
  return list.filter(p=>{
   const t=`${p.name} ${p.club} ${p.position} ${p.country} ${p.nationality} ${p.tag} ${p.status} ${p.foot}`.toLowerCase();
   const q=query.toLowerCase().trim();
   if(!q) return true;
   const smart = [
    q.includes("favori") && p.favorite,
    q.includes("sözleşme") && contractAlarm(p.contract)!=="Güvenli",
    q.includes("4 yıldız") && p.stars>=4,
    q.includes("sol ayak") && p.foot.toLowerCase().includes("sol"),
    q.includes("23 yaş altı") && p.age<23,
   ].some(Boolean);
   return t.includes(q)||smart;
  });
 }
 const filteredPlayers = useMemo(()=>filterList(players),[players,query]);
 const filteredTeamPlayers = useMemo(()=>filterList(teamPlayers),[teamPlayers,query]);

 function savePlayer(p:Player){
   const next:Player={...p,id:p.id||Date.now(),scoutScore:clamp10(p.scoutScore),potentialScore:clamp10(p.potentialScore),stars:Math.max(0,Math.min(5,Math.round(p.stars)))};
   const setter = editingScope==="team" ? setTeamPlayers : setPlayers;
   const list = editingScope==="team" ? teamPlayers : players;
   const withTimeline = {...next,timeline:[...(next.timeline||[]),{id:Date.now(),date:today,title:p.id?"Profil güncellendi":"Oyuncu eklendi",detail:p.id?"Oyuncu bilgileri düzenlendi.":"Oyuncu veri merkezine eklendi."}],reports:next.reports||[]};
   if(list.some(x=>x.id===next.id)) setter(list.map(x=>x.id===next.id?withTimeline:x));
   else setter([withTimeline,...list]);
   setSelected(withTimeline); setEditing(null); setOpenFolder(next.position);
 }
 function deletePlayer(id:number, scope:"players"|"team"){const list=scope==="team"?teamPlayers:players; const next=list.filter(p=>p.id!==id); scope==="team"?setTeamPlayers(next):setPlayers(next); if(selected?.id===id)setSelected(null);setCompare(compare.filter(p=>p.id!==id));}
 function updatePlayer(p:Player){
  setSelected(p);
  const inTeam = teamPlayers.some(x=>x.id===p.id);
  if(inTeam) setTeamPlayers(teamPlayers.map(x=>x.id===p.id?p:x));
  else setPlayers(players.map(x=>x.id===p.id?p:x));
 }
 function openEditor(p:Player, scope:"players"|"team"){setEditingScope(scope); setEditing(p);}
 function toggleFavorite(p:Player){updatePlayer({...p,favorite:!p.favorite});}
 function addCompare(p:Player){setCompare(prev=>prev.some(x=>x.id===p.id)?prev.filter(x=>x.id!==p.id):prev.length>=2?[prev[1],p]:[...prev,p]);}
 function addScout(){if(!newScout.name.trim())return;setScouts([{id:Date.now(),name:newScout.name,region:newScout.region||"Belirlenecek",role:newScout.role,assignment:newScout.assignment,match:newScout.match,player:newScout.player,dueDate:newScout.dueDate,status:newScout.status,reports:0},...scouts]);setNewScout({name:"",region:"",role:"Scout",assignment:"",match:"",player:"",dueDate:"",status:"Bekliyor"});}
 function removeScout(id:number){setScouts(scouts.filter(s=>s.id!==id));}
 function addAgenda(){if(!newAgenda.title.trim())return;setAgenda([{id:Date.now(),date:newAgenda.date||today,title:newAgenda.title,detail:newAgenda.detail,type:newAgenda.type},...agenda]);setNewAgenda({date:"",title:"",detail:"",type:"Plan"});}
 function removeAgenda(id:number){setAgenda(agenda.filter(a=>a.id!==id));}
 function exportCSV(list=players){const h=["name","birthDate","age","position","club","country","nationality","matches","goals","assists","minutes","scoutScore","potentialScore","stars","tag","status","contract"];const rows=list.map(p=>h.map(k=>String((p as any)[k]).replaceAll(","," ")).join(","));download("scoutcore_oyuncular.csv",[h.join(","),...rows].join("\\n"),"text/csv;charset=utf-8");}
 function download(name:string,content:string,type:string){const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=name;a.click();URL.revokeObjectURL(url);}
 function printPDF(){window.print();}
 function resetDemo(){if(confirm("Tüm yerel veriyi demo başlangıcına döndürmek istiyor musun?")){localStorage.removeItem(LS_PLAYERS);localStorage.removeItem(LS_TEAM_PLAYERS);localStorage.removeItem(LS_SCOUTS);localStorage.removeItem(LS_AGENDA);setPlayers(initialPlayers);setTeamPlayers(initialTeamPlayers);setScouts(initialScouts);setAgenda(initialAgenda);setSelected(null);}}

 if(!logged)return <Login onLogin={()=>setLogged(true)}/>;
 return <div className="app">
  <header className="topbar"><button className="brand" onClick={()=>setActive("Home")}><img src="/scoutcore-logo.jpeg" alt="ScoutCore"/></button><nav className="tabs">{tabs.map(t=><button key={t} onClick={()=>{setSelected(null);setActive(tabKey(t));}} className={active===tabKey(t)?"tab active":"tab"}>{t}</button>)}</nav></header>
  <main className="workspace">
   {active==="Home"&&<Home setActive={setActive}/>}
   {active==="Players"&&<Players title="Oyuncular" subtitle="Transfer ve scouting oyuncu havuzu." scope="players" players={filteredPlayers} allPlayers={players} query={query} setQuery={setQuery} openFolder={openFolder} setOpenFolder={setOpenFolder} selected={selected} setSelected={setSelected} openEditor={openEditor} deletePlayer={deletePlayer} exportCSV={()=>exportCSV(players)} printPDF={printPDF} toggleFavorite={toggleFavorite} addCompare={addCompare} compare={compare}/>}
   {active==="TeamPlayers"&&<Players title="Bizim Oyuncularımız" subtitle="Takımındaki mevcut oyuncuların performans takip havuzu." scope="team" players={filteredTeamPlayers} allPlayers={teamPlayers} query={query} setQuery={setQuery} openFolder={openFolder} setOpenFolder={setOpenFolder} selected={selected} setSelected={setSelected} openEditor={openEditor} deletePlayer={deletePlayer} exportCSV={()=>exportCSV(teamPlayers)} printPDF={printPDF} toggleFavorite={toggleFavorite} addCompare={addCompare} compare={compare}/>}
   {active==="Agenda"&&<AgendaPage agenda={agenda} newAgenda={newAgenda} setNewAgenda={setNewAgenda} addAgenda={addAgenda} removeAgenda={removeAgenda}/>}
   {active==="Scouting"&&<Scouting scouts={scouts} newScout={newScout} setNewScout={setNewScout} addScout={addScout} removeScout={removeScout}/>}
   {active==="Reports"&&<Reports selected={selected} updatePlayer={updatePlayer} printPDF={printPDF}/>}
   {active==="VideoCenter"&&<VideoCenter selected={selected} updatePlayer={updatePlayer}/>}
   {active==="TransferCenter"&&<TransferCenter players={players} setSelected={setSelected} setActive={setActive}/>}
   {active==="Management"&&<Management players={[...players,...teamPlayers]} printPDF={printPDF} compare={compare}/>}
   {active==="Settings"&&<Settings exportCSV={()=>exportCSV([...players,...teamPlayers])} printPDF={printPDF} resetDemo={resetDemo}/>}
  </main>
  {editing&&<PlayerEditor player={editing} onSave={savePlayer} onCancel={()=>setEditing(null)}/>}
 </div>
}

function Login({onLogin}:{onLogin:()=>void}){return <div className="login"><div className="ambient one"/><div className="ambient two"/><section className="loginPanel"><div className="loginLogoWrap"><img src="/scoutcore-logo.jpeg" alt="ScoutCore"/></div><div className="loginCard"><h1>Güvenli Giriş</h1><p>Futbol istihbarat platformu</p><label>Kullanıcı adı</label><input defaultValue="onur.bas"/><label>Şifre</label><input defaultValue="ScoutCore2026!" type="password"/><div className="loginOptions"><span>Beni hatırla</span><span>Şifremi unuttum</span></div><button onClick={onLogin}>Giriş Yap</button></div></section></div>}

function Home({setActive}:any){return <section className="home"><div className="homeHero"><div><img className="heroLogo" src="/scoutcore-logo.jpeg" alt="ScoutCore"/><span>SCOUTCORE COMMAND CENTER</span><h1>Football Intelligence Platform</h1><p>Kalıcı oyuncu havuzu, scout görevleri, rapor arşivi, zaman çizelgesi, karşılaştırma ve transfer süreci yönetimi.</p></div></div><div className="quickGrid"><button onClick={()=>setActive("Players")}><b>Oyuncular</b><span>Transfer ve scouting oyuncu havuzu</span></button><button onClick={()=>setActive("TeamPlayers")}><b>Bizim Oyuncularımız</b><span>Mevcut takım performans takibi</span></button><button onClick={()=>setActive("Agenda")}><b>Ajanda</b><span>Planlama ve görev takvimi</span></button><button onClick={()=>setActive("TransferCenter")}><b>Transfer Merkezi</b><span>Karar ve süreç yönetimi</span></button></div></section>}

function AgendaPage({agenda,newAgenda,setNewAgenda,addAgenda,removeAgenda}:any){return <div className="panel agenda"><div className="sectionHead"><div><h2>Ajanda</h2><p>Takvim, toplantı, oyuncu izleme ve video kontrol planlaması.</p></div></div><div className="agendaForm"><input type="date" value={newAgenda.date} onChange={(e)=>setNewAgenda({...newAgenda,date:e.target.value})}/><input placeholder="Plan başlığı" value={newAgenda.title} onChange={(e)=>setNewAgenda({...newAgenda,title:e.target.value})}/><input placeholder="Detay" value={newAgenda.detail} onChange={(e)=>setNewAgenda({...newAgenda,detail:e.target.value})}/><select value={newAgenda.type} onChange={(e)=>setNewAgenda({...newAgenda,type:e.target.value})}><option>Plan</option><option>Toplantı</option><option>Scout</option><option>Video</option><option>Rapor</option></select><button onClick={addAgenda}>Plan Ekle</button></div><div className="calendarStrip">{agenda.map((a:any)=><div className="agendaCard" key={a.id}><div><b>{a.date}</b><span>{a.type}</span></div><h3>{a.title}</h3><p>{a.detail}</p><button onClick={()=>removeAgenda(a.id)}>Kaldır</button></div>)}</div></div>}

function Players({title,subtitle,scope,players,allPlayers,query,setQuery,openFolder,setOpenFolder,selected,setSelected,openEditor,deletePlayer,exportCSV,printPDF,toggleFavorite,addCompare,compare}:any){
 return <section className="playersPage">
  {!selected && <><div className="panel playerHeader"><div><h2>{title}</h2><p>{subtitle}</p></div><div className="actions"><button onClick={()=>openEditor(blankPlayer,scope)}>+ Oyuncu Ekle</button><button onClick={exportCSV}>CSV</button><button onClick={printPDF}>PDF</button></div></div><div className="panel playerSearch"><input value={query} onChange={(e:any)=>setQuery(e.target.value)} placeholder="İsim, kulüp, ülke, mevki, etiket ara... Örn: 4 yıldız, sol ayak, 23 yaş altı, sözleşme"/></div><FolderBrowser players={players} allPlayers={allPlayers} openFolder={openFolder} setOpenFolder={setOpenFolder} setSelected={setSelected} openEditor={openEditor} scope={scope} deletePlayer={deletePlayer} toggleFavorite={toggleFavorite} addCompare={addCompare} compare={compare}/></>}
  {selected && <PlayerDetail player={selected} back={()=>setSelected(null)} onEdit={()=>openEditor(selected,scope)} printPDF={printPDF} toggleFavorite={toggleFavorite}/>}
 </section>
}
function FolderBrowser({players,allPlayers,openFolder,setOpenFolder,setSelected,openEditor,scope,deletePlayer,toggleFavorite,addCompare,compare}:any){return <div className="folderBrowser">{positions.map(pos=>{const list=players.filter((p:Player)=>p.position===pos);const total=allPlayers.filter((p:Player)=>p.position===pos).length;const open=openFolder===pos;return <section className={open?"positionFolder open":"positionFolder"} key={pos}><button className="folderTitle" onClick={()=>setOpenFolder(open?"":pos)}><div><b>{pos}</b><span>{total} oyuncu</span></div><strong>{open?"−":"+"}</strong></button>{open&&<div className="folderContent">{list.length===0?<p className="empty">Bu klasörde oyuncu yok.</p>:list.map((p:Player)=><div className="folderPlayer" key={p.id}><button className="playerOpen" onClick={()=>setSelected(p)}><Avatar p={p}/><div><b>{p.name}</b><span>{p.club} · {p.country} · {p.birthDate || "Doğum tarihi yok"}</span><Stars value={p.stars}/><small>{p.tag} · Sözleşme: {contractAlarm(p.contract)}</small></div></button><ScoreBox label="SC" value={p.scoutScore}/><ScoreBox label="POT" value={p.potentialScore}/><em>{p.status}</em><button onClick={()=>toggleFavorite(p)} className={p.favorite?"fav on":"fav"}>★</button><button onClick={()=>addCompare(p)} className={compare.some((x:Player)=>x.id===p.id)?"compare on":"compare"}>Karşılaştır</button><button onClick={()=>openEditor(p,scope)}>Düzenle</button><button className="danger" onClick={()=>deletePlayer(p.id,scope)}>Sil</button></div>)}</div>}</section>})}</div>}
function PlayerDetail({player,back,onEdit,printPDF,toggleFavorite}:any){return <section className="playerDetail"><div className="panel detailHero"><button className="back" onClick={back}>← Pozisyon Klasörlerine Dön</button><div className="detailTop"><div className="detailPhoto">{player.photo?<img src={player.photo} alt={player.name}/>:player.name.split(" ").map((x:string)=>x[0]).slice(0,2).join("")}</div><div><h2>{player.name}</h2><p>{player.position} · {player.club} · {player.country}</p><Stars value={player.stars}/><span className="tag">{player.tag}</span></div><div className="detailScore"><b>{player.scoutScore}</b><span>ScoutCore Puanı</span><b>{player.potentialScore}</b><span>Potansiyel Puanı</span></div></div><div className="profileActions"><button onClick={onEdit}>Oyuncuyu Düzenle</button><button onClick={()=>toggleFavorite(player)}>Favori</button><button onClick={printPDF}>PDF</button></div></div><div className="detailGrid"><Info label="Doğum Tarihi" value={player.birthDate}/><Info label="Yaş" value={String(player.age||"-")}/><Info label="Ülke" value={player.country}/><Info label="Uyruk" value={player.nationality}/><Info label="Ayak" value={player.foot}/><Info label="Boy" value={player.height}/><Info label="Sözleşme" value={player.contract}/><Info label="Sözleşme Alarmı" value={contractAlarm(player.contract)}/><Info label="Piyasa Değeri" value={player.value}/><Info label="Maaş" value={player.salary}/><Info label="Maç" value={String(player.matches||"-")}/><Info label="Dakika" value={String(player.minutes||"-")}/><Info label="Gol" value={String(player.goals||"-")}/><Info label="Asist" value={String(player.assists||"-")}/></div><div className="panel reportPreview"><h3>Scout Raporu</h3><p>{player.report || "Henüz rapor girilmedi."}</p><h3>Güçlü Yönler</h3><p>{player.strengths || "-"}</p><h3>Gelişim Alanları</h3><p>{player.weaknesses || "-"}</p><h3>Aksiyon</h3><p>{player.action || "-"}</p><h3>Zaman Çizelgesi</h3>{(player.timeline||[]).map((t:Timeline)=><div className="timelineItem" key={t.id}><b>{t.date} · {t.title}</b><span>{t.detail}</span></div>)}</div></section>}
function ScoreBox({label,value}:{label:string;value:number}){return <div className="scoreMini"><span>{label}</span><b>{value}</b></div>}
function Avatar({p}:{p:Player}){return <div className="avatar">{p.photo?<img src={p.photo} alt={p.name}/>:p.name.split(" ").map(x=>x[0]).slice(0,2).join("")}</div>}
function Stars({value,setValue}:{value:number;setValue?:(v:number)=>void}){return <div className="stars">{[1,2,3,4,5].map(s=><button key={s} type="button" onClick={()=>setValue&&setValue(s)} className={value>=s?"star on":"star"}>★</button>)}<span>{value}/5</span></div>}
function Info({label,value}:{label:string;value:string}){return <div className="info"><span>{label}</span><b>{value||"-"}</b></div>}

function PlayerEditor({player,onSave,onCancel}:any){const [p,setP]=useState<Player>(player);function u(k:keyof Player,v:any){setP({...p,[k]:v})}function photoFile(e:any){const file=e.target.files?.[0]; if(!file)return; const r=new FileReader(); r.onload=()=>u("photo",String(r.result)); r.readAsDataURL(file);}return <div className="modal"><div className="editor"><h2>{p.id?"Oyuncuyu Düzenle":"Oyuncu Ekle"}</h2><div className="photoUpload"><div className="bigAvatar">{p.photo?<img src={p.photo} alt={p.name}/>:p.name? p.name.split(" ").map((x:string)=>x[0]).slice(0,2).join(""):"SC"}</div><label>Fotoğraf Yükle<input type="file" accept="image/*" onChange={photoFile}/></label></div><div className="editorGrid"><input placeholder="Oyuncu adı soyadı" value={p.name} onChange={e=>u("name",e.target.value)}/><select value={p.position} onChange={e=>u("position",e.target.value)}>{positions.map(x=><option key={x}>{x}</option>)}</select><input placeholder="Doğum tarihi: Gün.Ay.Yıl örn. 12.04.2003" value={p.birthDate} onChange={e=>u("birthDate",e.target.value)}/><input placeholder="Yaş" value={p.age||""} onChange={e=>u("age",Number(e.target.value)||0)}/><input placeholder="Kulüp adı" value={p.club} onChange={e=>u("club",e.target.value)}/><input placeholder="Ülke" value={p.country} onChange={e=>u("country",e.target.value)}/><input placeholder="Uyruk / pasaport" value={p.nationality} onChange={e=>u("nationality",e.target.value)}/><input placeholder="Kullandığı ayak: Sağ / Sol / Çift" value={p.foot} onChange={e=>u("foot",e.target.value)}/><input placeholder="Boy: örn. 1.85" value={p.height} onChange={e=>u("height",e.target.value)}/><input placeholder="Sözleşme bitiş tarihi: 2027-06-30" value={p.contract} onChange={e=>u("contract",e.target.value)}/><input placeholder="Maç sayısı" value={p.matches||""} onChange={e=>u("matches",Number(e.target.value)||0)}/><input placeholder="Dakika" value={p.minutes||""} onChange={e=>u("minutes",Number(e.target.value)||0)}/><input placeholder="Gol" value={p.goals||""} onChange={e=>u("goals",Number(e.target.value)||0)}/><input placeholder="Asist" value={p.assists||""} onChange={e=>u("assists",Number(e.target.value)||0)}/><input placeholder="Piyasa değeri" value={p.value} onChange={e=>u("value",e.target.value)}/><input placeholder="Maaş bilgisi" value={p.salary} onChange={e=>u("salary",e.target.value)}/><input placeholder="ScoutCore puanı: 0-10" value={p.scoutScore||""} onChange={e=>u("scoutScore",clamp10(Number(e.target.value)||0))}/><input placeholder="Potansiyel puanı: 0-10" value={p.potentialScore||""} onChange={e=>u("potentialScore",clamp10(Number(e.target.value)||0))}/><input placeholder="Fotoğraf URL veya yüklenen görsel" value={p.photo} onChange={e=>u("photo",e.target.value)}/><select value={p.tag} onChange={e=>u("tag",e.target.value)}>{tags.map(x=><option key={x}>{x}</option>)}</select><select value={p.status} onChange={e=>u("status",e.target.value)}><option>Takip</option><option>İzleniyor</option><option>Aday</option><option>Komite</option><option>Teklif</option><option>Transfer</option><option>Vazgeç</option></select></div><div className="ratingEdit"><b>Yıldız Puanı</b><Stars value={p.stars} setValue={(v)=>u("stars",v)}/></div><label className="fullLabel">Scout Raporu<textarea placeholder="Oyuncu hakkında teknik/taktik scout raporu yaz" value={p.report} onChange={e=>u("report",e.target.value)}/></label><div className="editorGrid two"><textarea placeholder="Güçlü yönler" value={p.strengths} onChange={e=>u("strengths",e.target.value)}/><textarea placeholder="Gelişim alanları" value={p.weaknesses} onChange={e=>u("weaknesses",e.target.value)}/><textarea placeholder="Önerilen aksiyon" value={p.action} onChange={e=>u("action",e.target.value)}/><input placeholder="Video URL" value={p.video} onChange={e=>u("video",e.target.value)}/></div><div className="modalActions"><button onClick={()=>onSave(p)}>Oyuncuyu Kaydet</button><button onClick={onCancel}>Vazgeç</button></div></div></div>}

function Reports({selected,updatePlayer,printPDF}:any){const [draft,setDraft]=useState({scout:"",score:0,note:"",decision:""});if(!selected)return <div className="panel emptyPage">Önce Oyuncular bölümünden bir oyuncu seç.</div>;function addReport(){if(!draft.note.trim())return;const report={id:Date.now(),date:today,scout:draft.scout||"Scout",score:clamp10(draft.score),note:draft.note,decision:draft.decision};updatePlayer({...selected,reports:[report,...(selected.reports||[])],timeline:[{id:Date.now()+1,date:today,title:"Yeni scout raporu",detail:report.decision||report.note},...(selected.timeline||[])]});setDraft({scout:"",score:0,note:"",decision:""});}return <section className="panel reportPage"><div className="sectionHead"><div><h2>Raporlar</h2><p>{selected.name} çoklu scout raporu arşivi</p></div><button onClick={printPDF}>PDF</button></div><div className="reportAdd"><input placeholder="Scout adı" value={draft.scout} onChange={e=>setDraft({...draft,scout:e.target.value})}/><input placeholder="Rapor puanı 0-10" value={draft.score||""} onChange={e=>setDraft({...draft,score:Number(e.target.value)||0})}/><input placeholder="Karar / aksiyon" value={draft.decision} onChange={e=>setDraft({...draft,decision:e.target.value})}/><textarea placeholder="Rapor notu" value={draft.note} onChange={e=>setDraft({...draft,note:e.target.value})}/><button onClick={addReport}>Rapor Ekle</button></div>{(selected.reports||[]).map((r:Report)=><div className="reportCard" key={r.id}><b>{r.date} · {r.scout} · {r.score}/10</b><p>{r.note}</p><span>{r.decision}</span></div>)}</section>}
function VideoCenter({selected,updatePlayer}:any){if(!selected)return <div className="panel emptyPage">Önce Oyuncular bölümünden bir oyuncu seç.</div>;function u(k:keyof Player,v:any){updatePlayer({...selected,[k]:v} as Player)}return <section className="videoLayout"><div className="panel"><h2>Video Merkezi</h2><p>Video linkleri, dakika işaretleme ve analiz notları.</p><label>Video URL</label><input value={selected.video} onChange={e=>u("video",e.target.value)}/><label>Harici Analiz Linki</label><input value={selected.externalLink} onChange={e=>u("externalLink",e.target.value)}/><textarea placeholder="Dakika notları: 12:30 pres, 44:10 koşu, 68:00 karar anı"/></div><div className="panel videoBox"><div className="play">▶</div><b>{selected.name}</b><span>Video ön izleme alanı</span></div></section>}
function Scouting({scouts,newScout,setNewScout,addScout,removeScout}:any){return <section className="panel"><div className="sectionHead"><div><h2>Scout Görevleri</h2><p>Scout antrenör, maç, oyuncu, son tarih ve durum takibi.</p></div></div><div className="scoutForm"><input placeholder="Scout adı" value={newScout.name} onChange={(e:any)=>setNewScout({...newScout,name:e.target.value})}/><input placeholder="Bölge" value={newScout.region} onChange={(e:any)=>setNewScout({...newScout,region:e.target.value})}/><input placeholder="Görev rolü" value={newScout.role} onChange={(e:any)=>setNewScout({...newScout,role:e.target.value})}/><input placeholder="Görev / izlenecek maç" value={newScout.match} onChange={(e:any)=>setNewScout({...newScout,match:e.target.value})}/><input placeholder="İzlenecek oyuncu" value={newScout.player} onChange={(e:any)=>setNewScout({...newScout,player:e.target.value})}/><input placeholder="Açıklama" value={newScout.assignment} onChange={(e:any)=>setNewScout({...newScout,assignment:e.target.value})}/><input type="date" value={newScout.dueDate} onChange={(e:any)=>setNewScout({...newScout,dueDate:e.target.value})}/><select value={newScout.status} onChange={(e:any)=>setNewScout({...newScout,status:e.target.value})}><option>Bekliyor</option><option>İzleniyor</option><option>Tamamlandı</option></select><button onClick={addScout}>Scout Görevi Ekle</button></div>{scouts.map((s:Scout)=><div className="scoutCard manage" key={s.id}><div><b>{s.name}</b><span>{s.region} · {s.role} · {s.status}</span><p>Maç/Görev: {s.match || "-"} · Oyuncu: {s.player || "-"} · Son tarih: {s.dueDate || "-"}</p><p>{s.assignment}</p></div><button onClick={()=>removeScout(s.id)}>Kaldır</button></div>)}</section>}
function TransferCenter({players,setSelected,setActive}:any){const stages=["Takip","İlk İzleme","2. İzleme","Scout Onayı","Komite","Teklif","Transfer"];return <section className="panel"><h2>Transfer Merkezi</h2><div className="pipeGrid">{stages.map(stage=><div className="pipeCol" key={stage}><h3>{stage}</h3>{players.filter((p:Player)=> stage==="Takip" ? p.status==="Takip" : true).slice(0,3).map((p:Player)=><button key={stage+p.id} onClick={()=>{setSelected(p);setActive("Players")}}><b>{p.name}</b><span>{p.position} · {p.scoutScore}/10 · {p.stars}★</span></button>)}</div>)}</div></section>}
function Management({players,printPDF,compare}:any){return <section className="panel"><div className="sectionHead"><div><h2>Yönetim</h2><p>Karşılaştırma, favoriler, sözleşme alarmı ve yönetici özeti.</p></div><button onClick={printPDF}>PDF</button></div><Compare players={compare}/><h3>Favoriler</h3>{players.filter((p:Player)=>p.favorite).map((p:Player)=><div className="rank" key={p.id}><b>{p.name}</b><span>{p.position} · {p.scoutScore}/10 · {p.stars}★ · {p.tag}</span></div>)}<h3>Sözleşme Alarmları</h3>{players.filter((p:Player)=>contractAlarm(p.contract)!=="Güvenli").map((p:Player)=><div className="rank alert" key={p.id}><b>{p.name}</b><span>{p.contract} · {contractAlarm(p.contract)}</span></div>)}</section>}
function Compare({players}:{players:Player[]}){if(players.length<2)return <div className="compareEmpty">Karşılaştırma için Oyuncular bölümünden 2 oyuncu seç.</div>;const [a,b]=players;const rows=[["Yaş",a.age,b.age],["Mevki",a.position,b.position],["ScoutCore",a.scoutScore,b.scoutScore],["Potansiyel",a.potentialScore,b.potentialScore],["Yıldız",a.stars,b.stars],["Maaş",a.salary,b.salary],["Değer",a.value,b.value],["Gol",a.goals,b.goals],["Asist",a.assists,b.assists]];return <div className="compareTable"><h3>{a.name} vs {b.name}</h3>{rows.map(r=><div key={String(r[0])}><span>{r[1]}</span><b>{r[0]}</b><span>{r[2]}</span></div>)}</div>}
function Settings({exportCSV,printPDF,resetDemo}:any){return <section className="panel"><h2>Ayarlar</h2><p>Veriler bu sürümde tarayıcı localStorage alanında kalıcı tutulur. Aynı tarayıcıda sayfayı kapatıp açınca oyuncular kaybolmaz.</p><div className="actions"><button onClick={exportCSV}>CSV Dışa Aktar</button><button onClick={printPDF}>PDF Yazdır</button><button className="danger" onClick={resetDemo}>Demo Verisini Sıfırla</button></div></section>}
