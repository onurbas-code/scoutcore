const navItems = [
  "Dashboard",
  "Oyuncu Takip",
  "Transfer Komitesi",
  "KPI & Grafikler",
  "Yönetim Kurulu",
  "Ayarlar",
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brandMark">SC</div>
        <div>
          <strong>ScoutCore</strong>
          <span>BY ONUR BAŞ</span>
        </div>
      </div>

      <nav>
        {navItems.map((item, index) => (
          <a key={item} className={index === 0 ? "nav active" : "nav"}>
            {item}
          </a>
        ))}
      </nav>
    </aside>
  );
}
