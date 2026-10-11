/** Best-effort parsing of publicly accessible Transfermarkt profile HTML. No bypass of access controls. */
export type TMPlayer = Record<string,string|number|null>;
const decode=(s:string)=>s.replace(/&(?:amp|quot|apos|lt|gt|nbsp|#39|#x27);/gi,x=>({"&amp;":"&","&quot;":"\"","&apos;":"'","&lt;":"<","&gt;":">","&nbsp;":" ","&#39;":"'","&#x27;":"'"} as Record<string,string>)[x.toLowerCase()]||x).replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(Number(n)));
const strip=(s:string)=>decode(s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim());
const meta=(html:string,key:string)=>{const tag=html.match(new RegExp(`<meta\\b(?=[^>]*(?:property|name)=["']${key}["'])[^>]*>`,"i"))?.[0]||"";return decode(tag.match(/content=["']([^"']*)["']/i)?.[1]||"")};
const date=(s:string)=>{const v=s.trim();let m=v.match(/(\d{1,2})[./-](\d{1,2})[./-](\d{4})/);if(m)return `${m[3]}-${m[2].padStart(2,'0')}-${m[1].padStart(2,'0')}`;m=v.match(/(\d{4})-(\d{2})-(\d{2})/);return m?m[0]:null};
const label=(html:string,terms:string[])=>{for(const term of terms){const escaped=term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');const patterns=[new RegExp(`<span[^>]*class=["'][^"']*info-table__content--regular[^"']*["'][^>]*>\\s*${escaped}\\s*<\\/span>\\s*<span[^>]*>([\\s\\S]{0,900}?)<\\/span>`,'i'),new RegExp(`<li[^>]*>\\s*<span[^>]*>\\s*${escaped}\\s*<\\/span>\\s*<span[^>]*>([\\s\\S]{0,900}?)<\\/span>`,'i'),new RegExp(`${escaped}\\s*:<\\/span>\\s*<span[^>]*>([\\s\\S]{0,900}?)<\\/span>`,'i')];for(const p of patterns){const match=html.match(p);if(match){const v=strip(match[1]);if(v)return v}}}return ''};
export async function readTransfermarkt(url:string):Promise<{player:TMPlayer;warnings:string[]}>{
 const warnings:string[]=[];const response=await fetch(url,{headers:{'Accept':'text/html,application/xhtml+xml','Accept-Language':'en-US,en;q=0.8','User-Agent':'ScoutCoreElite/1.0 (+public-profile-metadata)'},signal:AbortSignal.timeout(10000),cache:'no-store',redirect:'error'});
 if(!response.ok)throw new Error(`Transfermarkt HTTP ${response.status}`);
 const contentType=response.headers.get('content-type')||'';if(!contentType.includes('text/html'))throw new Error('HTML yanıtı alınamadı');
 const html=(await response.text()).slice(0,1800000);if(/captcha|access denied|bot protection|verify you are human/i.test(html.slice(0,8000)))throw new Error('Transfermarkt erişim doğrulaması istiyor');
 const player:TMPlayer={};const title=meta(html,'og:title')||strip(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]||'');
 const name=strip(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]||'')||title.replace(/\s*[-|].*$/,'').trim();if(name&&name.length<130)player.name=name;
 const description=meta(html,'og:description')||meta(html,'description');
 const born=label(html,['Date of birth/Age','Date of birth','Geburtsdatum/Alter','Doğum tarihi/Yaş','Doğum tarihi']);const birth=date(born);if(birth)player.birth_date=birth;
 const height=label(html,['Height','Größe','Boy']);if(height)player.height=height;
 const nationality=label(html,['Citizenship','Staatsbürgerschaft','Uyruk']);if(nationality)player.nationality=nationality;
 const club=label(html,['Current club','Aktueller Verein','Güncel kulüp']);if(club)player.club=club;
 const position=label(html,['Position','Mevki']);if(position)player.position=position;
 const foot=label(html,['Foot','Fuß','Ayak']);if(foot)player.foot=foot;
 const contract=label(html,['Contract expires','Vertrag bis','Sözleşme bitiş tarihi']);const contractDate=date(contract);if(contractDate)player.contract_end=contractDate;
 const market=strip(html.match(/<a[^>]*class=["'][^"']*data-header__market-value-wrapper[^"']*["'][^>]*>([\s\S]*?)<\/a>/i)?.[1]||html.match(/<div[^>]*class=["'][^"']*tm-player-market-value-development__current-value[^"']*["'][^>]*>([\s\S]*?)<\/div>/i)?.[1]||'');if(market)player.market_value=market;
 const photo=meta(html,'og:image');if(photo.startsWith('https://'))player.photo_url=photo;
 if(!player.name)warnings.push('Sayfadan oyuncu adı doğrulanamadı.');if(!player.birth_date)warnings.push('Doğum tarihi okunamadı.');
 warnings.push('Maç, gol, asist ve dakika yalnızca profil HTML sayfasından güvenilir biçimde çıkarılamadı; boş bırakıldı.');
 if(!description)warnings.push('Profil açıklama metni bulunamadı.');
 return {player,warnings};
}
