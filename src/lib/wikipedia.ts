/** Wikipedia REST/MediaWiki fallback. Only accepts a uniquely identified footballer. */
const norm=(s:string)=>s.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/gi,'').toLowerCase();
const request=async(u:URL)=>{const r=await fetch(u.toString(),{headers:{Accept:'application/json','User-Agent':'ScoutCoreElite/29.0 (football identity lookup)'},signal:AbortSignal.timeout(7000),next:{revalidate:3600}});if(!r.ok)throw Error(`Wikipedia HTTP ${r.status}`);return r.json()};
export async function readWikipedia(name:string){
 const warnings:string[]=[];const player:Record<string,string>={};
 if(name.length<4)return {player,warnings:['Wikipedia araması için isim yetersiz.']};
 for(const lang of ['en','tr']){
  try{
   const u=new URL(`https://${lang}.wikipedia.org/w/api.php`);
   Object.entries({action:'query',generator:'search',gsrsearch:`intitle:"${name.replace(/["\\]/g,'')}"`,gsrlimit:'5',prop:'pageprops|info',format:'json'}).forEach(([k,v])=>u.searchParams.set(k,v));
   const data=await request(u);const pages=Object.values(data.query?.pages||{}) as Array<{title:string;pageprops?:{wikibase_item?:string}}>;
   const exact=pages.filter(p=>norm(p.title.replace(/\s*\([^)]*\)$/,''))===norm(name)&&p.pageprops?.wikibase_item);
   if(exact.length===1)return {player,warnings,entity_id:exact[0].pageprops!.wikibase_item,source:`Wikipedia (${lang})`};
  }catch(e:any){warnings.push(`Wikipedia (${lang}): ${String(e.message||e)}`)}
 }
 warnings.push('Wikipedia üzerinde kesin eşleşen tek bir futbolcu kimliği bulunamadı.');return {player,warnings};
}
