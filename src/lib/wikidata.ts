/** Public Wikidata API enrichment. Never infer market values or season statistics. */
type Entity = {id:string;labels?:Record<string,{value:string}>;claims?:Record<string,Array<{mainsnak?:{datavalue?:{value:any}}}>>};
const prop=(e:Entity,k:string)=>e.claims?.[k]?.map(x=>x.mainsnak?.datavalue?.value).filter(Boolean)||[];
const entityId=(v:any)=>typeof v?.id==='string'?v.id:typeof v?.['numeric-id']==='number'?`Q${v['numeric-id']}`:null;
const normalized=(s:string)=>s.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/gi,'').toLowerCase();
const json=async (u:URL)=>{const r=await fetch(u,{headers:{'User-Agent':'ScoutCoreElite/23.0 (Wikidata enrichment; public API)','Accept':'application/json'},cache:'no-store',signal:AbortSignal.timeout(8000)});if(!r.ok)throw Error(`Wikidata HTTP ${r.status}`);return r.json()};
const api=(params:Record<string,string>)=>{const u=new URL('https://www.wikidata.org/w/api.php');Object.entries({format:'json',origin:'*',...params}).forEach(([k,v])=>u.searchParams.set(k,v));return u};
async function entities(ids:string[]){if(!ids.length)return {} as Record<string,Entity>;const j=await json(api({action:'wbgetentities',ids:ids.join('|'),props:'labels|claims',languages:'en|tr',languagefallback:'1'}));return (j.entities||{}) as Record<string,Entity>}
function time(e:Entity,k:string){const v=prop(e,k)[0];const match=typeof v?.time==='string'?v.time.match(/^[+-](\d{4})-(\d\d)-(\d\d)/):null;return match?`${match[1]}-${match[2]}-${match[3]}`:undefined}
function quantity(e:Entity,k:string){const v=prop(e,k)[0];return typeof v?.amount==='string'?Number(v.amount):undefined}
function label(e?:Entity){return e?.labels?.tr?.value||e?.labels?.en?.value||''}
export async function readWikidata(name:string,clubHint?:string,verifiedEntityId?:string){
 const warnings:string[]=[];const player:Record<string,string|number>={};
 if(name.trim().length<4)return {player,warnings:['Wikidata araması için yeterli oyuncu adı bulunamadı.']};
 const j=verifiedEntityId?{search:[{id:verifiedEntityId,label:name,description:'footballer'}]}:await json(api({action:'wbsearchentities',search:name,language:'en',uselang:'en',type:'item',limit:'12'}));
 const candidates=(j.search||[]) as Array<{id:string;label:string;description?:string}>;
 const exact=candidates.filter(c=>verifiedEntityId||normalized(c.label)===normalized(name));
 if(!exact.length)return {player,warnings:[`Wikidata üzerinde ${name} için birebir isim eşleşmesi bulunamadı.`]};
 const items=await entities(exact.map(x=>x.id));
 const footballers=exact.filter(c=>{const e=items[c.id];return !!e&&([ ...prop(e,'P106')].some(v=>entityId(v)==='Q937857')||/footballer|soccer player|futbolcu/i.test(c.description||''));});
 const pool=footballers;
 if(pool.length!==1)return {player,warnings:[`Wikidata üzerinde ${name} için kesin futbolcu eşleşmesi bulunamadı (aday: ${pool.length}); yanlış kişi seçilmedi.`]};
 const e=items[pool[0].id];if(!e)return {player,warnings:['Wikidata oyuncu kaydı okunamadı.']};
 // Entity labels and claims are independently sourced. Current team (P54) can contain historical teams; never pick the first as current.
 player.name=pool[0].label;
 const dob=time(e,'P569');if(dob)player.birth_date=dob;
 const height=quantity(e,'P2048');if(height&&height>1.2&&height<2.5)player.height=`${Math.round(height*100)} cm`;
 const linkedIds=[...prop(e,'P27'),...prop(e,'P413'),...prop(e,'P423'),...prop(e,'P18')].map(entityId).filter((v):v is string=>!!v);
 const lookup=await entities(Array.from(new Set(linkedIds.filter(x=>/^Q\d+$/.test(x)))).slice(0,35));
 const citizenship=prop(e,'P27').map(entityId).filter((x):x is string=>!!x).map(x=>label(lookup[x])).filter(Boolean);if(citizenship.length)player.nationality=citizenship.join(', ');
 const positions=prop(e,'P413').map(entityId).filter((x):x is string=>!!x).map(x=>label(lookup[x])).filter(Boolean);if(positions.length)player.position=positions[0];
 const foot=prop(e,'P423').map(entityId).filter((x):x is string=>!!x).map(x=>label(lookup[x])).filter(Boolean);if(foot.length)player.foot=foot[0];
 const photos=prop(e,'P18');if(typeof photos[0]==='string'){const file=photos[0].replace(/ /g,'_');player.photo_url=`https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}`}
 warnings.push('Wikidata kulüp geçmişini güncel kulüp olarak kabul etmez; sözleşme, piyasa değeri ve sezon istatistiklerini sağlamaz.');
 if(clubHint)warnings.push('Transfermarkt kulüp bilgisi öncelikli tutuldu.');
 return {player,warnings,entity_url:`https://www.wikidata.org/wiki/${e.id}`};
}
