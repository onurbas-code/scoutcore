export type SupabaseSession = { access_token: string; refresh_token?: string; user?: { id: string; email?: string } };
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";
export const supabaseConfig = { url: supabaseUrl, key: publishableKey, ready: Boolean(supabaseUrl && publishableKey) };
function h(token?: string): HeadersInit { return { apikey: publishableKey, Authorization: `Bearer ${token || publishableKey}`, "Content-Type": "application/json" }; }
function cleanPayload(payload:Record<string,unknown>){
 const uuidKeys=new Set(["id","created_by","player_id","workspace_id","scout_id","report_id"]);
 const out:Record<string,unknown>={};
 for(const [k,v] of Object.entries(payload||{})){
  if(v===undefined) continue;
  if(uuidKeys.has(k) && v==="") continue;
  out[k]=v;
 }
 return out;
}
export async function login(email: string, password: string): Promise<SupabaseSession> { const res = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {method:"POST",headers:{apikey:publishableKey,"Content-Type":"application/json"},body:JSON.stringify({email,password})}); const data=await res.json(); if(!res.ok) throw new Error(data?.error_description||data?.msg||"Giriş yapılamadı."); return data; }
export async function register(email: string, password: string): Promise<SupabaseSession> { const res = await fetch(`${supabaseUrl}/auth/v1/signup`, {method:"POST",headers:{apikey:publishableKey,"Content-Type":"application/json"},body:JSON.stringify({email,password})}); const data=await res.json(); if(!res.ok) throw new Error(data?.error_description||data?.msg||"Kayıt oluşturulamadı."); return data; }
export async function selectRows<T>(table:string, token:string, query="select=*&order=created_at.desc") { const res=await fetch(`${supabaseUrl}/rest/v1/${table}?${query}`,{headers:h(token),cache:"no-store"}); const data=await res.json(); if(!res.ok) throw new Error(data?.message||`${table} okunamadı.`); return data as T[]; }
export async function insertRow<T>(table:string, token:string, payload:Record<string,unknown>) { const res=await fetch(`${supabaseUrl}/rest/v1/${table}`,{method:"POST",headers:{...h(token),Prefer:"return=representation"},body:JSON.stringify(cleanPayload(payload))}); const data=await res.json(); if(!res.ok) throw new Error(data?.message||`${table} kaydedilemedi.`); return data?.[0] as T; }
export async function updateRow<T>(table:string, token:string, id:string, payload:Record<string,unknown>) { const res=await fetch(`${supabaseUrl}/rest/v1/${table}?id=eq.${id}`,{method:"PATCH",headers:{...h(token),Prefer:"return=representation"},body:JSON.stringify(cleanPayload(payload))}); const data=await res.json(); if(!res.ok) throw new Error(data?.message||`${table} güncellenemedi.`); return data?.[0] as T; }
export async function deleteRow(table:string, token:string, id:string) { const res=await fetch(`${supabaseUrl}/rest/v1/${table}?id=eq.${id}`,{method:"DELETE",headers:h(token)}); if(!res.ok) throw new Error(`${table} silinemedi.`); }

export async function uploadPlayerPhoto(token:string, file:File, playerName="player") {
 const bucket = "player-photos";
 const safeName = playerName.toLowerCase().replace(/[^a-z0-9ğüşöçıİĞÜŞÖÇ]+/gi,"-").replace(/^-+|-+$/g,"") || "player";
 const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
 const path = `${Date.now()}-${safeName}.${ext}`;
 const res = await fetch(`${supabaseUrl}/storage/v1/object/${bucket}/${path}`, {
  method:"POST",
  headers:{ apikey:publishableKey, Authorization:`Bearer ${token}`, "Content-Type": file.type || "application/octet-stream", "x-upsert":"true" },
  body:file
 });
 const data = await res.json().catch(()=>null);
 if(!res.ok) throw new Error(data?.message || `Fotoğraf yüklenemedi. Supabase Storage içinde ${bucket} bucket kontrol edilmeli.`);
 return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}
