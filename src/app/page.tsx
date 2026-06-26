const players = [
  { name: 'Marko Petrovic', pos: 'Forvet', folder: 'Acil Transfer', club: 'FK Novi', score: 82, status: 'A Hedef' },
  { name: 'Ali Can', pos: 'Orta Saha', folder: 'Gelişim Oyuncuları', club: 'Anadolu FK', score: 78, status: 'B Hedef' },
  { name: 'Uğurcan Kaya', pos: 'Kaleci', folder: 'Acil Transfer', club: 'Anadolu FK', score: 78, status: 'B Hedef' },
  { name: 'Lucas Ferreira', pos: 'Kanat', folder: 'Kiralık', club: 'Club Brasil', score: 75, status: 'B Hedef' },
];

const folders = ['Kaleci', 'Stoper', 'Sol Bek', 'Sağ Bek', 'Orta Saha', 'Kanat', 'Forvet', 'Acil Transfer'];

export default function HomePage() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logoMark">SC</div>
          <div><b>ScoutCore</b><span>BY ONUR BAŞ</span></div>
        </div>
        <a className="nav active">Dashboard</a>
        <a className="nav">Oyuncu Takip</a>
        <a className="nav">Transfer Komitesi</a>
        <a className="nav">KPI & Grafikler</a>
        <a className="nav">Yönetim Kurulu</a>
      </aside>
      <main className="main">
        <header className="top">
          <div><h1>Dashboard</h1><p>Football Intelligence Platform</p></div>
          <div className="user">Onur Baş · Proje Sahibi</div>
        </header>
        <section className="hero">
          <small>SCOUTCORE COMMAND CENTER</small>
          <h2>Çorum FK Scouting Operasyon Merkezi</h2>
          <p>Oyuncu klasörleri, scout raporları, transfer kararları ve yönetici özetlerini tek merkezden yöneten profesyonel futbol istihbarat platformu.</p>
        </section>
        <div className="cards">
          <div className="card"><span>Toplam Oyuncu</span><strong>124</strong><em>Canlı havuz</em></div>
          <div className="card"><span>A Hedef</span><strong>12</strong><em>Komite adayı</em></div>
          <div className="card"><span>Ortalama Skor</span><strong>78</strong><em>Karar motoru</em></div>
          <div className="card"><span>Acil Transfer</span><strong>8</strong><em>Öncelikli</em></div>
        </div>
        <div className="grid">
          <div className="panel">
            <h3>Yönetici Karar Listesi</h3>
            <table>
              <thead><tr><th>Oyuncu</th><th>Mevki</th><th>Klasör</th><th>Kulüp</th><th>Skor</th><th>Durum</th></tr></thead>
              <tbody>{players.map((p) => <tr key={p.name}><td><b>{p.name}</b></td><td>{p.pos}</td><td>{p.folder}</td><td>{p.club}</td><td>{p.score}</td><td><span className="badge">{p.status}</span></td></tr>)}</tbody>
            </table>
          </div>
          <div className="panel">
            <h3>Pozisyon Klasörleri</h3>
            <div className="folders">{folders.map((f, i) => <div className="folder" key={f}><span>{f}</span><b>{i + 3}</b></div>)}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
