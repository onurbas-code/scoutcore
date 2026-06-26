import { Shell } from "@/components/Shell";
export default function ModulePage({params}:{params:{name:string}}){return <Shell active={params.name} title="Modül" subtitle="Hazırlanıyor"><div className="panel"><h3>ScoutCore Modülü</h3><p className="muted">Bu alan sonraki sürümlerde genişletilecek.</p></div></Shell>}
