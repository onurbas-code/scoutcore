'use client';
import { useState } from "react";
export default function ReportForm({ playerId }: { playerId: string }) {
 const [form,setForm]=useState({match:"",report:"",strengths:"",weaknesses:"",action:"",decision:""});
 function set(k:string,v:string){setForm({...form,[k]:v})}
 async function save(){if(!form.report)return alert("Rapor metni zorunlu");await fetch("/api/reports",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,playerId})});alert("Rapor kaydedildi");location.reload()}
 return <div className="formGrid"><input className="input" value={form.match} onChange={e=>set("match",e.target.value)} placeholder="Maç / tarih"/><input className="input" value={form.decision} onChange={e=>set("decision",e.target.value)} placeholder="Karar"/><textarea className="input reportBox wide" value={form.report} onChange={e=>set("report",e.target.value)} placeholder="Genel yönetici raporu"/><textarea className="input reportBox" value={form.strengths} onChange={e=>set("strengths",e.target.value)} placeholder="Güçlü yönler"/><textarea className="input reportBox" value={form.weaknesses} onChange={e=>set("weaknesses",e.target.value)} placeholder="Gelişim alanları / riskler"/><textarea className="input reportBox" value={form.action} onChange={e=>set("action",e.target.value)} placeholder="Önerilen aksiyon"/><button className="btn" onClick={save}>Raporu Kaydet</button></div>
}
