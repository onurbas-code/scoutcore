import { NextRequest,NextResponse } from "next/server";
export const runtime="nodejs";
export async function POST(req:NextRequest){
 try{
  const {url}=await req.json();
  const parsed=new URL(String(url||""));
  if(!/(^|\.)transfermarkt\.[a-z.]+$/i.test(parsed.hostname)||!/^\/[^?#]*\/spieler\/\d+/.test(parsed.pathname))return NextResponse.json({error:"Geçerli bir Transfermarkt oyuncu profil bağlantısı girin."},{status:400});
  const id=parsed.pathname.match(/\/spieler\/(\d+)/)?.[1];
  const player:Record<string,unknown>={external_link:parsed.origin+parsed.pathname,transfermarkt_id:id};
  const endpoint=process.env.SCOUTCORE_PLAYER_DATA_API_URL;
  const secret=process.env.SCOUTCORE_PLAYER_DATA_API_KEY;
  let source="Manuel doğrulama";
  if(endpoint){
   const base=new URL(endpoint);
   if(base.protocol!=="https:")throw Error("Veri sağlayıcı HTTPS kullanmalıdır.");
   const response=await fetch(base.toString(),{method:"POST",headers:{"Content-Type":"application/json",...(secret?{"Authorization":`Bearer ${secret}`}:{})},body:JSON.stringify({url:parsed.origin+parsed.pathname,player_id:id}),signal:AbortSignal.timeout(12000),cache:"no-store"});
   if(!response.ok)throw Error(`Veri sağlayıcı yanıtı: HTTP ${response.status}`);
   const data=await response.json();
   const allowed=["name","nationality","birth_date","position","club","country","market_value","contract_end","height","matches","goals","assists","minutes","player_type","report","foot","photo_url"];
   for(const key of allowed)if(data[key]!==undefined&&data[key]!==null)player[key]=data[key];
   source="Yapılandırılmış oyuncu veri sağlayıcısı";
  }
  if(player.birth_date&&/^\d{4}-\d{2}-\d{2}$/.test(String(player.birth_date))){const birth=new Date(String(player.birth_date)+"T00:00:00Z");const now=new Date();player.age=now.getUTCFullYear()-birth.getUTCFullYear()-(now.toISOString().slice(5,10)<String(player.birth_date).slice(5,10)?1:0)}
  if(!player.name){const slug=parsed.pathname.split("/").filter(Boolean)[0];player.name=slug.split("-").map(x=>x[0]?.toUpperCase()+x.slice(1)).join(" ")}
  return NextResponse.json({player,source,message:endpoint?"Veri sağlayıcısının sunduğu alanlar getirildi. Kaydetmeden önce doğrulayın.":"Otomatik veri sağlayıcısı henüz yapılandırılmadı. Profil bağlantısı doğrulandı; kalan bilgileri manuel girin. Yapay zekâ analizi şu anda etkin değil."});
 }catch(e:any){return NextResponse.json({error:e.message||"Veri alınamadı"},{status:400})}
}
