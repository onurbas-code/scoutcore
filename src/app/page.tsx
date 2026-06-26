"use client";

import { useMemo, useState } from "react";

type Role = "Head of Scouting" | "Scout" | "Technical Director" | "Board";
type Player = {
  id: number; name: string; age: number; position: string; club: string; nationality: string; foot: string; height: string;
  contract: string; matches: number; minutes: number; goals: number; assists: number; score: number; status: string; folder: string;
  salary: string; value: string; photo: string; report: string; strengths: string; weaknesses: string; action: string;
  wyscout: string; instat: string; youtube: string; injuryRisk: number; roi: number;
};

const basePlayers: Player[] = [
  { id: 1, name: "Marko Petrovic", age: 23, position: "Forvet", club: "FK Novi", nationality: "Sırbistan", foot: "Sağ", height: "1.86", contract: "2027", matches: 31, minutes: 2410, goals: 14, assists: 5, score: 84, status: "A Hedef", folder: "Acil Transfer", salary: "18K €/ay", value: "650K €", photo: "", report: "Ceza sahası koşuları güçlü. 1. Lig temposuna uygun. Bitiricilik ve pres iştahı transfer gerekçesi.", strengths: "Bitiricilik, koşu zamanlaması, pres", weaknesses: "Sırtı dönük oyun", action: "Transfer komitesine sun", wyscout: "https://wyscout.com", instat: "https://instatsport.com", youtube: "https://youtube.com", injuryRisk: 18, roi: 72 },
  { id: 2, name: "Ali Can", age: 22, position: "Orta Saha", club: "Anadolu FK", nationality: "Türkiye", foot: "Sağ", height: "1.78", contract: "2026", matches: 34, minutes: 2880, goals: 4, assists: 9, score: 79, status: "B Hedef", folder: "Gelecek Sezon", salary: "320K ₺/ay", value: "400K €", photo: "", report: "Topla çıkış ve bağlantı oyununda değerli. Teknik direktör oyun modeline uyumlu.", strengths: "Pas açısı, oyun görüşü", weaknesses: "Fiziksel temas", action: "2 maç daha izle", wyscout: "", instat: "", youtube: "https://youtube.com", injuryRisk: 22, roi: 66 },
  { id: 3, name: "Uğurcan Kaya", age: 25, position: "Kaleci", club: "Anadolu FK", nationality: "Türkiye", foot: "Sağ", height: "1.91", contract: "2028", matches: 32, minutes: 2880, goals: 0, assists: 0, score: 81, status: "A Hedef", folder: "Acil Transfer", salary: "420K ₺/ay", value: "550K €", photo: "", report: "Refleks ve yan top kalitesi iyi. Liderlik profili olumlu.", strengths: "Refleks, yan top, iletişim", weaknesses: "Uzun pas isabeti", action: "Canlı izleme planla", wyscout: "", instat: "", youtube: "", injuryRisk: 12, roi: 70 },
  { id: 4, name: "Lucas Ferreira", age: 24, position: "Kanat", club: "Club Brasil", nationality: "Brezilya", foot: "Sol", height: "1.75", contract: "2026", matches: 29, minutes: 2110, goals: 7, assists: 8, score: 76, status: "Takip", folder: "Kiralık", salary: "22K €/ay", value: "700K €", photo: "", report: "1v1 tehdit seviyesi yüksek. Top kaybı sonrası reaksiyon geliştirilmeli.", strengths: "Dripling, hız, içe kat", weaknesses: "Savunma disiplini", action: "Video analiz", wyscout: "", instat: "", youtube: "", injuryRisk: 28, roi: 58 },
];

const nav = ["Dashboard", "Oyuncular", "Pozisyon Klasörleri", "Transfer Komitesi", "KPI & Grafikler", "Video Merkezi", "Yönetim Kurulu", "AI Scout", "Supabase Planı", "Ayarlar"];
const positions = ["Kaleci","Stoper","Sol Bek","Sağ Bek","Orta Saha","Kanat","Forvet"];
const folders = ["Acil Transfer","Bu Sezon","Gelecek Sezon","Gelişim","Kiralık","Serbest","Sözleşmesi Bitecek","Takip"];

export default function App() {
  const [logged, setLogged] = useState(false);
  const [role, setRole] = useState<Role>("Head of Scouting");
  const [active, setActive] = useState("Dashboard");
  const [players, setPlayers] = useState<Player[]>(basePlayers);
  const [selected, setSelected] = useState<Player | null>(basePlayers[0]);
  const [q, setQ] = useState("");
  const [pos, setPos] = useState("Tümü");
  const [edit, setEdit] = useState<Player | null>(null);

  const filtered = useMemo(() => players.filter(p => 
    (pos === "Tümü" || p.position === pos) &&
    (p.name.toLowerCase().includes(q.toLowerCase()) || p.club.toLowerCase().includes(q.toLowerCase()) || p.position.toLowerCase().includes(q.toLowerCase()))
  ), [players, q, pos]);

  function upsertPlayer(p: Player) {
    if (players.some(x => x.id === p.id)) setPlayers(players.map(x => x.id === p.id ? p : x));
    else setPlayers([{ ...p, id: Date.now() }, ...players]);
    setSelected(p); setEdit(null);
  }

  function removePlayer(id: number) {
    const next = players.filter(p => p.id !== id);
    setPlayers(next); setSelected(next[0] || null);
  }

  function exportCSV() {
    const headers = ["name","age","position","club","contract","matches","goals","assists","minutes","score","status","folder"];
    const rows = players.map(p => headers.map(h => String((p as any)[h]).replaceAll(",", " ")).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "scoutcore_players.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  function printPDF() { window.print(); }

  if (!logged) return <Login role={role} setRole={setRole} setLogged={setLogged} />;

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="logoCard"><img src="/scoutcore-logo.svg" alt="ScoutCore"/></div>
        <nav>{nav.map(n => <button key={n} onClick={() => setActive(n)} className={active === n ? "nav active" : "nav"}>{n}</button>)}</nav>
        <div className="sideInfo"><b>{role}</b><span>Onur Baş · ScoutCore</span></div>
      </aside>

      <main className="main">
        <header className="top">
          <div><small>SCOUTCORE ENTERPRISE</small><h1>{active}</h1></div>
          <div className="topButtons"><button onClick={exportCSV}>Excel/CSV Export</button><button onClick={printPDF}>PDF/Print</button><button onClick={() => setLogged(false)}>Çıkış</button></div>
        </header>

        {active === "Dashboard" && <Dashboard players={players} setActive={setActive} setSelected={setSelected} />}
        {active === "Oyuncular" && <PlayersView players={filtered} all={players} q={q} setQ={setQ} pos={pos} setPos={setPos} selected={selected} setSelected={setSelected} removePlayer={removePlayer} edit={edit} setEdit={setEdit} upsertPlayer={upsertPlayer} />}
        {active === "Pozisyon Klasörleri" && <Folders players={players} setActive={setActive} setPos={setPos} />}
        {active === "Transfer Komitesi" && <Transfer players={players} setSelected={setSelected} setActive={setActive} />}
        {active === "KPI & Grafikler" && <KPI players={players} />}
        {active === "Video Merkezi" && <VideoCenter selected={selected} />}
        {active === "Yönetim Kurulu" && <Board players={players} printPDF={printPDF} />}
        {active === "AI Scout" && <AIScout players={players} />}
        {active === "Supabase Planı" && <SupabasePlan />}
        {active === "Ayarlar" && <Settings role={role} setRole={setRole} />}
      </main>
    </div>
  );
}

function Login({ role, setRole, setLogged }: { role: Role; setRole: (r: Role) => void; setLogged: (v: boolean) => void }) {
  return <div className="login"><div className="loginBox"><img src="/scoutcore-logo.svg" /><h1>Giriş</h1><p>Kullanıcı adı ve şifre demo modundadır. Gerçek auth Supabase bağlantısında aktif edilir.</p><input defaultValue="onur.bas" /><input defaultValue="123456" type="password" /><select value={role} onChange={e => setRole(e.target.value as Role)}><option>Head of Scouting</option><option>Scout</option><option>Technical Director</option><option>Board</option></select><button onClick={() => setLogged(true)}>ScoutCore'a Gir</button></div></div>
}

function Dashboard({ players, setActive, setSelected }: any) {
  const avg = Math.round(players.reduce((a: number,b: Player)=>a+b.score,0)/players.length);
  return <><section className="hero"><div><span>FOOTBALL INTELLIGENCE OS</span><h2>Transfermarkt + Wyscout + CRM mantığında scouting işletim sistemi</h2><p>Oyuncu veri merkezi, raporlama, transfer komitesi, video bağlantıları, KPI ve yönetim kurulu karar ekranı tek platformda.</p></div><b>{avg}</b></section><section className="metrics"><Metric t="Toplam Oyuncu" v={players.length}/><Metric t="A Hedef" v={players.filter((p:Player)=>p.status==="A Hedef").length}/><Metric t="Ort. Skor" v={avg}/><Metric t="Acil Transfer" v={players.filter((p:Player)=>p.folder==="Acil Transfer").length}/></section><section className="grid2"><div className="panel"><h3>Son Oyuncular</h3><PlayerRows players={players} setSelected={setSelected} onOpen={()=>setActive("Oyuncular")} /></div><MapPanel /></section></>
}

function Metric({t,v}:{t:string;v:any}){return <div className="metric"><span>{t}</span><b>{v}</b><em>Canlı takip</em></div>}

function PlayersView(props: any) {
  const blank: Player = { id: 0, name:"", age:23, position:"Stoper", club:"", nationality:"", foot:"Sağ", height:"1.85", contract:"2027", matches:0, minutes:0, goals:0, assists:0, score:70, status:"Takip", folder:"Takip", salary:"", value:"", photo:"", report:"", strengths:"", weaknesses:"", action:"", wyscout:"", instat:"", youtube:"", injuryRisk:20, roi:60 };
  return <section className="gridProfile"><div className="panel"><div className="panelHead"><h3>Oyuncu Veri Merkezi</h3><button onClick={()=>props.setEdit(blank)}>+ Oyuncu Ekle</button></div><div className="toolbar"><input placeholder="Oyuncu, kulüp, mevki ara" value={props.q} onChange={(e)=>props.setQ(e.target.value)} /><select value={props.pos} onChange={e=>props.setPos(e.target.value)}><option>Tümü</option>{positions.map(p=><option key={p}>{p}</option>)}</select></div>{props.edit && <PlayerForm p={props.edit} save={props.upsertPlayer} cancel={()=>props.setEdit(null)} />}<PlayerRows players={props.players} setSelected={props.setSelected} onDelete={props.removePlayer} onEdit={props.setEdit}/></div><Profile p={props.selected} update={(p:Player)=>props.upsertPlayer(p)} /></section>
}

function PlayerForm({p, save, cancel}:{p:Player; save:(p:Player)=>void; cancel:()=>void}) {
  const [f,setF]=useState<Player>(p);
  function u(k:keyof Player,v:any){setF({...f,[k]:v})}
  return <div className="form"><input placeholder="Ad" value={f.name} onChange={e=>u("name",e.target.value)}/><select value={f.position} onChange={e=>u("position",e.target.value)}>{positions.map(x=><option key={x}>{x}</option>)}</select><input placeholder="Kulüp" value={f.club} onChange={e=>u("club",e.target.value)}/><input placeholder="Fotoğraf URL" value={f.photo} onChange={e=>u("photo",e.target.value)}/><input placeholder="Wyscout" value={f.wyscout} onChange={e=>u("wyscout",e.target.value)}/><input placeholder="InStat" value={f.instat} onChange={e=>u("instat",e.target.value)}/><button onClick={()=>save(f)}>Kaydet</button><button onClick={cancel}>İptal</button></div>
}

function PlayerRows({players,setSelected,onOpen,onDelete,onEdit}: any) {
  return <div className="rows">{players.map((p:Player)=><div className="row" key={p.id}><button onClick={()=>{setSelected(p); onOpen && onOpen();}}><div className="avatar">{p.photo ? <img src={p.photo}/> : p.name.split(" ").map(x=>x[0]).slice(0,2).join("")}</div><div><b>{p.name}</b><span>{p.position} · {p.club} · {p.age} yaş</span></div></button><strong>{p.score}</strong><i>{p.status}</i>{onEdit&&<button onClick={()=>onEdit(p)}>Düzenle</button>}{onDelete&&<button className="danger" onClick={()=>onDelete(p.id)}>Sil</button>}</div>)}</div>
}

function Profile({p, update}:{p:Player|null; update:(p:Player)=>void}) {
  if (!p) return <div className="panel">Oyuncu seçilmedi.</div>;

  function u(k: keyof Player, v: any) {
    const nextPlayer: Player = { ...(p as Player), [k]: v } as Player;
    update(nextPlayer);
  }

  const infoItems = [
    ["Yaş", p.age],
    ["Boy", p.height],
    ["Ayak", p.foot],
    ["Sözleşme", p.contract],
    ["Maç", p.matches],
    ["Dakika", p.minutes],
    ["Gol", p.goals],
    ["Asist", p.assists],
    ["Maaş", p.salary],
    ["Değer", p.value],
  ];

  return (
    <div className="panel profile">
      <div className="profileTop">
        <div className="bigPhoto">
          {p.photo ? <img src={p.photo} alt={p.name} /> : p.name.split(" ").map(x => x[0]).slice(0,2).join("")}
        </div>
        <div>
          <h3>{p.name}</h3>
          <p>{p.position} · {p.club} · {p.nationality}</p>
          <i>{p.status}</i>
        </div>
      </div>

      <div className="infoGrid">
        {infoItems.map(([label, value]) => (
          <div key={String(label)}>
            <span>{label}</span>
            <b>{String(value)}</b>
          </div>
        ))}
      </div>

      <div className="scoreRing">
        <b>{p.score}</b>
        <span>ScoutCore Skoru</span>
      </div>

      <label>Scout Raporu</label>
      <textarea value={p.report} onChange={e => u("report", e.target.value)} />

      <label>Güçlü Yönler</label>
      <input value={p.strengths} onChange={e => u("strengths", e.target.value)} />

      <label>Gelişim Alanları</label>
      <input value={p.weaknesses} onChange={e => u("weaknesses", e.target.value)} />

      <label>Önerilen Aksiyon</label>
      <input value={p.action} onChange={e => u("action", e.target.value)} />
    </div>
  );
}

function Folders({players,setActive,setPos}: any){return <section className="panel"><h3>Pozisyon Klasörleri</h3><div className="folderGrid">{positions.map(pos=><button key={pos} onClick={()=>{setPos(pos);setActive("Oyuncular")}}><b>{pos}</b><strong>{players.filter((p:Player)=>p.position===pos).length}</strong><span>{folders.join(" · ")}</span></button>)}</div></section>}
function Transfer({players,setSelected,setActive}:any){const stages=["İzlenecek","İzleniyor","Raporlandı","Komite","Teklif","Transfer"];return <section className="pipe">{stages.map((s,i)=><div key={s}><h3>{s}</h3>{players.slice(0,3).map((p:Player)=><button key={p.id+s} onClick={()=>{setSelected(p);setActive("Oyuncular")}}><b>{p.name}</b><span>{p.position}</span><em>{Math.max(55,p.score-i*3)}</em></button>)}</div>)}</section>}
function KPI({players}:{players:Player[]}){return <section className="grid2"><div className="panel"><h3>Gerçek Grafikler</h3><Bar l="Rapor Tamamlama" v={82}/><Bar l="A Hedef Dönüşüm" v={44}/><Bar l="ROI Potansiyeli" v={67}/><Bar l="Scout Aktivitesi" v={76}/></div><div className="panel"><h3>Risk / ROI</h3>{players.map(p=><div className="rank" key={p.id}><b>{p.name}</b><span>Risk %{p.injuryRisk} · ROI %{p.roi}</span></div>)}</div></section>}
function Bar({l,v}:{l:string;v:number}){return <div className="bar"><div><span>{l}</span><b>{v}%</b></div><i><em style={{width:`${v}%`}}/></i></div>}
function VideoCenter({selected}:{selected:Player|null}){return <section className="panel"><h3>Video / Wyscout / InStat Merkezi</h3><p>Seçili oyuncu: {selected?.name || "-"}</p><div className="videoLinks"><a href={selected?.wyscout||"#"}>Wyscout</a><a href={selected?.instat||"#"}>InStat</a><a href={selected?.youtube||"#"}>YouTube</a></div><div className="videoBox">▶ Video bağlantıları burada yönetilecek.</div></section>}
function Board({players,printPDF}:any){return <section className="grid2"><div className="panel"><h3>Yönetim Kurulu Ekranı</h3><p>A hedef oyuncular, bütçe, ROI ve risk seviyesi.</p><button onClick={printPDF}>PDF/Print Çıktısı</button></div><div className="panel">{players.filter((p:Player)=>p.status==="A Hedef").map((p:Player)=><div className="rank" key={p.id}><b>{p.name}</b><span>{p.value} · {p.score} skor</span></div>)}</div></section>}
function AIScout({players}:{players:Player[]}){const [prompt,setPrompt]=useState("24 yaş altı, 30 maç üstü, A hedef olabilecek forvetleri öner.");const result=players.filter(p=>p.age<=25&&p.score>=75);return <section className="panel"><h3>AI Oyuncu Önerisi</h3><textarea value={prompt} onChange={e=>setPrompt(e.target.value)}/><div className="ai">{result.map(p=><div key={p.id}><b>{p.name}</b><span>{p.position} · {p.score} skor</span></div>)}</div><p>Gerçek AI için OpenAI API veya benzeri servis anahtarı bağlanır.</p></section>}
function SupabasePlan(){return <section className="panel"><h3>Supabase / Veritabanı Hazır Altyapı</h3><pre>{`players
- id uuid
- name text
- position text
- club text
- photo_url text
- report text
- score int

reports
- player_id uuid
- scout_id uuid
- report text
- decision text

storage
- player-photos
- scout-reports
- videos`}</pre><p>Sonraki sprintte Supabase project URL ve anon key girilerek kalıcı veri aktif edilir.</p></section>}
function Settings({role,setRole}:any){return <section className="panel"><h3>Ayarlar</h3><select value={role} onChange={e=>setRole(e.target.value)}><option>Head of Scouting</option><option>Scout</option><option>Technical Director</option><option>Board</option></select><p>Rol bazlı arayüz simülasyonu aktif.</p></section>}
function MapPanel(){return <div className="panel map"><h3>Dünya Scout Ağı</h3><div><span></span><span></span><span></span><span></span></div><p>Balkanlar · Afrika · İskandinavya · Güney Amerika</p></div>}
