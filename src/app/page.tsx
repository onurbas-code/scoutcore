import Sidebar from "@/components/Sidebar";
import MetricCard from "@/components/MetricCard";
import PlayerTable from "@/components/PlayerTable";
import FolderPanel from "@/components/FolderPanel";

export default function HomePage() {
  return (
    <div className="appShell">
      <Sidebar />

      <main className="main">
        <header className="topbar">
          <div>
            <h1>Dashboard</h1>
            <p>Football Intelligence Platform</p>
          </div>
          <div className="userBox">Onur Baş · Proje Sahibi</div>
        </header>

        <section className="hero">
          <div>
            <small>SCOUTCORE COMMAND CENTER</small>
            <h2>Çorum FK Scouting Operasyon Merkezi</h2>
            <p>
              Oyuncu klasörleri, scout raporları, transfer kararları ve yönetici
              özetlerini tek merkezden yöneten profesyonel futbol istihbarat
              platformu.
            </p>
          </div>
        </section>

        <section className="metrics">
          <MetricCard title="Toplam Oyuncu" value="124" detail="Canlı havuz" />
          <MetricCard title="A Hedef" value="12" detail="Komite adayı" />
          <MetricCard title="Ortalama Skor" value="78" detail="Karar motoru" />
          <MetricCard title="Acil Transfer" value="8" detail="Öncelikli" />
        </section>

        <section className="contentGrid">
          <PlayerTable />
          <FolderPanel />
        </section>
      </main>
    </div>
  );
}
