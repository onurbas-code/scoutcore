/** Best-effort parsing of publicly accessible Transfermarkt profile HTML. No bypass of access controls. */
export type TMPlayer = Record<string,string|number|null>;
const decode=(s:string)=>s.replace(/&(?:amp|quot|apos|lt|gt|nbsp|#39|#x27);/gi,x=>({"&amp;":"&","&quot;":"\"","&apos;":"'","&lt;":"<","&gt;":">","&nbsp;":" ","&#39;":"'","&#x27;":"'"} as Record<string,string>)[x.toLowerCase()]||x).replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(Number(n)));
const strip=(s:string)=>decode(s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim());
const meta=(html:string,key:string)=>{const tag=html.match(new RegExp(`<meta\\b(?=[^>]*(?:property|name)=["']${key}["'])[^>]*>`,"i"))?.[0]||"";return decode(tag.match(/content=["']([^"']*)["']/i)?.[1]||"")};
const date=(s:string)=>{const v=s.trim();let m=v.match(/(\d{1,2})[./-](\d{1,2})[./-](\d{4})/);if(m){const d=`${m[3]}-${m[2].padStart(2,'0')}-${m[1].padStart(2,'0')}`;return validCalendarDate(d)?d:null;}m=v.match(/(\d{4})-(\d{2})-(\d{2})/);return m&&validCalendarDate(m[0])?m[0]:null};
const validCalendarDate=(s:string)=>{const d=new Date(`${s}T00:00:00Z`);return !Number.isNaN(d.getTime())&&d.toISOString().slice(0,10)===s};
const label=(html:string,terms:string[])=>{for(const term of terms){const escaped=term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');const patterns=[new RegExp(`<span[^>]*class=["'][^"']*info-table__content--regular[^"']*["'][^>]*>\\s*${escaped}\\s*<\\/span>\\s*<span[^>]*>([\\s\\S]{0,900}?)<\\/span>`,'i'),new RegExp(`<li[^>]*>\\s*<span[^>]*>\\s*${escaped}\\s*<\\/span>\\s*<span[^>]*>([\\s\\S]{0,900}?)<\\/span>`,'i'),new RegExp(`${escaped}\\s*:<\\/span>\\s*<span[^>]*>([\\s\\S]{0,900}?)<\\/span>`,'i')];for(const p of patterns){const match=html.match(p);if(match){const v=strip(match[1]);if(v)return v}}}return ''};
export async function readTransfermarkt(url:string):Promise<{player:TMPlayer;warnings:string[]}>{
 const warnings:string[]=[];const response=await fetch(url,{headers:{'Accept':'text/html,application/xhtml+xml','Accept-Language':'en-US,en;q=0.8','User-Agent':'ScoutCoreElite/1.0 (+public-profile-metadata)'},signal:AbortSignal.timeout(10000),cache:'no-store',redirect:'error'});
 if(!response.ok)throw new Error(`Transfermarkt HTTP ${response.status}`);
 const contentType=response.headers.get('content-type')||'';if(!contentType.includes('text/html'))throw new Error('HTML yanıtı alınamadı');
 const html=(await response.text()).slice(0,1800000);if(/captcha|access denied|bot protection|verify you are human/i.test(html.slice(0,8000)))throw new Error('Transfermarkt erişim doğrulaması istiyor');
 const player:TMPlayer={};const title=meta(html,'og:title')||strip(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]||'');
 const name=strip(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]||'')||title.replace(/\s*[-|].*$/,'').trim();const cleanName=name.replace(/^#?\d+\s+/g,"").replace(/\s*\|.*$/,"").trim();if(cleanName&&cleanName.length<130)player.name=cleanName;
 const description=meta(html,'og:description')||meta(html,'description');
 const born=label(html,['Date of birth/Age','Date of birth','Geburtsdatum/Alter','Doğum tarihi/Yaş','Doğum tarihi']);const birth=date(born);if(birth&&birth<new Date().toISOString().slice(0,10)&&Number(birth.slice(0,4))>=1940)player.birth_date=birth;
 // Structured metadata can contain a date even when the visible table layout changes.
 if(!player.birth_date){const jsonLd=[...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];for(const item of jsonLd){try{const data=JSON.parse(item[1]);const objects=Array.isArray(data)?data:[data];for(const obj of objects){if(typeof obj?.birthDate==='string'){const parsed=date(obj.birthDate);if(parsed&&parsed<new Date().toISOString().slice(0,10)&&Number(parsed.slice(0,4))>=1940){player.birth_date=parsed;break}}}}catch{}if(player.birth_date)break}}
 const height=label(html,['Height','Größe','Boy']);if(height)player.height=height;
 const nationality=label(html,['Citizenship','Staatsbürgerschaft','Uyruk']);if(nationality)player.nationality=nationality;
 const club=label(html,['Current club','Aktueller Verein','Güncel kulüp']);if(club)player.club=club;
 const position=label(html,['Position','Mevki']);if(position){const norm=position.toLocaleLowerCase('tr-TR');const mapped=/goalkeeper|torwart|kaleci/.test(norm)?'Kaleci':/centre-back|center-back|innenverteidiger|stoper/.test(norm)?'Stoper':/right-back|sağ bek|rechter verteidiger/.test(norm)?'Sağ Bek':/left-back|sol bek|linker verteidiger/.test(norm)?'Sol Bek':/defensive midfield|defensives mittelfeld|ön libero/.test(norm)?'6 Numara':/attacking midfield|offensives mittelfeld|on numara|10 numara/.test(norm)?'10 Numara':/central midfield|zentrales mittelfeld|merkez orta saha/.test(norm)?'8 Numara':/winger|left winger|right winger|kanat|flügel/.test(norm)?'Kanat':/centre-forward|center-forward|santrafor|stürmer|striker/.test(norm)?'Forvet':'';if(mapped)player.position=mapped;else warnings.push(`Mevki otomatik eşleştirilemedi: ${position}`)}
 const foot=label(html,['Foot','Fuß','Ayak']);if(foot)player.foot=foot;
 const contract=label(html,['Contract expires','Vertrag bis','Sözleşme bitiş tarihi']);const contractDate=date(contract);if(contractDate&&Number(contractDate.slice(0,4))>=2020&&Number(contractDate.slice(0,4))<=2045)player.contract_end=contractDate;
 const market=strip(html.match(/<a[^>]*class=["'][^"']*data-header__market-value-wrapper[^"']*["'][^>]*>([\s\S]*?)<\/a>/i)?.[1]||html.match(/<div[^>]*class=["'][^"']*tm-player-market-value-development__current-value[^"']*["'][^>]*>([\s\S]*?)<\/div>/i)?.[1]||'');if(market)player.market_value=market.replace(/\s*(Last update|Son güncelleme|Letzte Änderung)[\s\S]*$/i,"").trim().slice(0,60);
 const photo=meta(html,'og:image');if(photo.startsWith('https://'))player.photo_url=photo;
 if(!player.name)warnings.push('Sayfadan oyuncu adı doğrulanamadı.');if(!player.birth_date)warnings.push('Doğum tarihi okunamadı.');
 warnings.push('Maç, gol, asist ve dakika yalnızca profil HTML sayfasından güvenilir biçimde çıkarılamadı; boş bırakıldı.');
 if(!description)warnings.push('Profil açıklama metni bulunamadı.');
 return {player,warnings};
}
