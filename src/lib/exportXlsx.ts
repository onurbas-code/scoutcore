/** Dependency-free XLSX writer for client-side player exports. */
type Cell = string | number | null | undefined;
const encoder = new TextEncoder();
const esc = (v: Cell) => String(v ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;").replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g,"");
const col = (i:number) => {let s="";for(i++;i;i=Math.floor((i-1)/26))s=String.fromCharCode(65+(i-1)%26)+s;return s};
function crc32(bytes:Uint8Array){let c=0xffffffff;for(const b of bytes){c^=b;for(let k=0;k<8;k++)c=(c>>>1)^((c&1)?0xedb88320:0)}return (c^0xffffffff)>>>0}
function zip(files:{name:string;data:string}[]):Blob{
 const chunks:Uint8Array[]=[];const central:Uint8Array[]=[];let offset=0;
 const u16=(d:DataView,o:number,v:number)=>d.setUint16(o,v,true);
 const u32=(d:DataView,o:number,v:number)=>d.setUint32(o,v,true);
 for(const file of files){const name=encoder.encode(file.name),body=encoder.encode(file.data),crc=crc32(body);
  const local=new Uint8Array(30+name.length),lv=new DataView(local.buffer);u32(lv,0,0x04034b50);u16(lv,4,20);u16(lv,6,0x0800);u32(lv,14,crc);u32(lv,18,body.length);u32(lv,22,body.length);u16(lv,26,name.length);local.set(name,30);
  chunks.push(local,body);
  const cd=new Uint8Array(46+name.length),cv=new DataView(cd.buffer);u32(cv,0,0x02014b50);u16(cv,4,20);u16(cv,6,20);u16(cv,8,0x0800);u32(cv,16,crc);u32(cv,20,body.length);u32(cv,24,body.length);u16(cv,28,name.length);u32(cv,42,offset);cd.set(name,46);central.push(cd);offset+=local.length+body.length;
 }
 const centralLength=central.reduce((n,b)=>n+b.length,0),end=new Uint8Array(22),ev=new DataView(end.buffer);u32(ev,0,0x06054b50);u16(ev,8,files.length);u16(ev,10,files.length);u32(ev,12,centralLength);u32(ev,16,offset);
 return new Blob([...chunks,...central,end],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
}
export function downloadPlayersXlsx(headers:string[],rows:Cell[][],filename:string){
 const xmlRows=[headers,...rows].map((row,r)=>`<row r="${r+1}">${row.map((value,c)=>{const ref=`${col(c)}${r+1}`;return typeof value==="number"&&Number.isFinite(value)?`<c r="${ref}"><v>${value}</v></c>`:`<c r="${ref}" t="inlineStr"><is><t xml:space="preserve">${esc(value)}</t></is></c>`}).join("")}</row>`).join("");
 const sheet=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><sheetData>${xmlRows}</sheetData><autoFilter ref="A1:${col(headers.length-1)}${rows.length+1}"/></worksheet>`;
 const files=[
 {name:"[Content_Types].xml",data:`<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>`},
 {name:"_rels/.rels",data:`<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`},
 {name:"xl/workbook.xml",data:`<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Futbolcular" sheetId="1" r:id="rId1"/></sheets></workbook>`},
 {name:"xl/_rels/workbook.xml.rels",data:`<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>`},
 {name:"xl/worksheets/sheet1.xml",data:sheet}
 ];
 const url=URL.createObjectURL(zip(files)),a=document.createElement("a");a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
}
