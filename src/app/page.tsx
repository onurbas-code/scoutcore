"use client";
import { useMemo, useState } from "react";

type Player = {
  id:number; name:string; age:number; position:string; club:string; country:string; foot:string; height:string; contract:string;
  matches:number; goals:number; assists:number; minutes:number; value:string; salary:string; score:number; potential:number;
  folder:string; status:string; photo:string; report:string; strengths:string; weaknesses:string; action:string; video:string; externalLink:string;
};
type Scout = { id:number; name:string; region:string; role:string; assignment:string; match:string; player:string; reports:number; };
type AgendaItem = { id:number; date:string; title:string; detail:string; type:string; };

const positions = ["Kaleci","Stoper","Sağ Bek","Sol Bek","Ön Libero","8 Numara","10 Numara","Sağ Kanat","Sol Kanat","Forvet"];
const folders = ["Acil Transfer","Bu Sezon","Gelecek Sezon","Gelişim","Kiralık","Serbest","Sözleşmesi Bitecek","Takip"];
const tabs = ["Home","Players","Scouting","Reports","Video Center","Transfer Center","Management","Settings"];

const initialPlayers: Player[] = [
 {id:1,name:"Marko Petrovic",age:23,position:"Forvet",club:"FK Novi",country:"Sırbistan",foot:"Sağ",height:"1.86",contract:"2027",matches:31,goals:14,assists:5,minutes:2410,value:"650K €",salary:"18K €/ay",score:84,potential:87,folder:"Acil Transfer",status:"A Hedef",photo:"",report:"Ceza sahası koşuları güçlü. İlk temas kalitesi iyi. Transfer komitesi için uygun aday.",strengths:"Bitiricilik, koşu zamanlaması, pres",weaknesses:"Sırtı dönük oyun",action:"Komiteye sun",video:"https://youtube.com",externalLink:""},
 {id:2,name:"Ali Can",age:22,position:"8 Numara",club:"Anadolu FK",country:"Türkiye",foot:"Sağ",height:"1.78",contract:"2026",matches:34,goals:4,assists:9,minutes:2880,value:"400K €",salary:"320K ₺/ay",score:79,potential:84,folder:"Gelecek Sezon",status:"B Hedef",photo:"",report:"Topla çıkış ve bağlantı oyununda değerli. Fiziksel temas seviyesi izlenmeli.",strengths:"Pas açısı, oyun görüşü, duran top",weaknesses:"Savunma geçişi",action:"2 maç daha izle",video:"",externalLink:""},
 {id:3,name:"Uğurcan Kaya",age:25,position:"Kaleci",club:"Anadolu FK",country:"Türkiye",foot:"Sağ",height:"1.91",contract:"2028",matches:32,goals:0,assists:0,minutes:2880,value:"550K €",salary:"420K ₺/ay",score:81,potential:83,folder:"Acil Transfer",status:"A Hedef",photo:"",report:"Refleks, yan top ve iletişim seviyesi iyi. Ayakla oyun gelişebilir.",strengths:"Refleks, yan top, iletişim",weaknesses:"Uzun pas isabeti",action:"Canlı izleme planla",video:"",externalLink:""},
];

const initialScouts: Scout[] = [
 {id:1,name:"Scout A",region:"Balkanlar",role:"Senior Scout",assignment:"U21 lig izleme",match:"FK Novi - Radnicki",player:"Marko Petrovic",reports:18},
 {id:2,name:"Scout B",region:"Türkiye",role:"Area Scout",assignment:"Orta saha havuzu",match:"Anadolu FK - Marmara SK",player:"Ali Can",reports:12},
];

const initialAgenda: AgendaItem[] = [
 {id:1,date:"2026-06-27",title:"Transfer Center Review",detail:"A hedef oyuncuların son durum kontrolü",type:"Meeting"},
 {id:2,date:"2026-06-28",title:"Video Check",detail:"Forvet ve kaleci video listesi",type:"Video"},
 {id:3,date:"2026-06-30",title:"Scout Assignment",detail:"Yeni haftalık görev dağılımı",type:"Scouting"},
];

const blankPlayer: Player = {id:0,name:"",age:23,position:"Stoper",club:"",country:"",foot:"Sağ",height:"1.85",contract:"2027",matches:0,goals:0,assists:0,minutes:0,value:"",salary:"",score:70,potential:75,folder:"Takip",status:"Takip",photo:"",report:"",strengths:"",weaknesses:"",action:"",video:"",externalLink:""};

export default function App(){
 const [logged,setLogged]=useState(false);
 const [active,setActive]=useState("Home");
 const [players,setPlayers]=useState<Player[]>(initialPlayers);
 const [selected,setSelected]=useState<Player|null>(initialPlayers[0]);
 const [scouts,setScouts]=useState<Scout[]>(initialScouts);
 const [agenda,setAgenda]=useState<AgendaItem[]>(initialAgenda);
 const [query,setQuery]=useState("");
 const [filter,setFilter]=useState("Tümü");
 const [editing,setEditing]=useState<Player|null>(null);
 const [newScout,setNewScout]=useState({name:"",region:"",role:"Scout",assignment:"",match:"",player:""});
 const [newAgenda,setNewAgenda]=useState({date:"",title:"",detail:"",type:"Plan"});

 const filteredPlayers = useMemo(()=>players.filter(p=>{
   const text = `${p.name} ${p.club} ${p.position} ${p.country}`.toLowerCase();
   const matchText = text.includes(query.toLowerCase());
   const matchFilter = filter==="Tümü" || p.position===filter || p.folder===filter || p.status===filter;
   return matchText && matchFilter;
 }),[players,query,filter]);

 function savePlayer(p:Player){
   const next = {...p,id:p.id||Date.now()};
   if(players.some(x=>x.id===next.id)) setPlayers(players.map(x=>x.id===next.id?next:x));
   else setPlayers([next,...players]);
   setSelected(next); setEditing(null);
 }
 function deletePlayer(id:number){const next=players.filter(p=>p.id!==id);setPlayers(next);if(selected?.id===id)setSelected(next[0]||null);}
 function updateSelected(p:Player){setSelected(p);setPlayers(players.map(x=>x.id===p.id?p:x));}
 function addScout(){if(!newScout.name.trim())return;setScouts([{id:Date.now(),name:newScout.name,region:newScout.region||"Belirlenecek",role:newScout.role,assignment:newScout.assignment,match:newScout.match,player:newScout.player,reports:0},...scouts]);setNewScout({name:"",region:"",role:"Scout",assignment:"",match:"",player:""});}
 function removeScout(id:number){setScouts(scouts.filter(s=>s.id!==id));}
 function addAgenda(){if(!newAgenda.title.trim())return;setAgenda([{id:Date.now(),date:newAgenda.date||new Date().toISOString().slice(0,10),title:newAgenda.title,detail:newAgenda.detail,type:newAgenda.type},...agenda]);setNewAgenda({date:"",title:"",detail:"",type:"Plan"});}
 function removeAgenda(id:number){setAgenda(agenda.filter(a=>a.id!==id));}
 function exportCSV(){const h=["name","age","position","club","country","matches","goals","assists","minutes","score","potential","status","folder"];const rows=players.map(p=>h.map(k=>String((p as any)[k]).replaceAll(","," ")).join(","));const blob=new Blob([[h.join(","),...rows].join("\\n")],{type:"text/csv;charset=utf-8"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="scoutcore_players.csv";a.click();URL.revokeObjectURL(url);}
 function printPDF(){window.print();}
 if(!logged)return <Login onLogin={()=>setLogged(true)}/>;
 return <div className="app">
   <header className="topbar"><button className="brand" onClick={()=>setActive("Home")}><img src="/scoutcore-logo.jpeg" alt="ScoutCore"/></button><nav className="tabs">{tabs.map(t=><button key={t} onClick={()=>setActive(t)} className={active===t?"tab active":"tab"}>{t}</button>)}</nav></header>
   <main className="workspace">
    {active==="Home"&&<Home setActive={setActive} agenda={agenda} newAgenda={newAgenda} setNewAgenda={setNewAgenda} addAgenda={addAgenda} removeAgenda={removeAgenda}/>}
    {active==="Players"&&<Players players={filteredPlayers} allPlayers={players} selected={selected} query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} setSelected={setSelected} setActive={setActive} setEditing={setEditing} deletePlayer={deletePlayer} exportCSV={exportCSV} printPDF={printPDF}/>}
    {active==="Scouting"&&<Scouting scouts={scouts} newScout={newScout} setNewScout={setNewScout} addScout={addScout} removeScout={removeScout}/>}
    {active==="Reports"&&<Reports selected={selected} updateSelected={updateSelected} printPDF={printPDF}/>}
    {active==="Video Center"&&<VideoCenter selected={selected} updateSelected={updateSelected}/>}
    {active==="Transfer Center"&&<TransferCenter players={players} setSelected={setSelected} setActive={setActive}/>}
    {active==="Management"&&<Management players={players} printPDF={printPDF}/>}
    {active==="Settings"&&<Settings exportCSV={exportCSV} printPDF={printPDF}/>}
   </main>
   {editing&&<PlayerEditor player={editing} onSave={savePlayer} onCancel={()=>setEditing(null)}/>}
 </div>
}

function Login({onLogin}:{onLogin:()=>void}){return <div className="login"><div className="ambient one"/><div className="ambient two"/><section className="loginPanel"><div className="loginLogoWrap"><img src="/scoutcore-logo.jpeg" alt="ScoutCore"/></div><div className="loginCard"><h1>Secure Access</h1><p>Football Intelligence Platform</p><label>Username</label><input defaultValue="onur.bas"/><label>Password</label><input defaultValue="ScoutCore2026!" type="password"/><div className="loginOptions"><span>Remember me</span><span>Forgot password?</span></div><button onClick={onLogin}>Login</button></div></section></div>}

function Home({setActive,agenda,newAgenda,setNewAgenda,addAgenda,removeAgenda}:any){return <section className="home"><div className="homeHero"><div><img className="heroLogo" src="/scoutcore-logo.jpeg" alt="ScoutCore"/><span>SCOUTCORE COMMAND CENTER</span><h1>Football Intelligence Platform</h1><p>Oyuncu takibi, scout raporları, transfer kararları ve planlamayı tek merkezde yöneten profesyonel platform.</p></div></div><div className="quickGrid"><button onClick={()=>setActive("Players")}><b>Players</b><span>Oyuncu veritabanı, pozisyon klasörleri, PDF ve CSV</span></button><button onClick={()=>setActive("Scouting")}><b>Scouting</b><span>Scout ekibi ve görev planlama</span></button><button onClick={()=>setActive("Reports")}><b>Reports</b><span>Scout raporları ve karar notları</span></button><button onClick={()=>setActive("Video Center")}><b>Video Center</b><span>Oyuncu video linkleri ve analiz notları</span></button></div><Agenda agenda={agenda} newAgenda={newAgenda} setNewAgenda={setNewAgenda} addAgenda={addAgenda} removeAgenda={removeAgenda}/></section>}

function Agenda({agenda,newAgenda,setNewAgenda,addAgenda,removeAgenda}:any){return <div className="panel agenda"><div className="sectionHead"><div><h2>Agenda</h2><p>Takvim, toplantı, oyuncu izleme ve video kontrol planlaması.</p></div></div><div className="agendaForm"><input type="date" value={newAgenda.date} onChange={(e)=>setNewAgenda({...newAgenda,date:e.target.value})}/><input placeholder="Plan başlığı" value={newAgenda.title} onChange={(e)=>setNewAgenda({...newAgenda,title:e.target.value})}/><input placeholder="Detay" value={newAgenda.detail} onChange={(e)=>setNewAgenda({...newAgenda,detail:e.target.value})}/><select value={newAgenda.type} onChange={(e)=>setNewAgenda({...newAgenda,type:e.target.value})}><option>Plan</option><option>Meeting</option><option>Scouting</option><option>Video</option><option>Report</option></select><button onClick={addAgenda}>Add Plan</button></div><div className="calendarStrip">{agenda.map((a:any)=><div className="agendaCard" key={a.id}><div><b>{a.date}</b><span>{a.type}</span></div><h3>{a.title}</h3><p>{a.detail}</p><button onClick={()=>removeAgenda(a.id)}>Remove</button></div>)}</div></div>}

function Players(props:any){return <section className="playersLayout"><div className="panel"><div className="sectionHead"><div><h2>Players</h2><p>Oyuncu ekleme, düzenleme, silme, fotoğraf yükleme, rapor ve PDF çıktısı.</p></div><div className="actions"><button onClick={()=>props.setEditing(blankPlayer)}>+ Add Player</button><button onClick={props.exportCSV}>CSV</button><button onClick={props.printPDF}>PDF</button></div></div><div className="toolbar"><input value={props.query} onChange={(e:any)=>props.setQuery(e.target.value)} placeholder="Search player, club, country..."/><select value={props.filter} onChange={(e:any)=>props.setFilter(e.target.value)}><option>Tümü</option>{positions.map(p=><option key={p}>{p}</option>)}{folders.map(f=><option key={f}>{f}</option>)}<option>A Hedef</option><option>B Hedef</option><option>Takip</option></select></div><PositionFolders filter={props.filter} setFilter={props.setFilter} players={props.allPlayers}/><div className="playerRows">{props.players.map((p:Player)=><div className={props.selected?.id===p.id?"playerRow selected":"playerRow"} key={p.id}><button onClick={()=>props.setSelected(p)}><Avatar p={p}/><div><b>{p.name}</b><span>{p.position} · {p.club} · {p.country}</span></div></button><strong>{p.score}</strong><em>{p.status}</em><button onClick={()=>props.setEditing(p)}>Edit</button><button className="danger" onClick={()=>props.deletePlayer(p.id)}>Delete</button></div>)}</div></div><PlayerProfile player={props.selected} onEdit={props.setEditing} onReports={()=>props.setActive("Reports")} printPDF={props.printPDF}/></section>}

function PositionFolders({filter,setFilter,players}:any){return <div className="positionPanel"><div className="positionTitle">Position Folders</div><div className="folderList">{positions.map(pos=><button key={pos} className={filter===pos?"activeFolder":""} onClick={()=>setFilter(pos)}><b>{pos}</b><span>{players.filter((p:Player)=>p.position===pos).length}</span></button>)}</div></div>}
function Avatar({p}:{p:Player}){return <div className="avatar">{p.photo?<img src={p.photo} alt={p.name}/>:p.name.split(" ").map(x=>x[0]).slice(0,2).join("")}</div>}
function PlayerProfile({player,onEdit,onReports,printPDF}:any){if(!player)return <div className="panel">Oyuncu seçilmedi.</div>;return <aside className="panel profilePanel"><div className="profileTop"><div className="bigAvatar">{player.photo?<img src={player.photo} alt={player.name}/>:player.name.split(" ").map((x:string)=>x[0]).slice(0,2).join("")}</div><div><h3>{player.name}</h3><p>{player.position} · {player.club}</p><i>{player.status}</i></div></div><div className="profileScore"><b>{player.score}</b><span>ScoutCore Score</span></div><div className="infoGrid">{[["Age",player.age],["Foot",player.foot],["Height",player.height],["Contract",player.contract],["Matches",player.matches],["Minutes",player.minutes],["Goals",player.goals],["Assists",player.assists],["Value",player.value],["Salary",player.salary]].map(([l,v])=><div className="info" key={String(l)}><span>{l}</span><b>{String(v||"-")}</b></div>)}</div><div className="profileActions"><button onClick={()=>onEdit(player)}>Edit Profile</button><button onClick={onReports}>Report</button><button onClick={printPDF}>PDF</button></div></aside>}

function PlayerEditor({player,onSave,onCancel}:any){const [p,setP]=useState<Player>(player);function u(k:keyof Player,v:any){setP({...p,[k]:v})}function photoFile(e:any){const file=e.target.files?.[0]; if(!file)return; const r=new FileReader(); r.onload=()=>u("photo",String(r.result)); r.readAsDataURL(file);}return <div className="modal"><div className="editor"><h2>{p.id?"Edit Player":"Add Player"}</h2><div className="editorGrid"><input placeholder="Name" value={p.name} onChange={e=>u("name",e.target.value)}/><select value={p.position} onChange={e=>u("position",e.target.value)}>{positions.map(x=><option key={x}>{x}</option>)}</select><input placeholder="Club" value={p.club} onChange={e=>u("club",e.target.value)}/><input placeholder="Country" value={p.country} onChange={e=>u("country",e.target.value)}/><input placeholder="Photo URL" value={p.photo} onChange={e=>u("photo",e.target.value)}/><input type="file" accept="image/*" onChange={photoFile}/><input placeholder="Age" value={p.age} onChange={e=>u("age",Number(e.target.value)||0)}/><input placeholder="Height" value={p.height} onChange={e=>u("height",e.target.value)}/><input placeholder="Foot" value={p.foot} onChange={e=>u("foot",e.target.value)}/><input placeholder="Contract" value={p.contract} onChange={e=>u("contract",e.target.value)}/><input placeholder="Value" value={p.value} onChange={e=>u("value",e.target.value)}/><input placeholder="Score" value={p.score} onChange={e=>u("score",Number(e.target.value)||0)}/><select value={p.folder} onChange={e=>u("folder",e.target.value)}>{folders.map(x=><option key={x}>{x}</option>)}</select></div><div className="modalActions"><button onClick={()=>onSave(p)}>Save</button><button onClick={onCancel}>Cancel</button></div></div></div>}

function Scouting({scouts,newScout,setNewScout,addScout,removeScout}:any){return <section className="panel"><div className="sectionHead"><div><h2>Scouting</h2><p>Scout antrenör ekleme/silme ve görev planlama listesi.</p></div></div><div className="scoutForm"><input placeholder="Scout name" value={newScout.name} onChange={(e:any)=>setNewScout({...newScout,name:e.target.value})}/><input placeholder="Region" value={newScout.region} onChange={(e:any)=>setNewScout({...newScout,region:e.target.value})}/><input placeholder="Role" value={newScout.role} onChange={(e:any)=>setNewScout({...newScout,role:e.target.value})}/><input placeholder="Görev / izlenecek maç" value={newScout.match} onChange={(e:any)=>setNewScout({...newScout,match:e.target.value})}/><input placeholder="İzlenecek oyuncu" value={newScout.player} onChange={(e:any)=>setNewScout({...newScout,player:e.target.value})}/><input placeholder="Açıklama" value={newScout.assignment} onChange={(e:any)=>setNewScout({...newScout,assignment:e.target.value})}/><button onClick={addScout}>Add Scout</button></div><div className="scoutList">{scouts.map((s:Scout)=><div className="scoutCard manage" key={s.id}><div><b>{s.name}</b><span>{s.region} · {s.role}</span><p>Maç/Görev: {s.match || "-"} · Oyuncu: {s.player || "-"} · Not: {s.assignment || "-"}</p></div><button onClick={()=>removeScout(s.id)}>Remove</button></div>)}</div></section>}

function Reports({selected,updateSelected,printPDF}:any){if(!selected)return <div className="panel">Oyuncu seçilmedi.</div>;function u(k:keyof Player,v:any){updateSelected({...selected,[k]:v} as Player)}return <section className="panel reportPage"><div className="sectionHead"><div><h2>Reports</h2><p>{selected.name} scout raporu</p></div><button onClick={printPDF}>PDF</button></div><label>Scout Report</label><textarea value={selected.report} onChange={e=>u("report",e.target.value)}/><div className="reportGrid"><div><label>Strengths</label><textarea value={selected.strengths} onChange={e=>u("strengths",e.target.value)}/></div><div><label>Weaknesses</label><textarea value={selected.weaknesses} onChange={e=>u("weaknesses",e.target.value)}/></div></div><label>Action</label><input value={selected.action} onChange={e=>u("action",e.target.value)}/></section>}
function VideoCenter({selected,updateSelected}:any){if(!selected)return <div className="panel">Oyuncu seçilmedi.</div>;function u(k:keyof Player,v:any){updateSelected({...selected,[k]:v} as Player)}return <section className="videoLayout"><div className="panel"><h2>Video Center</h2><p>Video linkleri ve analiz notları bu alanda yönetilir.</p><label>Video URL</label><input value={selected.video} onChange={e=>u("video",e.target.value)}/><label>External Analysis Link</label><input value={selected.externalLink} onChange={e=>u("externalLink",e.target.value)}/></div><div className="panel videoBox"><div className="play">▶</div><b>{selected.name}</b><span>Video preview area</span></div></section>}
function TransferCenter({players,setSelected,setActive}:any){const stages=["Takip","İzleniyor","Aday","Komite","Onay","Transfer"];return <section className="panel"><h2>Transfer Center</h2><div className="pipeGrid">{stages.map(stage=><div className="pipeCol" key={stage}><h3>{stage}</h3>{players.slice(0,3).map((p:Player)=><button key={stage+p.id} onClick={()=>{setSelected(p);setActive("Players")}}><b>{p.name}</b><span>{p.position} · {p.score}</span></button>)}</div>)}</div></section>}
function Management({players,printPDF}:any){return <section className="panel"><div className="sectionHead"><div><h2>Management</h2><p>Genel sistem özeti ve çıktı merkezi.</p></div><button onClick={printPDF}>PDF</button></div>{players.filter((p:Player)=>p.status==="A Hedef").map((p:Player)=><div className="rank" key={p.id}><b>{p.name}</b><span>{p.value} · {p.position} · {p.score} score</span></div>)}</section>}
function Settings({exportCSV,printPDF}:any){return <section className="panel"><h2>Settings</h2><p>ScoutCore arayüz ayarları, dışa aktarım ve sistem yönetimi.</p><div className="actions"><button onClick={exportCSV}>CSV Export</button><button onClick={printPDF}>PDF Print</button></div></section>}
